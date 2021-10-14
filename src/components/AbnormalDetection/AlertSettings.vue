<template>
  <div>
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="wrapper">
      <div class="table-header">
        이상 경고 설정 | <Icon icon="bx:bx-home-alt" />
      </div>

      <div class="table-main">
        <div>
          <div class="table-main__header">이상 경고 설정</div>

          <div>
            <div class="table-main__content">
              <div class="table-main__content-intro">
                센서의 이상 경고값을 설정하는 화면입니다.
              </div>
              <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    구역 선택
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>

              <div>
                <SensorChart :sensorInfo="sensorInfo"
                @open-edit-modal="openModal"></SensorChart>
              </div>
              <nav aria-label="Page navigation example" style="float: right">
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
    <SettingModal v-if="showModal" @close="closeModal" :id=id />
  </div>
</template>

<script>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import SettingModal from "@/components/AbnormalDetection/SettingModal";
import SensorChart from "@/components/AbnormalDetection/SensorChart";

export default {
  name: "AlertSettings",
  data() {
      return {
          sensorInfo : [
          { id: 1, type: "온도", range: [10, 20, 30, 40, 50, 60] },
          { id: 2, type: "습도", range: [10, 40, 60, 70, 100, 120] },
          { id: 3, type: "가스", range: [40, 50, 70, 90, 100, 110] },
        ],
        sensor : {id:1, type:"anything", range: [90,100,120,150,170]},
      };
  },
  components: {
    Icon,
    SettingModal,
    SensorChart,
  },
  methods: {
    showEdit(sensor) {
      this.sensor = sensor;
      console.log("안녕",sensor.id);
    }
  },
  setup() {
    const showModal = ref(false);
    const openModal = (sensorId) => {
      this.sensorId = sensorId
      console.log(sensorId);
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };
    return {
      showModal,
      openModal,
      closeModal,
    };
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
  border: 1px solid #92959b;
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
  font-size: 20px;
  font-weight: bold;
}
thead > tr,
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
</style>
