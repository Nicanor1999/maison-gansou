<template>
  <div class="h-auto w-screen bg-white pt-[20%] md:pt-[7%] flex flex-col items-center">
    <FilterComponent @apply-filters="handleApplyFilters" />
    <div
      @click="toggleFilter"
      :class="[
        'filter h-[6vh] md:h-[8vh] w-[35%] md:w-[12%] rounded-[8px] border flex justify-center items-center gap-2 hover:cursor-pointer transition-all duration-300 sticky top-[80px]',
        isFilterOpen
          ? 'bg-[var(--bg-1)] border-[var(--bg-1)]'
          : 'border-[var(--vt-c-text-dark-2)] hover:border-[var(--bg-1)]',
      ]"
    >
      <div
        :class="[
          'text-[18px] md:text-[16px] 2xl:text-[22px] transition-colors duration-300',
          isFilterOpen ? 'text-[var(--second-orange)]' : 'text-[var(--vt-c-text-dark-2)]',
        ]"
      >
        FILTRER
      </div>
      <span
        :class="[
          'material-symbols-outlined icon-size transition-colors duration-300',
          isFilterOpen ? 'text-[var(--second-orange)]' : '',
        ]"
      >
        {{ isFilterOpen ? 'close' : 'filter_alt' }}
      </span>
    </div>
    <div class="h-auto w-[93%]">
      <div class="h-[2vh] md:h-[1vh] w-full flex items-end">
        <div class="h-[50%] w-full flex justify-center md:justify-end"></div>
      </div>
      <div class="h-[30vh] md:h-[50vh] w-full flex justify-center items-center">
        <h2
          class="font-bold text-[var(--bg-1)] tracking-[7px] text-[25px] md:text-[40px] text-center"
        >
          DES ESPACES MAJESTUEUX
        </h2>
      </div>
    </div>
    <div class="grid grid-rows-3 md:grid-cols-3 gap-10 h-auto w-[93%]">
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(1)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(2)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(3)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(4)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(5)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(6)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(7)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(8)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
      <div
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(9)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            class="h-full rounded-none w-full object-cover"
            src="@/assets/pictures/J.jpg"
            alt=""
          />
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">Modern House, Porto-Novo</div>
          <div class="text-[var(--vt-c-text-dark-2)]">Residentiel</div>
        </div>
      </div>
    </div>
    <div
      class="h-[30vh] md:h-[60vh] w-[93%] flex items-center justify-center tracking-[3px] text-[var(--vt-c-text-dark-2)]"
    >
      VOIR PLUS
    </div>
    <div class="h-[50vh] md:h-screen w-[93%]">
      <ServicesComponent />
    </div>
        <div
      class="footerPart relative h-[85vh] bg-[var(--bg-1)] w-screen flex justify-center items-center border-[var(--bg-2)] border-t-4"
    >
      <FooterComponent />
    </div>
    
    <!-- Curseur personnalisé -->
    <div
      ref="customCursor"
      class="custom-cursor"
      :class="{ active: cursorActive }"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    >
      Ouvrir
    </div>
  </div>
</template>
<script>
import FilterComponent from '@/components/ui/FilterComponent.vue'
import { useUiStore } from '@/stores/ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ServicesComponent from '@/components/ui/ServicesComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'

export default {
  name: 'ProjectsPublicView',
  components: {
    FilterComponent,
    ServicesComponent,
    FooterComponent,
  },
  setup() {
    const uiStore = useUiStore()
    const router = useRouter()
    const cursorActive = ref(false)
    const cursorX = ref(0)
    const cursorY = ref(0)

    const isFilterOpen = computed(() => uiStore.isFilterOpen)

    const toggleFilter = () => {
      uiStore.toggleFilter()
    }

    const handleApplyFilters = (filters) => {
      console.log('Filtres appliqués:', filters)
      // Ici vous pourrez appliquer la logique de filtrage des projets
    }

    const navigateToProject = (projectId) => {
      router.push({ name: 'projects-selected', params: { id: projectId } })
    }

    const showCustomCursor = () => {
      cursorActive.value = true
      document.body.style.cursor = 'none'
    }

    const hideCustomCursor = () => {
      cursorActive.value = false
      document.body.style.cursor = 'auto'
    }

    const updateCursorPosition = (e) => {
      cursorX.value = e.clientX
      cursorY.value = e.clientY
    }

    return {
      isFilterOpen,
      toggleFilter,
      handleApplyFilters,
      navigateToProject,
      cursorActive,
      cursorX,
      cursorY,
      showCustomCursor,
      hideCustomCursor,
      updateCursorPosition,
    }
  },
}
</script>
<style scoped>
.icon-size {
  font-size: 22px;
  color: var(--vt-c-text-dark-2);
  transition: color 0.3s ease;
}

.filter:hover .icon-size {
  color: var(--bg-1);
}

.filter:hover div {
  color: var(--bg-1);
}

/* Styles pour l'effet de survol des cartes de projet */
.project-card {
  overflow: hidden;
  cursor: none;
}

.project-card img {
  transition: transform 0.3s ease;
}

.project-card:hover img {
  transform: scale(1.1);
}

.project-title {
  transition: color 0.3s ease;
}

.project-card:hover .project-title {
  color: #f79315;
  font-weight: bold;
}

/* Curseur personnalisé */
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

@media (min-width: 768px) {
  .icon-size {
    font-size: 22px;
  }
}
@media (min-width: 1536px) {
  .icon-size {
    font-size: 25px;
  }
}
</style>
