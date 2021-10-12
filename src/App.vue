<template>
  <div class="main-container">
    <SideBar></SideBar>
    <div class="contents">
      <div class="header">Header<i class="bi bi-search"></i></div>
      <div class="main-contents">
        <router-view></router-view>
      </div>
      <div class="footer">경희대학교</div>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
export default {
  name: "App",
  components: {
    SideBar: SideBar,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}
body {
  background-color: #787878;
}

.main-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.side-bar {
  order: 1;
  float: left;
  width: 300px;
  height: 900px;
  background-color: #1a233a;
  color: #c8d9f8;
  text-align: left;
  padding: 10px;
  box-shadow: 1px 0px 10px 3px grey;
  position: relative;
  overflow: hidden;
}

.contents {
  order: 2;
  width: 100%;
}

.header {
  width: 100%;
  height: 60px;
  background-color: #1a233a;
}
.side-bar {
  width: 300px;
  height: 900px;
  background-color: #1a233a;
  color: #c8d9f8;
  text-align: left;
  padding: 10px;
  box-shadow: 1px 0px 10px 3px grey;
  overflow: auto;
}

.main-contents {
  height: calc(100% - 120px);
  padding: 15px;
  background-color: antiquewhite;
}

.footer {
  width: 100%;
  background-color: white;
  height: 60px;
}
.menu1 {
  color: aqua;
  padding-left: 20px;
}
.menu2 {
  margin: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
