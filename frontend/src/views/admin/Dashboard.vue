<template>
  <div class="dashboard h-full flex flex-col gap-6 w-[98%] overflow-y-auto">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-[2%] w-full mt-[2vh] mb-[3vh]">
      <!-- Chiffre d'Affaires Card -->
      <div class="bg-white rounded-xl shadow-sm h-[20vh] min-h-[160px] w-full flex flex-col justify-center items-center border border-gray-100">
        <div class="w-[80%] h-full  mx-auto flex flex-col justify-around">
          <div class="flex items-center justify-between">
            <div class="h-[5vh] min-h-[40px] w-[5vh] min-w-[40px] bg-green-100 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-green-600 text-2xl">payments</span>
          </div>
          <span
            :class="[
              'text-sm font-medium px-2 py-1 rounded-full',
              caGrowth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            ]"
          >
            {{ caGrowth >= 0 ? '+' : '' }}{{ caGrowth }}%
          </span>
          </div>
          <div class="h-[50%] flex flex-col justify-between text-center">
            <h3 class="text-gray-500 text-xl font-medium">Chiffre d'Affaires</h3>
            <p class="text-2xl font-bold text-gray-800">{{ formatCurrency(chiffreAffaires) }}</p>
            <p class="text-xs text-gray-400">{{ formatDateRange(caDateRange) }}</p>
          </div>
        </div>
      </div>

      <!-- Articles Card -->
      <div class="bg-white rounded-xl shadow-sm h-[20vh] min-h-[160px] w-full flex flex-col justify-center border border-gray-100">
        <div class="w-[90%] h-full mx-auto flex flex-col justify-around">
          <div class="flex items-center justify-between">
            <div class="h-[5vh] min-h-[40px] w-[5vh] min-w-[40px] bg-blue-100 rounded-lg flex items-center justify-center">
            <span class="material-symbols-outlined text-blue-600 text-2xl">article</span>
          </div>
          <span
            :class="[
              'text-sm font-medium px-2 py-1 rounded-full',
              articlesGrowth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            ]"
          >
            {{ articlesGrowth >= 0 ? '+' : '' }}{{ articlesGrowth }}%
          </span>
          </div>
          <div>
            <h3 class="text-gray-500 text-sm font-medium">Articles Créés</h3>
            <p class="text-2xl font-bold text-gray-800">{{ articlesCount }}</p>
            <p class="text-xs text-gray-400">{{ formatDateRange(articlesDateRange) }}</p>
          </div>
        </div>
      </div>

      <!-- Projets Card -->
      <div class="bg-white rounded-xl shadow-sm h-[20vh] min-h-[160px] w-full flex flex-col justify-center border border-gray-100">
        <div class="w-[90%] h-full mx-auto flex flex-col justify-around">
          <div class="flex items-center justify-between">
            <div class="h-[5vh] min-h-[40px] w-[5vh] min-w-[40px] bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined text-purple-600 text-2xl">architecture</span>
            </div>
            <span
              :class="[
                'text-sm font-medium px-2 py-1 rounded-full',
                projetsGrowth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              ]"
            >
              {{ projetsGrowth >= 0 ? '+' : '' }}{{ projetsGrowth }}%
            </span>
          </div>
          <div>
            <h3 class="text-gray-500 text-sm font-medium">Projets Ajoutés</h3>
            <p class="text-2xl font-bold text-gray-800">{{ projetsCount }}</p>
            <p class="text-xs text-gray-400">{{ formatDateRange(projetsDateRange) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Date Range Selectors -->
    <div class="bg-white rounded-xl shadow-sm w-full min-h-[25vh] mb-[3vh] border border-gray-100">
      <div class="w-[95%] h-full mx-auto flex flex-col justify-around">
        <h2 class="text-lg font-semibold text-gray-800 mt-[2vh]">Filtrer par période</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-[2%] my-[2vh]">
        <!-- CA Date Range -->
        <div class="h-auto">
          <label class="block text-sm font-medium text-gray-600 mb-[1vh]">
            Période Chiffre d'Affaires
          </label>
          <div class="flex gap-[2%] h-[5vh] min-h-[40px]">
            <input
              type="date"
              v-model="caDateRange.start"
              class="flex-1 h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
            <input
              type="date"
              v-model="caDateRange.end"
              class="flex-1 h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
          </div>
        </div>

        <!-- Articles Date Range -->
        <div class="h-auto">
          <label class="block text-sm font-medium text-gray-600 mb-[1vh]">
            Période Articles
          </label>
          <div class="flex gap-[2%] h-[5vh] min-h-[40px]">
            <input
              type="date"
              v-model="articlesDateRange.start"
              class="flex-1 h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
            <input
              type="date"
              v-model="articlesDateRange.end"
              class="flex-1 h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
          </div>
        </div>

        <!-- Projets Date Range -->
        <div class="h-auto">
          <label class="block text-sm font-medium text-gray-600 mb-[1vh]">
            Période Projets
          </label>
          <div class="flex gap-[2%] h-[5vh] min-h-[40px]">
            <input
              type="date"
              v-model="projetsDateRange.start"
              class="flex-1 h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
            <input
              type="date"
              v-model="projetsDateRange.end"
              class="flex-1 h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-[2vh] mb-[2vh]">
        <button
          @click="applyFilters"
          class="h-[5vh] min-h-[40px] w-[15%] min-w-[150px] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 transition-colors"
        >
          Appliquer les filtres
        </button>
      </div>
      </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-[2%] w-full">
      <!-- Recent Bookings -->
      <div class="bg-white rounded-xl shadow-sm min-h-[35vh] border border-gray-100">
        <div class="w-[95%] h-full mx-auto flex flex-col">
          <div class="flex items-center justify-between h-[6vh] min-h-[50px]">
            <h2 class="text-lg font-semibold text-gray-800">Réservations Récentes</h2>
            <router-link
              to="/admin/bookings"
              class="text-sm text-[var(--bg-1)] hover:underline"
            >
              Voir tout
            </router-link>
          </div>
          <div class="flex-1 overflow-y-auto space-y-[1vh]">
          <div
            v-for="booking in recentBookings"
            :key="booking.id"
            class="flex items-center justify-between h-[8vh] min-h-[60px] bg-gray-50 rounded-lg"
          >
            <div class="flex items-center w-[70%] h-full ml-[3%]">
              <div class="w-[5vh] min-w-[40px] h-[5vh] min-h-[40px] bg-[var(--second-orange)] rounded-full flex items-center justify-center text-white font-bold">
                {{ booking.clientName.charAt(0) }}
              </div>
              <div class="ml-[5%]">
                <p class="font-medium text-gray-800">{{ booking.clientName }}</p>
                <p class="text-sm text-gray-500">{{ booking.offer }}</p>
              </div>
            </div>
            <span
              :class="[
                'text-xs font-medium h-[3vh] min-h-[24px] flex items-center rounded-full mr-[3%]',
                booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
              ]"
            >
              {{ getStatusLabel(booking.status) }}
            </span>
          </div>
        </div>
      </div>
      </div>

      <!-- Recent Articles -->
      <div class="bg-white rounded-xl shadow-sm min-h-[35vh] border border-gray-100">
        <div class="w-[95%] h-full mx-auto flex flex-col">
          <div class="flex items-center justify-between h-[6vh] min-h-[50px]">
            <h2 class="text-lg font-semibold text-gray-800">Articles Récents</h2>
            <router-link
              to="/admin/blog"
              class="text-sm text-[var(--bg-1)] hover:underline"
            >
              Voir tout
            </router-link>
          </div>
          <div class="flex-1 overflow-y-auto space-y-[1vh]">
          <div
            v-for="article in recentArticles"
            :key="article.id"
            class="flex items-center justify-between h-[8vh] min-h-[60px] bg-gray-50 rounded-lg"
          >
            <div class="flex items-center w-[70%] h-full ml-[3%]">
              <div class="w-[8vh] min-w-[60px] h-[6vh] min-h-[45px] bg-gray-200 rounded overflow-hidden">
                <img
                  :src="article.thumbnail"
                  :alt="article.title"
                  class="w-full h-full object-cover"
                  v-if="article.thumbnail"
                />
              </div>
              <div class="ml-[5%]">
                <p class="font-medium text-gray-800 line-clamp-1">{{ article.title }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(article.createdAt) }}</p>
              </div>
            </div>
            <span
              :class="[
                'text-xs font-medium h-[3vh] min-h-[24px] flex items-center rounded-full mr-[3%]',
                article.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              ]"
            >
              {{ article.published ? 'Publié' : 'Brouillon' }}
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-[3vh] mb-[3vh] bg-white rounded-xl shadow-sm min-h-[20vh] border border-gray-100">
      <div class="w-[95%] h-full mx-auto flex flex-col justify-around">
        <h2 class="text-lg font-semibold text-gray-800 mt-[2vh]">Actions Rapides</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-[2%] my-[2vh]">
        <router-link
          to="/admin/blog"
          class="flex flex-col items-center justify-center h-[12vh] min-h-[100px] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <span class="material-symbols-outlined text-blue-600 text-3xl mb-[1vh]">add_circle</span>
          <span class="text-sm font-medium text-gray-700">Nouvel Article</span>
        </router-link>
        <router-link
          to="/admin/projects"
          class="flex flex-col items-center justify-center h-[12vh] min-h-[100px] bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <span class="material-symbols-outlined text-purple-600 text-3xl mb-[1vh]">add_home</span>
          <span class="text-sm font-medium text-gray-700">Nouveau Projet</span>
        </router-link>
        <router-link
          to="/admin/bookings"
          class="flex flex-col items-center justify-center h-[12vh] min-h-[100px] bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <span class="material-symbols-outlined text-green-600 text-3xl mb-[1vh]">event_available</span>
          <span class="text-sm font-medium text-gray-700">Gérer Offres</span>
        </router-link>
        <router-link
          to="/admin/mailbox"
          class="flex flex-col items-center justify-center h-[12vh] min-h-[100px] bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
        >
          <span class="material-symbols-outlined text-orange-600 text-3xl mb-[1vh]">mail</span>
          <span class="text-sm font-medium text-gray-700">Messages</span>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'DashboardView',
  setup() {
    // Stats Data
    const chiffreAffaires = ref(125000)
    const caGrowth = ref(12.5)
    const articlesCount = ref(24)
    const articlesGrowth = ref(8)
    const projetsCount = ref(15)
    const projetsGrowth = ref(-3)

    // Date Ranges
    const caDateRange = reactive({
      start: getFirstDayOfMonth(),
      end: getToday()
    })
    const articlesDateRange = reactive({
      start: getFirstDayOfMonth(),
      end: getToday()
    })
    const projetsDateRange = reactive({
      start: getFirstDayOfMonth(),
      end: getToday()
    })

    // Recent Data (Mock)
    const recentBookings = ref([
      { id: 1, clientName: 'Jean Dupont', offer: 'Appartement Luxe - 7 jours', status: 'confirmed' },
      { id: 2, clientName: 'Marie Claire', offer: 'Studio Moderne - 3 jours', status: 'pending' },
      { id: 3, clientName: 'Paul Martin', offer: 'Villa Premium - 14 jours', status: 'confirmed' },
      { id: 4, clientName: 'Sophie Lefebvre', offer: 'Appartement Standard - 5 jours', status: 'cancelled' }
    ])

    const recentArticles = ref([
      { id: 1, title: 'Les tendances architecturales 2026', thumbnail: null, createdAt: '2026-01-20', published: true },
      { id: 2, title: 'Comment choisir son architecte d\'intérieur', thumbnail: null, createdAt: '2026-01-18', published: true },
      { id: 3, title: 'Rénovation écologique : les bonnes pratiques', thumbnail: null, createdAt: '2026-01-15', published: false }
    ])

    // Helper Functions
    function getToday() {
      return new Date().toISOString().split('T')[0]
    }

    function getFirstDayOfMonth() {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
    }

    function formatCurrency(amount) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0
      }).format(amount)
    }

    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    function formatDateRange(range) {
      const start = new Date(range.start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
      const end = new Date(range.end).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
      return `${start} - ${end}`
    }

    function getStatusLabel(status) {
      const labels = {
        confirmed: 'Confirmé',
        pending: 'En attente',
        cancelled: 'Annulé'
      }
      return labels[status] || status
    }

    function applyFilters() {
      // TODO: Implement API call to fetch filtered data
      console.log('Applying filters...', {
        ca: caDateRange,
        articles: articlesDateRange,
        projets: projetsDateRange
      })
    }

    return {
      chiffreAffaires,
      caGrowth,
      articlesCount,
      articlesGrowth,
      projetsCount,
      projetsGrowth,
      caDateRange,
      articlesDateRange,
      projetsDateRange,
      recentBookings,
      recentArticles,
      formatCurrency,
      formatDate,
      formatDateRange,
      getStatusLabel,
      applyFilters
    }
  }
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
