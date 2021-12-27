<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">센서 데이터 기록 |</div>

    <div class="table-main" style="height: fit-content">
      <div>
        <div class="table-main__header">센서 데이터 기록</div>

        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">구역을 선택해주세요</div>

            <div>
              <div class="dropdown" style="margin: 10px">
                <button
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ currPos.posName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    v-for="pos in posList"
                    :key="pos.posId"
                    class="dropdown-item"
                    @click="
                      getPosSensorDataLog(pos.posId);
                      currPos = { posName: pos.posName, posId: pos.posId };
                    "
                  >
                    {{ pos.posName }}
                  </a>
                </div>
              </div>

              <div
                style="
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  overflow: auto;
                  height: 600px;
                "
              >
                <table
                  class="table table-bordered table-hover"
                  style="height: 100%"
                >
                  <thead>
                    <tr>
                      <th>닐짜</th>
                      <th>시간</th>
                      <th>위치</th>
                      <th>종류</th>
                      <th>데이터 값</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="sensorData in sensorDataLogList"
                      in
                      :key="sensorData.dataId"
                    >
                      <td>
                        {{ sensorData.createdAt.split("T")[0].substring(5) }}
                      </td>
                      <td>
                        {{ sensorData.createdAt.split("T")[1].substring(0, 5) }}
                      </td>
                      <td>{{ currPos.posName }}</td>
                      <td>
                        {{ sensorData.sensorManage.ssType.typeName }}
                      </td>
                      <td>{{ sensorData.inputData }}</td>
                      <td
                        :style="{
                          color: statusList[sensorData.sensorState].color,
                        }"
                      >
                        {{ statusList[sensorData.sensorState].name }}
                      </td>
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
import axios from "axios";

export default {
  name: "EsopManager",
  data() {
    return {
      currPos: { posName: "전체", posId: 0 },
      posList: [],
      typeList: [],
      sensorDataLogList: [],
      statusList: [
        { status: 1, name: "안전", color: "#5a8dee" },
        { status: 2, name: "관심", color: "#39da8a" },
        { status: 3, name: "주의", color: "#fdac41" },
        { status: 4, name: "경고", color: "#fdce41" },
        { status: 5, name: "심각", color: "#ff5b5c" },
      ],
    };
  },
  created() {
    this.getSensorPos();
    this.getPosSensorDataLog();
    this.clearSensorData();
  },
  methods: {
    async getSensorPos() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-pos"
        );
        this.posList = res.data.data.content;
        this.currPos.posName = res.data.data.content[0].posName;
        this.currPos.posId = res.data.data.content[0].posId;
      } catch (err) {
        console.log(err);
      }
    },
    async getPosSensorDataLog(posId = 1) {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-data?posId=" + posId
        );
        this.sensorDataLogList = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async clearSensorData() {
      try {
        await axios.delete("http://163.180.117.38:8281/api/sensor-data/clear");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
