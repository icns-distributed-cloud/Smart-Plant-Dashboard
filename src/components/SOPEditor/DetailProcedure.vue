<template >
<div class="DetailProcedure">
    <h2>임무 내용 작성</h2>
  <div class="accordion" >
  <div class="accordion-item" v-for="(title,index) in titleList" :key="index">
    <h2 class="accordion-header" v-bind:id="'heading'+index">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" style="background-color:#1a233a; color:#9fb0d6;"
      v-bind:data-bs-target="'#collapse'+index" aria-expanded="false" v-bind:aria-controls="'collapse'+index">
        {{ title }}
      </button>
    </h2>
    <div v-bind:id="'collapse'+index" class="accordion-collapse collapse" v-bind:aria-labelledby="'heading'+index">
        <div class="accordion-body">
            <button
                type="button"
                class="btn"
                style="margin-bottom: 20px; margin-left: 5px; float:right; background-color:#1a233a; color:#9fb0d6;"
                @click="showModal = true"
              >
                상세임무 추가
              </button>
              <div style="width: 100%; display: flex; justify-content: center;">
              <table class="table table-bordered table-hover" style="width: 95%;">
                <thead>
                  <tr>
                    <th>상세임무</th>
                    <th>문자</th>
                    <th>담당부서</th>
                    <th>문자 내용</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="content in contentList" :key="content.Id">
                    <td>{{ content.text }}</td>
                    <td v-if="content.message ==true">O</td>
                    <td v-else>X</td>
                    
                    <td>{{ content.posName }}</td>
                    <td>{{ content.messageContent }}</td>
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
  <contentModal 
    v-if="showModal"
    @close="showModal = false"
    @add-new-content="addNewContent"
    />
    <EditContentModal
    v-if="showEditContent"
    :contentid="contentid"
    :message="message"
    :messageContent="messageContent"
    :posId ="posId"
    :contentText="contentText"
    :titleId="titleId"
    @edit-content="editContent"
    @close="showEditContent=false"
  >
  </EditContentModal>
</div> 
</template>

<script>
import axios from "axios";
import contentModal from "@/components/SOPEditor/contentModal.vue";
import EditContentModal from "@/components/SOPEditor/EditContentModal.vue"
export default {
    name: 'addcontent',
    components:{
        contentModal,
        EditContentModal
    },
    data(){
      return{
          titleList:[],
          text:"",
          selected:"",
          showModal:false,
          contentList:[],
          contentid:0,
          message :false,
          messageContent :"",
          posId:"",
          contentText : "",
          titleId :0,
          showEditContent:false,
      }
    },
    created(){
      this.getTitleInfo();
      this.getContent();
    },
    methods: {
    async getTitleInfo() {
        try{
            const res = await axios.get("http://163.180.117.38:8281/api/sop-detail?level=1&situationId=1");
             const tempList = res.data.data;
            for (var title of tempList) {
                this.titleList.push(title.title);
                this.getContent(title.id)
            }
        }catch (err) {
        console.log(err);
      }
    },

    async getContent() {
          try {
            const res = await axios.get("http://163.180.117.38:8281/api/sop-detail/content?titleId=2");
            this.contentList = res.data.data;
      } catch (err) {
        console.log(err);
      }
      
    },

     async addNewContent(newContent) {
      try {
        const res = await axios.post(
          "http://163.180.117.38:8281/api/sop-detail/content",
          {
            message: newContent.message,
            messageContent: newContent.messageContent,
            posId: newContent.posId,
            text: newContent.text,
            titleId:2,
          }
        );
        this.getContent();
        this.showModal = false;

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

     readyToEdit(content) {
      this.contentid = content.id;
      this.message = content.message;
      this.messageContent = content.messageContent;
      this.contentText = content.text;
      this.posId=content.posId;
      this.titleId =content.titleId ;
      this.showEditContent=true;
    },

    async editContent(newContent) {
      console.log(newContent);
      try { 
        const res = await axios.put(
          "http://163.180.117.38:8281/api/sop-detail/content/" + newContent.id,
          {
            message: newContent.message,
            messageContent: newContent.messageContent,
            posId: newContent.posId,
            text: newContent.text,
            titleId:2,
          }
        );
        console.log(res);
        this.getContent();
        this.showEditContent = false;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteContent(contentid) {
      try {
        const res = await axios.delete(
          "http://163.180.117.38:8281/api/sop-detail/content/" + contentid
        );
        console.log(res);
        this.getContent();
      } catch (err) {
        console.log(err);
      }
    },

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
    width: 40%;
}
.accordion-button:not(.collapsed){
  background-color: #1a233a;
}
</style>