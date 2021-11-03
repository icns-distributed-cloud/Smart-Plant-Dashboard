<template>
    <!--CCTV-->
    <div class="box" style="width: 300px; height:300px;">
        <div class="box_title">영상 분석</div>
        <div class="title_div">
            <canvas id="main-cctv" style="width: 320px; height: 240px;"></canvas>

        </div>
    </div>
</template>

<script>
import JSMpeg from 'jsmpeg'
export default {
    
    name: 'ShowCCTV',
    components: {},
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
        let canvas = document.getElementById('main-cctv');
        this.url = new WebSocket(this.path);
        new JSMpeg(this.url, {canvas:canvas});
      },
      disconnect: function (){
        this.url.close();
      }

    }
}
</script>

<style>

</style>