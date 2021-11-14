<template>
  <div class="modal-wrapper">
    <div class="modal-dialog"  style="margin-top: 150px;">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div style="text-align: right;" class="row"><i @click="$emit('close')" id="close-modal" class="bi bi-x"></i></div>
            
            <div style="display: flex; flex-direction: column; align-items: center">
            <div class="row" style="text-align: center;">
                <h4 style="color: white; font-weight: bold;">{{ action }}에 실패했습니다.</h4>
                <i id="fail" class="bi bi-emoji-frown"></i>
            </div>

          <div class="delete-button-wrapper">
          <button style="width: 90px;" type="button" class="btn btn-warning"
          @click="$emit('close')">
            확인
          </button>
          <button style="width: 90px;" type="button" class="btn btn-secondary"
          @click="$emit('close');">
            닫기
          </button>
          </div> 
          </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "alert-fail",
    props: {
        action: {
            type: String,
            default: "수정"
        }
    }
}
</script>
<style>
.fail-button-wrapper {
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

#fail {
    color: #FFC107;
    font-size: 80px;
}

#close-modal {
    cursor: pointer;
    float: right;
    color: #c8d9f8;
    font-size: 30px;
}
</style>