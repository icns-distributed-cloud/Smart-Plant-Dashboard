<template>
<div class="wrapper">
    <div class="table-header">
      센싱 위치 관리 | 
    </div>
<div class="table-main" style="height: fit-content">
    <div class="table-main" style="height: fit-content">
      
        <div class="table-main__header" style="font-weight: bold">
          {{ currPos.posName }} 구역 센서 위치 관리 설정
        </div>
        <div>
          <button v-for="pos in posList" :key="pos.posId"
          @click="currPos = pos; getSensorPosEditor()"
          class="btn btn-secondary"
          style="margin: 5px"
          >
            {{ pos.posName }}
          </button>
        </div>
  <div class="MainPage" >
    <div class="sensor-position-editor-wrapper">
      <div class="editor-wrapper">
                  <div class="btn-wrapper">        
          <!-- 삭제 버튼 -->
          <li
            @click="command(item)"
            :title="item.cmd"
            v-bind:class="'iconfont ' + item.icon + ' ' + item.class"
            id="delete-btn"
          ></li>
          <span>|</span>
          <button type="button" class="save-btn"
          @click.stop="save('json')">저장</button>
        </div>
      <Editor :currPos="currPos"/>
      </div>
      <div class="toolbal-wrapper">
        <Toolbar />
        <Property :currPos="currPos"/>
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
import Toolbar from './Toolbar'
import Editor from './Editor'
import Property from './property'
import eventBus from '../positioneventbus'
// import Map from './Map'

export default {
  name: 'MainPage',
  components:{
     Toolbar,
     Editor,
     Property,
    //  Map
  },
  data(){
     return{
       posList: [],
       currPos: {posName: ""},
       item: {
          icon: "icon-shanchu",
          name: "삭제",
          cmd: "delete",
          class: "disable",
      },
     }
  },
  created() {
    this.getPosList(true);
  },
  methods: {
    command(item) {
      eventBus.$emit(item.cmd);
    },

    save(type) {
      this.upload = false;
      eventBus.$emit("saveData", { type });
    }, 

    async getPosList(created=false) {
      try {
        const res = await axios.get(
          'http://163.180.117.38:8281/api/sensor-pos'
        );
        this.posList = res.data.data.content;
        if (created) {
          this.currPos = this.posList[0];
          this.getSensorPosEditor();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getSensorPosEditor() {
      this.$emit("changeDisplay" ,this.currPos);
      try {
        // MODIFY !!!!!
        const res = await axios.get(
          "http://163.180.117.38:8218/api/sensor-pos/"+this.currPos.posId
        );
        console.log("[ GET ]")
        if (res.data.data.position != null) {
          eventBus.$emit("initFlow", {
            //data: JSON.parse(res.data.data.position),
            data: JSON.parse(res.data.data.position),
          });
        } else {
          eventBus.$emit("initFlow", {
            data: {id: '0', type: 'cicadaFlow', node: [], group: [], edge: []},
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
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

.table-main {
  padding-bottom: 10px;
}

.MainPage{
  width:100%;
  height:100%;
}

.editor-wrapper {
  width: 800px;
  height: 450px;
  position: relative;
}

.toolbar-wrapper {
  width: 150px;
  display: flex;
  flex-direction: column;
}

.sensor-position-editor-wrapper {
    width: fit-content;
    display: flex;
    border-radius: 20px;
    padding: 30px 20px 20px;
    background-color: #1a233a;
    margin-top: 20px;
}

.btn-wrapper {
  float: right;
  background-color: #727e8c;
  border-radius: 30px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: white;
  margin-right: 10px;
  margin-top: 10px;
  z-index: 10;
  position: absolute;
  right: 5px;
}

.save-btn {
  font-weight: bold;
  border: none;
  border-radius: 40px;
  font-weight: bold;
  width: 80px;
  height: 40px;
  color: white;
  background-color: transparent;
  transition: 0.2s;
  cursor: pointer;
}
.save-btn:hover {
  background-color: #ffffff20;
}

#delete-btn {
  cursor: pointer;
  line-height: 40px;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
  color: white;
  transition: 0.2s;
}
#delete-btn:hover {
  background-color: #ffffff20;
}
</style>
