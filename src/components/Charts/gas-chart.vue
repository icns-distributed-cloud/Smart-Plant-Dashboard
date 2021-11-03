<template>
  <!--가스-->
  <div class="box">
    <div class="box_title">
      <i class="bi bi-bar-chart-line-fill"></i> 가스
    </div>
    <div class="gauge" style="position: relative; top: -125px;">
    <ejs-circulargauge background="#FFFFFF00">
        <e-axes>
            <e-axis :minimum="rangeArray[0]" :maximum="rangeArray[5]" >
                <e-pointers>
                    <e-pointer :value='value' :animation='animation' color="#1a233a"></e-pointer>
                </e-pointers>
                <e-ranges>
                    <e-range :start="rangeArray[0]" :end="rangeArray[1]" :color="infoList[0].color" startWidth=15 endWidth=15></e-range>
                    <e-range :start="rangeArray[1]" :end="rangeArray[2]" :color="infoList[1].color" startWidth=15 endWidth=15></e-range>
                    <e-range :start="rangeArray[2]" :end="rangeArray[3]" :color="infoList[2].color" startWidth=15 endWidth=15></e-range>
                    <e-range :start="rangeArray[3]" :end="rangeArray[4]" :color="infoList[3].color" startWidth=15 endWidth=15></e-range>
                    <e-range :start="rangeArray[4]" :end="rangeArray[5]" :color="infoList[4].color" startWidth=15 endWidth=15></e-range>
                </e-ranges>
            </e-axis>
        </e-axes>
    </ejs-circulargauge>
    </div>
    <div id="gas" class="value_text" style="top: -330px;">{{ value }}</div>
  </div>
</template>

<script>

import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-vue-circulargauge'


export default {
  name: "gas-chart",
  
  components: {
    'ejs-circulargauge' : CircularGaugeComponent,
    'e-axes' : AxesDirective,
    'e-axis' : AxisDirective,
    'e-pointers': PointersDirective,
    'e-pointer' : PointerDirective,
    'e-ranges' : RangesDirective,
    'e-range' : RangeDirective
  },

  data: function () {
      return {
        color: "#5a8dee",
        icon: "<i class='bi bi-emoji-laughing-fill'></i>",
        status: "안전",
        infoList: [
        {
          color: "#5a8dee",
          status: "안전",
          icon: "<i class='bi bi-emoji-laughing-fill'></i>",
        },
        {
          color: "#00cfdd",
          status: "관심",
          icon: "<i class='bi bi-emoji-smile-fill'></i>",
        },
        {
          color: "#39da8a",
          status: "주의",
          icon: "<i class='bi bi-emoji-neutral-fill'></i>",
        },
        {
          color: "#fdac41",
          status: "경고",
          icon: "<i class='bi bi-emoji-frown-fill'></i>",
        },
        {
          color: "#ff5b5c",
          status: "심각",
          icon: "<i class='bi bi-exclamation-triangle-fill'></i>",
        },
      ],
      animation: { enable: false },
      majorTicks: { width: 1, color: "#5a8dee" },
      }},


  props: {
    value: {
      type: Number,
      default: 10,
    },
    rangeArray: {
      type: Array,
      default: () => {
        return [0, 30, 50, 70, 100, 200];
      },
    },    
  },

  watch: {
  value: function () {
      var d = this.value;
      for (var i = 0; i < 5; i++) {
        if (d >= this.rangeArray[i] && d < this.rangeArray[i + 1]) {
          this.color = this.infoList[i].color;
          this.icon = this.infoList[i].icon;
          this.status = this.infoList[i].status;
          break;
        }
      }
    }
  }
};
</script>

<style>
#gas {
  color: v-bind(color);
  border-color: v-bind(color);
}
</style>