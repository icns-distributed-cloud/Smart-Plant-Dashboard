<template>
  <div class="background" style="display: flex;">
    <div style="display: flex; flex-direction: column; justify-content: space-between">
      <show-cctv></show-cctv>
      <multi-chart></multi-chart>
    </div>

    <div style="display: flex; width: 100%; align-items: flex-end; justify-content: center;">
      <div class="ssPos" v-for="pos in ssPosList" :key="pos.posId"
      @click="getPosSensor(pos.posId)">
        {{ pos.posName }}
      </div>
      
      <alarm-log></alarm-log>
    </div>
    <div
      style="  
        display: flex;
        place-content: flex-start flex-end;
        flex-flow: column wrap-reverse;
        justify-content: flex-start;
      "
    >
    <component
    v-for="sensor in ssInfoList" :key="sensor.ssId"
     :is="sensor.chartName" :value="sensor.value" :rangeArray="sensor.rangeArray">
     </component>
    </div>
    <div style="display: flex; flex-direction: column">

      <gas-chart v-if="false" :gas="90"></gas-chart>
      <dust-chart v-if="false"></dust-chart>
      <temp-chart v-if="false" :temp="temp"></temp-chart>
      <humidity-chart v-if="false" :humidity="humidity"></humidity-chart>

    </div>
  </div>
</template>

<script>
//import Vue from "vue";
import axios from "axios";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import ShowCCTV from "@/components/Charts/show-cctv.vue";
import MultiChart from "@/components/Charts/multi-chart.vue";
import GasChart from "@/components/Charts/gas-chart.vue";
import DustChart from "@/components/Charts/dust-chart.vue";
import TempChart from "@/components/Charts/temp-chart.vue";
import HumidityChart from "@/components/Charts/humidity-chart.vue";
import AlarmLog from '../components/Charts/AlarmLog.vue';

export default {
  name: "Home",
  data() {
    return {
      ssId: 1,
      currssId : 0,
      ssInfoList: [],
      ssPosList: [],
      humidity: 50,
      temp: 60,
    };
  },
  mounted() {
  this.getPosList();
  this.getPosSensor();
  },
  beforeUnmount() {
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
    async getPosList() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-pos?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.ssPosList = res.data.data.content;
      } catch(err) {
        console.log(err);
      }
    },

    async getPosSensor(posId = 1) {
      this.ssInfoList = [];
      this.displayGraph = "";
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-range?posId=" + posId
        );
        this.ssInfoList = res.data.data.content;
        this.makeSensorInfo();
      } catch(err) {
        console.log(err);
      }
    },
    makeRangeInfo() {
      for (var sensor of this.ssInfoList) {
          var result = this.getRangeArray(sensor.ssId);
          sensor.rangeArray = [];
          sensor.rangeArray.push(result.rstart);
          sensor.rangeArray.push(result.rlev1);
          sensor.rangeArray.push(result.rlev2);
          sensor.rangeArray.push(result.rlev3);
          sensor.rangeArray.push(result.rlev4);
          sensor.rangeArray.push(result.rend);
          console.log(sensor.rangeArray);
      }
    },
    makeSensorInfo() {  
        for (var sensor of this.ssInfoList) {
          sensor.value = 0;
          switch (sensor.sensorTypeName) {
            case "온도":
              sensor.chartName = "temp-chart";
              break;
            case "분진":
              sensor.chartName = "dust-chart";
              break;
            case "습도":
              sensor.chartName = "humidity-chart";
              break;
            case "가스":
              sensor.chartName = "gas-chart";
              break;
          }
          sensor.rangeArray = [];
          sensor.rangeArray.push(sensor.rstart);
          sensor.rangeArray.push(sensor.rlev1);
          sensor.rangeArray.push(sensor.rlev2);
          sensor.rangeArray.push(sensor.rlev3);
          sensor.rangeArray.push(sensor.rlev4);
          sensor.rangeArray.push(sensor.rend);
          console.log(sensor.rangeArray);
        }
        console.log("hello!!!!!!!!!!!!", this.ssInfoList);
        this.connect();
        //this.makeRangeInfo();
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
            for(let i = 0; i < this.ssInfoList.length; i++) {
            this.connected = true;
            console.log("Socket Connection Success", frame);
            // subscribe(destination, callback)
            this.stompClient.subscribe("/send/" + this.ssInfoList[i].ssId, (res, idx=i) => {
              console.log("Sub Message.", res.body);
              console.log(JSON.parse(res.body).inputData);
              console.log(this.ssInfoList[idx].ssId);
              this.ssInfoList[i].value = JSON.parse(res.body).inputData;
            });
            }
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
      for(var sensor of this.ssInfoList) {
        //console.log("send : " + sensor.ssId);
        if (this.stompClient && this.stompClient.connected) {
          const msg = {
            ssId: sensor.ssId,
          };
          this.stompClient.send("/receive/" + sensor.ssId, JSON.stringify(msg), {});
          
        }
      }
    },
      disconnect() {
        if (this.stompClient != null) {
          this.stompClient.disconnect();
          console.log("Disconnected");
        }
      }
  },
  components: {
    "show-cctv": ShowCCTV,
    "multi-chart": MultiChart,
    "gas-chart": GasChart,
    "dust-chart": DustChart,
    "temp-chart": TempChart,
    "humidity-chart": HumidityChart,
    "alarm-log": AlarmLog,
  },
};
</script>
<style>
.background {
  background-size: cover;
  width: 100%;
  height: 100%;
  background-image: url("../assets/background.png");
}
.box {
  background-color: #272e4890;
  opacity: 50;
  width: 230px;
  /* width: 100%; */
  height: 250px;
  height: fit-content;
  padding: 10px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  text-align: center;
  margin: 5px;
  }

.smallbox {
  height: fit-content;
}

.box_title {
  color: white;
  text-align: left;
  font-size: 15px;
  font-weight: bold;
  margin: 5px 10px;
}

.title_div {
  background-color: white;
  width: 100%;
  height: 1.5px;
  border-radius: 2px;
  opacity: 40;
  margin: 10px 0px;
}


.large_view_content {
  width: 100%;
  height: 190px;
  overflow: hidden;
  animation: large-view 0.2s;
}

.small_view_content {
  height: fit-content;
  animation: small-view 0.2s;
}

@keyframes large-view {
  from {
    height: 0px;
    opacity: 0;
  }
  to {
    height: 200px;
    opacity: 1;
  }
}

@keyframes small-view {
  from {
    height: 190px;
  }
  to {
    height: 30px;
  }
}

.small_status {
  border-radius: 13px;
  display: flex;
  justify-content: space-evenly;
  font-weight: bold;
  font-size: 17px;
  color: white;
  padding: 3px 0px;
  opacity: 90%;
  margin: 5px 5px;
}

#hide_icon {
  float: right;
  font-size: 18px;
  transition: text-shadow .5s;
}

#hide_icon:hover {
  text-shadow: 0px 0px 8px white;
}

.value_text {
  color: "#5a8dee";
  font-size: 40px;
  font-weight: bold;
  position: relative;
  text-shadow: 5px 5px 5px #1b1f22;
}

.dust_circle {
  width: 170px;
  height: 170px;
  border: 9px solid;
  border-radius: 50%;
  border-color: "#5a8dee";
  display: inline-flex;
  align-self: center;
  justify-content: center;
  color: "#5a8dee";
  font-weight: 8px;
  font-size: 40px;
  text-align: center;
  box-shadow: 5px 5px 5px #1b1f22;
}

.humid {
  width: 140px;
  height: 140px;
  border-radius: 0 50% 50% 50%;
  border: 3px solid black;
  transform: rotate(45deg);
  margin-top: 40px;
  margin-left: 37px;
  border-width: 9px;
  border-color: "#5a8dee";
  box-shadow: 5px 5px 5px #1b1f22;
}

.status {
  width: 60px;
  height: 23px;
  border-radius: 10px;
  color: "#5a8dee";
  font-size: 15px;
  font-weight: bold;
  padding: 3px;
  text-align: center;
  margin: 2px;
  position: absolute;
  bottom: 10px;
}

.ssPos {
  width: 50px;
  height: 50px;
  color: white;
}
</style>
