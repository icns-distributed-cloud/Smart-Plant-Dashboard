<template>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>식별번호</th>
        <th>센싱 장비 종류</th>
        <th>
            <div style="display: flex; justify-content: space-around;">
            <span v-for="(block, k) in infoList" :key="k"
            :style="{color: block.color}">
                {{ block.status }}
            </span>
            </div>

        </th>
        <th>기타 정보</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(sensor, i) in sensorInfo" :key="i">
        <td>{{ sensor.id }}</td>
        <td>{{ sensor.type }}</td>
        <td >
            <div class="range">
                <span v-for="(block, j) in infoList" :key="j"
                class="range-elem" :style="{backgroundColor: block.color}">
                <!--{{ block.status }}--> </span>
            </div>
            <div  class="range-text-box">
                <span v-for="(value, k) in sensor.range" :key="k"
                class="range-text">{{ value }}
                </span>
            </div>
        </td>
        <td
          style="
            padding-top: 2px;
            padding-right: 0px;
            padding-left: 0px;
            padding-bottom: 2px;
            text-align: center;
          "
        >
          <a class="btn btn-outline-primary mod-btn"
          @click="$emit('open-edit-modal', sensor)"
            ><i class="bx bx-edit"></i> 수정
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "SensorChart",
  data() {
    return {
        infoList: [
            { color: "#5a8dee", status: "안전" },
            { color: "#00cfdd", status: "관심" },
            { color: "#39da8a", status: "주의" },
            { color: "#fdac41", status: "경고" },
            { color: "#ff5b5c", status: "심각" }
        ]
    };
  },
  props: {
    sensorInfo: Object,
  },

};
</script>

<style>

.range {
    width : 100%;
    height: 10px;
    background-color: aqua;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
}

.range-elem {
    width : 20%;
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

</style>