<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      CCTV 영상인식 | <Icon icon="bx:bx-home-alt" />
    </div>
    <div style="display: flex; ">
      <div class="cctv-main" v-for="item in elements" v-bind:key="item.cctv_element">
        <div class="cctv-main__header">{{ item.cctv_location }}</div>
        <canvas :id=item.cctv_element style="width: 320px; height: 240px; margin:10px;">
        </canvas>
        <button @click="fullScreenModal=true; canvasId=item.cctv_element+'modal'; websocketUrl=item.cctv_websocketurl; [disconnect(),disconnectedState()]">click</button>

      </div>
    </div>
  </div>
  <FullScreenModal v-if="fullScreenModal" @close="fullScreenModal = false" :childCanvasId=canvasId :childWebsocketURL=websocketUrl />

</template>

<script>
import { Icon } from "@iconify/vue";
import JSMpeg from "jsmpeg";
import axios from "axios";
import FullScreenModal from "@/components/AbnormalDetection/FullScreenModal";
export default {
  name: "CCTV",

  components: {
    FullScreenModal,
    Icon,
  },
  data(){

    return {
      fullScreenModal: false,
      currId: "",
      cctvList : [],
      cctvListLength : 0,
      elements : [
      ],
      url :[],
      canvasView : [],
      disconnectState: false
    }
  },
  created() {
    this.getCCTVInfo();
  },
  updated() {
    this.getWebsocketVideo();
  },
  beforeUnmount() {
    this.disconnect();

  },

  methods: {
    async getCCTVInfo(){
      try{
        const res = await axios.get(
            "http://163.180.117.40:8218/api/cctv?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.cctvList = res.data.data.content;
        this.cctvListLength = this.cctvList.length;
        this.getCCTVElement();
      } catch (err){
        console.log(err);
      }
    },
    getCCTVElement: function (){
      for(let i=0;i<this.cctvListLength;i++){
        this.elements[i] = {cctv_element: '', cctv_location: '', cctv_websocketurl: ''};
      }
      for(let i=0;i<this.cctvListLength;i++){
        this.elements[i].cctv_element= 'test-cctv'+ this.cctvList[i].cctvId;
        this.elements[i].cctv_location = this.cctvList[i].cctvLocation;
        this.elements[i].cctv_websocketurl = this.cctvList[i].websocketURL;
      }

    },

    getWebsocketVideo: function(){
        for(let i=0;i<this.cctvListLength;i++){
          this.canvasView[i] = document.getElementById('test-cctv'+String(this.cctvList[i].cctvId));
          this.url[i] = new WebSocket(this.cctvList[i].websocketURL);
          new JSMpeg(this.url[i], {canvas:this.canvasView[i]});
        }
    },
/*
이 코드는 opencv에서 받을 때

          let open_socket = this.url[i]

          open_socket.addEventListener("open", ()=>{
            console.log("send connect message socket : "+String(i));
            open_socket.send("client number of connection : "+String(i));
          });

          if(this.url && this.url.length >0){
            console.log(this.url[i]);
            let listen = this.url[i];
            listen.addEventListener('message', (event)=>{
              let ctx = this.canvasView[i].getContext("2d");
              let image = new Image();
              image.src = window.URL.createObjectURL(event.data);
              image.addEventListener("load", (e) =>{
                console.log(e);
                ctx.drawImage(image, 0,0,this.canvasView[i].width, this.canvasView[i].height);
                window.URL.revokeObjectURL(image.src);
              });
            });
          }
*/

    disconnect: function(){
      let length = this.cctvListLength;
      for(let i = 0;i< length;i++){
        this.url[i].close(1000);
      }
    },
    disconnectedState: function(){
      this.disconnectState = true;
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

.table-main__header {
  padding: 20px;
  font-size: 20px;
}
.cctv-main {
  margin: 20px;
  background-color: #272e48;
  color: #a9c7f0;
  border-radius: 9px;
  width: 400px;
  height: 350px;
  float: left;
}
.cctv-main__header {
  padding: 20px;
  font-size: 20px;
}

</style>
