<template>
  <div class="sidebar">
    <div class="sidebar__item">All</div>
    <div class="sidebar__item">Today</div>
    <div class="sidebar__item">Complited</div>
    <div class="sidebar__item">In progress</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
  .sidebar{
    height: 100%;
    width: 100%;

    border-right: 1px solid #000000;
    box-sizing: border-box;
  }

  .sidebar > *{
    height: 48px;
    padding: 8px 16px;

    box-sizing: border-box;

    display: flex;
    justify-content: start;
    align-items: center;
  }
</style>