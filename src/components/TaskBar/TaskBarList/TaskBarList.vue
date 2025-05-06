<template>
  <div class="tasklist" v-for="task in tasksView">
    <div class="taskbar__item">
      <div class="taskbar__item--text">
        {{ task.text }}
      </div>
      <div class="taskbar__item--date">
        {{ formatDate(task.date) }}
      </div>
      <div class="taskbar__item--checkbox">
        <input type="checkbox">
      </div>
      <div class="taskbar__item--deleteButton">
        <button class="button deleteButton" @click="removeTask(props.tasks[task.id]['id'])">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { type TaskDictionary } from '../ITask'

interface Props {
  tasks: Ref<TaskDictionary>,
  tasksShowFiltered: Ref<TaskDictionary>,
  isTasksFiltered: Boolean
}
const props = defineProps<Props>()

let tasksView: Ref<TaskDictionary> = props.tasks

watch([() => props.isTasksFiltered, () => props.tasksShowFiltered], (): void => {
  if (props.isTasksFiltered) {
    tasksView = props.tasksShowFiltered
  } else {
    tasksView = props.tasks
  }
})

const emit = defineEmits(['removeTask'])

function removeTask(taskId: string): void{
  emit('removeTask', taskId)
}

function formatDate(date: Date): string{
  let tmpDate = new Date(date)
  return (tmpDate.getDate() >= 9 ? tmpDate.getDate() : '0' + tmpDate.getDate()) + '.' + 
  (tmpDate.getMonth() >= 9 ? tmpDate.getMonth() : '0' + tmpDate.getMonth()) + '.' + 
  tmpDate.getFullYear()
}

</script>

<style scoped>
    .taskbar__item {
    min-height: 48px;
    padding: 8px 16px;

    box-sizing: border-box;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .taskbar__item--text{
    flex: 1 1 60%;
  }

  .taskbar__item--checkbox{
    flex: 1 1 5%;

    display: flex;
    justify-content: center;
  }

  .taskbar__item--date{
    flex: 1 1 10%;
  }

  .taskbar__item--deleteButton{
    flex: 1 1 10%;

    display: flex;
    justify-content: end;
  }

</style>