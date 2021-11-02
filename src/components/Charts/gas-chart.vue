<template>
  <!--가스-->

  <div class="box" style="position: absolute; right: 270px">
    <div class="box_title">
      <i class="bi bi-bar-chart-line-fill"></i> 가스 가스 가스!
    </div>
    <div class="gauge" style="position: relative; top: -125px;">
    <ejs-circulargauge background="#FFFFFF00">
        <e-axes>
            <e-axis :minimum="gasArray[0]" :maximum="gasArray[5]" >
                <e-pointers>
                    <e-pointer :value='value' :animation='animation' color="#1a233a"></e-pointer>
                </e-pointers>
                <e-ranges>
                    <e-range :start="gasArray[0]" :end="gasArray[1]" :color="infoList[0].color" startWidth=15 endWidth=15></e-range>
                    <e-range :start="gasArray[1]" :end="gasArray[2]" :color="infoList[1].color" startWidth=15 endWidth=15></e-range>
                    <e-range :start="gasArray[2]" :end="gasArray[3]" :color="infoList[2].color" startWidth=15 endWidth=15></e-range>
                    <e-range :start="gasArray[3]" :end="gasArray[4]" :color="infoList[3].color" startWidth=15 endWidth=15></e-range>
                    <e-range :start="gasArray[4]" :end="gasArray[5]" :color="infoList[4].color" startWidth=15 endWidth=15></e-range>

                </e-ranges>
            </e-axis>
        </e-axes>
    </ejs-circulargauge>
    </div>


    <div class="value_text" style="top: -330px;">{{ gas }}</div>
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
        value: 90,
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
    gas: {
      type: Number,
      default: 10,
    },
    gasArray: {
      type: Array,
      default: () => {
        return [0, 30, 50, 70, 100, 200];
      },
    },    
  },
};
</script>

<style>



</style>