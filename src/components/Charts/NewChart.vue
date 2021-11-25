<template>
<div class="box">
    <div class="box_title">
        <i class="bi bi-bar-chart-fill"></i> 
        <span> {{ sensor.ssType.typeName }} </span>
        <span>{{ sensor.ssCode }}</span>
        <i v-if="!smallView" class="bi bi-caret-down-fill" id="hide_icon" style="float: right;"
        @click="smallView=true"
        ></i>
        <i v-if="smallView" id="hide_icon" class="bi bi-caret-up-fill" style="rloat: right;"
        @click="smallView=false"
        ></i>
    </div>
    <!--
    <div class="chart-header">
        <div class="chart-name-wrapper">
            <i class="bi bi-bar-chart-fill"></i>
            <span>{{ sensor.ssType.typeName }}</span>
            <span>{{ sensor.ssCode }}</span>
        </div>
        <i v-if="!smallView" class="bi bi-caret-down-fill" id="hide_icon" style="margin-left: 10px; color: white;"
        @click="smallView=true"
        ></i>
        <i v-if="smallView" id="hide_icon" class="bi bi-caret-up-fill" style="margin-left: 10px; color: white;"
      @click="smallView=false"
      ></i>
    </div>
    -->
    <div v-if="!smallView" class="large-view-content"
    style="position: relative; top: 10px;">
        <div class="value-wrapper">
            <div id="status-color" class="sensor-value" :style="{ color: color }">
                {{ value }}
            </div>
            <span class="sensor-unit">{{ sensor.ssType.unit }}</span>
        </div>

        <div class="chart-footer-wrapper">
            <div class="status-wrapper"
                :style="{ position: 'relative', left: bar_value_pos }">
                <div id="status-color" class="status-text"
                    :style="{color: color}">
                    <span v-html="icon"></span>
                    {{ status }}
                </div>
                <div class="status-triangle"></div>
            </div>

            <div class="bar-wrapper">
                <div class="bar"
                    v-for="(len, i) in bar_len_list" :key="i"
                    :style="{width: '20%', backgroundColor: infoList[i].color}"
                ></div>
            </div>
        </div>
    </div>
    <div v-if="smallView" class="small_view_content">
        <div class="small_status" :style="{ backgroundColor: color }">
            <div>{{ value }}<span style="font-size: 12px"> {{ sensor.ssType.unit }}</span></div>
                <div style="font-weight: lighter;">|</div>
            <div>{{ status }}</div>
        </div>
    </div>
</div>


</template>
<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import axios from "axios";

export default {
    name: "new-chart.vue",
    data() {
        return {
            smallView: false,
            color_list: ["#5a8dee", "#39da8a", "#fdac41", "#fdce31", "#ff5b5c"],
            bar_len_list: [],
            bar_value_pos: 0,
            ratio: 0,
            
            value: 0,
            color: "#5a8dee",
            icon: "<i class='bi bi-emoji-laughing-fill'></i>",
            status: "안전",
        }
    },
    props: {
        sensor: {
            type: Object,
            default: () => {
                return {
                    ssName: "온도",
                    ssCode: "I-T-1",
                    icon: "bi bi-thermometer-half",
                    unit: "°C",
                    range_list: [10, 30, 50, 60, 70, 80]
                }
            }
        },
        ssId: Number,
        infoList: Array
    },

    created() {
        this.getMoreInfo();
        this.connect();
    },

    beforeDestroy() {
        this.disconnect();
        clearInterval(this.timer);
    },

    methods: {
        calculateBarVal() {
            console.log("range_listlistlist",this.sensor.range_list);
            const maxLen = this.sensor.range_list[5] - this.sensor.range_list[0];
            for (var i = 0; i < 5; i++) {
                var len = (this.sensor.range_list[i+1] - this.sensor.range_list[i]) / maxLen * 100 + "%";
                this.bar_len_list[i] = len;
            }
            console.log("bar_len_list",this.bar_len_list);
            this.calcVarPos();
        },
        calcVarPos() {
            const maxLen = this.sensor.range_list[5] - this.sensor.range_list[0];
            if (this.value < this.sensor.range_list[0]) {
                this.bar_value_pos = "0%";
            } else {
                this.bar_value_pos = (this.value - this.sensor.range_list[0]) / maxLen * 100 + "%";
            }
        },

        async getMoreInfo() {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            try {
            const res = await axios.get(
                "http://163.180.117.38:8281/api/sensor-range/" + this.sensor.ssId
            )
            const result = res.data.data;
            this.sensor.range_list = [
                result.rstart,
                result.rlev1,
                result.rlev2,
                result.rlev3,
                result.rlev4,
                result.rend
            ]
            console.log(this.sensor.range_list);
            this.calculateBarVal();
            } catch(err) {
            console.log(err);
            }
        },

    connect() {
      const serverURL = "http://163.180.117.38:8281/ws";
      var socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect(
        // headers
        {},
        // connetCallback
        (frame) => {
          // 현재 보여지는 화면의 데이터값 가져오기
            this.connected = true;
            console.log("Socket Connection Success", frame);
            // subscribe(destination, callback)
            this.stompClient.subscribe(
              "/send/" + this.ssId,
              (res) => {
                console.log("Sub Message.", res.body);
                console.log(JSON.parse(res.body).inputData);
                // sensorState : ex) 심각 -> 4
                // ["안전","관심","주의","경고","심각"]
                const state = JSON.parse(res.body).sensorState;
                this.value = JSON.parse(res.body).inputData;
                this.color = this.infoList[state].color;
                this.icon = this.infoList[state].icon;
                this.status = this.infoList[state].status;
              }
            );
          },
        // errorCallback
        (error) => {
          console.log("Socket Connection Fail", error);
          this.connected = false;
        }
      );
      this.infSend();
    },

    infSend() {
      setInterval(this.send, 2000);
    },

    send() {
        //console.log("send : " + sensor.ssId);
        if (this.stompClient && this.stompClient.connected) {
          const msg = {
            ssId: this.ssId,
          };
          this.stompClient.send(
            "/receive/" + this.ssId,
            JSON.stringify(msg),
            {}
          );
        }
    },

    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
      }
    },
  },
    watch: {
        value: function() {
            this.calcVarPos();
        }
    }
}
</script>
<style>
.chart-container {
    position: relative;
    width: 100%;
    height: 24%;
    background-color: rgba(26, 35, 58, 0.5);
    border-radius: 5%;
    overflow: hidden;
    margin: 10px 0px;
}

.chart-header {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
}

.chart-name-wrapper {
    color: white;
    font-weight: bold;
    /*background-color: rgba(26, 35, 58, 0.5);*/
    font-size: 1rem;
    padding: 2%;
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    border-radius: 0px 0px 10px 0px;
}

.small-content-warpper {
    width: 100%;
    height: 80%;
}

.large-content-wrapper {
    width: 100%;
    height: 80%;
}

.value-wrapper {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    position: relative;
    top: 10%;
}

.sensor-value {
    font-size: 3.2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(26, 35, 58, 0.5);
}

.sensor-unit {
    color: white;
    font-weight: bold;
    font-size: 1rem;
    position: relative;
    top: 50%;
    line-height: 100px;
}

.chart-footer-wrapper {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
}

.status-wrapper {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.status-text {
    font-size: 0.9rem;
    font-weight: bold;
    background-color: rgba(26, 35, 58, 1);
    padding: 2px;
    width: 55px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
}

.status-triangle {
  width: 0px; height: 0px;
  border-bottom:1rem solid none;
  border-top: 1rem solid rgba(26, 35, 58, 1);
  border-right: 0.35rem solid transparent;
  border-left: 0.35rem solid  transparent;
}

.bar-wrapper {
    width: calc(100% + 20px);
    height: 15px;
    opacity: 0.6;
    display: flex;
    position: relative;
    right: 10px;
}

.bar {
    height: 100%;
}

#status-color {
    color: #5a8dee;
}

</style>