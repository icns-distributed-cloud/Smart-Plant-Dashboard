<template>
  <div>
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />

    <div class="wrapper">
      <div class="table-header">
        이상 경고 설정 | <Icon icon="bx:bx-home-alt" />
      </div>

      <div class="table-main">
        <div>
          <div class="table-main__header">이상 경고 설정</div>

          <div>
            <div class="table-main__content">
              <div class="table-main__content-intro">
                {{ posName }} 구역의 센서 이상 경고 설정
              </div>

              <div class="dropdown" style="margin: 10px;">
                <button
                  class="btn  btn-primary  dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ posName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    v-for="pos in ssPosList"
                    :key="pos.posId"
                    class="dropdown-item"
                    @click="selectedPos(pos.posId, pos.posName)"
                  >
                    {{ pos.posName }}s
                  </a>
                </div>
              </div>

              <div>
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>식별번호</th>
                      <th>센싱 장비 종류</th>
                      <th>
                        <div
                          style="display: flex; justify-content: space-around;"
                        >
                          <span
                            v-for="(block, k) in infoList"
                            :key="k"
                            :style="{ color: block.color }"
                          >
                            {{ block.status }}
                          </span>
                        </div>
                      </th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="sensor in ssRangeList" :key="sensor.ssId">
                      <td>{{ sensor.ssCode }}</td>
                      <td>{{ sensor.sensorTypeName }}</td>
                      <td>
                        <div class="range">
                          <span
                            v-for="(block, j) in infoList"
                            :key="j"
                            class="range-elem"
                            :style="{ backgroundColor: block.color }"
                          >
                            <!--{{ block.status }}-->
                          </span>
                        </div>
                        <div class="range-text-box">
                          <span
                            v-for="(value, k) in sensor.range"
                            :key="k"
                            class="range-text"
                            >{{ value }}
                          </span>
                        </div>
                      </td>
                      <td
                        style="
                        vertical-align: middle;
                        padding-right: 0px;
                        padding-left: 0px;
                        
                        text-align: center;
                      "
                      >
                        <a
                          class="btn btn-outline-primary mod-btn"
                          @click="
                            readyToEdit(
                              sensor.range,
                              sensor.ssId,
                              sensor.sensorTypeName
                            )
                          "
                          ><i class="bx bx-edit"></i> 수정
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example" style="float: right">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only"></span>
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link cur-page" href="#">1</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only"></span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SettingModal
      v-if="show"
      @close="show = false"
      @edit-range="editRange"
      :range="range"
      :ssId="ssId"
      :sensorTypeName="sensorTypeName"
    ></SettingModal>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";
import SettingModal from "@/components/AbnormalDetection/SettingModal";

export default {
  name: "AlertSettings",
  data() {
    return {
      mySensor: { range: [], ssId: 0, sensorTypeName: "" },
      range: [],
      ssId: 0,
      posId: 0,
      posName: "ICNS",
      sensorTypeName: "",
      infoList: [
        { color: "#5a8dee", status: "안전" },
        { color: "#00cfdd", status: "관심" },
        { color: "#39da8a", status: "주의" },
        { color: "#fdac41", status: "경고" },
        { color: "#ff5b5c", status: "심각" },
      ],
      sensor: { id: 1, type: "anything", range: [90, 100, 120, 150, 170] },
      show: false,
      ssRangeList: [],
      ssPosList: [],
    };
  },
  components: {
    Icon,
    SettingModal,
  },
  mounted() {
    this.getPosInfo();
    this.getRangeInfo();
  },
  methods: {
    selectedPos(posId, posName) {
      this.getRangeInfo(posId);
      this.posName = posName;
    },
    readyToEdit(range, ssId, sensorTypeName) {
      this.range = range;
      this.ssId = ssId;
      this.sensorTypeName = sensorTypeName;
      this.show = true;
    },
    showEdit(sensor) {
      this.sensor = sensor;
      this.show = true;
    },

    async getPosInfo() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-pos?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.ssPosList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },
    async getRangeInfo(posId = 1) {
      this.ssRangeList = [];
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-range?pageNumber=1&pageSize=1&paged=false&posId=" +
            posId +
            "&sort.sorted=true&sort.unsorted=false"
        );

        for (var item of res.data.data.content) {
          var temp = {};
          temp.ssId = item.ssId;
          temp.sensorTypeName = item.sensorTypeName;
          temp.sensorPosId = item.sensorPosId;
          temp.ssCode = item.ssCode;
          temp.range = [];
          temp.range.push(item.rstart);
          temp.range.push(item.rlev1);
          temp.range.push(item.rlev2);
          temp.range.push(item.rlev3);
          temp.range.push(item.rlev4);
          temp.range.push(item.rend);
          this.ssRangeList.push(temp);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editRange(newSensor) {
      console.log(newSensor);
      try {
        const res = await axios.put(
          "http://163.180.117.38:8281/api/sensor-range/" + newSensor.ssId,
          {
            rstart: newSensor.range[0],
            rlev1: newSensor.range[1],
            rlev2: newSensor.range[2],
            rlev3: newSensor.range[3],
            rlev4: newSensor.range[4],
            rend: newSensor.range[5],
          }
        );
        this.show = false;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.range {
  width: 100%;
  height: 10px;
  background-color: aqua;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
}

.range-elem {
  width: 20%;
  height: 20px;
  font-size: 15px;
  font-weight: bold;
  color: black;
}

.range-text-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.range-text {
  color: white;
  font-size: 15px;
  font-weight: bold;
}

.wrapper {
  margin: 10px;
}

.table-header {
  color: #727e8c;
  font-size: 20px;
}
.table {
  color: #464d5c;
}
.table-main {
  margin: 20px;
  background-color: #272e48;
  color: #bdd1f8;
  border-radius: 9px;
  height: 600px;
}
.table-main__header {
  padding: 20px;
  font-size: 20px;
}

.table-main__content {
  margin: 0 20px;
  color: #8a99b5;
}
table-main__content-intro {
  color: #8a99b5;
}
table {
  text-align: center;
}
.table.table-bordered th {
  border: 2px solid #464d5c;
  color: #bdd1f8;
  font-size: 15px;
}
tbody td,
.table tbody th {
  border-color: #464d5c;
  color: #8a99b5;
  font-size: 20px;
  font-weight: bold;
}
thead > tr,
tfoot > tr {
  height: 60px;
  vertical-align: middle;
}
.mod-btn {
  margin-right: 5px;
}
.btn-outline-danger,
.mod-btn {
  color: white;
}
.bx {
  color: #7c8ba6;
}
.table-hover:hover tbody tr:hover td {
  color: white;
  background-color: #244a63;
}
nav {
  border: none;
}
.btn-primary {
  background-color: #5a8dee !important;
  font-weight: 600;
  border: #5a8dee 1px solid;
}
.page-link {
  border: #7c8ba6 2px solid;
  color: #7c8ba6;
  background-color: #1a233a;
}
.cur-page {
  background-color: #5a8ded;
  color: white;
}
</style>
