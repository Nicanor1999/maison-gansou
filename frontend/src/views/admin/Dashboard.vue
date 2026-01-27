<template>
  <div class="dashboard h-full flex flex-col gap-6 w-[98%] overflow-y-auto">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center h-40">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--bg-1)]"></div>
    </div>

    <template v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4 mb-6">
        <!-- Réservations Card -->
        <div
          class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100"
        >
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div
                class="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-green-600 text-2xl">calendar_month</span>
              </div>
              <span
                :class="[
                  'text-sm font-medium px-2 py-1 rounded-full',
                  reservationsGrowth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
                ]"
              >
                {{ reservationsGrowth >= 0 ? '+' : '' }}{{ reservationsGrowth }}%
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Réservations</h3>
              <p class="text-2xl font-bold text-gray-800">{{ stats.reservations.total }}</p>
              <p class="text-xs text-gray-400">{{ stats.reservations.pending }} en attente</p>
            </div>
          </div>
        </div>

        <!-- Articles Card -->
        <div
          class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100"
        >
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div
                class="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-blue-600 text-2xl">article</span>
              </div>
              <span
                :class="[
                  'text-sm font-medium px-2 py-1 rounded-full',
                  articlesGrowth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
                ]"
              >
                {{ articlesGrowth >= 0 ? '+' : '' }}{{ articlesGrowth }}%
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Articles</h3>
              <p class="text-2xl font-bold text-gray-800">{{ stats.articles.total }}</p>
              <p class="text-xs text-gray-400">{{ stats.articles.thisMonth }} ce mois</p>
            </div>
          </div>
        </div>

        <!-- Projets Card -->
        <div
          class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100"
        >
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div
                class="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-purple-600 text-2xl">architecture</span>
              </div>
              <span
                :class="[
                  'text-sm font-medium px-2 py-1 rounded-full',
                  projetsGrowth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
                ]"
              >
                {{ projetsGrowth >= 0 ? '+' : '' }}{{ projetsGrowth }}%
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Projets</h3>
              <p class="text-2xl font-bold text-gray-800">{{ stats.projects.total }}</p>
              <p class="text-xs text-gray-400">{{ stats.projects.thisMonth }} ce mois</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <!-- Recent Reservations -->
        <div class="bg-white rounded-xl shadow-sm min-h-80 border border-gray-100 flex justify-center">
          <div class="w-[95%] h-full mx-auto py-4">
            <div class="flex items-center justify-between h-12">
              <h3 class="text-base font-semibold text-gray-800">Réservations Récentes</h3>
              <router-link to="/admin/bookings" class="text-sm text-[var(--bg-1)] hover:underline">
                Voir tout
              </router-link>
            </div>
            <div v-if="recentReservations.length === 0" class="flex items-center justify-center h-40 text-gray-400">
              Aucune réservation
            </div>
            <div v-else class="flex flex-col gap-2 overflow-y-auto max-h-64">
              <div
                v-for="reservation in recentReservations"
                :key="reservation._id" 
                class="flex items-center justify-between h-16 bg-gray-50 rounded-lg px-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-[var(--second-orange)] rounded-full flex items-center justify-center text-white font-bold"
                  >
                    {{ getInitials(reservation.lastNameClient, reservation.firstNameClient) }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">{{ reservation.firstNameClient }} {{ reservation.lastNameClient }}</p>
                    <p class="text-sm text-gray-500">{{ reservation.Email }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500">{{ formatDate(reservation.createdAt) }}</p>
                  <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {{ reservation.Person_Number || 1 }} pers.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Articles -->
        <div class="bg-white rounded-xl shadow-sm min-h-80 border border-gray-100 flex justify-center">
          <div class="w-[95%] h-full mx-auto py-4">
            <div class="flex items-center justify-between h-12">
              <h3 class="text-base font-semibold text-gray-800">Articles Récents</h3>
              <router-link to="/admin/blog" class="text-sm text-[var(--bg-1)] hover:underline">
                Voir tout
              </router-link>
            </div>
            <div v-if="recentArticles.length === 0" class="flex items-center justify-center h-40 text-gray-400">
              Aucun article
            </div>
            <div v-else class="flex flex-col gap-2 overflow-y-auto max-h-64">
              <div
                v-for="article in recentArticles"
                :key="article._id"
                class="flex items-center justify-between h-16 bg-gray-50 rounded-lg px-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-14 h-12 bg-gray-200 rounded overflow-hidden flex items-center justify-center"
                  >
                    <img
                      v-if="article.CoverImage"
                      :src="article.CoverImage"
                      :alt="article.Title"
                      class="w-full h-full object-cover"
                    />
                    <span v-else class="material-symbols-outlined text-gray-400">image</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800 line-clamp-1">{{ article.Title }}</p>
                    <p class="text-sm text-gray-500">{{ formatDate(article.createdAt) }}</p>
                  </div>
                </div>
                <span
                  v-if="article.Tags && article.Tags.length > 0"
                  class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {{ article.Tags[0] }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Projects -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex justify-center">
        <div class="w-[95%] h-full mx-auto py-4">
          <div class="flex items-center justify-between h-12">
            <h3 class="text-base font-semibold text-gray-800">Projets Récents</h3>
            <router-link to="/admin/projects" class="text-sm text-[var(--bg-1)] hover:underline">
              Voir tout
            </router-link>
          </div>
          <div v-if="recentProjects.length === 0" class="flex items-center justify-center h-40 text-gray-400">
            Aucun projet
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="project in recentProjects"
              :key="project._id"
              class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span class="material-symbols-outlined text-purple-600">home_work</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-800 truncate">{{ project.Title }}</p>
                  <p class="text-sm text-gray-500">{{ project.Town }}, {{ project.Country }}</p>
                </div>
              </div>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ project.Services || 'Non défini' }}</span>
                <span>{{ formatDate(project.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div
        class="mt-4 mb-6 bg-white rounded-xl shadow-sm h-44 border border-gray-100 flex justify-center"
      >
        <div class="w-[95%] h-full mx-auto flex flex-col justify-around py-4">
          <h3 class="text-base font-semibold text-gray-800">Actions Rapides</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 h-24">
            <router-link
              to="/admin/blog"
              class="flex flex-col items-center justify-center h-full bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span class="material-symbols-outlined text-blue-600 text-3xl mb-2">add_circle</span>
              <span class="text-sm font-medium text-gray-700">Nouvel Article</span>
            </router-link>
            <router-link
              to="/admin/projects"
              class="flex flex-col items-center justify-center h-full bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <span class="material-symbols-outlined text-purple-600 text-3xl mb-2">add_home</span>
              <span class="text-sm font-medium text-gray-700">Nouveau Projet</span>
            </router-link>
            <router-link
              to="/admin/bookings"
              class="flex flex-col items-center justify-center h-full bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span class="material-symbols-outlined text-green-600 text-3xl mb-2">event_available</span>
              <span class="text-sm font-medium text-gray-700">Réservations</span>
            </router-link>
            <router-link
              to="/admin/mailbox"
              class="flex flex-col items-center justify-center h-full bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <span class="material-symbols-outlined text-orange-600 text-3xl mb-2">mail</span>
              <span class="text-sm font-medium text-gray-700">Messages</span>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'DashboardView',
  setup() {
    const isLoading = ref(true)
    const API_BASE = '/api/v1'

    // Stats Data
    const stats = reactive({
      reservations: { total: 0, pending: 0 },
      articles: { total: 0, thisMonth: 0 },
      projects: { total: 0, thisMonth: 0 }
    })

    // Growth percentages (calculated from data)
    const reservationsGrowth = ref(0)
    const articlesGrowth = ref(0)
    const projetsGrowth = ref(0)

    // Recent Data
    const recentReservations = ref([])
    const recentArticles = ref([])
    const recentProjects = ref([])

    // Fetch data from API
    const fetchDashboardData = async () => {
      isLoading.value = true
      const token = localStorage.getItem('accessToken')
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }

      try {
        // Fetch all data in parallel
        const [reservationsRes, articlesRes, projectsRes] = await Promise.all([
          fetch(`${API_BASE}/reservation?perPage=5&page=1`, { headers }),
          fetch(`${API_BASE}/article?perPage=5&page=1`, { headers }),
          fetch(`${API_BASE}/projects?perPage=3&page=1`, { headers })
        ])

        // Process Reservations
        if (reservationsRes.ok) {
          const data = await reservationsRes.json()
          const reservations = data.data || data.docs || []
          const pagination = data.pagination || data
          
          stats.reservations.total = pagination.totalDocs || reservations.length
          stats.reservations.pending = reservations.filter(r => !r.confirmed).length
          recentReservations.value = reservations.slice(0, 5)
          
          // Calculate growth (simplified - would need historical data)
          reservationsGrowth.value = calculateMonthlyGrowth(reservations)
        }

        // Process Articles
        if (articlesRes.ok) {
          const data = await articlesRes.json()
          const articles = data.data || data.docs || []
          const pagination = data.pagination || data
          
          stats.articles.total = pagination.totalDocs || articles.length
          stats.articles.thisMonth = countThisMonth(articles)
          recentArticles.value = articles.slice(0, 5)
          
          articlesGrowth.value = calculateMonthlyGrowth(articles)
        }

        // Process Projects
        if (projectsRes.ok) {
          const data = await projectsRes.json()
          const projects = data.data || data.docs || []
          const pagination = data.pagination || data
          
          stats.projects.total = pagination.totalDocs || projects.length
          stats.projects.thisMonth = countThisMonth(projects)
          recentProjects.value = projects.slice(0, 3)
          
          projetsGrowth.value = calculateMonthlyGrowth(projects)
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        isLoading.value = false
      }
    }

    // Helper Functions
    function countThisMonth(items) {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return items.filter(item => {
        const createdAt = new Date(item.createdAt)
        return createdAt >= startOfMonth
      }).length
    }

    function calculateMonthlyGrowth(items) {
      // Simplified growth calculation
      const thisMonth = countThisMonth(items)
      const total = items.length
      if (total === 0) return 0
      return Math.round((thisMonth / Math.max(total, 1)) * 100)
    }

    function getInitials(nom, prenom) {
      const n = nom ? nom.charAt(0).toUpperCase() : ''
      const p = prenom ? prenom.charAt(0).toUpperCase() : ''
      return p + n || '?'
    }

    function formatDate(dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      isLoading,
      stats,
      reservationsGrowth,
      articlesGrowth,
      projetsGrowth,
      recentReservations,
      recentArticles,
      recentProjects,
      getInitials,
      formatDate,
    }
  },
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
