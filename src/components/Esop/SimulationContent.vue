<template>
  <div class="main">
    <div class="sop-header">e-SOP 수행</div>
    <div class="sop-statusbar">
      <div class="sop-label">상황</div>
      <div class="situation-name">{{ this.situationName }}</div>
      <div class="sop-label">레벨</div>
      <div
        v-if="this.levelId == 1"
        class="level-name"
        style="color: #39da8a; border: 5px solid #39da8a"
      >
        관심
      </div>
      <div
        v-else-if="this.levelId == 2"
        class="level-name"
        style="color: #fdce41; border: 5px solid #fdce41"
      >
        주의
      </div>
      <div
        v-else-if="this.levelId == 3"
        class="level-name"
        style="color: #fdac41; border: 5px solid #fdac41"
      >
        경고
      </div>
      <div
        v-else-if="this.levelId == 4"
        class="level-name"
        style="color: #ff5b5c; border: 5px solid #ff5b5c"
      >
        심각
      </div>
    </div>
    <div class="sop-diagram">
      <div class="sop-diagram-label">e-SOP 흐름도</div>

      <div
        class="sop-img"
        :style="{
          backgroundImage:
            'url(' +
            'http://163.180.117.38:8281/api/image?path=' +
            sopImgPath +
            ')',
        }"
      ></div>
    </div>
    <div class="Simulation">
      <h2>
        임무목록 수행
        <span style="float: right; margin-right: 20px">
          <button class="end" @click="SimulationEnd">종료</button>
        </span>
      </h2>
      <div>
        <div class="accordion accordion-flush" id="accordionExample">
          <div
            class="accordion-item card title__box"
            v-for="(title, index) in titleList"
            :key="index"
          >
            <div class="card-header" v-bind:id="'heading' + index">
              <button
                class="btn btn-block text-left title__main"
                type="button"
                data-toggle="collapse"
                style="color: #9fb0d6"
                v-bind:data-target="'#collapse' + index"
                aria-expanded="false"
                v-bind:aria-controls="'collapse' + index"
              >
                {{ title.title }}
                <i class="bi bi-chevron-compact-down" style="float: right"></i>
              </button>
            </div>
            <div
              v-bind:id="'collapse' + index"
              class="panel-collapse collapse"
              v-bind:aria-labelledby="'heading' + index"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <div v-for="(content, i) in ContentList" :key="i + 1">
                  <div
                    v-if="content.titleId == title.id"
                    style="height: 43px"
                    class="sop-content"
                  >
                    <span
                      style="font-size: 1.5rem; color: white"
                      v-if="content.complete == false"
                    >
                      {{ content.text }}
                    </span>
                    <span style="font-size: 1.5rem; color: #829ad0" v-else>
                      {{ content.text }}
                    </span>
                    <span style="float: right">
                      <button class="check" @click="contentCheck(content)">
                        <i
                          v-bind:id="content.id"
                          class="bi bi-check-circle false-check"
                          style="font-size: 1.5rem"
                          v-if="content.complete == false"
                        ></i>
                        <i
                          v-bind:id="content.id"
                          class="bi bi-check-circle true-check"
                          style="font-size: 1.5rem; color: #f2b707"
                          v-else
                        ></i>
                      </button>
                    </span>
                    <span v-if="content.efunction == 1" style="float: right">
                      <i
                        v-if="content.complete == false"
                        class="bi bi-envelope"
                        style="font-size: 1.5rem"
                        >SMS</i
                      >
                      <i
                        v-else
                        class="bi bi-envelope-fill"
                        style="font-size: 1.5rem; color=#7787A6;"
                        >SMS</i
                      >
                    </span>
                    <span
                      v-else-if="content.efunction == 2"
                      style="float: right"
                    >
                      <i
                        v-if="content.complete == false"
                        class="bi bi-envelope"
                        style="font-size: 1.5rem"
                        >Email</i
                      >
                      <i
                        v-else
                        class="bi bi-envelope-fill"
                        style="font-size: 1.5rem; color=#7787A6;"
                        >Email</i
                      >
                    </span>
                    <span
                      v-else-if="content.efunction == 3"
                      style="float: right"
                    >
                      <i
                        class="bi bi-broadcast-pin"
                        v-if="content.complete == false"
                        style="font-size: 1.5rem"
                      ></i>
                      <i
                        v-else
                        class="bi bi-broadcast-pin"
                        style="font-size: 1.5rem; color=#7787A6;"
                      ></i>
                    </span>
                    <span
                      v-else-if="content.efunction == 4"
                      style="float: right"
                    >
                      <i
                        class="bi bi-joystick"
                        v-if="content.complete == false"
                        style="font-size: 1.5rem"
                      ></i>
                      <i
                        v-else
                        class="bi bi-joystick"
                        style="font-size: 1.5rem; color=#7787A6;"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SimulationContent",
  data() {
    return {
      titleList: [],
      ContentList: [],
      titleIdList: [],
      levelId: 0,
      situationId: 0,
      situationName: "",
      sopImgPath: "",
    };
  },
  created() {
    this.getTitleInfo();
    this.getSituationName();
    this.getImagePath();
  },
  methods: {
    async getImagePath() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sop?level=" +
            this.levelId +
            "&situationId=" +
            this.situationId
        );
        this.sopImgPath = res.data.data.diagramImgPath;
      } catch (err) {
        console.log(err);
      }
    },
    async getSituationName() {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/situation/" + this.situationId
        );
        console.log(res.data.data);
        this.situationName = res.data.data.name;
      } catch (err) {
        console.log(err);
      }
    },
    async getTitleInfo() {
      this.levelId = this.$route.query.levelId;
      this.situationId = this.$route.query.situationId;
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sop-detail?level=" +
            this.$route.query.levelId +
            "&situationId=" +
            this.$route.query.situationId
        );
        const tempList = res.data.data;
        for (var title of tempList) {
          this.titleList.push(title);
          this.titleIdList.push(title.id);
        }
        this.getContent(this.titleIdList);
      } catch (err) {
        console.log(err);
      }
    },
    async getContent(titleIdList) {
      try {
        this.ContentList = [];
        for (var i in titleIdList) {
          const res = await axios.get(
            "http://163.180.117.38:8281/api/sop-detail/content?titleId=" +
              titleIdList[i]
          );
          const tempContList = res.data.data;
          for (var content of tempContList) {
            this.ContentList.push(content);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async contentCheck(content) {
      try {
        const res = await axios.put(
          "http://163.180.117.38:8281/api/sop-detail/content/complete/" +
            content.id
        );
        if (content.message == true) {
          this.sendMessage(content.id);
        }
        console.log(res);
        this.getContent(this.titleIdList);
      } catch (err) {
        console.log(err);
      }
    },
    async sendMessage(contentId) {
      try {
        const res = await axios.post(
          "http://163.180.117.38:8281/api/message/send?contentId=" + contentId
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    async SimulationEnd() {
      try {
        const res = await axios.put(
          "http://163.180.117.38:8281/api/sop-detail/content/end?level=" +
            this.$route.query.levelId +
            "&situationId=" +
            this.$route.query.situationId
        );
        console.log(res);
        this.getContent(this.titleIdList);
        this.$router.push("/esop-simulation");
      } catch (err) {
        console.log(err);
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

.sop-header {
  position: absolute;
  top: 0px;
  width: 100%;
  padding: 40px;
  font-size: 30px;
  color: #a9c7f0;
  font-weight: 550;
  height: 9%;
  line-height: 12%;
  vertical-align: center;

  border-bottom: 1px solid #7575753b;
}

.sop-diagram {
  margin: 1%;
  position: absolute;
  top: 9%;
  left: 11%;
  width: 37%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  position: relative;

  z-index: 1;
}
.sop-diagram-label {
  color: #55595c;
  font-weight: 600;
  font-size: 20px;
  width: 160px;
  border-radius: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.068);
}

.sop-img {
  position: absolute;
  width: 100%;
  top: 2%;
  height: 100%;
  background-size: 60% auto;
  background-repeat: no-repeat;
  background-position: center;
}
.sop-statusbar {
  position: absolute;
  padding-top: 20px;
  top: 9%;
  left: 0px;
  width: 11%;
  height: 100%;
  color: white;
  border-right: 1px solid #7575753b;
}
.situation-name {
  background-color: #93c0ff91;
  text-align: center;
  font-size: 30px;
  height: 70px;
  margin: 10px;
  line-height: 70px;
  border-radius: 10px;
  font-weight: bold;
}
.level-name {
  text-align: center;
  font-size: 30px;
  height: 70px;
  margin: 10px;
  line-height: 70px;
  border-radius: 10px;
  font-weight: bold;
}
.Simulation {
  width: 50%;
  position: absolute;
  height: 100%;
  right: 0;
  top: 9%;
  bottom: 0;
  border-left: 1px solid #7575753b;
  background-color: #1a233a;
  font-size: 14px;

  /* line-height: 26px; */
}
.check {
  background-color: #272e48;
  border: none;
  color: #b0b6c2;
}

.false-check {
  color: white;
}
.bi-check-circle {
  transition: all 1s;
}
.bi-check-circle:hover {
  cursor: pointer;
  font-size: 1.5rem;
  color: #f2b707;
}
.sop-content {
  margin-bottom: 20px;
  border-bottom: 1.5px solid #7575753f;
}
.end {
  background-color: #b0b6c2;
  color: white;
  width: 90px;
  height: 45px;
  border-radius: 10px;
  border: none;
  transition: all 1s;
}
.end:hover {
  cursor: pointer;
  background-color: #f2b707;
}

.sop-label {
  margin: 10px;
  font-size: 20px;
  color: #a3a3a3c7;
}

h2 {
  margin: 20px;
  color: #727e8c;
  font-size: 25px;
  font-weight: bold;
}
.task {
  width: 40%;
}
.accordion-button:not(.collapsed) {
  background-color: #1a233a;
}
.accordion-flush .accordion-item {
  border-radius: 9px;
}

.title__box {
  margin: 20px;
  background-color: #272e48;
  color: #b0b6c2;
  border-radius: 50px;
  height: fit-content;
}

.title__main {
  font-size: 20px;
  font-weight: 600;
}

tr {
  height: 20px;
}

.table-hover tbody tr:hover {
  background-color: #1a233a;
}
th {
  font-size: 10px;
  padding: 3px;
}
td {
  font-size: 15px;
  padding: 2px;
  color: #cedfff;
}
</style>
