<template>
  <!-- 분진 -->
  <div>
  <div class="box">
    <div class="box_title"><i class="bi bi-cloud-haze"></i> 분진
      <i v-if="!smallView" class="bi bi-caret-down-fill" id="hide_icon" style="float: right"
      @click="smallView=true"
      ></i>
      <i v-if="smallView" id="hide_icon" class="bi bi-caret-up-fill" style="color: white;"
      @click="smallView=false"
      ></i>
    </div>

    <!-- 분진 큰 창 -->
    <div v-if="!smallView" class="large_view_content">
    <div id="dust"
    :style="{borderColor: color}"
    class="dust_circle">
      <div
        id="dust"
        class="dust_circle"
        :style="{
          width: '135px',
          height: '135px',
          borderWidth: '4px',
          lineHeight: '120px',
          flexDirection:'column',
          borderColor: color
        }"
      >
        <img
          style="
            position: relative;
            width: 60px;
            height: 60px;
            top: 20px;
            left: 35px;
          "
          src="../../assets/bubble.png"
        />
        <div id="dust" class="value_text"
        :style="{color: color, bottom: '20px'}">
          {{ value }}
        </div>
        <div
          style="
            font-size: 20px;
            color: white;
            line-height: 10%;
            position: relative;
            bottom: 40px;
          "
        >
          mg/m<sup>3</sup>
        </div>
      </div>
    </div>
    <div id="dust" :style="{color: color}" class="status">
      <span v-html="icon"></span>
      <span style="margin-left: 4px">{{ status }}</span>
    </div>
  </div>

  <!-- 분진 작은 창 -->
  <div v-if="smallView" class="small_view_content">
      <div class="small_status" :style="{backgroundColor: color}">
        <div>{{ value }}<span style="font-size: 10px"> μm</span></div>
        <div style="font-weight: lighter">|</div>
        <div >{{ status }}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

export default {
  name: "dust-chart",
  data() {
    return {
      smallView: false,
      value: 0,
      color: "#5a8dee",
      icon: "<i class='bi bi-emoji-laughing-fill'></i>",
      status: "안전",
    };
  },

  mounted() {
    this.connect();
  },

  beforeDestroy() {
    this.disconnect();
    clearInterval(this.timer);
  },

  methods: {
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

  props: {
    ssId: Number,
    infoList: Array
  },
};
</script>

<style>
#dust {
  color: v-bind(color);
  border-color: v-bind(color);
}
</style>