<template>
  <div class="background"
  :style="{
    backgroundImage: 'url('+'http://163.180.117.38:8281/api/image?path='+this.currPos.positionImgPath+
    '),url('+'http://163.180.117.38:8281/api/image?path='+this.currPos.backgroundImgPath+')',
  }"
  >
  <div class="pos-nav-bar">
      <div
        class="ssPos"
        v-for="pos in ssPosList"
        :key="pos.posId"
        @click="getPosSensor(pos.posId);
        currPos = pos"
      >
        {{ pos.posName }}
      </div>
  </div>

  <div class="chart-wrapper">
    <div
      style="display: flex; flex-direction: column; justify-content: space-between; height: calc(100%-50px);"
    >
      <show-cctv></show-cctv>
      <alarm-log
        ref="addAlarmLog"
      >
      </alarm-log>
    </div>

    <div
      style="display: flex;
      width: 100%;
      align-items: flex-end;
      justify-content: center;"
    >

    </div>

    <div
      style="  
        width: 260px;
        display: flex;
        place-content: flex-start flex-end;
        flex-flow: column wrap-reverse;
        justify-content: flex-start;
      "
    >
      <component
        v-for="sensor in ssInfoList"
        :key="sensor.ssId"
        :is="sensor.chartName"
        :infoList="infoList"
        :ssId="sensor.ssId"
        :sensor="sensor"
      >
      </component>
      <NewChart></NewChart>
    </div>
    </div>
    <div style="display: flex; flex-direction: column">
      <gas-chart v-if="false" :gas="90"></gas-chart>
      <dust-chart v-if="false"></dust-chart>
      <temp-chart v-if="false" :temp="temp"></temp-chart>
      <humidity-chart v-if="false" :humidity="humidity"></humidity-chart>
    </div>

    <AlertWarningModal
    v-if="alertWarning"
    :warningInfo="warningInfo"
    @close-warning-modal="alertWarning=false"
    ></AlertWarningModal>
    <FireDetectionModal
    v-if="fireWarning"
    :fireWarningInfo="fireWarningInfo"
    @close-fire-detection-modal="fireWarning=false [fireDetection()]"
    ></FireDetectionModal>
  </div>
</template>

<script>
//import Vue from "vue";
import axios from "axios";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import ShowCCTV from "@/components/Charts/show-cctv.vue";
//import MultiChart from "@/components/Charts/multi-chart.vue";
import GasChart from "@/components/Charts/gas-chart.vue";
import DustChart from "@/components/Charts/dust-chart.vue";
import TempChart from "@/components/Charts/temp-chart.vue";
import HumidityChart from "@/components/Charts/humidity-chart.vue";
import AlarmLog from "../components/Charts/AlarmLog.vue";
import AlertWarningModal from "./AlertWarningModal.vue";
import NewChart from "@/components/Charts/NewChart.vue";
import FireDetectionModal from "../components/AbnormalDetection/FireDetectionModal.vue";
import eventBus from "../cctveventbus"
export default {
  name: "Home",
  data() {
    return {
      ssId: 1,
      currssId: 0,
      ssInfoList: [],
      ssPosList: [],
      warningInfo: {},
      alertWarning: false,
      fireWarning : false,
      fireWarningInfo : {detectionUrl: ''},
      currPos: {},
      infoList: [
        {
          color: "#5a8dee",
          status: "안전",
          icon: "<i class='bi bi-emoji-laughing-fill'></i>",
        },
        {
          color: "#39da8a",
          status: "관심",
          icon: "<i class='bi bi-emoji-smile-fill'></i>",
        },
        {
          color: "#fdac41",
          status: "주의",
          icon: "<i class='bi bi-emoji-neutral-fill'></i>",
        },
        {
          color: "#fdce41",
          status: "경고",
          icon: "<i class='bi bi-emoji-frown-fill'></i>",
        },
        {
          color: "#ff5b5c",
          status: "심각",
          icon: "<i class='bi bi-exclamation-triangle-fill'></i>",
        },
      ],
      fireDetectionPolling: null,
    };
  },
  created() {
    this.getPosList(true);
    this.getPosSensor();
    this.fireDetection();
  },
  
  beforeDestroy() {
    this.disconnect();
    clearInterval(this.timer);
    clearInterval(this.fireDetectionPolling);
  },

  methods: {
    async getPosList(isCreated=false) {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-pos?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.ssPosList = res.data.data.content;
        if(isCreated) {
          this.currPos = this.ssPosList[0];
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getPosSensor(posId = 1) {
      this.ssInfoList = [];
      this.displayGraph = "";
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-manage?posId=" + posId
        );
        this.ssInfoList = res.data.data.content;
        this.makeSensorInfo();
      } catch (err) {
        console.log(err);
      }
    },

    makeSensorInfo() {
      console.log(this.ssInfoList);
      for (var sensor of this.ssInfoList) {
        // default 값 설정
        sensor.value = 0;
        sensor.color = "#5a8dee";
        sensor.icon = "<i class='bi bi-emoji-laughing-fill'></i>";
        sensor.status = "안전";

        // component 지정
        switch (sensor.ssType.display) {
          case 1:
            sensor.chartName = "anonymous-chart";
            break;
          case 2:
            sensor.chartName = "temp-chart";
            break;
          case 3:
            sensor.chartName = "humidity-chart";
            break;
          case 4:
            sensor.chartName = "dust-chart";
            break;
          case 5:
            sensor.chartName = "gas-chart";
            break;
        }
      }
      this.connect();
    },

  async getMoreInfo(sensor) {
    try {
      const res = await axios.get(
        "http://163.180.117.38:8281/api/sensor-range/" + sensor.ssId
      )
      const result = res.data.data;
      sensor.range_list = [
        result.rstart,
        result.rlev1,
        result.rlev2,
        result.rlev3,
        result.rlev4,
        result.rend
      ]
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

          // 이상 데이터 발생하는 경우
          this.stompClient.subscribe("/alert", (res) => {
            console.log("======================WARNING======================");
            console.log("Sub Message : ", res.body, frame);
            const state = JSON.parse(res.body).sensorState;
            this.warningInfo = JSON.parse(res.body);
            this.warningInfo.color = this.infoList[state].color;
            this.warningInfo.icon = this.infoList[state].icon;
            this.warningInfo.status = this.infoList[state].status;
            this.alertWarning = true;
            this.getPosSensor(this.warningInfo.posId);
            this.$refs.addAlarmLog.getAlarmLog();
          });
        },
        // errorCallback
        (error) => {
          this.connected = false;
          console.log(error);
        }
      );
      this.infSend();
    },

    infSend() {
      setInterval(this.send, 2000);
    },

    send() {
      for (var sensor of this.ssInfoList) {
        if (this.stompClient && this.stompClient.connected) {
          const msg = {
            ssId: sensor.ssId,
          };
          this.stompClient.send(
            "/receive/" + sensor.ssId,
            JSON.stringify(msg),
            {}
          );
        }
      }
    },
    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
      }
    },
    fireDetection(){
      this.fireDetectionPolling = setInterval(() => {
        const url = "http://163.180.117.40:3000/api/fireDetection/"
        fetch(url).then(res => {
          return res.json();
        }).then(json => {
          console.log(json);
          if(json.detection === true){
            this.fireWarning = true;
            this.fireWarningInfo.detectionUrl = json.detectionUrl;
            console.log("detection URL!!!!!!!!!!!");
            console.log(this.fireWarningInfo.detectionUrl);
            eventBus.$emit('fireWebsocketUrl', json.detectionUrl);
            clearInterval(this.fireDetectionPolling);
          }
        }).catch(function (error){
          console.warn(error);
        })
      }, 1000);
    }
  },




  components: {
    "show-cctv": ShowCCTV,
    //"multi-chart": MultiChart,
    "gas-chart": GasChart,
    "dust-chart": DustChart,
    "temp-chart": TempChart,
    "humidity-chart": HumidityChart,
    "alarm-log": AlarmLog,
    "anonymous-chart": NewChart,
     AlertWarningModal,
     FireDetectionModal,
  },
};
</script>
<style>
.pos-nav-bar {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: flex-start;
  background-color: #00000024;
}

.chart-wrapper {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
}

.background {
  display: flex;
  flex-direction: column;
  background-size: cover;
  width: 100%;
  height: 100%;
  background-image: url("../assets/background.png");
}
.box {
  background-color: #272e4890;
  opacity: 50;
  width: 200px;
  height: 200px;
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
  height: 180px;
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
    height: 190px;
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
  transition: text-shadow 0.5s;
}

#hide_icon:hover {
  text-shadow: 0px 0px 8px white;
}

.value_text {
  color: #5a8dee;
  font-size: 2.5rem;
  font-weight: bold;
  position: relative;
  text-shadow: 5px 5px 5px #1b1f22;
}

.dust_circle {
  width: 160px;
  height: 160px;
  border: 9px solid;
  border-radius: 50%;
  border-color: #5a8dee;
  display: inline-flex;
  align-self: center;
  justify-content: center;
  color: #5a8dee;
  font-weight: 8px;
  font-size: 40px;
  text-align: center;
  box-shadow: 5px 5px 5px #1b1f22;
}

.humid {
  width: 130px;
  height: 130px;
  border-radius: 0 50% 50% 50%;
  border: 3px solid black;
  transform: rotate(45deg);
  margin-top: 40px;
  margin-left: 25px;
  border-width: 9px;
  border-color: #5a8dee;
  box-shadow: 5px 5px 5px #1b1f22;
}

.status {
  width: 65px;
  height: 25px;
  border-radius: 10px;
  color: #5a8dee;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin: 2px;
  position: absolute;
  bottom: 10px;
  background-color: rgba(26, 35, 58, 1);
  line-height: 25px;
}

.ssPos {
  padding: 0px 15px;
  color: white;
}
</style>
