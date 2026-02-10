<template>
  <div class="h-auto w-screen bg-white pt-[20%] md:pt-[7%] flex flex-col items-center">
    <FilterComponent :initial-filters="activeFilters" @apply-filters="handleApplyFilters" />
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
    <!-- Indicateur de filtres actifs -->
    <div v-if="hasActiveFilters" class="w-[93%] mt-6 flex flex-wrap items-center gap-3">
      <span class="text-gray-500 text-sm">Filtres actifs:</span>
      <span v-if="activeFilters.type" class="filter-tag">
        {{ activeFilters.type === 'commercial' ? 'Commercial' : 'Résidentiel' }}
      </span>
      <span v-if="activeFilters.service" class="filter-tag">
        {{ getServiceLabel(activeFilters.service) }}
      </span>
      <span v-if="activeFilters.workType" class="filter-tag">
        {{ getWorkTypeLabel(activeFilters.workType) }}
      </span>
      <button @click="clearFilters" class="clear-filters-btn">
        <span class="material-symbols-outlined text-sm">close</span>
        Effacer les filtres
      </button>
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
        v-for="project in displayedProjects"
        :key="project._id"
        class="h-[40vh] w-full project-card"
        @click="navigateToProject(project._id)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div class="h-[85%] overflow-hidden">
          <img
            v-if="project.coverImage"
            class="h-full rounded-none w-full object-cover"
            :src="encodeURI(project.coverImage)"
            :alt="project.title"
          />
          <div v-else class="h-full w-full bg-gray-200 flex items-center justify-center">
            <span class="material-symbols-outlined text-gray-400 text-4xl">architecture</span>
          </div>
        </div>
        <div class="h-[15%] flex justify-between items-center">
          <div class="project-title text-[18px]">{{ project.title }}</div>
          <div class="text-[var(--vt-c-text-dark-2)]">{{ project.projectType || '' }}</div>
        </div>
      </div>
    </div>
    <div v-if="projects.length === 0 && !loading" class="h-[30vh] w-[93%] flex flex-col items-center justify-center text-gray-400">
      <span class="material-symbols-outlined text-6xl mb-4">search_off</span>
      <p v-if="hasActiveFilters">Aucun projet ne correspond aux filtres sélectionnés</p>
      <p v-else>Aucun projet disponible</p>
      <button v-if="hasActiveFilters" @click="clearFilters" class="mt-4 clear-filters-btn">
        Effacer les filtres
      </button>
    </div>
    <div
      v-if="hasMoreProjects"
      @click="showMoreProjects"
      class="h-[15vh] md:h-[20vh] w-[93%] flex items-center justify-center tracking-[3px] text-[var(--vt-c-text-dark-2)] hover:text-[var(--bg-1)] hover:cursor-pointer transition-colors duration-300"
    >
      VOIR PLUS ({{ remainingProjectsCount }})
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
import { computed, ref, onMounted } from 'vue'
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
    const projects = ref([])
    const allProjects = ref([])
    const loading = ref(true)
    const displayedCount = ref(9)
    const activeFilters = ref({
      type: '',
      service: '',
      workType: ''
    })
    const API_BASE = '/api/v1'

    // Mapping des valeurs de filtre vers les valeurs en base
    const serviceMapping = {
      'architectural-design': 'Conception Architecturale',
      'design-build': 'Conception et Construction',
      'interior-design': "Architecture d'Intérieur",
      'real-estate': "Gestion d'Actifs Immobiliers"
    }

    const workTypeMapping = {
      'full-refurbishment': 'Rénovation',
      'interior-fit-out': 'Décoration',
      'new-build': 'Construction'
    }

    const typeMapping = {
      'commercial': 'Commercial',
      'residential': 'Residential'
    }

    const isFilterOpen = computed(() => uiStore.isFilterOpen)

    const toggleFilter = () => {
      uiStore.toggleFilter()
    }

    const fetchProjects = async () => {
      try {
        loading.value = true
        const res = await fetch(`${API_BASE}/projects?status=true&perPage=100`)
        if (res.ok) {
          const json = await res.json()
          const items = json.data || []
          allProjects.value = items.map(p => {
            // Extract cover image from first main-page section
            let coverImage = null
            if (p.sections && p.sections.length > 0) {
              const mainSection = p.sections.find(s => s.type === 'main-page')
              if (mainSection && mainSection.images && mainSection.images.length > 0) {
                coverImage = mainSection.images[0]
              }
            }
            return {
              _id: p._id,
              title: p.title || '',
              services: p.services || '',
              worksType: p.worksType || '',
              projectType: p.projectType || '',
              coverImage,
            }
          })
          applyFiltersToProjects()
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        loading.value = false
      }
    }

    const applyFiltersToProjects = () => {
      let filtered = [...allProjects.value]

      // Filtrer par type de projet (Commercial/Residential)
      if (activeFilters.value.type) {
        const mappedType = typeMapping[activeFilters.value.type]
        filtered = filtered.filter(p => p.projectType === mappedType)
      }

      // Filtrer par service
      if (activeFilters.value.service) {
        const mappedService = serviceMapping[activeFilters.value.service]
        filtered = filtered.filter(p =>
          p.services && p.services.toLowerCase().includes(mappedService.toLowerCase())
        )
      }

      // Filtrer par type de travaux
      if (activeFilters.value.workType) {
        const mappedWorkType = workTypeMapping[activeFilters.value.workType]
        filtered = filtered.filter(p =>
          p.worksType && p.worksType.toLowerCase().includes(mappedWorkType.toLowerCase())
        )
      }

      projects.value = filtered
    }

    const handleApplyFilters = (filters) => {
      activeFilters.value = { ...filters }
      displayedCount.value = 9
      applyFiltersToProjects()
    }

    const clearFilters = () => {
      activeFilters.value = { type: '', service: '', workType: '' }
      displayedCount.value = 9
      applyFiltersToProjects()
    }

    const hasActiveFilters = computed(() => {
      return activeFilters.value.type || activeFilters.value.service || activeFilters.value.workType
    })

    const displayedProjects = computed(() => {
      return projects.value.slice(0, displayedCount.value)
    })

    const hasMoreProjects = computed(() => {
      return projects.value.length > displayedCount.value
    })

    const remainingProjectsCount = computed(() => {
      return projects.value.length - displayedCount.value
    })

    const showMoreProjects = () => {
      displayedCount.value += 9
    }

    const getServiceLabel = (key) => {
      const labels = {
        'architectural-design': 'Conception Architecturale',
        'design-build': 'Conception et Construction',
        'interior-design': 'Architecture D\'intérieure',
        'real-estate': 'Gestion D\'actifs Immobiliers'
      }
      return labels[key] || key
    }

    const getWorkTypeLabel = (key) => {
      const labels = {
        'full-refurbishment': 'Rénovation Complète',
        'interior-fit-out': 'Aménagement Intérieur',
        'new-build': 'Construction Neuve'
      }
      return labels[key] || key
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

    onMounted(() => {
      fetchProjects()
    })

    return {
      isFilterOpen,
      toggleFilter,
      handleApplyFilters,
      clearFilters,
      hasActiveFilters,
      activeFilters,
      getServiceLabel,
      getWorkTypeLabel,
      navigateToProject,
      cursorActive,
      cursorX,
      cursorY,
      showCustomCursor,
      hideCustomCursor,
      updateCursorPosition,
      projects,
      displayedProjects,
      hasMoreProjects,
      remainingProjectsCount,
      showMoreProjects,
      loading,
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

/* Filter tags */
.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: var(--bg-1);
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.clear-filters-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: transparent;
  color: var(--second-orange);
  border: 1px solid var(--second-orange);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background-color: var(--second-orange);
  color: white;
}
</style>
