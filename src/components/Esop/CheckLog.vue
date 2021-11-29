<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      체크 기록 | 
    </div>

    <div class="table-main">
      <div>
        <div class="table-main__header">체크 기록</div>
      </div>

      <div style="width: 100%; display: flex; justify-content: center;">
        <table class="table table-bordered table-hover" style="width: 95%;">
          <thead>
            <tr>
              <th>내용</th>
              <th>관리자</th>
              <th>상황</th>
              <th>레벨</th>
              <th>체크 날짜</th>
              <th>체크 시간</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="checkLog in checkLogList" in :key="checkLog.id">
            <th>{{ checkLog.text }}</th>
            <th>{{ checkLog.user }}</th>
            <th>{{ checkLog.situation }}</th>
            <th>{{ levelList[checkLog.level] }}</th>
            <th>{{ checkLog.createdAt.split('T')[0].substring(5) }}</th>
            <th>{{ checkLog.createdAt.split('T')[1].substring(0,5) }}</th>
          </tr>
          </tbody>
        </table>
        </div>
    </div>
  </div>
</template>

<script>
// import { Icon } from "@iconify/vue";
import axios from "axios";

export default {
  name: "CheckLog",
  data() {
    return  {
        checkLogList: [],
        levelList: [ "안전", "관심", "주의", "경고", "심각" ],
    }
  },
  created() {
    this.getCheckLog();
  },
  methods: {
    async getCheckLog() {
      try {
        const res = await axios.get(
          'http://163.180.117.38:8281/api/e-sop/check-log'
        )
        this.checkLogList = res.data.data;
      } catch (err) {
        console.log(err);
      }

    }
  }
};
</script>

<style>

</style>
