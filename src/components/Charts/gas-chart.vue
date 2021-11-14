<template>
  <!--가스-->
  <div class="box">
    <div class="box_title">
      <i class="bi bi-clouds"></i> 가스
      <i
        v-if="!smallView"
        class="bi bi-caret-down-fill"
        id="hide_icon"
        style="float: right"
        @click="smallView = true"
      ></i>
      <i
        v-if="smallView"
        id="hide_icon"
        class="bi bi-caret-up-fill"
        style="color: white;"
        @click="smallView = false"
      ></i>
    </div>

    <div v-if="!smallView" class="large_view_content">
      <div class="gauge" style="position: relative; top: -125px;">
        <ejs-circulargauge background="#FFFFFF00">
          <e-axes>
            <e-axis :minimum="0" :maximum="100">
              <e-pointers>
                <e-pointer
                  :value="value"
                  :animation="animation"
                  color="#1a233a"
                ></e-pointer>
              </e-pointers>
              <e-ranges>
                <e-range
                  :start="0"
                  :end="10"
                  :color="red"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
                <e-range
                  :start="10"
                  :end="20"
                  :color="blue"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
                <e-range
                  :start="20"
                  :end="40"
                  :color="green"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
                <e-range
                  :start="40"
                  :end="60"
                  :color="yellow"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
                <e-range
                  :start="60"
                  :end="100"
                  :color="purple"
                  startWidth="15"
                  endWidth="15"
                ></e-range>
              </e-ranges>
            </e-axis>
          </e-axes>
        </ejs-circulargauge>
      </div>
      <div id="gas" class="value_text" style="top: -330px;">{{ value }}</div>
    </div>

    <div v-if="smallView" class="small_view_content">
      <div class="small_status" :style="{ backgroundColor: color }">
        <div>{{ value }}<span style="font-size: 12px"> ppm</span></div>
        <div style="font-weight: lighter;">|</div>
        <div>{{ status }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective,
} from "@syncfusion/ej2-vue-circulargauge";

export default {
  name: "gas-chart",

  components: {
    "ejs-circulargauge": CircularGaugeComponent,
    "e-axes": AxesDirective,
    "e-axis": AxisDirective,
    "e-pointers": PointersDirective,
    "e-pointer": PointerDirective,
    "e-ranges": RangesDirective,
    "e-range": RangeDirective,
  },

  data: function() {
    return {
      smallView: false,
      animation: { enable: false },
      majorTicks: { width: 1, color: "#5a8dee" },
    };
  },

  props: {
    value: {
      type: Number,
      default: 10,
    },
    color: {
      type: String,
      default: "5a8dee"
    },
    icon: {
      type: String,
      default: "<i class='bi bi-emoji-laughing-fill'></i>"
    },
    status: {
      type: String,
      default: "안전",
    }
  },
};
</script>

<style>
#gas {
  color: v-bind(color);
  border-color: v-bind(color);
}
</style>
