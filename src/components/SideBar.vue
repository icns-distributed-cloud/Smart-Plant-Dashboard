<template>
<div>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
  />
  <div class="side-bar">
    <div class="home" @click="$router.push('/'); menuOpen=0;">
      <i class="bi bi-globe2"></i>
      Smart M
    </div>
    <div class="menu">
      <div class="menu1">
        <i class="bi bi-display" ></i>
        대시보드
      </div>
      <div class="menu2" style="cursor:pointer;">
        <p @click="$router.push('/'); menuOpen=0;">
          <i v-if="menuOpen==0" class="bi bi-arrow-right"></i> 지능형 이상감지
        </p>
        <p @click="$router.push('/cctv'); menuOpen=1;">
          <i v-if="menuOpen==1" class="bi bi-arrow-right"></i> CCTV 영상인식
        </p>
        <p @click="$router.push('/monitoring'); menuOpen=2;">
          <i v-if="menuOpen==2" class="bi bi-arrow-right"></i> IoT 모니터링
        </p>
      </div>
    </div>

    <div class="menu">
      <div class="menu1">
        <i class="bi bi-gear" ></i>
        IoT 관리
      </div>
      <div class="menu2" style="cursor:pointer;">
        <p @click="$router.push('/sensor-manage'); menuOpen=3;">
          <i v-if="menuOpen==3" class="bi bi-arrow-right"></i> 센서 관리
        </p>

        <p @click="$router.push('/sensorpos'); menuOpen=4;">
          <i v-if="menuOpen==4" class="bi bi-arrow-right"></i> 센서 위치 등록
        </p>
      </div>
    </div>

    <div class="menu">
      <div class="menu1">
        <i class="bi bi-clipboard-check" ></i>
        e-SOP 관리
      </div>
      <div class="menu2" style="cursor:pointer;">
        <p @click="$router.push('/esop-editor'); menuOpen=5;">
          <i v-if="menuOpen==5" class="bi bi-arrow-right"></i> e-SOP 에디터
        </p>
        <p @click="$router.push('/esop-manager'); menuOpen=6;">
          <i v-if="menuOpen==6" class="bi bi-arrow-right"></i> 담당자 관리
        </p>
        <p @click="$router.push('/msglog'); menuOpen=7;">
          <i v-if="menuOpen==7" class="bi bi-arrow-right"></i> 문자메시지 기록
        </p>
      </div>
    </div>

    <div class="menu">
      <div class="menu1">
        <i class="bi bi-exclamation-triangle" ></i>
        이상 감지 관리
      </div>
      <div class="menu2" style="cursor:pointer;">
        <p @click="$router.push('/alertsettings'); menuOpen=8;">
          <i v-if="menuOpen==8" class="bi bi-arrow-right"></i> 이상 경고 설정
        </p>
        <p @click="menuOpen=9;">
          <i v-if="menuOpen==9" class="bi bi-arrow-right"></i> 이상 감지 이력
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: "SideBar",
  data() {
    return{
      menuOpen: 0,
    }

  }
};
</script>

<style>
.home {
  color: #517bcd;
  padding: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
p {
  transition: all 0.5s;
  font-size: 15px;
}

p:hover {
  color: #517bcd;
  padding-left: 5px;
}
</style>
