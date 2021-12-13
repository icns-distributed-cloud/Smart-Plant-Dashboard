<template>
  <div class="MainPage">
    <div class="page-title">
      e-SOP 에디터
    </div>
    <div style="width: 100%; height: 91%;">
      <div class="diagram-editor-wrapper">
        <Toolbar @changeDisplay="changeDisplay" />
        <div class="editor-wrapper">
          <Editor
            :current="current"
            :situationId="situationId"
            :level="level"
            ref="resetDelete"
          />
        </div>


      </div>
      <div class="procedure-editor-wrapper">
        <!-- <Property /> -->
        <DetailProcedure
        :current="current"
        ref="currUpdate"
        />
        <Map />
      </div>
    </div>
  </div>
</template>
<script>
import Toolbar from './Toolbar'
import Editor from './Editor'
// import Property from './property'
import DetailProcedure from './DetailProcedure'
import Map from './Map'

export default {
  name: 'MainPage',
  components:{
     Toolbar,
     Editor,
    //  Property,
    DetailProcedure,
     Map
  },
  data(){
     return{
       // current : { situationId : 0, level : 0 }
       current: {},
     }
  },
  mounted() {
     this.$refs.currUpdate.getTitleInfo(this.current);
  },
  methods: {
    changeDisplay(current) {
      this.current = current;
      this.$refs.currUpdate.getTitleInfo(current);
      this.$refs.resetDelete.resetDeleteNodeIdList();
    }
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
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  background-color: #1a233a;
  overflow: hidden;
}

.page-title {
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

.diagram-editor-wrapper {
  width: 50%;
  height: 100%;
  display: flex;
}

.procedure-editor-wrapper {
  width: 50%;
  height: 100%;
}

.editor-wrapper {
  width: calc(100% - 210px);
  height: 100%;
  padding: 20px 20px 0px 20px;
  border-left: 1px solid #7575753b;
  border-right: 1px solid #7575753b;
}

</style>
