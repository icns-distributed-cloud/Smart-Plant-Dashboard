<template>
<form>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">이상 경고값 설정</h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close');"
          ></button>
        </div>

        <form>
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div class="row">
              <div class="col-12">

                <div style="color: white; font-weight: bold; border-radius: 10px; padding: 5px; width: 100px; height: 30px;">
                   {{ sensorTypeName }} 센서</div>
                <div style="color: #9fb0d6; padding: 5px; font-weight: 200;">
                  센서의 이상 경고값 범위를 직접 입력해주세요</div>

                <div class="block-wrapper">
                  <span class="block" v-for="(block, i) in infoList" :key="i"
                  :style="{ backgroundColor: block.color }">
                    {{ block.status }}</span>
                </div>

                <div class="input-wrapper">
                  <input
                    class="input-box"
                    v-for="idx in 6"
                    :key="idx"
                    v-model="newSensor.range[idx-1]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" @click.stop="$emit('edit-range', newSensor);">
            저장
          </button>
          <button type="button" class="btn btn-secondary" @click="$emit('close');">
            닫기
          </button>
        </div>
        </form>
      </div>
    </div>
  </div>
</form>
</template>

<script>
export default {
  data() {
    return {
      infoList: [
            { color: "#5a8dee", status: "안전" },
            { color: "#00cfdd", status: "관심" },
            { color: "#39da8a", status: "주의" },
            { color: "#fdac41", status: "경고" },
            { color: "#ff5b5c", status: "심각" }
        ],
        newSensor: { range: [], ssId: 0, sensorTypeName: "" },
    };
  },
  props: {
    sensor: Object,
    range: Array,
    ssId: Number,
    sensorTypeName: String,
  },
  mounted() {
    this.newSensor.range = this.range.slice();
    this.newSensor.ssId = this.ssId;
    this.newSensor.sensorTypeName = this.sensorTypeName;
  }
};
</script>

<style scoped>
.block-wrapper {
  width: 100%;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  margin: 15px 0px 10px 0px;
}

.block {
  width: 20%;
  text-align: center;
  font-weight: bold;
}

.input-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
}

.input-box {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 50px;
  height: 25px;
  border-radius: 10px;
  text-align: center;
  background-color: #ffffff20;
  color: white;
  font-weight: bold;
  border: none;
}

.input-box:focus {
  outline: none;
  outline: 2px solid #9fb0d6;
}

.modal-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-header {
  background-color: #272e48;
  color: #9fb0d6;
  border-bottom: #464d5c 0.5px solid;
}
.modal-title {
  font-size: 15px;
  font-weight: bold;
}
.modal-body {
  padding: 10px 25px;
  margin-bottom: 20px;
}
.modal-content {
  background-color: #1a233a;
}
.modal-footer {
  border-top: #464d5c 0.5px solid;
}
.main-input {
  border: #464d5c 1px solid;
  border-radius: 3px;
  position: relative;
  margin-bottom: 12px;
  width: 100%;
}

.form-control {
  background-color: #1a233a;
  color: #9fb0d6;
  border: none;
  font-size: 12px;
  font-weight: bold;
  margin-left: 20px;
  width: 80%;
}
.form-control:focus {
  box-shadow: none;
}
label {
  margin-left: 3px;
  font-size: 10px;
  color: #9fb0d6;
}
.label-icon {
  margin-left: 5px;
  position: absolute;
  left: 2px;
  top: 4px;
}
</style>
