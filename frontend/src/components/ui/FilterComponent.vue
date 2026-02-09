<template>
  <transition :name="transitionName">
    <div v-if="isFilterOpen" class="fixed inset-0 z-50" @click="closeFilter">
      <!-- Overlay semi-transparent -->
      <div
        class="absolute inset-0 bg-black/40 xl:bg-transparent backdrop-blur-sm xl:backdrop-blur-none"
      ></div>

      <!-- Contenu du filtre -->
      <div
        class="md:h-screen xl:w-[55%] absolute bg-white xl:right-0 top-0 w-full h-auto max-h-screen overflow-y-auto shadow-2xl"
        @click.stop
      >
        <div class="min-h-screen pt-24 pb-8 px-8 md:px-10 lg:px-12 flex flex-col gap-12">
          <!-- Header -->
          <!-- <div class="mb-8">
            <h2
              class="text-[var(--bg-1)] text-2xl md:text-3xl font-bold tracking-wide mb-2 pb-2 inline-block border-b-2 border-white"
            >
              FILTRER LES PROJETS
            </h2>
          </div> -->

          <!-- Filtres -->
          <div class="flex flex-col gap-8">
            <!-- Type Section -->
            <div class="flex flex-col items-start">
              <h2 class="text-[var(--bg-1)] text-xl md:text-2xl font-bold tracking-wide mb-4">
                TYPE DE PROJET
              </h2>
              <div class="flex flex-col w-full gap-2 border-l border-gray-400">
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.type"
                    value="commercial"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Commercial</span>
                </label>
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.type"
                    value="residential"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Résidentiel</span>
                </label>
              </div>
            </div>

            <!-- Service Section -->
            <div class="flex flex-col items-start">
              <h2 class="text-[var(--bg-1)] text-xl md:text-2xl font-bold tracking-wide mb-4">
                SERVICE
              </h2>
              <div class="flex flex-col w-full gap-2 border-l border-gray-400">
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.service"
                    value="architectural-design"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Conception Architecturale</span>
                </label>
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.service"
                    value="design-build"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Conception et Construction</span>
                </label>
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.service"
                    value="interior-design"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Architecture D'intérieure</span>
                </label>
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.service"
                    value="real-estate"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Gestion D'actifs Immobiliers</span>
                </label>
              </div>
            </div>

            <!-- Type of Work Section -->
            <div class="flex flex-col items-start">
              <h2 class="text-[var(--bg-1)] text-xl md:text-2xl font-bold tracking-wide mb-4">
                TYPE DE TRAVAUX
              </h2>
              <div class="flex flex-col w-full gap-2 border-l border-gray-400">
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.workType"
                    value="full-refurbishment"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Rénovation Complète</span>
                </label>
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.workType"
                    value="interior-fit-out"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Aménagement Intérieur</span>
                </label>
                <label class="filter-option">
                  <input
                    type="radio"
                    v-model="filters.workType"
                    value="new-build"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">Construction Neuve</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-12 flex flex-col md:flex-row gap-4">
            <button @click="resetFilters" class="btn-reset">Réinitialiser</button>
            <button @click="applyFilters" class="btn-apply">Appliquer les filtres</button>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="bg-[var(--bg-1)] text-white py-6 px-8 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t-4 border-[var(--bg-2)]"
        >
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[var(--bg-2)]">phone</span>
            <span class="text-sm md:text-base">+229 01 01 01 01 01</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[var(--bg-2)]">mail</span>
            <span class="text-sm md:text-base">contact@maisongansou.com</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useUiStore } from '@/stores/ui'

export default {
  name: 'FilterComponent',
  props: {
    initialFilters: {
      type: Object,
      default: () => ({ type: '', service: '', workType: '' })
    }
  },
  emits: ['apply-filters'],
  setup(props, { emit }) {
    const uiStore = useUiStore()
    const transitionName = ref('slide-down')
    const filters = ref({
      type: props.initialFilters.type || '',
      service: props.initialFilters.service || '',
      workType: props.initialFilters.workType || '',
    })

    const isFilterOpen = computed(() => uiStore.isFilterOpen)

    const closeFilter = () => {
      uiStore.closeFilter()
    }

    const resetFilters = () => {
      filters.value = {
        type: '',
        service: '',
        workType: '',
      }
    }

    const applyFilters = () => {
      emit('apply-filters', filters.value)
      closeFilter()
    }

    const updateTransition = () => {
      if (window.innerWidth >= 1280) {
        transitionName.value = 'slide-right'
      } else {
        transitionName.value = 'slide-down'
      }
    }

    // Sync filters when initialFilters prop changes
    watch(() => props.initialFilters, (newFilters) => {
      filters.value = {
        type: newFilters.type || '',
        service: newFilters.service || '',
        workType: newFilters.workType || '',
      }
    }, { deep: true })

    onMounted(() => {
      updateTransition()
      window.addEventListener('resize', updateTransition)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateTransition)
    })

    return {
      isFilterOpen,
      transitionName,
      filters,
      closeFilter,
      resetFilters,
      applyFilters,
    }
  },
}
</script>

<style scoped>
/* Filter options styling - similar to menu items */
.filter-option {
  width: 85%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--vt-c-text-light-2);
  transition: all 0.3s ease-out;
  cursor: pointer;
  background: transparent;
  border: none;
}

.filter-option:hover {
  transition: all 0.3s ease;
  transform: scale(1.05);
  /* Légère mise en avant au survol */
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}

.filter-option:hover .filter-label {
  color: var(--second-orange);
}

.filter-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.filter-checkbox:hover {
  /* border-color: #F79315; */
}

.filter-checkbox:checked {
  border-color: #F79315;
  background-color: #F79315;
}

.filter-checkbox:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
}

.filter-label {
  flex: 1;
  transition: all 0.3s;
}

/* Buttons */
.btn-reset,
.btn-apply {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-reset {
  background: transparent;
  border: 2px solid var(--bg-1);
  color: var(--bg-1);
}

.btn-reset:hover {
  background: var(--bg-1);
  color: white;
}

.btn-apply {
  background: var(--second-orange);
  border: 2px solid var(--second-orange);
  color: white;
}

.btn-apply:hover {
  background: var(--bg-2);
  border-color: var(--bg-2);
}

/* Transitions - same as HiddenComponent */
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    transform 0.4s ease-out,
    opacity 0.4s ease-out;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.4s ease-out,
    opacity 0.4s ease-out;
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filter-option {
    font-size: 1rem;
    padding: 0.625rem 1rem;
  }
}
</style>
