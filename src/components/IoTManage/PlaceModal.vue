<template>
  <div class="modal-wrapper">
    <div class="modal-dialog" style="max-width: 1000px;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            센싱 장비 위치 관리
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <button
            class="btn btn-primary"
            style="float:right; margin: 10px;"
            @click="addPos = true"
          >
            위치 등록
          </button>
          <AddPlaceModal
            v-if="addPos"
            @add-new-pos="AddPos"
            @close-add-modal="addPos = false"
          >
          </AddPlaceModal>
          <form @submit.prevent="onSubmit">
            <div class="modal-title sub-title">
              <i class="bi bi-diamond-fill"></i> 위치 목록
            </div>
            <!-- 장소 목록 -->
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>위치 이름</th>
                  <th>위치 상세</th>
                  <th>식별 코드</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="sensorPos in sensorPosList"
                  :key="sensorPos.posId"
                  @click="readyToEdit(sensorPos)"
                >
                  <td>
                    <input
                      class="td-input"
                      v-model="sensorPos.posName"
                      :disabled="able != sensorPos.posId"
                    />
                  </td>
                  <td>
                    <input
                      class="td-input"
                      v-model="sensorPos.posDtl"
                      :disabled="able != sensorPos.posId"
                    />
                  </td>
                  <td>
                    <input
                      class="td-input"
                      v-model="sensorPos.posCode"
                      :disabled="able != sensorPos.posId"
                    />
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
                      type="submit"
                      @click="
                        readyToEdit(sensorPos);
                        editSensorPos(sensorPos.posId);
                        alertSuccessfullyModified=true;
                      "
                      ><i class="bx bx-edit"></i> 저장
                    </a>
                    <a
                      class="btn btn-outline-danger tr_data_del"
                      @click="askToDelete = true"
                      @delete="
                        deleteSensorPos(sensorPos.posId);
                        askToDelete = false;
                      "
                      ><i class="bx bx-trash"></i> 삭제</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <!-- footer -->
          <AskToDelete
            v-if="askToDelete"
            @close="askToDelete = false"
            @delete="deleteSensorPos(able)"
          ></AskToDelete>
          <AlertSuccessfullyModified
            v-if="alertSuccessfullyModified"
            @close="alertSuccessfullyModified = false"
          >
          </AlertSuccessfullyModified>
        </div>
        <div class="modal-footer">
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
// eslint-disable-next-line no-unused-vars
import AddPlaceModal from "./AddPlaceModal.vue";
import AskToDelete from "@/views/ask-to-delete.vue";
import AlertSuccessfullyModified from "@/views/alert-successfully-modified.vue";

import axios from "axios";
export default {
  data() {
    return {
      alertSuccessfullyModified: false,
      askToDelete: false,
      posName: "",
      posDtl: "",
      posCode: "",
      sensorPosList: [
        {
          posId: 1,
          posName: "우리집",
          posDtl: "행복한 우리집",
          posCode: "1234",
        },
        { posId: 2, posName: "ICNS", posDtl: "행복한 연구실", posCode: "3569" },
      ],
      page: 1,
      able: 0,
      addPos: false,
    };
  },
  created() {
    this.getSensorPos();
  },
  components: {
    AddPlaceModal,
    AskToDelete,
    AlertSuccessfullyModified,
  },
  methods: {
    AddPos(newPos) {
      this.addSensorPos(newPos.posName, newPos.posDtl, newPos.posCode);
      console.log("add pos");
    },
    async getSensorPos() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-pos?paged=false&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.sensorPosList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },
    async addSensorPos(
      pName = this.posName,
      pDtl = this.posDtl,
      pCode = this.posCode
    ) {
      try {
        const res = await axios.post(
          "http://163.180.117.38:8281/api/sensor-pos",
          {
            posName: pName,
            posDtl: pDtl,
            posCode: pCode,
          }
        );
        console.log(res);

        this.getSensorPos();
      } catch (err) {
        console.log(err);
      }
    },

    readyToEdit(sensorPos) {
      this.able = sensorPos.posId;
      this.posName = sensorPos.posName;
      this.posDtl = sensorPos.posDtl;
      this.posCode = sensorPos.posCode;
      console.log(this.posName);
    },

    async editSensorPos(posId) {
      try {
        const res = await axios.put(
          "http://163.180.117.38:8281/api/sensor-pos/" + posId,
          {
            posName: this.posName,
            posDtl: this.posDtl,
            posCode: this.posCode,
          }
        );
        console.log(res);
        this.getSensorPos();
        this.$emit('modified');
      } catch (err) {
        console.log(err);
        console.log("tttt");
      }
    },
    async deleteSensorPos(posId) {
      try {
        const res = await axios.delete(
          "http://163.180.117.38:8281/api/sensor-pos/" + posId
        );
        console.log(res);
        this.getSensorPos();
      } catch (err) {
        console.log(err);
      }
    },
  },
  rules: {
    "no-unused-vars": "off",
  },
};
</script>

<style scoped>
.td-input {
  background-color: #00000000;
  border-color: #00000000;
  color: white;
  font-size: 15px;
  text-align: center;
}

.td-input:focus {
  outline: none;
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

.sub-title {
  color: #9fb0d6;
  padding: 20px;
}
</style>
