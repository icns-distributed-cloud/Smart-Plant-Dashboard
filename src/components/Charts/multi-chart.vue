
<template>
  <!--복합 데이터-->
    <div class="box">
      <div class="box_title">복합 데이터 분석
        <!-- <i v-if="!smallView" class="bi bi-caret-down-fill" style="float: right"
        @click="smallView=true"
        ></i>
        <i  v-if="smallView" id="hide_icon" class="bi bi-caret-up-fill" style="color: white;"
        @click="smallView=false"
        ></i> -->
      </div> -->
      <!-- 복합 데이터 큰 창 -->
      <!-- <div v-if="!smallView" class="large-view-content"> -->
      <div class="title_div"></div>
        <div id="chart">
          <div style="width: 220px; max-height:200px">
   
    </div>
        
      </div>
      </div>

      <!-- 복합 데이터 작은 창 -->
      <!-- <div v-if="smallView" class="small-view-content">
      </div> -->
    <!-- </div> -->

</template>

<script>
// import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";


export default {
  name: "multi-chart",
  components: {
  
  },
}  
</script>

<style>

</style>