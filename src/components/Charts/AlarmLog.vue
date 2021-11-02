<template>
    <div class="box" :draggable="true" style="position: absolute; right: 350px; bottom:40px; width: 400px; height:200px;">
        <div class="box_title">알람이력</div>
         <div class="title_div"></div>
        <table class="table table-bordered dataex-html5-selectors">
            <thead>
                <tr rowspan="2" class="align-top">
                    <th>일시</th>
                    <th>유형</th>
                    <th>레벨</th>
                    <th>위치</th>
                    <th>구역</th>
                    <th>맵구역</th>
                </tr>
            </thead>
        </table>
        <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close-add-modal')"
            >
              닫기
            </button>

    </div>
</template>

<script>
export default {
    name: 'AlarmLog',
}

</script>

<style>

</style>