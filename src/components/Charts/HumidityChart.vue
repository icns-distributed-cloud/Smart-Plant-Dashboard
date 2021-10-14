<template>
    <!--습도-->
    <div class="box" style="top: 20px;">
        <div class="box_title"><i class="bi bi-bar-chart-line-fill"></i>   습도</div>
        <div id="humidity" class="humid"></div>
        <div id="humidity" class="value_text" style="bottom: 50%;">{{ humidity }}</div>
        <div class="pct">%</div>
        <div id="humidity" class="status">
          <span v-html="icon"></span>
          <span style="margin-left: 4px;">{{ status }}</span>
        </div>
    </div>

</template>

<script>
export default {
    name: 'HumidityChart',
    data() {
    return {
      color: "aqua",
      icon: "<i class='bi bi-emoji-laughing-fill'></i>",
      status: "안전"
    };
  },
  props: {
    humidity: {
      type: Number,
      default: 80,
    },
    humidityArray: {
      type: Array,
      default: ()=> {
          return [50, 100, 110, 120, 130, 150]
        },
    },
    infoList: Object,
  },
  methods: {},
  watch: {
    humidity: function () {
      var d = this.humidity;
      for (var i=0; i<5; i++) {
          if(d >= this.humidityArray[i] && d < this.humidityArray[i+1]){
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
  font-size: 50px;
  font-weight: bold;
  position: absolute;
  top: 30px;
  right: 20px;
}

</style>