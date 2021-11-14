<template>
  <div class="modal-wrapper">
    <div class="modal-dialog" style="max-width: 1000px;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            센싱 장비 종류 관리
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
            @click="addType = true"
          >
            종류 등록
          </button>
          <AddTypeModal
            v-if="addType"
            @add-new-type="AddType"
            @close-add-modal="addType = false"
          >
          </AddTypeModal>
          <form @submit.prevent="onSubmit">
            <div class="modal-title sub-title">
              <i class="bi bi-diamond-fill"></i> 종류 목록
            </div>
            <!-- 종류 목록 -->
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>종류 이름</th>
                  <th>종류 상세</th>
                  <th>식별 코드</th>
                  <th>색상 코드</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="sensorType in sensorTypeList"
                  :key="sensorType.typeId"
                  @click="readyToEdit(sensorType)"
                >
                  <td>
                    <div>{{ sensorType.typeName }}</div>
                  </td>
                  <td>
                    <div>{{ sensorType.typeDtl }}</div>
                  </td>
                  <td>
                    <div>{{ sensorType.typeCode }}</div>
                  </td>
                  <td>
                    <input
                      style="vertical-align: middle;"
                      class="td-input"
                      type="color"
                      v-model="sensorType.typeColorCode"
                      :disables="able != sensorType.typeColorCode"
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
                      @click="
                        currType=sensorType;
                        editType=true;
                      "
                      ><i class="bx bx-edit"></i> 수정
                    </a>
                    <a
                      class="btn btn-outline-danger tr_data_del"
                      @click="askToDelete = true; able = sensorType.typeId"
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
            @delete="
              deleteSensorType(able);
              askToDelete = false;
            "
          ></AskToDelete>
          <AlertSuccess
            v-if="alertSuccess"
            :action="action"
            @close="alertSuccess=false"
          >
          </AlertSuccess>
          <AlertFail
            v-if="alertFail"
            :action="action"
            @close="alertFail=false"
          ></AlertFail>
          <EditTypeModal
            v-if="editType"
            :currType="currType"
            @close-edit-modal="editType=false"
            @edit="editSensorType"
          >
          </EditTypeModal>
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
import AddTypeModal from "./AddTypeModal.vue";
import EditTypeModal from "./EditTypeModal.vue";
import AskToDelete from "@/views/ask-to-delete.vue";
import AlertSuccess from "@/views/alert-success.vue";
import AlertFail from "@/views/alert-fail.vue";
import axios from "axios";
export default {
  data() {
    return {
      action: "",
      alertSuccess: false,
      alertFail: false,
      askToDelete: false,
      typeName: "",
      typeDtl: "",
      typeCode: "",
      typeColorCode: "",
      sensorTypeList: [],
      page: 1,
      able: 0,
      addType: false,
      editType: false,
      currPos: {
        typeId: 0,
        typeDtl: "",
        typeCode: "",
        typeColorCode: ""
      }
    };
  },
  created() {
    this.getSensorType();
  },
  components: {
    AddTypeModal,
    AskToDelete,
    AlertSuccess,
    AlertFail,
    EditTypeModal,
  },
  methods: {
    AddType(newType) {
      this.addSensorType(
        newType.typeName,
        newType.typeDtl,
        newType.typeCode,
        newType.typeColorCode
      );
    },
    async getSensorType() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-type"
        );
        this.sensorTypeList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },
    async addSensorType(
      tName = this.typeName,
      tDtl = this.typeDtl,
      tCode = this.typeCode,
      tColorCode = this.typeColorCode
    ) {
      this.action = "등록";
      try {
        const res = await axios.post(
          "http://163.180.117.38:8281/api/sensor-type",
          {
            typeName: tName,
            typeDtl: tDtl,
            typeCode: tCode,
            typeColorCode: tColorCode,
          }
        );
        console.log(res);
        this.alertSuccess = true;
        this.getSensorType();
      } catch (err) {
        this.alertFail = true;
        console.log(err);
      }
    },
    async editSensorType(type) {
      this.action = "수정"
      try {
        const res = await axios.put(
          "http://163.180.117.38:8281/api/sensor-type/" + type.typeId,
          {
            typeName: type.typeName,
            typeDtl: type.typeDtl,
            typeCode: type.typeCode,
            typeColorCode: type.typeColorCode,
          }
        );
        console.log(res);
        this.alertSuccess = true;
        this.getSensorType();
        this.$emit('modified');
      } catch (err) {
        this.alertFail = true;
        console.log(err);
      }
    },
    async deleteSensorType(typeId) {
      this.action = "삭제";
      try {
        const res = await axios.delete(
          "http://163.180.117.38:8281/api/sensor-type/" + typeId
        );
        this.alertSuccess = true;
        console.log(res);
        this.getSensorType();
      } catch (err) {
        this.alertFail = true;
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
  padding: none;
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

.new-input {
  width: 30%;
}

.sub-title {
  color: #9fb0d6;
  padding: 20px;
}
</style>
