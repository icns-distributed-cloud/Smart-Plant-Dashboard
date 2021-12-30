<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">회원가입</h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div class="row">

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact">아이디</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact"
                      placeholder="email"
                      maxlength="100"
                      v-model="userInfo.email"
                    />
                    <div class="form-control-position label-icon">
                        <i class="bi bi-person-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
              <!-- id validation -->
              <div v-if="userInfo.email.indexOf('@',0) < 0 && userInfo.email.length!=0"
              class="validation-text">
                  <i class="bi bi-x-circle"></i> 아이디가 이메일 형식이 아닙니다.
              </div>

            <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact">이름</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact"
                      placeholder="이름"
                      maxlength="100"
                      v-model="userInfo.name"
                    />
                    <div class="form-control-position label-icon">
                        <i class="bi bi-file-person"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact_ext">비밀번호</label>
                  <div class="main-input">
                    <input
                      type="password"
                      class="form-control"
                      name="sensor_contact_ext"
                      placeholder="비밀번호"
                      maxlength="20"
                      v-model="userInfo.password"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bi bi-lock-fill"></i>
                    </div>
                  </div>
                </div>
              </div>

            <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact_ext">비밀번호 확인</label>
                  <div class="main-input">
                    <input
                      type="password"
                      class="form-control"
                      name="password_con"
                      placeholder="비밀번호 확인"
                      maxlength="20"
                      v-model="passwordValidation"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bi bi-key-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            <!-- password validation -->
            <div v-if="passwordValidation!=''">
              <div v-if="userInfo.password===passwordValidation"
              class="validation-text"
              style="color: #45d156"
              >
                  <i class="bi bi-check2-circle"></i> 비밀번호가 일치합니다.
              </div>
              <div v-else
              class="validation-text"
              style="color: #ff3f3f"
              >
                  <i class="bi bi-x-circle"></i> 비밀번호가 일치하지 않습니다.
              </div>
            </div>

            <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact">휴대폰 번호</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact"
                      placeholder="휴대폰 번호"
                      maxlength="100"
                      v-model="userInfo.phone"
                    />
                    <div class="form-control-position label-icon">
                        <i class="bi bi-telephone-fill"></i>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="
            $emit('sign-up', userInfo),
            $emit('close')"
          >
            회원가입
          </button>
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

export default {
    name: "SignUp",
  data() {
        return {
            passwordValidation: "",
            userInfo: {
                email: "",
                name: "",
                password: "",
                phone: ""
            },
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.validation-text {
    font-size: 0.8rem;
    transition: 0.3s;
    color: #ff3f3f;
    margin-left: 20px;
    margin-bottom: 10px;
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
  /*font-weight: bold;*/
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
  left: 4px;
  top: 4px;
  color: #9fb0d6;
  font-size: 0.8rem;
}
select.form-control:not([size]):not([multiple]) {
  height: auto !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
