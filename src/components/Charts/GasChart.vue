<template>
  <!--가스-->

  <div class="box" style="position: absolute; right: 270px">
    <div class="box_title">
      <i class="bi bi-bar-chart-line-fill"></i> 가스 가스 가스!
    </div>
    <div class="cloud"></div>
    <div class="value_text">{{ gas }}</div>
  </div>
</template>

<script>
export default {
  name: "GasChart",

  props: {
    gas: {
      type: Number,
      default: 10,
    },
    gasArray: {
      type: Array,
      default: () => {
        return [50, 100, 110, 120, 130, 150];
      },
    },
    // infoList: Object,
  },
};
</script>

<style>
.cloud {
  width: 200px;
  height: 150px;
  border-radius: 0 0 50px 50px;
  background:
  /*                radius                            position  / 2xradius*/ radial-gradient(
        35px 30px,
        red 98%,
        transparent 100%
      )
      20% 30% /70px 60px,
    radial-gradient(50px 45px, aqua 98%, transparent 100%) 50% 50% /100px 90px,
    radial-gradient(50px, aqua 98%, transparent 100%) 100% 100%/100px 100px,
    radial-gradient(40px, aqua 98%, transparent 100%) 0 100% /80px 80px,
    /* base of the cloud */ linear-gradient(aqua, aqua) bottom/100% 40px;
  background-repeat: no-repeat;
}
</style>