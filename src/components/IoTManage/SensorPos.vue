<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">센서 위치 등록</div>

    <div class="table-main">
      <div class="table-main__header">센서 배치 장소 선택</div>
      <div style="display: flex">
        <div style="width: 100%; height: 100%">
          <div style="width: 100%; display: flex">
            <div
              v-for="pos in posList"
              :key="pos.posId"
              @click="getPosSensor(pos.posId)"
            >
              {{ pos.posName }}
            </div>
          </div>
        </div>

        <div class="sensor-wrapper">
          <div class="sensor-title">센서 선택</div>

          <div v-for="sensor in sensorList" :key="sensor.ssId">
            <div
              class="corlor-circle"
              :style="{ backgroundColor: sensor.ssType.typeColorCode }"
            ></div>
            <div>{{ sensor.ssName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { Icon } from "@iconify/vue";
export default {
  name: "Sensor",
  data() {
    return {
      posList: [],
      sensorList: [],
    };
  },
  created() {
    this.getSensorPos();
  },
  methods: {
    async getSensorPos() {
      try {
        const res = await axios.get(
          "/api/sensor-pos"
        );
        this.posList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },

    async getPosSensor(posId) {
      try {
        const res = await axios.get(
          "/api/sensor-manage?posId=" + posId
        );
        this.sensorList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },
  },

  components: {},
};
</script>

<style>
.sensor-title {
  color: white;
  font-size: 1.5rem;
}

.sensor-wrapper {
  height: 100%;
  width: 300px;
}

.color-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.wrapper {
  margin: 10px;
}

.table-header {
  color: #727e8c;
  font-size: 20px;
}

</style>
