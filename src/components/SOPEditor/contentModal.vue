<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">상세 임무 추가</h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-body" style="margin-top: 10px">
            <div class="row">
              <div class="col-12">
                <div class="form-label-group position-relative controls"></div>
              </div>
              <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">상세 임무 내용:</label>
                  <div class="main-input">
                    <input
                      name="sensor_pos"
                      class="form-control"
                      placeholder="상세 임무를 입력하세요"
                      v-model="newContent.text"
                    />
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">기능</label>
                  <div class="main-input">
                    <select
                      v-model="newContent.efunction"
                      name="efunction"
                      class="form-control"
                    >
                      <option value=0>없음</option>
                      <option value=1>문자 </option>
                      <option value=2>이메일 </option>
                      <option value=3>내부방송 </option>
                      <option value=4> BIM </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="col-12" v-if="newContent.efunction ==1 ||newContent.efunction ==2">
                <div class="form-label-group position-relative">
                  <label for="sensor_contact">담당부서(수신인)</label>
                  <div class="main-input">
                    <select
                      :disabled="newContent.efunction == 0|| newContent.efunction == 3 ||newContent.efunction ==4"
                      v-model="newContent.posId"
                      name="posId"
                      class="form-control"
                    >
                      <option value="0" hidden>담당부서 선택하세요</option>
                      <option
                        v-for="pos in posList"
                        :key="pos.posId"
                        :value="pos.posId"
                      >
                        {{ pos.posName }}
                      </option>
                    </select>
                    <div class="form-control-position">
                      <i class="bx bx-street-view"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12" v-if="newContent.efunction ==1 ||newContent.efunction ==2">
                <div class="form-label-group position-relative">
                  <label for="messageContent">문자 이메일 발송 내용:</label>
                  <div class="main-input">
                    <input
                      :disabled="newContent.efunction == 0"
                      class="form-control"
                      name="messageContent"
                      placeholder="발송 내용을 입력하세요"
                      maxlength="100"
                      v-model="newContent.info"
                    />
                  </div>
                </div>
              </div>

              <div class="col-12" v-if="newContent.efunction ==3">
                <div class="form-label-group position-relative">
                  <label for="sensor_contact">방송 내용</label>
                  <div class="main-input">
                    <input
                      :disabled="newContent.efunction == 0"
                      class="form-control"
                      name="messageContent"
                      placeholder="방송 내용를 입력하세요"
                      maxlength="100"
                      v-model="newContent.info"
                    />
                  </div>
                </div>
              </div>

              <div class="col-12" v-if="newContent.efunction ==4">
                <div class="form-label-group position-relative">
                  <label for="sensor_contact">URL 링크</label>
                  <div class="main-input">
                    <input
                      :disabled="newContent.efunction == 0"
                      class="form-control"
                      name="messageContent"
                      placeholder="URL 링크를 입력하세요"
                      maxlength="100"
                      v-model="newContent.info"
                    />
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('add-new-content', newContent)"
          >
            저장
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "contentModal",
  data() {
    return {
      posList: [],
      newContent: {
        efunction:0,
        info: "",
        posId: 0,
        text: "",
        titleId: 0,
      },
    };
  },
  props: {
    titleId: Number,
  },
  mounted() {
    this.getPosInfo();
    this.newContent.titleId = this.titleId;
  },
  created() {
    this.getPosInfo();
  },
  methods: {
    async getPosInfo() {
      try {
        const res = await axios.get(
          "/api/sensor-pos?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.posList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
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
  width: 100%;
  margin: 0;
}
.form-control:focus {
  box-shadow: none;
  background-color: #1a233a;
  color: #9fb0d6;
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
select.form-control:not([size]):not([multiple]) {
  height: auto !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input:disabled {
  background-color: rgb(92 101 125 / 52%);
  color: #a1a3a7a1;
}
select:disabled {
  background-color: rgb(92 101 125 / 52%);
  color: #a1a3a7a1;
}
::placeholder {
  color: #a1a3a7a1;
}
::placeholder {
  color: #a1a3a7a1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #a1a3a7a1;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #a1a3a7a1;
}

.main-input {
  padding: 0;
}
</style>
