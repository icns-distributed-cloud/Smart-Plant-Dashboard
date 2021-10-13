<template>
  <div>CCTV 화면입니다.</div>
  <div >
    <canvas id="video" style="width: 640px; height: 480px;"></canvas>
  </div>
</template>

<script>
import JSMpeg from 'jsmpeg'
export default {
    name: 'CCTV',
  components: {},
  data() {
    return {
    }
  },
  mounted() {
      this.getVideos()
  },

  methods: {
    getVideos(){
      let canvas = document.getElementById('video');
      let url = new WebSocket('ws://163.180.117.40:9999');
      new JSMpeg(url, {canvas: canvas});

    }
  }
}
</script>

<style scoped>

</style>