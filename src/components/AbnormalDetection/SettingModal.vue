<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">이상 경고값 설정</h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="onClose"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div class="row">
              <div class="col-12">
                <div
                  class="form-label-group position-relative has-icon-left controls"
                >
                  <label for="sensor_id">안전 범위</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_id"
                      placeholder="식별 번호"
                      minlength="2"
                      maxlength="10"
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
                  <label for="sensor_pos">관심 범위</label>
                  <div class="main-input">
                    <select name="sensor_pos" class="form-control" required>
                      <option value="">=== 선택하세요 ===</option>
                    </select>
                    <div class="form-control-position label-icon">
                      <i class="bx bx-shape-polygon"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div
                  class="form-label-group position-relative has-icon-left controls"
                >
                  <label for="sensor_pos">주의 범위</label>
                  <div class="main-input">
                    <select name="sensor_type" class="form-control" required>
                      <option value="">=== 선택하세요 ===</option>
                    </select>
                    <div class="form-control-position label-icon">
                      <i class="bx bx-shape-square"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_etc">경고 범위</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_etc"
                      placeholder="기타 정보"
                      maxlength="100"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-comment-detail"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact">심각 범위</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact"
                      placeholder="담당자"
                      maxlength="100"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-street-view"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact_ext">담당자 내선번호</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact_ext"
                      placeholder="담당자 내선 번호"
                      maxlength="100"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-phone"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact_phone">담당자 휴대번호</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact_phone"
                      placeholder="담당자 휴대번호"
                      maxlength="100"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-mobile"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="onClose">
            저장
          </button>
          <button type="button" class="btn btn-secondary" @click="onClose">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const onClose = () => {
      emit("close");
    };
    return {
      onClose,
    };
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
