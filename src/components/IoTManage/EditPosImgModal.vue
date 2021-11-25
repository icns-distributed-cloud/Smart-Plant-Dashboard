<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ currPos.posName }} 구역 조감도 이미지 재등록
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
                 <label for="pos_dtl">이전 이미지</label>
                <div class="show-background-img"
                :style="{ backgroundImage: 'url('+'http://163.180.117.38:8281/api/image?path='+this.newPos.backgroundImgPath+')' }"
                ></div>
                </div>

                <div class="col-12">
                  <div class="form-label-group position-relative has-icon-left">
                    <label for="pos_dtl">새로운 이미지 등록</label>
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
                $emit('edit-pos-img', newPos);
                $emit('close-edit-modal');
              "
            >
              저장
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close-edit-modal')"
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
    created(){
        this.newPos.posId = this.currPos.posId;
        this.newPos.posName = this.currPos.posName;
        this.newPos.posDtl = this.currPos.posDtl;
        this.newPos.posCode = this.currPos.posCode;
        this.newPos.backgroundImgPath = this.currPos.backgroundImgPath;
    },
    data() {
        return {
        newPos: {},
        };
    },
    props: {
        currPos: Object,
    }
};
</script>

<style>
.show-background-img {
  width: 400px;
  height: 225px;
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  margin: 0px auto;
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
