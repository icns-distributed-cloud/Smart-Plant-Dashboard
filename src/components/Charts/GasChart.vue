<template>
  <!--가스-->

  <div class="box" style="position: absolute; right: 270px">
    <div class="box_title">
      <i class="bi bi-bar-chart-line-fill"></i> 가스 가스 가스!
    </div>
    <!-- <ejs-circulargauge orientation='Horizontal'>
        <e-axes>
            <e-axis minimum=0 maximum=200>
                <e-pointers>
                    <e-pointer :value='value' :animation='animation'></e-pointer>
                </e-pointers>
                <e-ranges> -->
                  <!--
                  <e-range v-for="i in 5" :key="i"
                  :start="gasArray[i-1]" :end="gasArray[i]" startWidth=15 endWidth=15>
                  </e-range>
                  -->
                    <!-- <e-range start=0 end=80 startWidth=15 endWidth=15></e-range>
                    <e-range start=80 end=120 startWidth=15 endWidth=15></e-range>
                    <e-range start=120 end=140 startWidth=15 endWidth=15></e-range>
                    <e-range start=140 end=200 startWidth=15 endWidth=15></e-range>
                </e-ranges>
            </e-axis>
        </e-axes>
    </ejs-circulargauge> -->
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
  name: "GasChart",
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
    infoList: Object,
    
  },
};
</script>

<style>



</style>