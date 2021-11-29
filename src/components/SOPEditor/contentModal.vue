<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">상세 임무 추가 </h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div class="row">
              <div class="col-12">
                <div
                  class="form-label-group position-relative controls"
                >
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
                <div
                  class="form-label-group position-relative  controls"
                >
                  <label for="sensor_pos">문자 기능 사용</label>
                  <div class="main-input">
                    <select
                      v-model="newContent.message"
                      name="message"
                      class="form-control">
                      <option value="0" hidden> 문자 사용 여부 선택</option>
                      <option value= true> 문자 O </option>
                      <option value= false> 문자 X </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative ">
                  <label for="sensor_contact">담당부서(수신인)</label>
                  <div class="main-input">
                    <select :disabled="newContent.message ==false"
                      v-model="newContent.posId"
                      name="posId"
                      class="form-control">
                      <option value="0" hidden>담당부서 선택하세요</option>
                      <option
                        v-for="pos in posList"
                        :key="pos.posId"
                        :value="pos.posId"
                      >
                        {{ pos.posName }}
                      </option>
                    </select>
                    <div class="form-control-position ">
                      <i class="bx bx-street-view"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative ">
                  <label for="messageContent">발송 내용:</label>
                  <div class="main-input" >
                    <input
                      :disabled="newContent.message ==false"
                      type="number"
                      class="form-control"
                      name="messageContent"
                      placeholder="발송 내용을 입력하세요"
                      maxlength="100"
                      v-model="newContent.messageContent"
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
            @click="$emit('add-new-content', newContent);"
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
    name:'contentModal',
  data() {
    return {
      posList: [],
      newContent: {
        message: false,
        messageContent: "",
        posId: 0,
        text: "",
        titleId: 0,
      },
    };
  },
  created() {
    this.getPosInfo();
    
  },
  methods: {
    async getPosInfo() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-pos?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.posList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },
  }
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
input:disabled{
  background-color:#9fb0d6;
}
select:disabled{
  background-color:#9fb0d6;
}
::placeholder{
  color:#9fb0d6;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:#9fb0d6;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color:#9fb0d6;
}
</style>
