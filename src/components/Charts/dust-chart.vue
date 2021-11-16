<template>
  <!-- 분진 -->
  <div>
  <div class="box">
    <div class="box_title"><i class="bi bi-cloud-haze"></i> 분진
      <i v-if="!smallView" class="bi bi-caret-down-fill" id="hide_icon" style="float: right"
      @click="smallView=true"
      ></i>
      <i v-if="smallView" id="hide_icon" class="bi bi-caret-up-fill" style="color: white;"
      @click="smallView=false"
      ></i>
    </div>

    <!-- 분진 큰 창 -->
    <div v-if="!smallView" class="large_view_content">
    <div id="dust" class="dust_circle">
      <div
        id="dust"
        class="dust_circle"
        style="
          width: 135px;
          height: 135px;
          border-width: 4px;
          line-height: 120px;
          flex-direction: column;
        "
      >
        <img
          style="
            position: relative;
            width: 60px;
            height: 60px;
            top: 20px;
            left: 35px;
          "
          src="../../assets/bubble.png"
        />
        <div id="dust" class="value_text" style="bottom: 20px">
          {{ value }}
        </div>
        <div
          style="
            font-size: 20px;
            color: white;
            line-height: 10%;
            position: relative;
            bottom: 40px;
          "
        >
          mg/m<sup>3</sup>
        </div>
      </div>
    </div>
    <div id="dust" class="status">
      <span v-html="icon"></span>
      <span style="margin-left: 4px">{{ status }}</span>
    </div>
  </div>

  <!-- 분진 작은 창 -->
  <div v-if="smallView" class="small_view_content">
      <div class="small_status" :style="{backgroundColor: color}">
        <div>{{ value }}<span style="font-size: 10px"> μm</span></div>
        <div style="font-weight: lighter">|</div>
        <div >{{ status }}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "dust-chart",
  data() {
    return {
      smallView: false,
    };
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "5a8dee"
    },
    icon: {
      type: String,
      default: "<i class='bi bi-emoji-laughing-fill'></i>"
    },
    status: {
      type: String,
      default: "안전",
    }
  },
};
</script>

<style>
#dust {
  color: v-bind(color);
  border-color: v-bind(color);
}
</style>