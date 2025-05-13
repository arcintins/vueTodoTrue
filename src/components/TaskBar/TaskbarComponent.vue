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
import { buildTask, type ITask, type TaskDictionary} from '@/components/TaskBar/ITask'
import { type ITaskFilters } from '@/components/TaskBar/ITaskFilters'
import TaskBarInputComponent from '@/components/TaskBar/TaskBarInputComponent/TaskBarInputComponent.vue'
import TaskBarList from '@/components/TaskBar/TaskBarList/TaskBarList.vue'

interface Props{
  searchInput: String,
  sideBarFilter: String
}
const props = defineProps<Props>()

let tasksStorage: Ref<TaskDictionary> = ref({})
let LStasks = localStorage.getItem('tasks')

let tasksShowFiltered: Ref<TaskDictionary> = ref({})
let isTasksFiltered: Ref<Boolean> = ref(false)
let tasksFilters: Ref<ITaskFilters> = ref({
  'inputFilter': '',
  'sideBarFilter': 'None'
})

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

watch(() => props.sideBarFilter, (): void => {
  tasksFilters.value['sideBarFilter'] = props.sideBarFilter
})

watch(() => props.searchInput, (): void => {
  tasksFilters.value['inputFilter'] = props.searchInput
})

watch(tasksFilters.value, (): void => {
  if (tasksFilters.value['inputFilter'] !== '' ||
      tasksFilters.value['sideBarFilter'] !== 'None'){
    isTasksFiltered.value = true
    tasksShowFiltered.value = JSON.parse(JSON.stringify(tasksStorage.value))
  } else {
    isTasksFiltered.value = false
  }
  
  if (tasksFilters.value['inputFilter'] !== ''){
    tasksShowFiltered.value = Object.fromEntries(Object.entries(tasksShowFiltered.value).filter(([key, value]) => value.text.toLowerCase().includes(props.searchInput.toLocaleLowerCase())))
  }

  if (tasksFilters.value['sideBarFilter'] !== 'None'){
    if (tasksFilters.value['sideBarFilter'] === 'Complited'){
      tasksShowFiltered.value = Object.fromEntries(Object.entries(tasksShowFiltered.value).filter(([key, value]) => value.isComplited))
    }
    if (tasksFilters.value['sideBarFilter'] === 'InProgress'){
      tasksShowFiltered.value = Object.fromEntries(Object.entries(tasksShowFiltered.value).filter(([key, value]) => !value.isComplited))
    }
    if (tasksFilters.value['sideBarFilter'] === 'Today'){
      let today = new Date()
      tasksShowFiltered.value = Object.fromEntries(Object.entries(tasksShowFiltered.value).filter(([key, value]) => 
      new Date(value.date).getTime() >= +today - (today.getHours() * 60 * 60 * 1000) - +(today.getMinutes() * 60 * 1000) - (today.getSeconds() * 1000) - (today.getMilliseconds()) &&
      new Date(value.date).getTime() < +today + (today.getHours() * 60 * 60 * 1000) - +(today.getMinutes() * 60 * 1000) - (today.getSeconds() * 1000) - (today.getMilliseconds())))
    }
  }

})

watch(tasksStorage.value, (): void => {
  saveTasks()
})

</script>

<style scoped>

  .taskbar{
    height: 100%;
    width: 100%;
  }

</style>
