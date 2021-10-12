<template>
  <div style="display: flex">
    <ShowCCTV></ShowCCTV>
    <MultiChart></MultiChart>
    <GasChart></GasChart>
    <AlarmLog></AlarmLog>
    <div
      style="
        width: 250px;
        height: 70%;
        right: 30px;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      "
    >
      <DustChart :colorList="colorList"></DustChart>
      <TempChart :colorList="colorList" :temp="90"></TempChart>
      <HumidityChart :colorList="colorList" :humidity="80"></HumidityChart>
    </div>
  </div>
</template>

<script>
import ShowCCTV from "@/components/Charts/ShowCCTV.vue";
import MultiChart from "@/components/Charts/MultiChart.vue";
import GasChart from "@/components/Charts/GasChart.vue";
import AlarmLog from "@/components/Charts/AlarmLog.vue";
import DustChart from "@/components/Charts/DustChart.vue";
import TempChart from "@/components/Charts/TempChart.vue";
import HumidityChart from "@/components/Charts/HumidityChart.vue";

export default {
  name: "Home",
  data() {
    return {
      colorList: ["#5a8dee", "#00cfdd", "#39da8a", "#fdac41", "#ff5b5c"],
    };
  },
  components: {
    ShowCCTV,
    MultiChart,
    GasChart,
    AlarmLog,
    DustChart,
    TempChart,
    HumidityChart,
  },
};
</script>

<style>
.box {
  background-color: #272e4890;
  opacity: 50;
  width: 230px;
  height: 250px;
  padding: 10px;
  overflow: visible;
  position: relative;
  border-radius: 5px;
  text-align: center;
}

.box_title {
  color: white;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 10px;
}

.title_div {
  background-color: white;
  width: 100%;
  height: 1.5px;
  border-radius: 2px;
  opacity: 40;
}

.value_text {
  color: aqua;
  font-size: 40px;
  font-weight: bold;
  position: relative;
}

.dust_circle {
  width: 170px;
  height: 170px;
  border: 9px solid;
  border-radius: 50%;
  border-color: aqua;
  display: inline-flex;
  align-self: center;
  justify-content: center;
  color: aqua;
  font-weight: 8px;
  font-size: 40px;
  text-align: center;
}

.humid {
  width: 150px;
  height: 150px;
  border-radius: 0 50% 50% 50%;
  border: 3px solid black;
  transform: rotate(45deg);
  margin-top: 30px;
  margin-left: 30px;
  border-width: 9px;
  border-color: aqua;
}
</style>
