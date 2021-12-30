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
            <div class="modal-title sub-title">
              <i class="bi bi-diamond-fill"></i> 위치 목록
            </div>
            <!-- 장소 목록 -->
            <div style="display: flex; justify-content: center; margin: 15px 0px;">
            <table class="table table-bordered table-hover" style="width: 90%;">
              <thead>
                <tr>
                  <th>위치 이름</th>
                  <th>식별 코드</th>
                  <th>위치 상세</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="sensorPos in sensorPosList"
                  :key="sensorPos.posId"
                >
                  <td style="font-size: 0.85rem;">
                    <div>{{ sensorPos.posName }}</div>
                  </td>
                  <td>
                    <div>{{ sensorPos.posCode }}</div>
                  </td>
                  <td style="font-size: 0.85rem;">
                    <div>{{ sensorPos.posDtl }}</div>
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
                      @click="editPos=true; currPos=sensorPos;"
                      ><i class="bx bx-edit"></i> 수정
                    </a>
                      <button type="button" class="btn btn-outline-success"
                      @click="editImg=true; currPos=sensorPos;"
                      style="font-size: 0.85rem;"
                      ><i class="bx bx-edit"></i> 이미지 변경
                    </button>
                    <a
                      class="btn btn-outline-danger tr_data_del"
                      @click="askToDelete = true; able=sensorPos.posId"
                      ><i class="bx bx-trash"></i> 삭제</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          <!-- footer -->
          <AskToDelete
            v-if="askToDelete"
            @close="askToDelete=false"
            @delete="deleteSensorPos(able)"
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
          >
          </AlertFail>
          <EditPlaceModal
            v-if="editPos"
            @edit-pos="editSensorPos"
            @close-edit-modal="editPos=false"
            :currPos="currPos"
          ></EditPlaceModal>
          <EditPosImgModal
            v-if="editImg"
            @edit-pos-img="editPosImg"
            @close-edit-modal="editImg=false"
            :currPos="currPos"
          ></EditPosImgModal>
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
import EditPlaceModal from "./EditPlaceModal.vue";
import EditPosImgModal from "./EditPosImgModal.vue";
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
      page: 1,
      able: 0,
      addPos: false,
      editPos: false,
      editImg: false,
      currPos: {
        posId: 0,
        posName: "",
        posDtl: "",
        posCode: ""
      },
      sensorPosList: [],
    };
  },
  created() {
    this.getSensorPos();
  },
  components: {
    AddPlaceModal,
    AskToDelete,
    AlertSuccess,
    AlertFail,
    EditPlaceModal,
    EditPosImgModal,
  },
  methods: {
    addPosition(newPos) {
      this.action = "추가"
      var frm = new FormData();
      var imgFile = document.getElementById("position-img");
      frm.append("backgroundImg", imgFile.files[0]);
      axios.post("/api/sensor-pos?posCode="+newPos.posCode
      +"&posDtl="+newPos.posDtl+"&posName="+newPos.posName,
      frm, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      .then((response) => {
        this.getSensorPos();
        this.alertSuccess=true;
        console.log(response);
      })
      .catch((error) => {
        this.alertFail=true;
        console.log(error);
      })
    },

    AddPos(newPos) {
      //this.addSensorPos(newPos.posName, newPos.posDtl, newPos.posCode);
      this.addPosition(newPos);
      console.log("add pos");
    },
    async getSensorPos() {
      try {
        const res = await axios.get(
          "/api/sensor-pos?paged=false&sort.sorted=true&sort.unsorted=false&unpaged=true"
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
      this.action="등록";
      try {
        const res = await axios.post(
          "/api/sensor-pos",
          {
            posName: pName,
            posDtl: pDtl,
            posCode: pCode,
          }
        );
        console.log(res);
        //this.addPosImage(pos);
        this.alertSuccess=true;
        this.getSensorPos();
      } catch (err) {
        console.log(err);
        this.alertFail=true;
      }
    },

    readyToEdit(sensorPos) {
      this.able = sensorPos.posId;
      this.posName = sensorPos.posName;
      this.posDtl = sensorPos.posDtl;
      this.posCode = sensorPos.posCode;
      console.log(this.posName);
    },

    async editSensorPos(pos) {
      this.action = "수정";
      try {
        const res = await axios.put(
          "/api/sensor-pos/" + pos.posId,
          {
            posName: pos.posName,
            posDtl: pos.posDtl,
            posCode: pos.posCode,
          }
        );
        console.log(res);
        this.alertSuccess=true;
        this.getSensorPos();
        this.$emit('modified');
      } catch (err) {
        this.alertFail=true;
        console.log(err);
      }
    },

    async editPosImg(newPos) {
      this.action = "이미지가 변경"
      var frm = new FormData();
      var imgFile = document.getElementById("position-img");
      frm.append("backgroundImg", imgFile.files[0]);
      axios.post("/api/sensor-pos/background-img/"+newPos.posId,
      frm, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      .then((response) => {
        this.getSensorPos();
        this.alertSuccess=true;
        console.log(response);
      })
      .catch((error) => {
        this.alertFail=true;
        console.log(error);
      })
    },

    async deleteSensorPos(posId) {
      this.action = "삭제";
      try {
        const res = await axios.delete(
          "/api/sensor-pos/" + posId
        );
        console.log(res);
        this.alertSuccess=true;
        this.getSensorPos();
      } catch (err) {
        this.alertFail=true;
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
tbody {
  width: 80%;
}
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
