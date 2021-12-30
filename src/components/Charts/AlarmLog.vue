<template>
    <div class="box" style="width: 400px; height:250px;">
        <div style="height: 50px;">
        <div class="box_title">알람 이력</div>
         <div class="title_div"></div>
         </div>
        <div class="alarm-log-table">
        <table class="table table-bordered dataex-html5-selectors">
            <thead>
                <tr rowspan="2" class="align-top">
                    <th>닐짜</th>
                    <th>시간</th>
                    <th>위치</th>
                    <th>종류</th>
                    <th>레벨</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(alarmLog, i) in alarmLogList" in :key="i">
                    <th>{{ alarmLog.createdAt.split('T')[0].substring(5) }}</th>
                    <th>{{ alarmLog.createdAt.split('T')[1].substring(0,5) }}</th>
                    <th>{{ alarmLog.posName }}</th>
                    <th>{{ alarmLog.typeName }}</th>
                    <th :style="{color: statusList[alarmLog.sensorState][1]}">
                        {{ statusList[alarmLog.sensorState][0] }}
                    </th>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'AlarmLog',
    data() {
        return {
            alarmLogList: [],
            statusList: [
                ["안전", "#5a8dee"],
                ["관심", "#39da8a"],
                ["주의", "#fdac41"],
                ["경고", "#fdce41"],
                ["심각", "#ff5b5c"],
            ],
        }
    },
    created() {
        this.getAlarmLog();
    },
    methods: {
        async getAlarmLog() {
            try {
                const res = await axios.get(
                    "/api/abnormal-detection?page=0&size=30&sort=createdAt,DESC"
                    );
                this.alarmLogList = res.data.data.content;
                console.log("hellohellohello", this.alarmLogList);
            } catch(err) {
                console.log(err);
            }
        }
    }

}

</script>

<style>
.alarm-log-table {
    height: calc(100% - 50px);
    overflow: scroll; overflow-x: hidden;
}

.alarm-log-table::-webkit-scrollbar {
    width: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
}

.alarm-log-table::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 10px;
}




</style>