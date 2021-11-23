<template>
<div class="DetailProcedure">
    <div id="task">
        <select 
        v-model="selectedItem" 
        class="form-control"
        @change="changeTask()">
        <option hidden>== 임무 선택 ==</option>
        <option v-for="task in taskList" :key="task.id" :value="task.title"> 
            {{ task.title }}
        </option>
        </select>
        <div> {{selectedItem}} </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'DetailProcedure',
    data(){
      return{
          taskList:[],
          selectedItem:""
      }
  },
  created(){
      this.getTaskInfo();
  },
  methods: {
    async getTaskInfo() {
        try{
            const res = await axios.get("http://163.180.117.38:8281/api/sop-detail?level=1&typeId=1");
            this.taskList = res.data.data;
        }catch (err) {
        console.log(err);
      }
    },
    changeTask(value){
        console.log(value);
    
    }
  }
}

</script>

<style>
.DetailProcedure{
    width: 50%;
    position: absolute;
    right: 0;
    top:40px;
    bottom:0;
    border-left:1px solid #e6e9ed;
    background: #fff;
    font-size:14px;
    /* line-height: 26px; */
    /* user-select: none;
    -webkit-user-select: none; */
}


</style>