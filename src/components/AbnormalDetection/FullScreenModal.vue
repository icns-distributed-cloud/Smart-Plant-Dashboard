<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button
              type="button"
              class="btn-close btn-close-white close"
              aria-label="Close"
              v-on:click=" $emit('close');"
          ></button>
          <div class="modal-body" v-bind:key="this.childCanvasId">
            {{this.childCanvasId}}
            <canvas :id=this.childCanvasId style="width: 640px; height: 480px;"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JSMpeg from "jsmpeg";
export default {
  name: "FullScreenModal",
  props: ["childCanvasId","childWebsocketURL"],

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
  mounted() {
    this.webSocketStreaming();
  },
  unmounted() {
    this.disconnect2();
  },

  methods : {
    webSocketStreaming: function(){
      this.canvasView = document.getElementById(this.childCanvasId);
      this.url2 = new WebSocket(this.childWebsocketURL);
      new JSMpeg(this.url2, {canvas:this.canvasView});
    },
    disconnect2: function(){
      this.url2.close(1000);
    }
  },

}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-header {
  background-color: #272e48;
  color: #9fb0d6;
  border-bottom: #464d5c 0.5px solid;
}
.modal-title {
  font-size: 15px;
  font-weight: bold;
}
.modal-body {
  padding: 10px 25px;
  margin-bottom: 20px;
}
.modal-content {
  background-color: #1a233a;
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