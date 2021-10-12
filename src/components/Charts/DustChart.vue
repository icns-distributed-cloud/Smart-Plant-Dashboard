<template>
  <!-- 분진 -->
  <div class="box">
    <div class="box_title">우드펠릿 버킷엘리베이터 - 분진</div>
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
        <div id="dust" style="font-weight: bold">{{ dust }}</div>
        <div
          style="
            font-size: 20px;
            color: white;
            line-height: 10%;
            position: relative;
            bottom: 15px;
          "
        >
          mg/m<sup>3</sup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DustChart",
  data() {
    return {
      color: "aqua",
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
    colorList: Array,
  },
  methods: {},
  watch: {
    dust: function () {
      var d = this.dust;
      for (var i = 0; i < 5; i++) {
        if (d >= this.dustArray[i] && d < this.dustArray[i + 1]) {
          this.color = this.colorList[i];
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