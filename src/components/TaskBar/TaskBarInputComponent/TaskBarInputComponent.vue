<template>
  <div class="taskbar__item taskbar--input">
    <input 
    type="text"
    class="input"
    placeholder="Input u're task"
    v-model="taskInput"
    ref="taskbarInput">
  </div>
  <div class="taskbar__item taskbar--input__helper">
    <button @click="addTaskValidation">Добавить</button>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, type Ref } from 'vue'
const emit = defineEmits(['addTask'])

const input = useTemplateRef('taskbarInput')
const taskInput: Ref<string> = ref('')

function addTaskValidation(): void {
  if (!(taskInput.value == '')){
    emit('addTask', taskInput.value)
    taskInput.value = ''
    input.value?.focus()
  }
}

</script>

<style scoped>
  input{
    padding: 0;
    margin: 0;

    width: 100%;
  }

  .taskbar__item {
    height: 48px;
    padding: 8px 16px;

    box-sizing: border-box;

    display: flex;
    justify-content: start;
    align-items: center;
  }

  .taskbar--input__helper{
    justify-content: end;
    border-bottom: 1px solid #acacac;
  }
</style>