<template>

    <div class="navBar h-[10%] w-screen bg-transparent text-gray-700 flex justify-center absolute top-0">
      <div class="h-full w-[96%] flex items-center justify-between">

        <router-link to="/">
          <img src="@/assets/pictures/MG logo 2.png" class="h-12 w-auto md:h-14 lg:h-16 object-contain cursor-pointer" alt="Maison Gansou Logo"/>
        </router-link>
        <div class="h-[70%] w-[50%] flex justify-end md:justify-between items-center">
          <div class="hidden md:block w-[calc(80%-40px)] h-full">
            <nav class="h-full w-full flex justify-around items-center text-white">
              <router-link
                to="/bookings"
                class="nav-link text-sm lg:text-base xl:text-base 2xl:text-lg transition-all relative"
                style="font-weight: 500;"
                active-class="nav-active"
                >Réservations</router-link
              >
              <router-link
                to="/projects"
                class="nav-link text-sm lg:text-base xl:text-base 2xl:text-lg transition-all relative"
                style="font-weight: 500;"
                active-class="nav-active"
                >Projects</router-link
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
          <div class="cursor-pointer" @click="toggleMenu">
            <transition name="icon-rotate" mode="out-in">
              <span
                :key="isMenuOpen"
                class="material-symbols-outlined transition-colors"
                style="
                  font-size: 40px;
                  color: white;
                  font-variation-settings:
                    'FILL' 0,
                    'wght' 400,
                    'GRAD' 0,
                    'opsz' 40;
                "
                @mouseenter="$event.target.style.color = 'var(--bg-1)'"
                @mouseleave="$event.target.style.color = 'white'"
              >
                {{ isMenuOpen ? 'close' : 'menu' }}
              </span>
            </transition>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'SidebarComponent',
  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
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
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: var(--bg-2);
  /* font-weight: bold; */
  transform: translateY(-2px);
}

.nav-active {
  color: var(--bg-2) !important;
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
