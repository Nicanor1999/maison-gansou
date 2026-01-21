<template>
  <transition :name="transitionName">
    <div v-if="isMenuOpen" class="fixed inset-0 z-50" @click="closeMenu">
      <!-- Overlay semi-transparent -->
      <div
        class="absolute inset-0 bg-black/40 xl:bg-transparent backdrop-blur-sm xl:backdrop-blur-none"
      ></div>

      <!-- Contenu du menu -->
      <div
        class="md:h-screen xl:w-[55%] absolute bg-white xl:right-0 top-0 w-full h-auto max-h-screen overflow-y-auto shadow-2xl"
        @click.stop
      >
        <div
          class="min-h-screen grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-6 lg:gap-8 pt-24 pb-8 px-4 md:px-10 lg:px-12"
        >
          <!-- Section STUDIO -->
          <div class="flex flex-col items-start md:gap-2">
            <h2
              class="text-[var(--bg-1)] text-2xl md:text-3xl font-bold underline-offset-1 tracking-wide mb-2 pb-2 inline-block border-b-2 border-white"
            >
              STUDIO
            </h2>
            <div class="flex flex-col w-full border-l border-gray-400 gap-2">
              <router-link to="/projects" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">folder_open</span>
                <span class="menu-text">Projets</span>
              </router-link>
              <router-link to="/about" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">info</span>
                <span class="menu-text">À propos de nous</span>
              </router-link>
              <router-link to="/testimonials" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">star</span>
                <span class="menu-text">Témoignages</span>
              </router-link>
              <router-link to="/blog" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">article</span>
                <span class="menu-text">Blog</span>
              </router-link>
              <router-link to="/contacts" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">contact_mail</span>
                <span class="menu-text">Contact</span>
              </router-link>
              <router-link to="/recruitment" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">work</span>
                <span class="menu-text">Recrutement</span>
              </router-link>
            </div>
          </div>

          <!-- Section SERVICES -->
          <div class="flex flex-col items-start md:gap-2">
            <h2
              class="text-[var(--bg-1)] text-2xl md:text-3xl font-bold tracking-wide mb-2 pb-2 inline-block border-b-2 border-white"
            >
              SERVICES
            </h2>
            <div class="flex flex-col w-full gap-2 border-gray-400 border-l">
              <router-link to="/services/archi-design" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">architecture</span>
                <span class="menu-text">Conception Architecturale</span>
              </router-link>
              <router-link
                to="/services/interior-design"
                class="menu-item group"
                @click="closeMenu"
              >
                <span class="material-symbols-outlined menu-icon-left">chair</span>
                <span class="menu-text">Architecture D'intérieure</span>
              </router-link>
              <router-link to="/services/immo-gest" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">apartment</span>
                <span class="menu-text">Gestion D'actifs Immobiliers</span>
              </router-link>
              <router-link to="/services/design-build" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">construction</span>
                <span class="menu-text">Conception et Construction</span>
              </router-link>
            </div>
          </div>

          <!-- Section JOIGNEZ-NOUS -->
          <div class="flex flex-col items-start md:gap-2/3 md:col-span-2 lg:col-span-1">
            <h2
              class="text-[var(--bg-1)] text-2xl md:text-3xl font-bold tracking-wide mb-2 pb-2 inline-block border-b-2 border-white"
            >
              JOIGNEZ-NOUS
            </h2>
            <div class="flex flex-col w-full gap-2 border-gray-400 border-l">
              <a href="https://facebook.com" target="_blank" class="menu-item group">
                <span class="material-symbols-outlined menu-icon-left">share</span>
                <span class="menu-text">Facebook</span>
                <span class="menu-icon">↗</span>
              </a>
              <a href="https://wa.me/" target="_blank" class="menu-item group">
                <span class="material-symbols-outlined menu-icon-left">chat</span>
                <span class="menu-text">WhatsApp</span>
                <span class="menu-icon">↗</span>
              </a>
              <a href="https://tiktok.com" target="_blank" class="menu-item group">
                <span class="material-symbols-outlined menu-icon-left">video_library</span>
                <span class="menu-text">TikTok</span>
                <span class="menu-icon">↗</span>
              </a>
            </div>
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
import { useUiStore } from '@/stores/ui'
import { computed, onMounted, onUnmounted, ref } from 'vue'

export default {
  name: 'HiddenComponent',
  setup() {
    const uiStore = useUiStore()
    const transitionName = ref('slide-down')

    const isMenuOpen = computed(() => uiStore.isMenuOpen)

    const closeMenu = () => {
      uiStore.closeMenu()
    }

    const updateTransition = () => {
      if (window.innerWidth >= 1280) {
        transitionName.value = 'slide-right'
      } else {
        transitionName.value = 'slide-down'
      }
    }

    onMounted(() => {
      updateTransition()
      window.addEventListener('resize', updateTransition)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateTransition)
    })

    return {
      isMenuOpen,
      transitionName,
      closeMenu,
    }
  },
}
</script>
<style scoped>
/* Menu items styling */
.menu-item {
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
}

.menu-icon-left {
  font-size: 1.5rem;
  transition: all 0.3s;
  color: var(--second-orange);
}

.menu-item:hover {
  transition: all 0.3s ease;
  transform: scale(1.05);
  /* Légère mise en avant au survol */
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  /* transform: translateX(0.5rem); */
}

.menu-item:hover .menu-icon-left {
  color: var(--second-orange);
}

.menu-item:hover .menu-text {
  color: var(--second-orange);
}

.menu-item .menu-text {
  flex: 1;
  transition: all 0.3s;
}

.menu-item .menu-icon {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
  font-size: 1.25rem;
}

.menu-item:hover .menu-icon {
  opacity: 1;
  transform: translateX(0);
}

/* Active link styling */
.router-link-active.menu-item {
  background-color: var(--second-orange);
  color: white;
}

.router-link-active.menu-item .menu-icon-left {
  color: white;
}

/* Transition pour glisser du haut (< xl) */
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

/* Transition pour glisser de la droite (>= xl) */
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
  .menu-item {
    font-size: 1rem;
    padding: 0.625rem 1rem;
  }
}
</style>
