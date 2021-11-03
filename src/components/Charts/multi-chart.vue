
<template>
  <!--복합 데이터-->
  <div>
    <!-- 복합 데이터 큰 창 -->
    <div class="box" v-if="!smallView">
      <div class="box_title">복합 데이터 분석
        <i class="bi bi-caret-down-fill" style="float: right"
        @click="smallView=true"
        ></i>
      </div>
      <div class="title_div"></div>
    </div>
    <!-- 복합 데이터 작은 창 -->
    <div class="box smallbox" v-if="smallView">
      <div class="box_title">복합 데이터 분석 
      <i class="bi bi-caret-up-fill" style="float: right"
        @click="smallView=false"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "multi-chart",
  data() {
    return {
      smallView: false,
    }
  }
};
</script>

<style>
</style>