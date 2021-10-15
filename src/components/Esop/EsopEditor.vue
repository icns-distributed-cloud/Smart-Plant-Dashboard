<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      e-SOP 에디터 | <Icon icon="bx:bx-home-alt" />
    </div>

    <div class="table-main">
      <div>
        <div class="table-main__header">e-SOP 에디터</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "EsopEditor",

  components: {
    Icon,
  },
};
</script>

<style>
.wrapper {
  margin: 10px;
}
.table-header {
  color: #727e8c;
  font-size: 20px;
}

.table-main {
  margin: 20px;
  background-color: #272e48;
  color: #a9c7f0;
  border-radius: 9px;
  height: 600px;
}
.table-main__header {
  padding: 20px;
  font-size: 20px;
}
</style>
