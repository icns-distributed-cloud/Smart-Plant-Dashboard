<template>
  <div class="modal-wrapper">
    <div class="modal-dialog"  style="margin-top: 150px;">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div style="text-align: right;" class="row"><i @click="$emit('close')" id="close-modal" class="bi bi-x"></i></div>
            
            <div style="display: flex; flex-direction: column; align-items: center">
            <div class="row" style="text-align: center;">
                <h4 style="color: white; font-weight: bold;">삭제 하시겠습니까?</h4>
                <i id="exclamation" class="bi bi-exclamation-circle"></i>
            </div>

          <div class="delete-button-wrapper">
          <button style="width: 90px;" type="button" class="btn btn-danger"
          @click="$emit('delete')">
            삭제
          </button>
          <button style="width: 90px;" type="button" class="btn btn-secondary" @click="$emit('close');">
            취소
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
  name: "ask-to-delete",

}
</script>
<style>
.delete-button-wrapper {
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

#exclamation {
    color: #DC3545;
    font-size: 80px;
}
#close-modal {
  float: right;
  color: #c8d9f8;
  font-size: 30px;
}
</style>