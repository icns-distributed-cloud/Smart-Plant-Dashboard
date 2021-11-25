<template>
<div class="wrapper">
<div class="table-main" style="height: fit-content">
  <div class="table-header">
      센싱 위치 관리 | 
    </div>
    <div class="table-main" style="height: fit-content">
      
        <div class="table-main__header">
          {{ currPos.posName }} 구역 센서 위치 관리 설정
        </div>
        <div>
          <button v-for="pos in posList" :key="pos.posId"
          @click="currPos = pos"
          >
            {{ pos.posName }}
          </button>
        </div>
  <div class="MainPage" >
    <Header />
    <div style="display: flex;">
      <div class="editor-wrapper">
      <Editor :currPos="currPos"/>
      </div>
      <div>
        <Toolbar />
        <Property />
      </div>
    </div>

    <!-- <Map /> -->
  </div>
    </div>
</div>
</div>
</template>
<script>
import axios from "axios"
import Header from './Header'
import Toolbar from './Toolbar'
import Editor from './Editor'
import Property from './property'
// import Map from './Map'

export default {
  name: 'MainPage',
  components:{
     Header,
     Toolbar,
     Editor,
     Property,
    //  Map
  },
  data(){
     return{
       posList: [],
       currPos: {posName: ""}
     }
  },
  created() {
    this.getPosList();
  },
  methods: {
    async getPosList() {
      try {
        const res = await axios.get(
          'http://163.180.117.38:8281/api/sensor-pos'
        );
        this.posList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
//     var canvas = document.getElementById("canvas"),
//     ctx = canvas.getContext("2d");

// canvas.width = 934;
// canvas.height = 622;


// var background = new Image();
// background.src = "http://i.imgur.com/yf6d9SX.jpg";

// background.onload = function(){
//     ctx.drawImage(background,0,0);   
// }

     
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.MainPage{
  width:100%;
  height:100%;
}

.editor-wrapper {
  width: 800px;
  height: 450px;
}
</style>
