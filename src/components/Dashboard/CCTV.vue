<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      CCTV 영상인식 | <Icon icon="bx:bx-home-alt" />
    </div>
    <div class="table-main" v-for="item in elements" v-bind:key="item">
      <div class="table-main__header">ICNS Lab Monitor</div>
      <canvas :id=item style="width: 640px; height: 480px;">
      </canvas>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import JSMpeg from "jsmpeg";

export default {
  name: "CCTV",

  components: {
    Icon,
  },
  data(){

    return {
      wsUrlList : [{
        a1: "ws://163.180.117.40:9998",
        a2: "ws://163.180.117.40:9997"
      }],
      elements : ['test-cctv', 'test-cctv3'],
    }
  },

  mounted() {
    this.getWebsocketVideo();
  },
  beforeUnmount() {
    this.disconnect();

  },
  methods: {


    getWebsocketVideo: function(){
      let canvas = document.getElementById('test-cctv');
      this.url = new WebSocket(this.wsUrlList[0].a1);
      new JSMpeg(this.url, {canvas:canvas});

      let canvas3 = document.getElementById('test-cctv3');
      this.url2 = new WebSocket(this.wsUrlList[0].a2);
      new JSMpeg(this.url2, {canvas:canvas3});
    },
    disconnect: function (){
      this.url.close();
      this.url2.close();
    },
  }
};
</script>

<style>
.wrapper {
  margin: 10px;
}
.table-header {
  color: #727e8c;
  font-size: 20px;
}
.table-main {
  margin: 20px;
  background-color: #272e48;
  color: #a9c7f0;
  border-radius: 9px;
  height: 600px;
}
.cctv-main {
  margin: 20px;
  background-color: #272e48;
  color: #a9c7f0;
  border-radius: 9px;
  height: 600px;
}
.table-main__header {
  padding: 20px;
  font-size: 20px;
}
</style>
