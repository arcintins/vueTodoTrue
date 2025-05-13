<template>
  <div class="header--outer container--outer">
    <div class="container">
      <header>
        <nav>
          <div class="nav__item">
            <object class="nav--svg" data="/public/svg/Logo.svg" type="image/svg+xml"></object>
          </div>
          <div class="nav__item">
            <input 
            type="text" 
            class="input"
            placeholder="Search"
            v-model="searchInput">
          </div>
          <div class="nav__item">
            <object class="nav--svg" data="/public/svg/Settings.svg" type="image/svg+xml"></object>
          </div>
        </nav>
      </header>
    </div>
  </div>
  <div class="main--outer container--outer">
    <div class="container">
      <main>
        <div class="main__column--left">
          <SidebarComponent 
          @changeSideBarFilter="changeSideBarFilter"/>
        </div>
        <div class="main__column--right">
          <TaskbarComponent 
          :searchInput="searchInput"
          :sideBarFilter="sideBarFilter"/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarComponent from '../components/Sidebar/SidebarComponent.vue'
import TaskbarComponent from '../components/Taskbar/TaskbarComponent.vue'

import { ref, type Ref } from 'vue'

let searchInput: Ref<string> = ref('')
let sideBarFilter: Ref<string> = ref('None')

function changeSideBarFilter(filter: string){
  sideBarFilter.value = filter
}
</script>

<style scoped>
  .header--outer{
    height: 48px;

    background-color: var(--color-background-base);
    color: var(--color-base);
  }

  header{
    height: 100%;
  }

  header > nav{
    height: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  header > nav > .nav__item{
    flex: 1 1 auto;

    display: flex;
    align-items: center;
  }

  header > nav > .nav__item:nth-last-child(2){
    justify-content: center;
  }

  header > nav > .nav__item:nth-last-child(1){
    justify-content: end;
  }

  .nav--svg{
    height: 24px;
  }

  /* MAIN */

  main{
    margin-top: 48px;

    display: flex;
    align-items: start;
    justify-content: center;
  }

  .main__column--left{
    flex: 1 1 30%;
  }

  .main__column--right{
    flex: 1 1 70%;
  }

  .main__column--left, .main__column--right{
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
  }
</style>