<template>
  <!-- 분진 -->
  <div class="box">
    <div class="box_title"><i class="bi bi-bar-chart-line-fill"></i> 분진</div>
    <div id="dust" class="dust_circle">
      <div
        id="dust"
        class="dust_circle"
        style="
          width: 145px;
          height: 145px;
          border-width: 4px;
          line-height: 120px;
          flex-direction: column;
        "
      >
        <img
          style="
            position: relative;
            width: 70px;
            height: 70px;
            top: 20px;
            left: 35px;
          "
          src="../../assets/bubble.png"
        />
        <div id="dust" class="value_text" style="bottom: 20px">
          {{ dust }}
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
</template>

<script>
export default {
  name: "dust-chart",
  data() {
    return {
      color: "#5a8dee",
      icon: "<i class='bi bi-emoji-laughing-fill'></i>",
      status: "안전",
      infoList: [
        {
          color: "#5a8dee",
          status: "안전",
          icon: "<i class='bi bi-emoji-laughing-fill'></i>",
        },
        {
          color: "#00cfdd",
          status: "관심",
          icon: "<i class='bi bi-emoji-smile-fill'></i>",
        },
        {
          color: "#39da8a",
          status: "주의",
          icon: "<i class='bi bi-emoji-neutral-fill'></i>",
        },
        {
          color: "#fdac41",
          status: "경고",
          icon: "<i class='bi bi-emoji-frown-fill'></i>",
        },
        {
          color: "#ff5b5c",
          status: "심각",
          icon: "<i class='bi bi-exclamation-triangle-fill'></i>",
        },
      ],
    };
  },
  props: {
    dust: {
      type: Number,
      default: 80,
    },
    dustArray: {
      type: Array,
      default: () => {
        return [50, 100, 110, 120, 130, 150];
      },
    },
  },
  methods: {},
  watch: {
    dust: function () {
      var d = this.dust;
      for (var i = 0; i < 5; i++) {
        if (d >= this.dustArray[i] && d < this.dustArray[i + 1]) {
          this.color = this.infoList[i].color;
          this.icon = this.infoList[i].icon;
          this.status = this.infoList[i].status;
          break;
        }
      }
    },
  },
};
</script>

<style>
#dust {
  color: v-bind(color);
  border-color: v-bind(color);
}
</style>