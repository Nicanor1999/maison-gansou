<template>
  <div class="h-[70%] w-full flex flex-col justify-around">
    <div class="w-full flex justify-between" data-aos="fade-up">
      <div class="text-sm sm:text-base md:text-lg lg:text-xl font-bold">{{ title }}</div>
      <router-link to="/projects" class="hover:text-[#F79315] cursor-pointer hover:underline underline-offset-1 text-sm sm:text-base md:text-lg lg:text-xl">Voir Tout→</router-link>
    </div>
    <div
      ref="scrollContainer"
      class="h-[80%] w-full flex gap-8 overflow-x-scroll hide-scrollbar"
      @mouseenter="pauseScroll"
      @mouseleave="resumeScroll"
    >
      <router-link
        v-for="(project, index) in displayedProjects"
        :key="`project-${index}`"
        :to="`/projects/${project.id}`"
        class="projectElement h-full w-[70%] sm:w-[35%] xl:w-[30%] flex-shrink-0 flex flex-col justify-around"
        data-aos="fade-left"
        :data-aos-delay="(index % 4) * 100"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div v-if="project.image" class="h-[80%] w-full overflow-hidden">
          <img class="h-full w-full object-cover" :src="project.image" :alt="project.title" loading="lazy" decoding="async" />
        </div>
        <div v-else class="h-[80%] w-full bg-gray-200 flex items-center justify-center">
          <span class="material-symbols-outlined text-gray-400 text-5xl">architecture</span>
        </div>
        <div class="text-center text-base sm:text-md md:text-xl">{{ project.title }}</div>
      </router-link>
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
  props: {
    title: {
      type: String,
      default: 'Projets Récents'
    }
  },
  data() {
    return {
      projects: [],
      scrollInterval: null,
      isPaused: false,
      cursorActive: false,
      cursorX: 0,
      cursorY: 0,
    }
  },
  computed: {
    displayedProjects() {
      if (this.projects.length === 0) return []
      // Dupliquer les projets pour créer un effet de boucle infinie
      return [...this.projects, ...this.projects]
    }
  },
  mounted() {
    this.fetchProjects()
  },
  beforeUnmount() {
    this.stopAutoScroll()
  },
  methods: {
    async fetchProjects() {
      try {
        const res = await fetch('/api/v1/projects?perPage=10')
        if (res.ok) {
          const json = await res.json()
          const items = json.data || json
          this.projects = (Array.isArray(items) ? items : [])
            .filter(p => p.status) // Only published projects
            .map(p => ({
              id: p._id,
              title: p.town ? `${p.title}, ${p.town}` : p.title,
              image: this.getCoverImage(p)
            }))
          // Start auto-scroll after projects are loaded
          this.$nextTick(() => {
            this.startAutoScroll()
          })
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
      }
    },
    getCoverImage(project) {
      // Get cover image from first main-page section
      if (project.sections && project.sections.length > 0) {
        const mainPage = project.sections.find(s => s.type === 'main-page')
        if (mainPage && mainPage.images && mainPage.images.length > 0) {
          return mainPage.images[0]
        }
        // Fallback to first section with an image
        for (const section of project.sections) {
          if (section.image) return section.image
          if (section.images && section.images.length > 0) return section.images[0]
        }
      }
      return null
    },
    startAutoScroll() {
      if (this.projects.length === 0) return
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
  text-decoration: none;
  color: inherit;
}

.projectElement img {
  transition: transform 0.3s ease;
}

.projectElement:hover img {
  transform: scale(1.1);
}

.projectElement > div:last-child {
  transition: color 0.3s ease;
}

.projectElement:hover > div:last-child {
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
