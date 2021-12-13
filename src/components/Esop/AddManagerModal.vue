<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            e-SOP 담당자 신규 등록
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close-add-modal')"
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
                    <label for="sensor_posId">담당 위치 이름</label>
                    <div class="main-input">
                      <select
                        v-model="newManager.sensorPosId"
                        name="sensor_posId"
                        class="form-control"
                        id="ss_type_select"
                        required
                      >
                        <option hidden value="0"
                          >== 담당 위치 선택 ==</option
                        >
                        <option
                          v-for="pos in posList"
                          :key="pos.posId"
                          :value="pos.posId"
                        >
                          {{ pos.posName }}
                        </option>
                      </select>
                      <div class="form-control-position label-icon">
                        <i class="bx bx-shape-square"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div
                    class="form-label-group position-relative has-icon-left controls"
                  >
                    <label for="manager_name">담당자 이름</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="manager_name"
                        placeholder="담당자 이름"
                        minlength="1"
                        maxlength="100"
                        v-model="newManager.name"
                        required
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-grid-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div
                    class="form-label-group position-relative has-icon-left controls"
                  >
                    <label for="sensor_posId">관련 단계</label>
                    <div class="main-input">
                      <select
                        v-model="newManager.level"
                        name="manger_level"
                        class="form-control"
                        id="level_select"
                        required
                      >
                        <option hidden value="0"
                          >== 관련 단계 ==</option
                        >
                        <option
                          :value="1"
                        >
                          관심 단계
                        </option>
                        <option
                          :value="2"
                        >
                          주의 단계
                        </option>
                        <option
                          :value="3"
                        >
                          경고 단계
                        </option>
                        <option
                          :value="4"
                        >
                          심각 단계
                        </option>
                      </select>
                      <div class="form-control-position label-icon">
                        <i class="bx bx-shape-square"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div
                    class="form-label-group position-relative has-icon-left controls"
                  >
                    <label for="phone_number">핸드폰 번호</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="string"
                        class="form-control"
                        name="phone_number"
                        placeholder="핸드폰 번호"
                        minlength="1"
                        maxlength="100"
                        v-model="newManager.phone"
                        required
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-grid-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>

                 <div class="col-12">
                  <div
                    class="form-label-group position-relative has-icon-left controls"
                  >
                    <label for="phone_number">이메일 주소</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        class="form-control"
                        name="phone_number"
                        placeholder="이메일 주소"
                        minlength="1"
                        maxlength="100"
                        v-model="newManager.email"
                        required
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-grid-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-primary"
              @click="
                $emit('add-new-manager', newManager);
                $emit('close-add-modal');
              "
            >
              담당자 등록
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close-add-modal')"
            >
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
    return {
      newManager: {
          name: "",
          sensorPosId: 0,
          level:0,
      }
    };
  },
  props: {
      posList: Array,
  }
};
</script>

<style>
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
