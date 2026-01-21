<template>
  <div class="h-[70%]  w-full flex flex-col justify-around">
    <div class="w-full flex justify-between">
      <div class="text-black text-sm sm:text-base md:text-lg lg:text-xl font-bold">Projets Récents</div>
      <div class="text-black hover:text-[#F79315] cursor-pointer hover:underline underline-offset-1 text-sm sm:text-base md:text-lg lg:text-xl">Voir Tout→</div>
    </div>
    <div 
      ref="scrollContainer"
      class="h-[80%] w-full flex gap-8 overflow-x-scroll hide-scrollbar"
      @mouseenter="pauseScroll"
      @mouseleave="resumeScroll"
    >
      <div
        v-for="(project, index) in displayedProjects"
        :key="`project-${index}`"
        class="projectElement h-full w-[70%] sm:w-[35%] xl:w-[30%] flex-shrink-0 flex flex-col justify-around"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <img class="h-[80%] w-full object-cover" :src="project.image" alt="" />
        <div class="text-center text-base sm:text-md md:text-xl">{{ project.title }}</div>
      </div>
    </div>
    <!-- Curseur personnalisé -->
    <div 
      ref="customCursor" 
      class="custom-cursor"
      :class="{ 'active': cursorActive }"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    >
      Ouvrir
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProjectsComponent',
  data() {
    return {
      projects: [
        { title: 'Victorian Villa, Cotonou', image: new URL('@/assets/pictures/D.jpg', import.meta.url).href },
        { title: 'Modern House, Porto-Novo', image: new URL('@/assets/pictures/D.jpg', import.meta.url).href },
        { title: 'Luxury Apartment, Calavi', image: new URL('@/assets/pictures/D.jpg', import.meta.url).href },
        { title: 'Commercial Building, Akpakpa', image: new URL('@/assets/pictures/D.jpg', import.meta.url).href },
        { title: 'Villa Contemporaine, Abomey-Calavi', image: new URL('@/assets/pictures/D.jpg', import.meta.url).href },
        { title: 'Résidence de Luxe, Cotonou', image: new URL('@/assets/pictures/D.jpg', import.meta.url).href },
        { title: 'Bureau Moderne, Parakou', image: new URL('@/assets/pictures/D.jpg', import.meta.url).href },
      ],
      scrollInterval: null,
      isPaused: false,
      cursorActive: false,
      cursorX: 0,
      cursorY: 0,
    }
  },
  computed: {
    displayedProjects() {
      // Dupliquer les projets pour créer un effet de boucle infinie
      return [...this.projects, ...this.projects]
    }
  },
  mounted() {
    this.startAutoScroll()
  },
  beforeUnmount() {
    this.stopAutoScroll()
  },
  methods: {
    startAutoScroll() {
      this.scrollInterval = setInterval(() => {
        if (!this.isPaused && this.$refs.scrollContainer) {
          const container = this.$refs.scrollContainer
          const scrollSpeed = 1 // pixels par frame
          
          container.scrollLeft += scrollSpeed
          
          // Réinitialiser le scroll quand on atteint la moitié (première série de projets terminée)
          const maxScroll = container.scrollWidth / 2
          if (container.scrollLeft >= maxScroll) {
            container.scrollLeft = 0
          }
        }
      }, 20) // Update toutes les 20ms pour un scroll fluide
    },
    stopAutoScroll() {
      if (this.scrollInterval) {
        clearInterval(this.scrollInterval)
      }
    },
    pauseScroll() {
      this.isPaused = true
    },
    resumeScroll() {
      this.isPaused = false
    },
    showCustomCursor() {
      this.cursorActive = true
      document.body.style.cursor = 'none'
    },
    hideCustomCursor() {
      this.cursorActive = false
      document.body.style.cursor = 'auto'
    },
    updateCursorPosition(e) {
      this.cursorX = e.clientX
      this.cursorY = e.clientY
    }
  }
}
</script>
<style scoped>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE et Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.projectElement {
  overflow: hidden;
}

.projectElement img {
  transition: transform 0.3s ease;
}

.projectElement:hover img {
  transform: scale(1.1);
}

.projectElement div {
  transition: color 0.3s ease;
}


.projectElement:hover div {
  color: #F79315;
  font-weight: bold;
}

.projectElement {
  cursor: none;
}

.custom-cursor {
  position: fixed;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--bg-2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 9999;
}

.custom-cursor.active {
  opacity: 1;
}
</style>
