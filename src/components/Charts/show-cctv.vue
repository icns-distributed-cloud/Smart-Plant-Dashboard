<template>
  <!--CCTV-->
  <div class="box" style="width: 300px; height:300px;">
    <div class="box_title">영상 분석</div>
    <div class="title_div">
      <canvas id="test-cctv" style="width: 320px; height: 240px;"></canvas>
    </div>
  </div>
</template>

<script>
// import JSMpeg from "jsmpeg";
export default {
  name: "ShowCCTV",
  components: {},
  data() {
    return {};
  },
  mounted() {
    // let canvas = document.getElementById("test-cctv");
    // let url = new WebSocket("ws://163.180.117.40:9999");
    // new JSMpeg(url, { canvas: canvas });
  },
  methods: {},
};
</script>

<style></style>
