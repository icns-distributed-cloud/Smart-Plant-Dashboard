<template>
  <div class="MainPage">
    <Header />
    <Toolbar @changeDisplay="changeDisplay" />
    <Editor
      :current="current"
      :situationId="situationId"
      :level="level"
    />
    <!-- <Property /> -->
    <DetailProcedure
    :current="current"
    />
    <Map />
  </div>
</template>
<script>

import Header from './Header'
import Toolbar from './Toolbar'
import Editor from './Editor'
// import Property from './property'
import DetailProcedure from './DetailProcedure'
import Map from './Map'

export default {
  name: 'MainPage',
  components:{
     Header,
     Toolbar,
     Editor,
    //  Property,
    DetailProcedure,
     Map
  },
  data(){
     return{
       current: {},
     }
  },
  mounted(){
     
  },
  methods: {
    changeDisplay(current) {
      this.current = current;
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
