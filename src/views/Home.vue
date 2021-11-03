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
          "http://163.180.117.38:8281/api/sensor-manage?paged=false&posId=" +
            posId +
            "&sort.sorted=true"
        );
        this.ssInfoList = res.data.data.content;

        for (var sensor of this.ssInfoList) {
          sensor.value = 0;
          switch (sensor.ssType.typeName) {
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
        }
        console.log(this.ssInfoList);
        this.connect();
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
  background-size: contain;
  height: 100%;
  background-image: url("../assets/background.png");
  background-repeat: no-repeat;
  width: 100%;
}
.box {
  background-color: #272e4890;
  opacity: 50;
  width: 230px;
  /* width: 100%; */
  height: 250px;
  padding: 10px;
  overflow: visible;
  position: relative;
  border-radius: 5px;
  text-align: center;
  margin: 5px;
}

.smallbox {
  width: fit-content;
  height: fit-content;
  display: flex;
}

.box_title {
  color: white;
  text-align: left;
  font-size: 15px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: 10px;
}

.title_div {
  background-color: white;
  width: 100%;
  height: 1.5px;
  border-radius: 2px;
  opacity: 40;
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
  width: 150px;
  height: 150px;
  border-radius: 0 50% 50% 50%;
  border: 3px solid black;
  transform: rotate(45deg);
  margin-top: 40px;
  margin-left: 30px;
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
