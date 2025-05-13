<template>
  <div class="sidebar">
    <div class="sidebar__item" 
    @click="changeSideBarFilter('None', 0)" :class="{active: isActive[0]}">All</div>
    <div class="sidebar__item" 
    @click="changeSideBarFilter('Today', 1)" :class="{active: isActive[1]}">Today</div>
    <div class="sidebar__item" 
    @click="changeSideBarFilter('Complited', 2)" :class="{active: isActive[2]}">Complited</div>
    <div class="sidebar__item" 
    @click="changeSideBarFilter('InProgress', 3)" :class="{active: isActive[3]}">In progress</div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
let isActive: Ref<boolean[]> = ref([true, false, false, false])

const emit = defineEmits(['changeSideBarFilter'])

function changeSideBarFilter(filter: string, id: number): void{
  emit('changeSideBarFilter', filter)
  for (let i: number = 0; i < isActive.value.length; i++){
    isActive.value[i] = false
  }
  isActive.value[id] = true
}
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

  .sidebar__item:hover{
    background-color: lightblue;
  }

  .active{
    font-weight: 700;
  }
</style>