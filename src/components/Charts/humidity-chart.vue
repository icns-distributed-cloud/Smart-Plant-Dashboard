<template>
    <!--습도-->
  <div>
    <!-- 습도 큰 창 -->
    <div v-if="!smallView" class="box">
        <div class="box_title"><i class="bi bi-bar-chart-line-fill"></i>   습도
          <i class="bi bi-caret-down-fill" style="float: right"
          @click="smallView=true"
          ></i>
        </div>
        <div id="humidity" class="humid"></div>
        <div id="humidity" class="value_text" style="bottom: 50%;">{{ value }}</div>
        <div class="pct">%</div>
        <div id="humidity" class="status" style="display: flex;">
          <p v-html="icon"></p>
          <p style="margin-left: 4px;">{{ status }}</p>
        </div>
    </div>

    <!-- 습도작은 창 -->
    <div v-if="smallView" class="box smallbox">
      <div class="box_title"><i class="bi bi-bar-chart-line-fill"></i>   습도
      </div>
      <p id="humidity" class="smallValue">{{ value }}</p>
      <i class="bi bi-caret-up-fill" style="color: white;"
      @click="smallView=false"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
    name: 'value-chart',
    data() {
    return {
      smallView: false,
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
    value: {
      type: Number,
      default: 80,
    },
    rangeArray: {
      type: Array,
      default: ()=> {
          return [50, 100, 110, 120, 130, 150]
        },
    },
  },
  methods: {},
  watch: {
    value: function () {
      var d = this.value;
      for (var i=0; i<5; i++) {
          if(d >= this.rangeArray[i] && d < this.rangeArray[i+1]){
              this.color = this.infoList[i].color;
              this.icon = this.infoList[i].icon;
              this.status = this.infoList[i].status;
                break;
            }
        }
    },
  },
}

</script>

<style>
#humidity {
    color: v-bind(color);
    border-color: v-bind(color);
}

.pct {
  color: white;
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  top: 30px;
  right: 20px;
}

</style>