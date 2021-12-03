<template>
  <div class="cctv-modal-wrapper">
    <!--<div class="modal-dialog">-->
      <div class="cctv-modal-content">
        <div class="cctv-modal-header">
          <button
              type="button"
              class="btn btn-secondary"
              aria-label="Close"
              v-on:click=" $emit('close-fire-detection-modal');"
          ></button>
          <div class="modal-body">
            <canvas id="fire-detection-modal" width=640 height=320></canvas>
          </div>
        </div>
      </div>
    </div>
  <!--</div>-->
</template>

<script>
export default {
  name: "FireDetectionModal",
  /*
  props: {
    childCanvasId: {
      type : String,
      required : true
    },
    childWebsocketURL : {
      type : String,
      required: true
    }
  },
   */
  data(){
    return {
    }
  },
  props: {
      fireWarningInfo : Object,

  },
  mounted() {
      console.log("fire detection modal on");
      this.fireWebSocketStreaming();
  },
  beforeDestroy() {
    this.disconnect2();
  },

  methods : {
    fireWebSocketStreaming: function(){
        console.log("modal streaming on!!!!!!!!!")
        console.log(this.fireWarningInfo)
        this.open_socket = new WebSocket(this.fireWarningInfo.detectionUrl);

        this.open_socket.addEventListener("open", ()=>{
            console.log("send connect message socket fire detection");
            this.open_socket.send("send connect message socket fire detection");
        });
        var msg = document.getElementById("fire-detection-modal");
        let listen = this.open_socket;
        listen.addEventListener('message', (event)=>{
            let ctx = msg.getContext("2d");
            let image = new Image();
            image.src = window.URL.createObjectURL(event.data);
            image.addEventListener("load", (e) =>{
            console.log(e);
            ctx.drawImage(image, 0,0,msg.width, msg.height);
            window.URL.revokeObjectURL(image.src);
            });
        });

    },
    disconnect2: function(){
      console.log("disconnected!!!!!!!!!!!!!!!!!!!")
      this.open_socket.close(1000);
    }
  },

}
</script>

<style scoped>
.cctv-modal-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.cctv-modal-header {
  background-color: #272e48;
  color: #9fb0d6;
  border-bottom: #464d5c 0.5px solid;
  width: 640px;
}
.modal-title {
  font-size: 15px;
  font-weight: bold;
}
.modal-body {
  padding: 10px 25px;
  margin-bottom: 20px;
}
.cctv-modal-content {
  background-color: #1a233a;
  width: 640px;
}
.modal-footer {
  border-top: #464d5c 0.5px solid;
}
.main-input {
  border: #464d5c 1px solid;
  border-radius: 3px;
  position: relative;
  margin-bottom: 12px;
  width: 100%;
}

.form-control {
  background-color: #1a233a;
  color: #9fb0d6;
  border: none;
  font-size: 12px;
  font-weight: bold;
  margin-left: 20px;
  width: 80%;
}
.form-control:focus {
  box-shadow: none;
}
label {
  margin-left: 3px;
  font-size: 10px;
  color: #9fb0d6;
}
.label-icon {
  margin-left: 5px;
  position: absolute;
  left: 2px;
  top: 4px;
}
</style>