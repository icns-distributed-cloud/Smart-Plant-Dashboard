<template>
  <div class="background" style="display: flex;">
    <ShowCCTV></ShowCCTV>
    <MultiChart></MultiChart>
    <AlarmLog></AlarmLog>
    <div
      style="
        width: 250px;
        right: 30px;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex-shrink: 1
        
      "
    >
      <GasChart :infoList="infoList" :gas=90></GasChart>
      <DustChart :infoList="infoList"></DustChart>
      <TempChart :infoList="infoList" :temp="temp"></TempChart>
      <HumidityChart :infoList="infoList" :humidity="humidity"></HumidityChart>
    </div>
    <div style="display: flex; flex-direction: column">
    <div>
    <span style="padding-left: 20px; color: white;">여기에 습도를 입력하세요 : </span>
    <input style="height: 40px;" v-model="humidity">
    </div>
  <div>
    <span style="padding-left: 20px; color: white;">여기에 온도를 입력하세요 : </span>
    <input style="height: 40px;" v-model="temp">
  </div>
    </div>



  </div>
</template>

<script>
import axios from "axios";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import ShowCCTV from "@/components/Charts/ShowCCTV.vue";
import MultiChart from "@/components/Charts/MultiChart.vue";
import GasChart from "@/components/Charts/GasChart.vue";
import AlarmLog from "@/components/Charts/AlarmLog.vue";
import DustChart from "@/components/Charts/DustChart.vue";
import TempChart from "@/components/Charts/TempChart.vue";
import HumidityChart from "@/components/Charts/HumidityChart.vue";

export default {
  name: "Home",
  created() {
  //this.connect();
  this.getPosSensor();
  },
  data() {
    return {
      ssId: 1,
      resList: [],
      ssInfoList: [],
      humidity: 50,
      temp: 60,
      infoList: [
        {
          color: "#5a8dee",
          status: "안전",
          icon: "<i class='bi bi-emoji-laughing-fill'></i>",
        },
        {
          color: "#00cfdd",
          status: "관심",
          icon: "<i class='bi bi-emoji-smile-fill'></i>",
        },
        {
          color: "#39da8a",
          status: "주의",
          icon: "<i class='bi bi-emoji-neutral-fill'></i>",
        },
        {
          color: "#fdac41",
          status: "경고",
          icon: "<i class='bi bi-emoji-frown-fill'></i>",
        },
        {
          color: "#ff5b5c",
          status: "심각",
          icon: "<i class='bi bi-exclamation-triangle-fill'></i>",
        },
      ],
    };
  },
  methods: {
    async getPosSensor(posId=1) {
      this.ssInfoList = [];
      const res = await axios.get(
        "http://163.180.117.38:8281/api/sensor-manage?paged=false&posId="+ posId +"&sort.sorted=true"
      );
      this.ssInfoList = res.data.data.content;
      this.getSensorValue();
    },
    getSensorValue() {
      for(var sensor of this.ssInfoList) {
        this.connect(sensor.ssId);
      }

    },
    infSend() {
      setInterval(this.send, 1000);
    },
    send(ssId) {
      console.log("send : " + ssId);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          ssId: ssId,
        };
        this.stompClient.send("/receive/" + ssId, JSON.stringify(msg), {});
      }
    },
    connect(ssId) {
      const serverURL = "http://163.180.117.38:8281/ws";

      let socket = new SockJS(serverURL);

      this.stompClient = Stomp.over(socket);

      console.log(`try to connect: ${serverURL}`);

      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true;
          console.log("Socket Connection Success", frame);

          this.stompClient.subscribe("/send/" + ssId, (res) => {
            console.log("Sub Message.", res.body);

            this.resList.push(JSON.parse(res.body));
          });
        },
        (error) => {
          console.log("Socket Connection Fail", error);
          this.connected = false;
        }
      );
    },
  },
  components: {
    ShowCCTV,
    MultiChart,
    GasChart,
    AlarmLog,
    DustChart,
    TempChart,
    HumidityChart,
  },
};
</script>

<style>
.background {
  background-size: contain;
  height:100%;
  background-image: url('../assets/background.png');
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
  /* flex-grow: 0;
  flex-shrink: 0; */
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
</style>
