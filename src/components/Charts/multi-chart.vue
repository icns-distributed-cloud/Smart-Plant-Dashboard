
<template>
  <!--복합 데이터-->
    <div class="box">
      <div class="box_title">복합 데이터 분석
        <i v-if="!smallView" class="bi bi-caret-down-fill" style="float: right"
        @click="smallView=true"
        ></i>
        <i  v-if="smallView" id="hide_icon" class="bi bi-caret-up-fill" style="color: white;"
        @click="smallView=false"
        ></i>
      </div>
      <!-- 복합 데이터 큰 창 -->
      <div v-if="!smallView" class="large-view-content">
      <div class="title_div"></div>
        <div id="chart">
          <div style="width: 220px; max-height:200px">
    <vue3-chart-js v-bind="{ ...barChart }" />
    </div>
        
      </div>
      </div>

      <!-- 복합 데이터 작은 창 -->
      <div v-if="smallView" class="small-view-content">
      </div>
    </div>

</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";


export default {
  name: "multi-chart",
  components: {
    Vue3ChartJs
  
  },
  setup() {
    const barChart = {
      type: "radar",
      options: {
        min: 0,
        max: 4,
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        // scales: {
        //   y: {
        //     min: -100,
        //     max: 100,
        //     ticks: {
        //       callback: function (value) {
        //         return `${value}%`;
        //       },
        //     },
        //   },
        // },
      },
      data: {
        labels: [
          "온도",
          "습도",
          "먼지",
          "가스",
          
        ],
        datasets: [
          {
            label: "1구역",
            data: [
              4,
              5,
              1,
              3, 
            ],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "2구역",
            data: [
              2,
              4,
              4,
              5,
            ],
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
          
        ],
      },
    };

    return {
      barChart,
    };
  },
  
  
};
</script>

<style>
</style>