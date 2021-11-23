<template>
    <!--CCTV-->
    <div class="box" style="width: 300px; height:300px;">
        <div class="box_title">영상 분석</div>
        <div class="title_div">
            <canvas id="main-cctv" width="320" height="240"></canvas>

        </div>
    </div>
</template>

<script>
export default {
    
    name: 'ShowCCTV',
    components: {},
    data(){
      return {
        path: "ws://163.180.117.40:9995"
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

        this.url.addEventListener("open",()=>{
          console.log("send connect message");
          this.url.send("client connect");
        });
        this.url.onmessage = function(event){
          let ctx = canvas.getContext("2d");
          let image = new Image();
          image.src = window.URL.createObjectURL(event.data);
          image.addEventListener("load", () =>{
            ctx.drawImage(image, 0,0,canvas.width, canvas.height);
            window.URL.revokeObjectURL(image.src);
          });
        };
      },
      disconnect: function () {
        this.url.close(1000);
      }
    },
}
</script>

<style>

</style>