<template>
  <div class="DetailProcedure">
    <h2>임무 내용 작성</h2>
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
              <i class="bi bi-chevron-compact-down" style="float:right;"></i>
            </button>
          </div>
          <div
            v-bind:id="'collapse' + index"
            class="panel-collapse collapse"
            v-bind:aria-labelledby="'heading' + index"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <button
                type="button"
                class="btn btn-primary"
                style="margin-bottom: 12px; margin-left: 12px; float: right"
                @click="readyToAdd(title)"
              >
                상세임무 추가
              </button>
              <div style="width: 100%; display: flex; justify-content: center">
                <table
                  class="table table-bordered table-hover"
                  style="width: 95%"
                  v-bind:id="titleId"
                >
                  <thead>
                    <tr>
                      <th style="min-width: 160px">상세임무</th>
                      <th style="width: 80px">기능</th>
                      <th style="min-width: 200px">정보(문자,이메일,방송내용,url)</th>
                      <th style="width: 150px">ACTION</th>
                    </tr>
                  </thead>
                  <tbody v-for="(content, i) in ContentList" :key="i + 1">
                    <tr v-if="content.titleId == title.id">
                      <td>{{ content.text }}</td>
                      <td v-if="content.efunction == 4">BIMS</td>
                      <td v-else-if="content.efunction ==1">문자</td>
                      <td v-else-if="content.efunction ==2">EMail</td>
                      <td v-else-if="content.efunction ==3">내부방송</td>
                      <td v-else></td>
                      <td>{{ content.info }}</td>
                      <td
                        style="
                          vertical-align: middle;
                          padding-right: 0px;
                          padding-left: 0px;
                          text-align: center;
                        "
                      >
                        <a
                          class="btn btn-outline-primary mod-btn"
                          @click="readyToEdit(content)"
                          >수정
                        </a>

                        <a
                          class="btn btn-outline-danger tr_data_del"
                          @click="deleteContent(content.id)"
                          >삭제</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <contentModal
      v-if="showModal"
      :titleId="titleId"
      @close="showModal = false"
      @add-new-content="addNewContent"
    />
    <EditContentModal
      v-if="showEditContent"
      :contentid="contentid"
      :efunction="efunction"
      :info="info"
      :posId="posId"
      :contentText="contentText"
      :titleId="titleId"
      @edit-content="editContent"
      @close="showEditContent = false"
    >
    </EditContentModal>
    <AlertSuccess
      v-if="alertSuccess"
      :action="action"
      @close="alertSuccess = false"
    ></AlertSuccess>
    <AlertFail
      v-if="alertFail"
      :action="action"
      @close="alertFail = false"
    ></AlertFail>
  </div>
</template>

<script>
import axios from "axios";
import contentModal from "@/components/SOPEditor/contentModal.vue";
import EditContentModal from "@/components/SOPEditor/EditContentModal.vue";
import AlertSuccess from "@/views/alert-success.vue";
import AlertFail from "@/views/alert-fail.vue";
import eventBus from "../../eventbus";

export default {
  name: "addcontent",
  components: {
    contentModal,
    EditContentModal,
    AlertSuccess,
    AlertFail,
  },
  data() {
    return {
      titleList: [],
      text: "",
      selected: "",
      showModal: false,
      contentid: 0,
      ContentList: [],
      message: false,
      messageContent: "",
      posId: "",
      contentText: "",
      titleId: 0,
      showEditContent: false,
      titleIdList: [],
      alertFail: false,
      alertSuccess: false,
      action: "",
    };
  },
  props: {
    current: Object,
  },
  watch: {
    current: function () {
      this.getTitleInfo();
    },
  },
  mounted() {
    eventBus.$on("updateDiagram", () => {
      this.getTitleInfo(this.current);
    });
  },
  beforeDestroy() {
    eventBus.$off("updateDiagram");
  },
  methods: {
    async getTitleInfo(current) {
      try {
        const res = await axios.get(
          "http://163.180.117.38:8281/api/sop-detail?level=" +
            current.level +
            "&situationId=" +
            current.situationId
        );
        this.titleList = [];
        this.titleIdList = [];
        const tempList = res.data.data;
        for (var title of tempList) {
          this.titleList.push(title);
          this.titleIdList.push(title.id);
        }
        console.log("!@!@!@!@");
        console.log("current", this.current);
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

    async addNewContent(newContent) {
      this.action = "등록";
      try {
        const res = await axios.post(
          "http://163.180.117.38:8281/api/sop-detail/content",
          {
            efunction: newContent.efunction,
            info: newContent.info,
            posId: newContent.posId,
            text: newContent.text,
            titleId: newContent.titleId,
          }
        );
        this.alertSuccess = true;
        this.getContent(this.titleIdList);
        this.showModal = false;

        console.log(res);
      } catch (err) {
        this.alertFail = true;
        console.log(err);
      }
    },
    readyToAdd(title) {
      this.titleId = title.id;
      this.showModal = true;
    },

    readyToEdit(content) {
      this.contentid = content.id;
      this.efunction = content.efunction;
      this.info = content.info;
      this.contentText = content.text;
      this.posId = content.posId;
      this.titleId = content.titleId;
      this.showEditContent = true;
    },

    async editContent(newContent) {
      this.action = "수정";
      try {
        const res = await axios.put(
          "http://163.180.117.38:8281/api/sop-detail/content/" + newContent.id,
          {
            efunction: newContent.efunction,
            info: newContent.info,
            posId: newContent.posId,
            text: newContent.text,
            titleId: newContent.titleId,
          }
        );
        console.log(res);
        this.alertSuccess = true;
        this.getContent(this.titleIdList);
        this.showEditContent = false;
      } catch (err) {
        this.alertFail = true;
        console.log(err);
      }
    },

    async deleteContent(contentid) {
      this.action = "삭제";
      try {
        const res = await axios.delete(
          "http://163.180.117.38:8281/api/sop-detail/content/" + contentid
        );
        console.log(res);
        this.alertSuccess = true;
        this.getContent(this.titleIdList);
      } catch (err) {
        this.alertFail = true;
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.DetailProcedure {
  width: 50%;
  position: absolute;
  right: 0;
  top: 40px;
  bottom: 0;
  border-left: 1px solid #e6e9ed;
  background-color: #1a233a;
  font-size: 14px;

  /* line-height: 26px; */
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

.title__box {
  margin: 20px;
  background-color: #272e48;
  color: #b0b6c2;
  border-radius: 9px;
  height: fit-content;
}
.title__main {
  font-size: 20px;
  font-weight: 600;
}
.card-header {
  padding: 5px;
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
