<template>
  <div class="modal-wrapper">
    <div class="modal-dialog"  style="margin-top: 150px;">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div style="text-align: right;" class="row"><i @click="$emit('close')" id="close-modal" class="bi bi-x"></i></div>
            
            <div style="display: flex; flex-direction: column; align-items: center">
            <div class="row" style="text-align: center;">
                <h4 style="color: white; font-weight: bold;">성공적으로 {{ action }}되었습니다.</h4>
                <i id="check" class="bi bi-check-circle"></i>
            </div>

          <div class="delete-button-wrapper">
          <button style="width: 90px;" type="button" class="btn btn-success"
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
  name: "alert-success",
  props: {
    action: {
      type: String,
      default: "수정"
    }
  }
}
</script>
<style>
.delete-button-wrapper {
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

#check {
    color: #28A745;
    font-size: 80px;
}
#close-modal {
  float: right;
  color: #c8d9f8;
  font-size: 30px;
}
</style>