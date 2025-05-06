<template>
  <div class="taskbar">  
    <TaskBarInputComponent 
    @addTask="addTask"/>
    <TaskBarList 
    :tasks="tasksStorage" 
    :tasksShowFiltered="tasksShowFiltered"
    :isTasksFiltered="isTasksFiltered"
    @removeTask="removeTask"/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { buildTask, type ITask, type TaskDictionary} from './ITask'
import TaskBarInputComponent from './TaskBarInputComponent/TaskBarInputComponent.vue'
import TaskBarList from './TaskBarList/TaskBarList.vue'

interface Props{
  searchInput: String,
}
const props = defineProps<Props>()

let tasksStorage: Ref<TaskDictionary> = ref({})
let LStasks = localStorage.getItem('tasks')

let tasksShowFiltered: Ref<TaskDictionary> = ref({})
let isTasksFiltered: Ref<Boolean> = ref(false)

if (LStasks !== null){
  tasksStorage.value = JSON.parse(LStasks)
}

function addTask(taskText: string): void{
  let newTask: ITask = buildTask(taskText, new Date())
  tasksStorage.value[newTask.id] = newTask
}

function removeTask(taskId: string): void{
  delete tasksStorage.value[taskId]
}

function saveTasks(): void{
  localStorage.setItem('tasks', JSON.stringify(tasksStorage.value))
}

watch(() => props.searchInput, (): void => {
  if (props.searchInput !== '' &&
      LStasks !== null){
    isTasksFiltered.value = true
    tasksShowFiltered.value = JSON.parse(JSON.stringify(tasksStorage.value))
    tasksShowFiltered.value = Object.fromEntries(Object.entries(tasksShowFiltered.value).filter(([key, value]) => value.text.toLowerCase().includes(props.searchInput.toLocaleLowerCase()) ))
    console.log(tasksShowFiltered.value)
  } else {
    isTasksFiltered.value = false
  }
})

watch(tasksStorage.value, (): void => {
  saveTasks()
})

</script>

<style scoped>

  :root{
    --test{
      background-color: aqua;
    }
  }

  .taskbar{
    height: 100%;
    width: 100%;
    @apply --test;
  }


</style>