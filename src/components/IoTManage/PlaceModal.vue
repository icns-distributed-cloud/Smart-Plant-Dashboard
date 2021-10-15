<template>
  <div class="modal-wrapper">
    <div class="modal-dialog" style="max-width: 700px;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            센싱 장비 위치 관리
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close');"
          ></button>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="modal-body">
            <div class="form-body" style="margin-top:10px">
              <div class="row">
                <div class="col-12">
                  <div
                    class="form-label-group position-relative has-icon-left controls"
                  >
                    <label for="pos_name">위치 이름</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="pos_name"
                        placeholder="위치이름"
                        minlength="1"
                        maxlength="100"
                        v-model="posName"
                        required
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-grid-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-label-group position-relative has-icon-left">
                    <label for="pos_dtl">위치 상세</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="pos_dtl"
                        placeholder="위치 상세"
                        maxlength="100"
                        v-model="posDtl"
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-comment-detail"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 장소 목록 -->
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>위치 이름</th>
                        <th>위치 상세</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="sensorPos in sensorPosList" :key="sensorPos.posId">
                    <td>{{ sensorPos.posName }}</td>
                    <td>{{ sensorPos.posDtl }}</td>

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
                        ><i class="bx bx-edit"></i> 수정
                    </a>
                    <a
                        class="btn btn-outline-danger tr_data_del"
                        @click.stop="deleteSensorPos(sensorPos.posId)"
                        ><i class="bx bx-trash"></i> 삭제</a
                    >
                    </td>
                </tr>
                </tbody>
            </table>
            <!-- footer -->
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">
              저장
            </button>
            <button type="button" class="btn btn-secondary" @click="$emit('close')">
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return{
            place: {name: "장소 이름", discription: "세부 설명"},
            posName: "",
            posDtl: "",
            sensorPosList: [
                { posName: "우리집", posDtl: "행복한 우리집" },
                { posName: "ICNS", posDtl: "행복한 연구실" },
            ]
        };
    },
    methods: {
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
</style>
