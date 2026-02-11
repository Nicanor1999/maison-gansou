<template>
    <div class="navBar h-[10%] w-full bg-transparent text-gray-700 absolute top-0">
        <div class="h-full w-full">
          <div class="hidden w-full h-full sm:flex justify-center xl:items-center items-center">
            <nav class="h-[30%]  w-[40%] flex justify-around" :style="{ color: navColor }">
              <router-link
                to="/bookings"
                class="nav-link text-sm lg:text-base xl:text-base 2xl:text-lg transition-all relative"
                style="font-weight: 500;"
                active-class="nav-active"
                >Nos Apparts</router-link
              >
              <router-link
                to="/projects"
                class="nav-link text-sm lg:text-base xl:text-base 2xl:text-lg transition-all relative"
                style="font-weight: 500;"
                active-class="nav-active"
                >Projets</router-link
              >
              <router-link
                to="/services"
                class="nav-link text-sm lg:text-base xl:text-base 2xl:text-lg transition-all relative"
                style="font-weight: 500;"
                active-class="nav-active"
                >Services</router-link
              >
              <router-link
                to="/contacts"
                class="nav-link text-sm lg:text-base xl:text-base 2xl:text-lg transition-all relative"
                style="font-weight: 500;"
                active-class="nav-active"
                >Contacts</router-link
              >
            </nav>
          </div>
        </div>
    </div>
</template>
<script>
import { useUiStore } from '@/stores/ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SidebarComponent',
  setup() {
    const uiStore = useUiStore()
    const route = useRoute()
    
    const isMenuOpen = computed(() => uiStore.isMenuOpen)
    const isHomePage = computed(() => route.name === 'home' || route.path === '/')
    const isProjectSelectedPage = computed(() => route.name === 'projects-selected')
    
    // Pages avec un firstPart sombre qui nécessitent une nav blanche au début
    const hasDarkFirstPart = computed(() => isHomePage.value || isProjectSelectedPage.value)
    
    const navColor = computed(() => {
      return hasDarkFirstPart.value ? 'white' : 'var(--bg-1)'
    })
    
    const toggleMenu = () => {
      uiStore.toggleMenu()
    }
    
    return {
      isMenuOpen,
      navColor,
      toggleMenu,
    }
  },
}
</script>
<style scoped>
.nav-link {
  position: relative;
  padding-bottom: 5px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--bg-2);
  transition: all 0.6s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: var(--second-orange);
  /* font-weight: bold; */
  transform: translateY(-2px);
}

.nav-active {
  color: var(--second-orange) !important;
  font-weight: 700 !important;
}

.nav-active::after {
  width: 100%;
}

.icon-rotate-enter-active,
.icon-rotate-leave-active {
  transition: all 0.3s ease;
}

.icon-rotate-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.icon-rotate-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

.icon-rotate-enter-to,
.icon-rotate-leave-from {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
</style>
