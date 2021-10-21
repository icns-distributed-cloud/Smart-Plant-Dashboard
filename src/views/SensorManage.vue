<template>
  <link
    href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
    rel="stylesheet"
  />
  <div class="wrapper">
    <div class="table-header">
      센싱 장비 관리 | <Icon icon="bx:bx-home-alt" />
    </div>

    <div class="table-main">
      <div>
        <div class="table-main__header">
          센싱 장비 관리 설정
        </div>

        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">
              센싱 장비를 관리하는 화면입니다.
            </div>

            <div>
              <button
                type="button"
                class="btn btn-primary"
                style="margin-bottom: 12px; margin-left: 12px; float:right"
                @click="showModal = true"
              >
                신규 등록
              </button>

              <button type="button" class="btn btn-primary"
              style="margin-bottom: 12px; margin-left: 12px;  float:right"
              @click="sensorModalOpen = true">
                <i class="bi bi-wrench"></i> 센서 종류 관리
              </button>

              <button type="button" class="btn btn-primary"
              style="margin-bottom: 12px; float:right;"
              @click="placeModalOpen = true">
                <i class="bi bi-wrench"></i> 장소 관리
              </button>
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>식별번호</th>
                    <th>센싱 장비 위치</th>
                    <th>센싱 장비 종류</th>
                    <th>기타 정보</th>
                    <th>담당자</th>

                    <th>담당자 내선</th>
                    <th>담당자 휴대번호</th>

                    <th style="width: 175px">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sensor in ssManageList" :key="sensor.ssId">
                    <td>{{ sensor.ssCode }}</td>
                    <td>{{ sensor.ssPos.posName }}</td>
                    <td>{{ sensor.ssType.typeName }}</td>
                    <td>{{ sensor.ssDtl }}</td>
                    <td>{{ sensor.ssContact }}</td>
                    <td>{{ sensor.ssContactExt }}</td>
                    <td>{{ sensor.ssContactPhone }}</td>
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
                        @click="readyToEdit(sensor);"
                        ><i class="bx bx-edit"></i> 수정
                      </a>

                      <a class="btn btn-outline-danger tr_data_del"
                      @click="deleteSensorManage(sensor.ssId);"
                        ><i class="bx bx-trash"></i> 삭제</a
                      >

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example" style=" float:right">
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
  <Modal v-if="showModal" @close="showModal = false" @add-new-sensor="addNewSensor" />
  <EditSensorModal v-if="showEditModal"
    :sensorPosId= "sensorPosId"
    :sensorTypeId= "sensorTypeId"
    :ssDtl= "ssDtl"
    :ssContact= "ssContact"
    :ssContactExt= "ssContactExt"
    :ssContactPhone= "ssContactPhone"
    :ssId = "ssId"
    @edit-sensor= "editSensor"
    @close="showEditModal = false;">
  </EditSensorModal>

  <TypeModal v-if="sensorModalOpen" @close="sensorModalOpen = false" />
  <PlaceModal v-if="placeModalOpen" @close="placeModalOpen = false" />
</template>

<script>
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import EditSensorModal from "@/components/IoTManage/EditSensorModal.vue";
import PlaceModal from "@/components/IoTManage/PlaceModal.vue";
import TypeModal from "@/components/IoTManage/TypeModal.vue";
import axios from "axios";

export default {
  components: {
    Icon,
    Modal,
    EditSensorModal,
    PlaceModal,
    TypeModal,
  },
  data() {
    return {
      sensorPosId: 0,
      sensorTypeId: 0,
      ssContact: "",
      ssContactExt: "",
      ssContactPhone: "",
      ssDtl: "",
      ssId: "",
      showModal: false,
      sensorModalOpen: false,
      placeModalOpen: false,
      showEditModal: false,
      ssManageList: [],
    };
  },
  created () {
    this.getSensorManage();
  },
  methods: {
    readyToEdit(sensor) {
      this.ssId = sensor.ssId;
      this.sensorPosId = sensor.ssPos.posId;
      this.sensorTypeId = sensor.ssType.typeId;
      this.ssContact = sensor.ssContact;
      this.ssContactExt = sensor.ssContactExt;
      this.ssContactPhone = sensor.ssContactPhone,
      this.ssDtl =  sensor.ssDtl;
      this.showEditModal=true;
    },
    async getSensorManage() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sensor-manage?paged=false&sort.sorted=true"
          );
          this.ssManageList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },

    async editSensor(newSensor) {
      try {
        const res = await axios.put(
          "http://163.180.117.38:8281/api/sensor-manage/" + newSensor.ssId,
          {
            "sensorPosId": newSensor.sensorPosId,
            "sensorTypeId": newSensor.sensorTypeId,
            "ssContact": newSensor.ssContact,
            "ssContactExt": newSensor.ssContactExt,
            "ssContactPhone": newSensor.ssContactPhone,
            "ssDtl": newSensor.ssDtl,
          }
        );
        console.log(res);
        this.getSensorManage();
        this.showEditModal = false;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteSensorManage(ssId) {
      this.showEditModal = false;
      try {
        const res = await axios.delete(
          "http://163.180.117.38:8281/api/sensor-manage/" + ssId
        );
        console.log(res);
        this.getSensorManage();
      } catch (err) {
        console.log(err);
      }
    },

    async addNewSensor(newSensor) {
      console.log(newSensor);
      this.showModal = false;
      try {
        const res = await axios.post(
          "http://163.180.117.38:8281/api/sensor-manage/",
          {
            "sensorPosId": newSensor.sensorPosId,
            "sensorTypeId": newSensor.sensorTypeId,
            "ssContact": newSensor.ssContact,
            "ssContactExt": newSensor.ssContactExt,
            "ssContactPhone": newSensor.ssContactPhone,
            "ssDtl": newSensor.ssDtl,
          }
        );
        this.getSensorManage();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    
  },
};
</script>

<style>
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
.table-bordered > tbody > tr > td,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > td,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  border: 2px solid #464d5c;
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
  font-size: 24px;
}
thead > tr,
tbody > tr,
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
.table-hover:target tbody tr:target td {
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

.edit-input {
  border-radius: 5px;
}
</style>
