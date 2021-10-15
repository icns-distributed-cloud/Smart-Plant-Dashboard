<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      담당자 관리 | <Icon icon="bx:bx-home-alt" />
    </div>

    <div class="table-main">
      <div>
        <div class="table-main__header">담당자 관리</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "EsopManager",

  components: {
    Icon,
  },
};
</script>

<style>
</style>
