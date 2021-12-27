<template>
  <div class="main">
    <div class="header">
      <div>e-SOP 수행</div>
    </div>
    <div>
      <div class="table-main__box">
        <div class="select-header">시나리오를 선택하세요</div>
        <div id="situation">
          <div class="select-step">상황 선택</div>
          <span v-for="situation in situationList" :key="situation.id">
            <input
              class="SituationRadio"
              type="radio"
              v-model="Info.situationSelect"
              :value="situation.id"
              v-bind:id="'radio' + situation.id"
            />
            <label
              class="SituationLabel"
              v-bind:for="'radio' + situation.id"
              style="color: #1a233a"
            >
              {{ situation.name }}
            </label>
          </span>
        </div>
        <div id="level">
          <div class="select-step">단계 선택</div>
          <div style="text-align: center">
            <input
              class="levelRadio"
              type="radio"
              v-model="Info.levelSelect"
              :value="1"
              id="level1"
            />
            <label
              class="RadioLabel"
              for="level1"
              style="color: #39da8a; border: 5px solid #39da8a"
            >
              관심
            </label>
            <input
              class="levelRadio"
              type="radio"
              v-model="Info.levelSelect"
              :value="2"
              id="level2"
            />
            <label
              class="RadioLabel"
              for="level2"
              style="color: #fdce41; border: 5px solid #fdce41"
            >
              주의
            </label>
            <input
              class="levelRadio"
              type="radio"
              v-model="Info.levelSelect"
              :value="3"
              id="level3"
            />
            <label
              class="RadioLabel"
              for="level3"
              style="color: #fdac41; border: 5px solid #fdac41"
            >
              경고
            </label>
            <input
              class="levelRadio"
              type="radio"
              v-model="Info.levelSelect"
              :value="4"
              id="level4"
            />
            <label
              class="RadioLabel"
              for="level4"
              style="color: #ff5b5c; border: 5px solid #ff5b5c"
            >
              심각
            </label>
          </div>
          <button id="sop-button" type="button" @click="openContent(Info)">
            e-SOP 수행<i class="bi bi-caret-right-fill"></i>
          </button>
        </div>
      </div>
    </div>
    <AlertCheck 
    v-if="alertCheck"
    :action="action"
    @close="alertCheck=false"
    ></AlertCheck>
  </div>
</template>

<script>
import axios from "axios";
import AlertCheck from "@/views/alert-check.vue"
export default {
  name: "MainSimulation",
  components: {
    AlertCheck,
  },
  data() {
    return {
      situationList: [],
      Info: {
        situationSelect: 0,
        levelSelect: 0,
      },
      alertCheck:false,
      action:"",
    };
  },
  created() {
    this.getSituationInfo();
  },
  methods: {
    async getSituationInfo() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/situation/"
        );
        this.situationList = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    openContent(Info) {
      if(Info.situationSelect==0||Info.levelSelect==0){
        this.action="체크";
        this.alertCheck=true;
      }
      else{
        this.$router.push(
        "/simulation?situationId=" +
          Info.situationSelect +
          "&levelId=" +
          Info.levelSelect
      );
      }
      
    },
  },
};
</script>

<style>
.main {
  width: 100%;
  height: 100%;
  background-color: #1a233a;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: auto;
}
.header {
  font-size: 30px;
  position: absolute;
  top: 0px;
  width: 100%;
  padding: 40px;
  color: #a9c7f0;
  font-weight: 550;
  height: 9%;
  line-height: 12%;
  vertical-align: center;
}
#situation {
  color: white;
  padding: 10px;
}
.SituationLabel {
  width: 290px;
  height: 120px;
  line-height: 120px;
  border-radius: 70px;
  background-color: rgba(210, 215, 228, 0.897);
  color: #1a233a;
  text-align: center;
  font-size: 1.6rem;
  display: inline-block;
  margin: 25px;
  transition: all 1s;
  font-weight: 600;
}

.SituationLabel:hover {
  cursor: pointer;
  box-shadow: 300px 0 0 0 #93c0ff91 inset;
}
.RadioLabel {
  width: 150px;
  height: 150px;
  line-height: 140px;

  text-align: center;
  font-size: 2rem;
  display: inline-block;
  margin: 40px;
  border-radius: 10px;
  transition: all 1s;
  font-weight: 600;
}

.RadioLabel:hover {
  cursor: pointer;
  box-shadow: 230px 0 0 0 #93c0ff17 inset;
}
.SituationRadio {
  display: none;
}
input[type="radio"].SituationRadio:checked + label {
  background-color: #93c0ff91;
}
.levelRadio {
  display: none;
}
input[type="radio"].levelRadio:checked + label {
  background-color: #93c0ff91;
}
#level {
  width: 100%;
  height: 50%;
  color: white;
  bottom: 0px;
}

.select-header {
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: #93c0ff91 0.5px solid;
}

.select-step {
  margin: 20px;
  padding: 2px;
  color: #9aa3a7;
  font-size: 25px;
  width: 160px;
  text-align: center;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.226);
}
.table-main__box {
  padding: 20px;
  background-color: #272e48;
  color: #a9c7f0;
  border-radius: 9px;
  overflow: auto;
  position: absolute;
  top: 9%;
  width: 95%;
  margin: 0 2.5%;
  padding-bottom: 3%;
}
#sop-button {
  float: right;
  background-color: #5a8dee;
  color: #e9ebea;
  width: 230px;
  height: 60px;
  font-size: 30px;
  font-weight: 600;
  transition: all 1s;
  border: none;
  border-radius: 10px;
}
#sop-button:hover {
  border: none;
  background-color: #5a8eee65;
}
</style>
