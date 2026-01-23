<template>
  <div class="admin-layout h-screen w-screen overflow-hidden bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 z-40 h-screen transition-transform duration-300',
        'bg-[var(--bg-1)] border-r border-gray-700',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'w-64'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <router-link to="/" class="flex items-center">
          <img :src="logo" alt="Logo" class="h-10 w-auto" />
          <span class="ml-2 text-white font-bold text-lg">Admin</span>
        </router-link>
        <button @click="toggleSidebar" class="text-white hover:bg-gray-700 rounded-lg p-2">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 overflow-y-auto">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.name">
            <router-link
              :to="item.route"
              :class="[
                'flex items-center w-full h-12 px-4 rounded-lg transition-all duration-200',
                isActive(item.route)
                  ? 'bg-[var(--second-orange)] text-[var(--bg-1)]'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]"
            >
              <span class="material-symbols-outlined mr-3">{{ item.icon }}</span>
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Logout Button -->
      <div class="h-20 flex items-center justify-center px-4 border-t border-gray-700">
        <button
          @click="logout"
          class="flex items-center w-full h-12 px-4 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
        >
          <span class="material-symbols-outlined mr-3">logout</span>
          <span class="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col h-screen w-full">
      <!-- Top Navbar -->
      <header class="h-16 flex-shrink-0 bg-white shadow-sm z-30">
        <div class="flex items-center justify-between h-full px-6">
          <div class="flex items-center gap-4">
            <button
              @click="toggleSidebar"
              class="h-10 w-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span class="material-symbols-outlined">menu</span>
            </button>
            <h1 class="text-xl font-semibold text-gray-800">
              {{ currentPageTitle }}
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button class="relative h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full">
              <span class="material-symbols-outlined">notifications</span>
              <span
                v-if="notificationCount > 0"
                class="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {{ notificationCount }}
              </span>
            </button>
            <!-- User Menu -->
            <div class="relative flex items-center">
              <button
                @click="toggleUserMenu"
                class="flex items-center h-10 gap-2 px-2 rounded-lg hover:bg-gray-100"
              >
                <div class="h-8 w-8 bg-[var(--bg-1)] rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-sm">A</span>
                </div>
                <span class="hidden md:block text-gray-700">Admin</span>
                <span class="material-symbols-outlined text-gray-500">expand_more</span>
              </button>
              <div
                v-if="userMenuOpen"
                class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border z-50"
              >
                <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span class="material-symbols-outlined mr-2 text-sm align-middle">person</span>
                  Profil
                </a>
                <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span class="material-symbols-outlined mr-2 text-sm align-middle">settings</span>
                  Paramètres
                </a>
                <hr class="my-2" />
                <button
                  @click="logout"
                  class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <span class="material-symbols-outlined mr-2 text-sm align-middle">logout</span>
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-6">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <!-- Overlay for sidebar -->
    <div
      v-if="sidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 z-30 bg-black/50"
    ></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logo from '@/assets/pictures/MG logo 2.png'

export default {
  name: 'LayoutAdminView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const sidebarOpen = ref(false)
    const userMenuOpen = ref(false)
    const notificationCount = ref(3)

    const menuItems = [
      { name: 'dashboard', label: 'Tableau de bord', icon: 'dashboard', route: '/admin' },
      { name: 'bookings', label: 'Réservations', icon: 'calendar_month', route: '/admin/bookings' },
      { name: 'blog', label: 'Blog', icon: 'article', route: '/admin/blog' },
      { name: 'projects', label: 'Projets', icon: 'architecture', route: '/admin/projects' },
      { name: 'mailbox', label: 'Messagerie', icon: 'mail', route: '/admin/mailbox' }
    ]

    const currentPageTitle = computed(() => {
      const current = menuItems.find(item => isActive(item.route))
      return current ? current.label : 'Administration'
    })

    const isActive = (itemRoute) => {
      if (itemRoute === '/admin') {
        return route.path === '/admin'
      }
      return route.path.startsWith(itemRoute)
    }

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    const toggleUserMenu = () => {
      userMenuOpen.value = !userMenuOpen.value
    }

    const logout = () => {
      localStorage.removeItem('accessToken')
      router.push('/login')
    }

    const handleClickOutside = (event) => {
      if (userMenuOpen.value && !event.target.closest('.relative')) {
        userMenuOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      logo,
      sidebarOpen,
      userMenuOpen,
      notificationCount,
      menuItems,
      currentPageTitle,
      isActive,
      toggleSidebar,
      toggleUserMenu,
      logout
    }
  }
}
</script>

<style scoped>
.admin-layout {
  font-family: 'Creato Display', sans-serif;
}
</style>
