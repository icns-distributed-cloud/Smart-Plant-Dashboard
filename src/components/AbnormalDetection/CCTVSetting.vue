<template>
  <div>
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="wrapper">
      <div class="table-header">CCTV 설정</div>

      <div class="table-main">
        <div>
          <div class="table-main__header">CCTV 관리 설정</div>

          <div>
            <div class="table-main__content">
              <div class="table-main__content-intro">
                CCTV 장비를 관리하는 화면입니다.
              </div>

              <div>
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin-bottom: 12px; margin-left: 12px; float: right"
                  @click="showModal = true"
                >
                  신규 등록
                </button>

                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>CCTV 위치</th>
                      <th>CCTV RTSP URL</th>

                      <th style="width: 200px">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cctv in cctvList" :key="cctv.cctvId">
                      <td>{{ cctv.posName }}</td>
                      <td>{{ cctv.streamURL }}</td>
                      <td
                        style="
                          padding-top: 2px;
                          padding-right: 0px;
                          padding-left: 0px;
                          padding-bottom: 2px;
                          text-align: center;
                          vertical-align: middle;
                        "
                      >
                        <a
                          class="btn btn-outline-primary mod-btn"
                          @click="readyToEdit(sensor)"
                          ><i class="bx bx-edit"></i> 수정
                        </a>

                        <a
                          class="btn btn-outline-danger tr_data_del"
                          @click="
                            [
                              deleteCCTV(cctv.cctvId),
                              deleteStreamServer(cctv.websocketURL),
                            ]
                          "
                          ><i class="bx bx-trash"></i> 삭제</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
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
    <CCTVModal
      v-if="showModal"
      @close="showModal = false"
      @add-new-cctv="addNewCCTV"
    />
  </div>
</template>

<script>
// import { Icon } from "@iconify/vue";
import CCTVModal from "../CCTVModal";
import axios from "axios";
export default {
  components: {
    CCTVModal,
  },
  data() {
    return {
      cctvList: [],
      showModal: false,

      posId: 0,
      userId: "",
      password: "",
      normalStreamPortNumber: 0,
      abneormalStreamPortNumber: 0,
      //   streamURL: "",
      //   websocketURL: "",
    };
  },
  created() {
    this.getCCTVInfo();
  },
  methods: {
    async getCCTVInfo() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/cctv?pageSize=1&paged=true&sort.sorted=true"
        );
        this.cctvList = res.data.data.content;
        if (this.cctvList.length === 0) {
          this.normalStreamPortNumber = 30000;
          this.abneormalStreamPortNumber = 30500;
        } else {
          var websocket_string =
            this.cctvList[this.cctvList.length - 1].websocketURL;
          var abnormal_websocket_string =
            this.cctvList[this.cctvList.length - 1].abnormalWebsocketUrl;
          this.normalStreamPortNumber = Number(
            websocket_string.substr(
              websocket_string.indexOf(":", 4) + 1,
              websocket_string.length
            )
          );
          this.abneormalStreamPortNumber = Number(
            abnormal_websocket_string.substr(
              abnormal_websocket_string.indexOf(":", 4) + 1,
              abnormal_websocket_string.length
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    },

    async deleteCCTV(cctvId) {
      try {
        const res = await axios.delete(
          "http://163.180.117.38:8281/api/cctv/" + cctvId
        );
        console.log(res);
        this.getCCTVInfo();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteStreamServer(websocket_url) {
      try {
        const res = await axios.post(
          "http://163.180.117.40:3000/api/deleteStream/",
          {
            websocketURL: websocket_url,
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    async addNewCCTV(newCCTV) {
      console.log(newCCTV);
      this.showModal = false;
      try {
        this.normalStreamPortNumber = this.normalStreamPortNumber + 1;
        this.abneormalStreamPortNumber = this.abneormalStreamPortNumber + 1;
        var websocket_string =
          "ws://163.180.117.40:" + this.normalStreamPortNumber;
        var abnormal_websocket_string =
          "ws://163.180.117.40:" + this.abneormalStreamPortNumber;
        const res = await axios.post("http://163.180.117.38:8281/api/cctv/", {
          posId: newCCTV.posId,
          password: newCCTV.password,
          streamURL: newCCTV.streamURL,
          userId: newCCTV.userId,

          websocketURL: websocket_string,
          abnormalWebsocketUrl: abnormal_websocket_string,
        });
        const res2 = await axios.post(
          "http://163.180.117.40:3000/api/addStream/",
          {
            posId: newCCTV.posId,
            password: newCCTV.password,
            streamURL: newCCTV.streamURL,
            userId: newCCTV.userId,

            websocketURL: websocket_string,
            abnormalWebsocketUrl: abnormal_websocket_string,
          }
        );
        this.getCCTVInfo();
        console.log(res);
        console.log(res2);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.wrapper {
  margin: 10px;
}
.table-header {
  color: #727e8c;
  font-size: 25px;
  font-weight: bold;
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
