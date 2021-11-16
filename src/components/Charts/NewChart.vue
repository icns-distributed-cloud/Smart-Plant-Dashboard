<template>
<div class="chart-container">
    <div class="chart-header">
        <div class="chart-name-wrapper">
            <i :class="sensor.icon"></i>
            <span>{{ sensor.ssName }}</span>
            <span>{{ sensor.ssCode }}</span>
        </div>
        <i style="margin-left: 10px; color: white;" class="bi bi-caret-down-fill"></i>
    </div>
    <div v-if="!smallView" class="large-content-wrapper">
        <div class="value-wrapper">
            <div id="status-color" class="sensor-value">{{ value }}</div>
            <span class="sensor-unit">{{ sensor.unit }}</span>
        </div>

        <div class="chart-footer-wrapper">
            <div class="status-wrapper">
                <div id="status-color" class="status-text">
                    <i :class="icon"></i>
                    {{ status }}
                </div>
                <div class="status-triangle"></div>
            </div>

            <div class="bar-wrapper">
                <div class="bar"
                    v-for="(len, i) in bar_len_list" :key="i"
                    :style="{width: len, backgroundColor: color_list[i]}"
                ></div>
            </div>
        </div>
    </div>
    <div v-if="smallView" class="small_view_content">
        <div class="small_status" :style="{ backgroundColor: color }">
        <div>{{ value }}<span style="font-size: 12px"> %</span></div>
        <div style="font-weight: lighter;">|</div>
        <div>{{ status }}</div>
    </div>
    </div>
</div>


</template>
<script>
export default {
    name: "new-chart.vue",
    data() {
        return {
            smallView: false,
            color_list: ["#5a8dee", "#39da8a", "#fdac41", "#fdce31", "#ff5b5c"],
            bar_len_list: [],
            bar_value_pos: 0,
            ratio: 0,
        }
    },
    props: {
        sensor: {
            type: Object,
            default: () => {
                return {
                    ssName: "온도",
                    ssCode: "I-T-1",
                    icon: "bi bi-thermometer-half",
                    unit: "°C",
                    range_list: [10, 30, 50, 60, 70, 80, 100]
                }
            }
        },
        value: {
            type: Number,
            default: 10,
        },
        color: {
            type: String,
            default: "#5a8dee"
        },
        icon: {
            type: String,
            default: "bi bi-emoji-laughing-fill"
        },
        status: {
            type: String,
            default: "안전",
        }
    },
    created() {
        this.calculateBarVal();
    },
    methods: {
        calculateBarVal() {
            const maxLen = this.sensor.range_list[4] - this.sensor.range_list[0];
            for (var i = 0; i < 5; i++) {
                var len = (this.sensor.range_list[i+1] - this.sensor.range_list[i]) / maxLen * 100 + "%";
                this.bar_len_list[i] = len;
            }
            console.log(this.bar_len_list);
            this.calcVarPos();
        },
        calcVarPos() {
            if (this.value < this.sensor.range_list[0]) {
                this.bar_value_pos = "0%";
            } else {
                this.bar_value_pos = (this.value - this.sensor.range_list[0]) / 100 + "%";
            }
        }
    },
    watch: {
        value: function() {
            this.calcVarPos();
        }
    }
}
</script>
<style>
.chart-container {
    position: relative;
    width: 100%;
    height: 24%;
    background-color: rgba(26, 35, 58, 0.5);
    border-radius: 5%;
    overflow: hidden;
}

.chart-header {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
}

.chart-name-wrapper {
    color: white;
    font-weight: bold;
    background-color: rgba(26, 35, 58, 0.5);
    font-size: 1rem;
    padding: 2%;
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    border-radius: 0px 0px 10px 0px;
}

.small-content-warpper {
    width: 100%;
    height: 80%;
}

.large-content-wrapper {
    width: 100%;
    height: 80%;
}

.value-wrapper {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    position: relative;
    top: 10%;
}

.sensor-value {
    font-size: 4.2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(26, 35, 58, 0.5);
}

.sensor-unit {
    color: white;
    font-weight: bold;
    font-size: 1rem;
    position: relative;
    top: 50%;
}

.chart-footer-wrapper {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
}

.status-wrapper {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.status-text {
    font-size: 0.75rem;
    font-weight: bold;
    background-color: rgba(26, 35, 58, 1);
    padding: 2px;
    width: 50px;
    border-radius: 5%;
    display: flex;
    justify-content: space-around;
}

.status-triangle {
  width: 0px; height: 0px;
  border-bottom:1rem solid none;
  border-top: 1rem solid rgba(26, 35, 58, 1);
  border-right: 0.5rem solid transparent;
  border-left: 0.5rem solid  transparent;
}

.bar-wrapper {
    width: 100%;
    height: 15px;
    opacity: 0.6;
    display: flex;
}

.bar {
    height: 100%;
}

#status-color {
    color: #5a8dee;
}

</style>