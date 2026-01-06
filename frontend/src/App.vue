<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="h-[100%] w-[95%] flex flex-col justify-between items-center bg-black sm:h-[100%] sm:w-[95%] 4xl:h-[100%] 2xl:bg-[pink]">
    <div
      class="navBar h-[22%] w-[100%] flex flex-col justify-between w-1/2 md:w-full bg-[var(--bg-nav)]"
    >
      <div class="firstPart flex flex-col justify-end items-center h-[65%] w-[100%] bg-[darkred]">
        <div class="h-[50%] w-[100%] bg-[transparent]">d</div>
        <div class="h-[40%] w-[100%] bg-[white] flex items-center justify-between rounded-[10px]">
          <div
            class="h-full w-[20%] bg-[var(--primary)] text-black flex items-center justify-center rounded-l-[10px]"
          >
            <span class="material-symbols-outlined"> menu </span>
          </div>
          <input
            type="text"
            placeholder="Rechercher"
            class="w-[60%] text-black outline-offset-[10px]"
          />
          <div class="h-[100%] w-[15%] flex items-center justify-center">
            <div class="h-[80%] w-[70%] bg-[var(--primary)] text-black flex items-center justify-center rounded-[3px]">
              <span class="material-symbols-outlined"> search </span>
            </div>
          </div>
        </div>
      </div>
      <div class="secondPart h-[30%] bg-[blue]">d</div>
    </div>
    <div class="firstSection h-[60%] w-[100%] bg-[darkgreen] ">e</div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style>
#app {
  margin: 0;
  padding: 0;
  background-color: brown;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}

body {
  display: flex;
  justify-content: center;
    height: 100vh;
  width: 100vw;
  background-color: burlywood;
}
</style>
