<template>
  <!--가스-->
  <div class="box">
    <div class="box_title">
      <i class="bi bi-clouds"></i> 가스
      <i
        v-if="!smallView"
        class="bi bi-caret-down-fill"
        id="hide_icon"
        style="float: right"
        @click="smallView = true"
      ></i>
      <i
        v-if="smallView"
        id="hide_icon"
        class="bi bi-caret-up-fill"
        style="color: white;"
        @click="smallView = false"
      ></i>
    </div>
<!--
    <div v-if="!smallView" class="large_view_content">
      <div class="gauge" style="position: relative; top: -125px;">
        <ejs-circulargauge background="#FFFFFF00">
          <e-axes>
            <e-axis :minimum="0" :maximum="100">
              <e-pointers>
                <e-pointer
                  :value="value"
                  :animation="animation"
                  color="#1a233a"
                ></e-pointer>
              </e-pointers>
              <e-ranges>
                <e-range
                  :start="0"
                  :end="10"
                  :color="red"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
                <e-range
                  :start="10"
                  :end="20"
                  :color="blue"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
                <e-range
                  :start="20"
                  :end="40"
                  :color="green"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
                <e-range
                  :start="40"
                  :end="60"
                  :color="yellow"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
                <e-range
                  :start="60"
                  :end="100"
                  :color="purple"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
              </e-ranges>
            </e-axis>
          </e-axes>
        </ejs-circulargauge>
      </div>
      <div id="gas" class="value_text" style="top: -330px;">{{ value }}</div>
    </div>
-->
    <div v-if="smallView" class="small_view_content">
      <div class="small_status" :style="{ backgroundColor: color }">
        <div>{{ value }}<span style="font-size: 12px"> ppm</span></div>
        <div style="font-weight: lighter;">|</div>
        <div>{{ status }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
// import {
//   CircularGaugeComponent,
//   AxesDirective,
//   AxisDirective,
//   PointersDirective,
//   PointerDirective,
//   RangesDirective,
//   RangeDirective,
// } from "@syncfusion/ej2-vue-circulargauge";

export default {
  name: "gas-chart",

  // components: {
  //   "ejs-circulargauge": CircularGaugeComponent,
  //   "e-axes": AxesDirective,
  //   "e-axis": AxisDirective,
  //   "e-pointers": PointersDirective,
  //   "e-pointer": PointerDirective,
  //   "e-ranges": RangesDirective,
  //   "e-range": RangeDirective,
  // },
  data: function() {
    return {
      smallView: false,
      animation: { enable: false },
      majorTicks: { width: 1, color: "#5a8dee" },
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
#gas {
  color: v-bind(color);
  border-color: v-bind(color);
}
</style>
