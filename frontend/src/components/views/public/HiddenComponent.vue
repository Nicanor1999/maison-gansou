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
            <div class="flex flex-col w-full border-l border-gray-400 gap-3">
              <router-link to="/projects" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">folder_open</span>
                <span class="menu-text">Projets</span>
              </router-link>
              <router-link to="/about-us" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">info</span>
                <span class="menu-text">À propos de nous</span>
              </router-link>
              <!-- <router-link to="/testimonials" class="menu-item group" @click="closeMenu">
                <span class="material-symbols-outlined menu-icon-left">star</span>
                <span class="menu-text">Témoignages</span>
              </router-link> -->
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
              <router-link to="/services/architectural-design" class="menu-item group" @click="closeMenu">
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
              <a href="https://www.facebook.com/share/1GSwhBZS14/" target="_blank" class="menu-item group">
                <svg class="menu-icon-left w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="menu-text">Facebook</span>
                <span class="menu-icon">↗</span>
              </a>
              <a href="https://wa.me/0160739755" target="_blank" class="menu-item group">
                <svg class="menu-icon-left w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span class="menu-text">WhatsApp</span>
                <span class="menu-icon">↗</span>
              </a>
              <a href="https://www.tiktok.com/@maisongansouinterior" target="_blank" class="menu-item group">
                <svg class="menu-icon-left w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
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
            <span class="text-sm md:text-base">+229 01 60 73 97 55</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[var(--bg-2)]">mail</span>
            <span class="text-sm md:text-base">contacts@maisongansou.com</span>
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
  fill: var(--second-orange);
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
  fill: var(--second-orange);
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
