<template>
    <!--습도-->
    <div class="box" style="top: 20px;">
        <div class="box_title">우드펠릿 버킷엘리베이터 습도</div>
        <div id="humidity" class="humid"></div>
        <div id="humidity" class="value_text" style="bottom: 50%;">{{ humidity }}</div>
    </div>

</template>

<script>
export default {
    name: 'HumidityChart',
    data() {
    return {
      color: "aqua",
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
    colorList: Array,
  },
  methods: {},
  watch: {
    humidity: function () {
      var d = this.humidity;
      for (var i=0; i<5; i++) {
          if(d >= this.humidityArray[i] && d < this.humidityArray[i+1]){
              this.color = this.colorList[i];
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

</style>