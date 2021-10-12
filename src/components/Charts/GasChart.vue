<template>
    <!--가스-->
    <div class="box" style="position: absolute; right:270px;">
        <div class="box_title">우드펠릿 버킷엘리베이터 - 가스</div>
        <div id="noise-chart1"></div>
        <div class="value_text">{{gas}}</div>
    </div>
</template>

<script>
export default {
    name: 'GasChart',
    props: {
        gas: {
            type: Number,
            default: 0,
        }
    }
}
</script>

<style>

</style>