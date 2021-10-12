<template>
  <div style="display: flex; flex-direction: row; height: 100%">
    <SideBar></SideBar>
    <div style="width: 100%">
      <div class="title">Header<i class="bi bi-search"></i></div>
      <div style="height: 100%; padding: 15px">
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
body {
  background-color: #787878;
}

.title {
  width: 100%;
  height: 60px;
  background-color: #1a233a;
}
.side-bar {
  width: 300px;
  height: 100%;
  background-color: #1a233a;
  color: #c8d9f8;
  text-align: left;
  padding: 10px;
  box-shadow: 1px 0px 10px 3px grey;
  overflow: auto;
}

.footer {
  width: 100%;
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
  text-align: center;
  color: #2c3e50;
}
</style>
