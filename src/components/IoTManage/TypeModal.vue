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
                  <th
                  style="width: 100px; text-align: -webkit-center"
                  >색상 코드</th>
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
                  <td style="text-align: -webkit-center">
                    <div
                    class="show-color-code"
                    :style="{backgroundColor: sensorType.typeColorCode}">
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
tbody td {
  font-size: 1.1rem;
  border: 0px solid red;
}
tbody tr {
  border: 0px solid red;
}
.show-color-code {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.modal-title {
  font-size: 15px;
  font-weight: bold;
}
.sub-title {
  color: #9fb0d6;
  padding: 20px;
}
</style>
