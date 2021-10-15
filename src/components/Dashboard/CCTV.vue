<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      CCTV 영상인식 | <Icon icon="bx:bx-home-alt" />
    </div>
    <canvas id='test-cctv' style="width: 640px; height: 480px;">
    </canvas>


    <!--div class="table-main">
      <div>
        <div class="table-main__header">ICNS Lab Monitor </div>
      </div>
    </div-->
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
      path: "ws://163.180.117.40:9998"
    }
  },

  mounted: function(){
    this.getWebsocketVideo();
  },
  beforeUnmount() {
    this.disconnect();
  },
  methods: {
    getWebsocketVideo: function(){
      let canvas = document.getElementById('test-cctv');
      this.url = new WebSocket(this.path);
      new JSMpeg(this.url, {canvas:canvas});
    },
    disconnect: function (){
      this.url.close();
    }

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
