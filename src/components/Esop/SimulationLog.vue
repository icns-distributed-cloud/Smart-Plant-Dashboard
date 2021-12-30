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

        <nav aria-label="Page navigation example" style="float: right">
          <ul class="pagination">
            <li
              v-for="i in totalPages"
              :key="i"
              @click="getCheckLog(i - 1)"
              class="page-item"
            >
              <span class="page-link">{{ i }}</span>
            </li>

            <!--
        <li class="page-item">
          <a class="page-link cur-page" href="#">1</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>'
        -->
          </ul>
        </nav>
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
        totlaPages: 0,
    }
  },
  created() {
    this.getCheckLog();
  },
  methods: {
    async getCheckLog(page = 0) {
      try {
        const res = await axios.get(
          '/api/e-sop/check-log?page=' + page +
            "&size=5&sort.sorted=true"
        )
        this.checkLogList = res.data.data.content;
        this.totalPages = res.data.data.totalPages;
        
      } catch (err) {
        console.log(err);
      }

    }
  }
};
</script>

<style>

</style>
