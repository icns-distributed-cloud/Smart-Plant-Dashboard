<template>
  <div class="MainPage">
    <Toolbar @changeDisplay="changeDisplay" />
    <Editor
      :current="current"
      :situationId="situationId"
      :level="level"
      ref="resetDelete"
    />
    <!-- <Property /> -->
    <DetailProcedure
    :current="current"
    ref="currUpdate"
    />
    <Map />
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
}



</style>
