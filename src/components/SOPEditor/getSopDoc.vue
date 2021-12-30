<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            SOP 시나리오 불러오기
          </h5>
        </div>
        <form @submit.prevent="onSubmit" v-if="editing===true" id="add-pos-modal">
          <div class="modal-body">
            <div class="form-body" style="margin-top:10px">
              <div class="row">
                <div class="col-12">
                  <div class="form-label-group position-relative has-icon-left">
                    <label for="pos_dtl">시나리오 선택</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="file"
                        class="form-control"
                        id="position-img"
                        placeholder="조감도 이미지"
                        maxlength="100"
                        style="margin-left: 0px"
                        required
                      />
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
                submitForm();
                $emit('add-new-pos', newScenario);
                $emit('close-add-modal');
              "
            >
              불러오기
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close-sop-doc')"
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
      newPos: { posName: "", posDtl: "", posCode: "" },
      editing: true,
    };
  },
  methods: {
    submitForm: () => {
      var form = document.getElementById("add-pos-modal");
      document.body.appendChild(form);
    }
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
