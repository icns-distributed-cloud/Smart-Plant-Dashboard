<template>
  <div class="main-container">
    <SideBar></SideBar>
    <div class="contents">
      <div class="header">
        <div class="header-left">
          <h3 style="color: #daa520; font-weight: 800">
            지능형 이상감지 - 대시보드

            <i
              class="bi bi-search"
              style="color: #6e6e6e; padding-left: 900px; font-size: 20px"
            ></i>
            <i
              class="bi bi-bell"
              style="color: #6e6e6e; padding-left: 30px; font-size: 20px"
            ></i>
          </h3>
        </div>
      </div>
      <div class="main-contents">
        <router-view></router-view>
      </div>
      <div class="footer">2021 Smart Monitoring system</div>
    </div>
  </div>
</template>

<script>
//import Stomp from 'webstomp-client'
//import SockJS from 'sockjs-client'
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar: SideBar,
  },

  /*
  created() {
    this.connect()
  },
  methods: {
    connect() {
      const serverURL = "http://localhost:8080"
      let
    }
  }
  */
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}
body {
  background-color: black;
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
  height: 100%;
  background-color: #1a233a;
  color: #c8d9f8;
  text-align: left;
  padding: 10px;
  position: relative;
  overflow: hidden;
  border-right: #464d5c 1px solid;
}
.wrapper {
  margin: 10px;
}
.table-header {
  color: #727e8c;
  font-size: 20px;
}

.table-main {
  margin: 20px;
  background-color: #272e48;
  color: #a9c7f0;
  border-radius: 9px;
  height: 600px;
}
.table-main__header {
  padding: 20px;
  font-size: 20px;
}

.contents {
  order: 2;
  width: 100%;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 40px;
  background-color: #1a233a;
}

.header-left {
  padding-top: 13px;
  padding-left: 13px;
}

.main-contents {
  height: calc(100% - 80px);
  padding: 15px;
  background-color: #1a233a;
}

.footer {
  width: 100%;
  background-color: #1a233a;
  height: 40px;
  margin: 0 auto;
  text-align: right;
  padding-right: 15px;
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
  font-family: "Nanum Gothic", sans-serif;
  height: 100%;
  color: #2c3e50;
}
</style>
