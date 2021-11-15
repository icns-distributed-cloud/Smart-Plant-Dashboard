<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            센싱 장비 위치 신규 등록
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
                    <label for="pos_name">종류 이름</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="pos_name"
                        placeholder="종류 이름"
                        minlength="1"
                        maxlength="100"
                        v-model="newType.typeName"
                        required
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-grid-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-label-group position-relative has-icon-left controls"
                  >
                    <label for="pos_name">식별 코드</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="pos_name"
                        placeholder="식별 코드"
                        minlength="1"
                        maxlength="100"
                        v-model="newType.typeCode"
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
                    <label for="pos_dtl">종류 상세</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="pos_dtl"
                        placeholder="종류 상세"
                        maxlength="100"
                        v-model="newType.typeDtl"
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-comment-detail"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-label-group position-relative has-icon-left">
                    <label for="pos_dtl">색상 코드</label>
                    <div style="display: flex">
                      <div class="color-wrapper">
                        <div class="show-color" :style="{backgroundColor: newType.typeColorCode}"></div>
                      </div>
                      <div class="color-wrapper">
                        <div class="color-picker" v-for="(color, i) in colorList" :key="i">
                          <input name="color" type="radio" 
                          :id="color"
                          :value="color"
                          :style="{backgroundColor: color}"
                          v-model="newType.typeColorCode"
                          />
                          <label
                          :for="color"
                          :style="{backgroundColor: color}"
                          >
                          <i class="bi bi-check-lg"></i>
                          </label>
                        </div>
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
                $emit('edit', newType);
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
    mounted() {
        this.newType.typeId = this.currType.typeId;
        this.newType.typeName = this.currType.typeName;
        this.newType.typeDtl = this.currType.typeDtl;
        this.newType.typeCode = this.currType.typeCode;
        this.newType.typeColorCode = this.currType.typeColorCode;
    },
    data() {
        return {
        newType: {},
        colorList: [
          "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
          "#00bcd4", "#009688", "#4caf50" ,"#8bc34a", "#cddc39",
          "#ffeb3b", "#ff9800", "#795548", "#9e9e9e"
        ]
        };
    },
    props: {
        currType: Object,
    }
};
</script>

<style>
.color-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 3px;
  justify-content: flex-start;
  border: 1px solid #464d5c;
  border-radius: 3px;
  margin: 3px;
}

.color-picker {
  width: 20%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.show-color {
  width: 30px;
  height: 100%;
  border-radius: 3px;
  transition: all 0.2s;
}

input[name="color"]+label {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
    transition: all 0.2s ease;
    color: rgba(0,0,0,0);
}

input[name="color"]:hover+label {
  width: 40px;
  height: 40px;
}

input[name="color"]:checked+label {
  width: 30px;
  height: 30px;
  color: rgba(255, 255, 255, 0.6);
}

input[name="color"] {
    display: none;
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
</style>
