<template>
  <div class="modal-wrapper">
    <div class="modal-dialog"  style="margin-top: 150px;">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div style="text-align: right;" class="row"><i @click="$emit('close')" id="close-modal" class="bi bi-x"></i></div>
            
            <div style="display: flex; flex-direction: column; align-items: center">
            <div class="row" style="text-align: center;">
                <h4 style="color: white; font-weight: bold;">상황과 단계를 선택하십시오.</h4>
                <i id="fail" class="bi bi-emoji-frown"></i>
            </div>

          <div class="check-button-wrapper">
          <button style="width: 90px; float:right;" type="button" id="checkbtn" class="btn btn-secondary"
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
  name: "AlertCheck",
    props: {
        action: {
            type: String,
            default: "체크"
        }
    }
}
</script>
<style>
.check-butteon-wrapper{
    width: 350px;
    display: flex;
    justify-content: center;
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