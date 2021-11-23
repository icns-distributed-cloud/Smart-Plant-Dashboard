<template>
<div class="DetailProcedure">
    <span> <h2> 임무목록 : {{selectedItem}} </h2> </span>
            <select 
            v-model="selectedItem" 
            class="form-control"
            @change="changeTask()">
            <option hidden>== 임무 선택 ==</option>
            <option v-for="task in taskList" :key="task.id" :value="task.title"> 
                {{ task.title }}
            </option>
            </select>
     
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
            const res = await axios.get("http://163.180.117.38:8281/api/sop-detail?level="+this.current.level+"&situationId="+this.current.situationId);
            this.taskList = res.data.data;
        }catch (err) {
        console.log(err);
      }
    },
    changeTask(){
       
    }
  },
  props: {
      // current : { level: 0, situationId: 0 }
      current: Object,
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
.task{
    width: 35%;
}

</style>