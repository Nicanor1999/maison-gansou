<template>
  <div>
    <transition name="navbar-fade">
      <div
        v-if="hasScrolledToSecondPart && !isMenuOpen && isScrollingDown"
        class="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-sm z-100 border-[1px] border-[var(--vt-c-text-dark-3)]"
      ></div>
    </transition>
    <router-link class="fixed left-[3vw] top-[1vh] md:top-[1vh] z-150" to="/">
      <transition name="logo-fade" mode="out-in">
        <img
          :key="currentLogo"
          :src="logoSrc"
          class="h-14 w-auto md:h-14 lg:h-16 object-contain cursor-pointer"
          alt="Maison Gansou Logo"
        />
      </transition>
    </router-link>
    <SidebarComponent class="z-2" />
    <HiddenComponent class="z-1" />
    <div class="cursor-pointer fixed right-[2vw] top-[2vh] z-150" @click="handleMenuClick">
      <transition name="icon-rotate" mode="out-in">
        <span
          :key="menuIconKey"
          class="material-symbols-outlined transition-colors"
          :style="{
            fontSize: '40px',
            color: iconColor,
            fontVariationSettings: `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 40`,
          }"
          @mouseenter="$event.target.style.color = 'var(--second-orange)'"
          @mouseleave="$event.target.style.color = iconColor"
        >
          {{ menuIconKey }}
        </span>
      </transition>
    </div>
    <!-- <nav>
      <ul>
        <li>
          <router-link to="/services/architecture-design">CONCEPTION ARCHITECTURALE</router-link>
        </li>
        <li><router-link to="/services/interior-design">DECORATION TEXTILE</router-link></li>
        <li><router-link to="/services/design-build">CONCEPTION ET CONSTRUCTION</router-link></li>
        <li><router-link to="/services/immo-gest">GESTION IMMOBILIERE</router-link></li>
      </ul>
    </nav> -->
    <router-view class="z-0"></router-view>
  </div>
</template>
<script>
import SidebarComponent from '@/components/views/public/SidebarComponent.vue'
import HiddenComponent from '@/components/views/public/HiddenComponent.vue'
import { useUiStore } from '@/stores/ui'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import logo2 from '@/assets/pictures/MG logo 2.png'
import logo3 from '@/assets/pictures/MG logo 3.png'

export default {
  name: 'LayoutServicesView',
  components: {
    SidebarComponent,
    HiddenComponent,
  },
  setup() {
    const uiStore = useUiStore()
    const route = useRoute()
    const isXlScreen = ref(window.innerWidth >= 1280)
    const hasScrolledToSecondPart = ref(false)
    const lastScrollPosition = ref(0)
    const isScrollingDown = ref(true)

    const isMenuOpen = computed(() => uiStore.isMenuOpen)
    const isFilterOpen = computed(() => uiStore.isFilterOpen)
    const isHomePage = computed(() => route.name === 'home' || route.path === '/')
    const isProjectSelectedPage = computed(() => route.name === 'projects-selected')

    // Pages avec un firstPart sombre qui nécessitent un logo blanc au début
    const hasDarkFirstPart = computed(() => isHomePage.value || isProjectSelectedPage.value)

    const menuIconKey = computed(() => {
      if (isMenuOpen.value || isFilterOpen.value) {
        return 'close'
      }
      return 'menu'
    })

    const currentLogo = computed(() => {
      // Si la page n'a pas de firstPart sombre, toujours logo3
      if (!hasDarkFirstPart.value) {
        return 'logo3'
      }

      if (isXlScreen.value) {
        return hasScrolledToSecondPart.value ? 'logo3' : 'logo2'
      }
      return isMenuOpen.value ? 'logo3' : hasScrolledToSecondPart.value ? 'logo3' : 'logo2'
    })

    const logoSrc = computed(() => {
      // Si la page n'a pas de firstPart sombre, toujours logo3
      if (!hasDarkFirstPart.value) {
        return logo3
      }

      if (isXlScreen.value) {
        return hasScrolledToSecondPart.value ? logo3 : logo2
      }
      return isMenuOpen.value ? logo3 : hasScrolledToSecondPart.value ? logo3 : logo2
    })

    const iconColor = computed(() => {
      // Si la page n'a pas de firstPart sombre, toujours var(--bg-1)
      if (!hasDarkFirstPart.value) {
        return 'var(--bg-1)'
      }

      if (isMenuOpen.value) {
        return 'var(--bg-1)'
      }
      return hasScrolledToSecondPart.value ? 'var(--bg-1)' : 'white'
    })

    const toggleMenu = () => {
      uiStore.toggleMenu()
    }

    const handleMenuClick = () => {
      if (isFilterOpen.value) {
        uiStore.closeFilter()
      } else if (isMenuOpen.value) {
        uiStore.closeMenu()
      } else {
        uiStore.toggleMenu()
      }
    }

    const updateScreenSize = () => {
      isXlScreen.value = window.innerWidth >= 1280
    }

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY

      // Déterminer la direction du scroll
      isScrollingDown.value = currentScrollPosition > lastScrollPosition.value
      lastScrollPosition.value = currentScrollPosition

      // Si la page a un firstPart sombre, utiliser la logique avec .secondPart
      if (hasDarkFirstPart.value) {
        const secondPart = document.querySelector('.secondPart')
        if (secondPart) {
          const rect = secondPart.getBoundingClientRect()
          hasScrolledToSecondPart.value = rect.top <= 100
        }
      } else {
        // Sinon, afficher la navbar après 100px de scroll
        hasScrolledToSecondPart.value = currentScrollPosition > 100
      }
    }

    onMounted(() => {
      window.addEventListener('resize', updateScreenSize)
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Vérifier au chargement initial
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateScreenSize)
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isMenuOpen,
      isFilterOpen,
      menuIconKey,
      logoSrc,
      currentLogo,
      iconColor,
      toggleMenu,
      handleMenuClick,
      hasScrolledToSecondPart,
      isScrollingDown,
    }
  },
}
</script>
<style scoped>
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

.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.3s ease;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}

.navbar-fade-enter-active,
.navbar-fade-leave-active {
  transition: all 0.3s ease;
}

.navbar-fade-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.navbar-fade-leave-to {
  opacity: 0;
}
</style>
