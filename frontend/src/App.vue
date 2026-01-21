<template>
  <div class="min-h-screen w-full flex flex-col bg-black">
    <router-view></router-view>
    
    <!-- Loader avec animation Lottie -->
    <div v-if="ui.isLoading" class="fixed inset-0 bg-[var(--bg-hidden)] flex items-center justify-center z-50">
      <div class="flex flex-col items-center gap-4">
        <Vue3Lottie 
          :animationData="loaderAnimation" 
          :height="200" 
          :width="200" 
          :loop="true"
        />
        <p class="text-white text-lg font-medium">Chargement...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import { Vue3Lottie } from 'vue3-lottie'
  import loaderAnimation from '@/assets/MG.json'
  import { useUiStore } from '@/stores/ui'
import router from './router'

const ui = useUiStore()
</script>

<style>
#app {
  /* margin: 0; */
  /* padding: 0; */
  /* background-color: darkblue; */
  display: flex;
  /* justify-content: center;
  6 */
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  /* background-color: var(--bg-3); */
}
</style>
