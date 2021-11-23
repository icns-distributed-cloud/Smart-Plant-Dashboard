<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      센서 위치 등록 | 
    </div>


    <div class="table-main">
      <div>

     <div class="table-main__header"> 센서 배치 장소 선택 </div>
     
        <iframe
            :src="`./sticker/dist/stmain.html`"
            width="100%"
            height="830"
            frameborder="0">
        </iframe>
                  

      </div>
<!--
      <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">
              센서 위치 지정
            </div>

           

            <div>
                <button
                type="button"
                class="btn btn-primary"
                style="margin-bottom: 12px; float:left"
                @click="showModal=true;"
              >
                연료유 탱크 펌프룸
              </button>
       
                <button
                type="button"
                class="btn btn-primary"
                style="margin-bottom: 12px; float:left"
                @click="showModal=true;"
              >
                우드펠릿 버킷엘리베이터 #2
              </button>

                <button
                type="button"
                class="btn btn-primary"
                style="margin-bottom: 12px; float:left"
                @click="showModal=true;"
              >
                5호기 터빈 MSV/CV
              </button>

                <button
                type="button"
                class="btn btn-primary"
                style="margin-bottom: 12px; float:left"
                @click="showModal=true;"
              >
                정문 옹벽
              </button>



            </div>


          </div>
          
      </div> 
      -->
    </div>
</div>
</template>


<script>
// import { Icon } from "@iconify/vue";
export default {
  name: "Sensor",

  components: {
    
  },
};
</script>

<style>
.wrapper {
  margin: 10px;
}
.table-header {
  color: #727e8c;
  font-size: 20px;
}

.table-main {
  margin: 20px;
  background-color: #272e48;
  color: #a9c7f0;
  border-radius: 9px;
  height: 600px;
}
.table-main__header {
  padding: 20px;
  font-size: 20px;
}
</style>
