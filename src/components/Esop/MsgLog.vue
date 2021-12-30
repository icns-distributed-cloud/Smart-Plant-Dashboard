<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      문자메시지 기록 | 
    </div>

    <div class="table-main">
      <div>
        <div class="table-main__header">문자메시지 기록</div>
      </div>

      <div style="width: 100%; display: flex; justify-content: center;">
        <table class="table table-bordered table-hover" style="width: 95%;">
          <thead>
            <tr>
              <th>발신자</th>
              <th>내용</th>
              <th>수신자</th>
              <th>발송 여부</th>
              <th>발송 날짜</th>
              <th>발송 시간</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="msgLog in msgLogList" in :key="msgLog.id">
            <th>{{ msgLog.sender }}</th>
            <th>{{ msgLog.text }}</th>
            <th>{{ msgLog.receiver }}</th>
            <th>
              <span v-if="msgLog.send">O</span>
              <span v-else>X</span>
            </th>
            <th>{{ msgLog.createdAt.split('T')[0].substring(5) }}</th>
            <th>{{ msgLog.createdAt.split('T')[1].substring(0,5) }}</th>
          </tr>
          </tbody>
        </table>
        </div>
    </div>

    <nav aria-label="Page navigation example" style="float: right">
      <ul class="pagination">
        <li
          v-for="i in totalPages"
          :key="i"
          @click="getMsgLog(i - 1)"
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
</template>

<script>
// import { Icon } from "@iconify/vue";
import axios from "axios";

export default {
  name: "MsgLog",
  data() {
    return  {
      msgLogList: [],
      totalPages: 0,
    }
  },
  created() {
    this.getMsgLog();
  },
  methods: {
    async getMsgLog(page = 0) {
      try {
        const res = await axios.get(
          '/api/message/log?page=' + page +
            "&size=5&sort.sorted=true"
        )
        this.msgLogList = res.data.data;
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
