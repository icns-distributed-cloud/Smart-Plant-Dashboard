<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      이상 감지 이력 | 
    </div>

    <div class="table-main" style="height: fit-content">
      <div>
        <div class="table-main__header">이상 감지 이력</div>

        
        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">
              구역을 선택해주세요
            </div>

            <div>

              <div class="dropdown" style="margin: 10px;">
                <button
                  class="btn  btn-primary  dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ currPos.posName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    @click="getAlarmLog();
                    currPos={ posName: '전체', posId: 0 }"
                  >전체</a>
                  <a
                    v-for="pos in posList"
                    :key="pos.posId"
                    class="dropdown-item"
                    @click="getPosAlarmLog(pos.posId);
                    currPos={posName: pos.posName, posId: pos.posId };"
                  >
                    {{ pos.posName }}
                  </a>
                </div>
              </div>

              <div style="width: 100%; display: flex; justify-content: center;">
              <table class="table table-bordered table-hover" style="width: 95%;">
                <thead>
                  <tr>
                    <th>닐짜</th>
                    <th>시간</th>
                    <th>위치</th>
                    <th>종류</th>
                    <th>레벨</th>
                  </tr>
                </thead>
                <tbody>
                <tr v-for="(alarmLog, i) in alarmLogList" in :key="i">
                    <th>{{ alarmLog.createdAt.split('T')[0].substring(5) }}</th>
                    <th>{{ alarmLog.createdAt.split('T')[1].substring(0,5) }}</th>
                    <th>{{ alarmLog.posName }}</th>
                    <th>{{ alarmLog.typeName }}</th>
                    <th :style="{color: statusList[alarmLog.sensorState][1]}">
                        {{ statusList[alarmLog.sensorState][0] }}
                    </th>
                </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Icon } from "@iconify/vue";
import axios from "axios"

export default {
  name: "EsopManager",
  data() {
    return {
      currPos: { posName: "전체", posId: 0 },
      posList: [],
      alarmLogList: [],
      statusList: [
        ["안전", "#5a8dee"],
        ["관심", "#39da8a"],
        ["주의", "#fdac41"],
        ["경고", "#fdce41"],
        ["심각", "#ff5b5c"],
        ],
    }
  },
  created() {
    this.getSensorPos();
    this.getAlarmLog();
  },
  methods: {
    async getSensorPos() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-pos"
        );
        this.posList = res.data.data.content;
      } catch(err) {
        console.log(err);
      }
    },
    async getPosAlarmLog(posId) {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/abnormal-detection?posId=" + posId
        );
        this.alarmLogList = res.data.data.content;
      } catch(err) {
        console.log(err);
      }
    },

    async getAlarmLog() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/abnormal-detection"
        );
        this.alarmLogList = res.data.data.content;
      } catch(err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>