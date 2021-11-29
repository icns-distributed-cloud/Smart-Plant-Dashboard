<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">CCTV 장비 관리</h5>
          <button
              type="button"
              class="btn-close btn-close-white close"
              aria-label="Close"
              @click="$emit('close');"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div class="row">

              <div class="col-12">

                <div class="form-label-group position-relative has-icon-left controls">
                  <label for="cctv_location">CCTV 장소</label>
                  <div class="main-input">

                      
                    <select
                      name="cctv_location"
                      class="form-control"
                      required
                      v-model="newCCTV.posId"
                    >
                      <option value="0" hidden>== 위치 선택 ==</option>
                      <option
                        v-for="pos in posList"
                        :key="pos.posId"
                        :value="pos.posId"
                      >
                        {{ pos.posName }}
                      </option>
                    </select>

                    <div class="form-control-position label-icon">
                      <i class="bx bx-comment-detail"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="user_id">CCTV User ID</label>
                  <div class="main-input">
                    <input
                        type="text"
                        class="form-control"
                        name="user_id"
                        placeholder="CCTV User ID를 입력하세요."
                        maxlength="100"
                        v-model= "newCCTV.userId"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-comment-detail"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="password">CCTV Password</label>
                  <div class="main-input">
                    <input
                        type="text"
                        class="form-control"
                        name="password"
                        placeholder="기타 정보"
                        maxlength="100"
                        v-model= "newCCTV.password"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-comment-detail"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="stream_url">CCTV RTSP URL</label>
                  <div class="main-input">
                    <input
                        type="text"
                        class="form-control"
                        name="stream_url"
                        placeholder="RTSP URL을 입력하세요."
                        maxlength="200"
                        v-model="newCCTV.streamURL"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-street-view"></i>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="websocket_url">WebSocket URL</label>
                  <div class="main-input">
                    <input
                        type="text"
                        class="form-control"
                        name="websocket_url"
                        placeholder="WebSocket URL을 입력하세요."
                        maxlength="100"
                        v-model="newCCTV.websocketURL"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-phone"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="abnormal_websocket_url">이상감지 WebSocket URL</label>
                  <div class="main-input">
                    <input
                        type="text"
                        class="form-control"
                        name="abnormal_websocket_url"
                        placeholder="WebSocket URL을 입력하세요."
                        maxlength="100"
                        v-model="newCCTV.abnormalWebsocketUrl"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-phone"></i>
                    </div>
                  </div>
                </div>
              </div> -->

            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"
                  @click="$emit('add-new-cctv',newCCTV)">
            저장
          </button>
          <button type="button" class="btn btn-secondary" @click="$emit('close');">
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
  data () {
    return {
      posList: [],
      cctvList: [],
      newCCTV: {
        cctvId: 0,
        userId: "",
        password: "",
        cctvLocation: "",
        streamURL: "",
      },
    };
  },
  created() {
    this.getPosInfo();
    this.getCCTVInfo();
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
    async getCCTVInfo() {
      try {
        const res = await axios.get(
            "http://163.180.117.38:8281/api/cctv?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.cctvList = res.data.data.content;
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
select.form-control:not([size]):not([multiple]) {
  height: auto !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>