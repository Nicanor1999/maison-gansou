<template>
  <div class="dashboard h-full flex flex-col gap-6 w-[98%] overflow-y-auto">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center h-40">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--bg-1)]"></div>
    </div>

    <template v-else>
      <!-- Stats Cards - 6 cards in 2 rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
        <!-- Reservations Card -->
        <div class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100">
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div class="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-green-600 text-2xl">calendar_month</span>
              </div>
              <span
                :class="[
                  'text-sm font-medium px-2 py-1 rounded-full',
                  stats.reservations.growth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
                ]"
              >
                {{ stats.reservations.growth >= 0 ? '+' : '' }}{{ stats.reservations.growth }}%
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Reservations</h3>
              <p class="text-2xl font-bold text-gray-800">{{ stats.reservations.total }}</p>
              <p class="text-xs text-gray-400">{{ stats.reservations.pendingPayment }} en attente de paiement</p>
            </div>
          </div>
        </div>

        <!-- Articles Card -->
        <div class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100">
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div class="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-blue-600 text-2xl">article</span>
              </div>
              <span
                :class="[
                  'text-sm font-medium px-2 py-1 rounded-full',
                  stats.articles.growth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
                ]"
              >
                {{ stats.articles.growth >= 0 ? '+' : '' }}{{ stats.articles.growth }}%
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Articles</h3>
              <p class="text-2xl font-bold text-gray-800">{{ stats.articles.total }}</p>
              <p class="text-xs text-gray-400">{{ stats.articles.thisMonth }} ce mois</p>
            </div>
          </div>
        </div>

        <!-- Projects Card -->
        <div class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100">
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div class="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-purple-600 text-2xl">architecture</span>
              </div>
              <span
                :class="[
                  'text-sm font-medium px-2 py-1 rounded-full',
                  stats.projects.growth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
                ]"
              >
                {{ stats.projects.growth >= 0 ? '+' : '' }}{{ stats.projects.growth }}%
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Projets</h3>
              <p class="text-2xl font-bold text-gray-800">{{ stats.projects.total }}</p>
              <p class="text-xs text-gray-400">{{ stats.projects.thisMonth }} ce mois</p>
            </div>
          </div>
        </div>

        <!-- Messages Card -->
        <div class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100">
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div class="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-orange-600 text-2xl">mail</span>
              </div>
              <span v-if="stats.messages.unread > 0" class="text-sm font-medium px-2 py-1 rounded-full bg-red-100 text-red-600">
                {{ stats.messages.unread }} non lus
              </span>
              <span v-else class="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-600">
                Tout lu
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Messages</h3>
              <p class="text-2xl font-bold text-gray-800">{{ stats.messages.total }}</p>
              <p class="text-xs text-gray-400">{{ stats.messages.inbound }} recus, {{ stats.messages.outbound }} envoyes</p>
            </div>
          </div>
        </div>

        <!-- Offers Card -->
        <div class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100">
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div class="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-teal-600 text-2xl">hotel</span>
              </div>
              <span
                :class="[
                  'text-sm font-medium px-2 py-1 rounded-full',
                  stats.offers.available > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600',
                ]"
              >
                {{ stats.offers.available }} dispo
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Offres</h3>
              <p class="text-2xl font-bold text-gray-800">{{ stats.offers.total }}</p>
              <p class="text-xs text-gray-400">{{ stats.offers.unavailable }} indisponibles</p>
            </div>
          </div>
        </div>

        <!-- Revenue Card -->
        <div class="bg-white rounded-xl shadow-sm h-40 w-full flex flex-col justify-center items-center border border-gray-100">
          <div class="w-4/5 h-full mx-auto flex flex-col justify-around py-4">
            <div class="flex items-center justify-between">
              <div class="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-emerald-600 text-2xl">payments</span>
              </div>
              <span v-if="stats.revenue.pending > 0" class="text-sm font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
                {{ formatCurrency(stats.revenue.pending) }} en attente
              </span>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <h3 class="text-gray-500 text-lg font-bold" style="font-family: 'Inter', sans-serif;">Revenus</h3>
              <p class="text-2xl font-bold text-gray-800">{{ formatCurrency(stats.revenue.completed) }}</p>
              <p class="text-xs text-gray-400">{{ stats.revenue.completedCount }} paiements recus</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Sections - 2x2 Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <!-- Recent Reservations -->
        <div class="bg-white rounded-xl shadow-sm min-h-80 border border-gray-100 flex justify-center">
          <div class="w-[95%] h-full mx-auto py-4">
            <div class="flex items-center justify-between h-12">
              <h3 class="text-base font-semibold text-gray-800">Reservations Recentes</h3>
              <router-link to="/admin/bookings" class="text-sm text-[var(--bg-1)] hover:underline">
                Voir tout
              </router-link>
            </div>
            <div v-if="recentReservations.length === 0" class="flex items-center justify-center h-40 text-gray-400">
              Aucune reservation
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
                    <p class="text-sm text-gray-500">{{ reservation.email }}</p>
                  </div>
                </div>
                <div class="text-right flex flex-col items-end gap-1">
                  <span
                    :class="[
                      'text-xs px-2 py-0.5 rounded-full',
                      getPaymentStatusClass(reservation.paymentStatus)
                    ]"
                  >
                    {{ getPaymentStatusLabel(reservation.paymentStatus) }}
                  </span>
                  <p class="text-xs text-gray-400">{{ formatDate(reservation.createdAt) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Articles -->
        <div class="bg-white rounded-xl shadow-sm min-h-80 border border-gray-100 flex justify-center">
          <div class="w-[95%] h-full mx-auto py-4">
            <div class="flex items-center justify-between h-12">
              <h3 class="text-base font-semibold text-gray-800">Articles Recents</h3>
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
                      v-if="article.coverImage"
                      :src="article.coverImage"
                      :alt="article.title"
                      class="w-full h-full object-cover"
                    />
                    <span v-else class="material-symbols-outlined text-gray-400">image</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800 line-clamp-1">{{ article.title }}</p>
                    <p class="text-sm text-gray-500">{{ formatDate(article.createdAt) }}</p>
                  </div>
                </div>
                <span
                  v-if="article.tags && article.tags.length > 0"
                  class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                >
                  {{ article.tags[0]?.Tags || article.tags[0] }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Messages -->
        <div class="bg-white rounded-xl shadow-sm min-h-80 border border-gray-100 flex justify-center">
          <div class="w-[95%] h-full mx-auto py-4">
            <div class="flex items-center justify-between h-12">
              <h3 class="text-base font-semibold text-gray-800">Messages Recents</h3>
              <router-link to="/admin/mailbox" class="text-sm text-[var(--bg-1)] hover:underline">
                Voir tout
              </router-link>
            </div>
            <div v-if="recentMessages.length === 0" class="flex items-center justify-center h-40 text-gray-400">
              Aucun message
            </div>
            <div v-else class="flex flex-col gap-2 overflow-y-auto max-h-64">
              <div
                v-for="message in recentMessages"
                :key="message._id"
                :class="[
                  'flex items-center justify-between h-16 rounded-lg px-3',
                  !message.read ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                ]"
              >
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold',
                      !message.read ? 'bg-blue-500' : 'bg-gray-400'
                    ]"
                  >
                    {{ (message.senderName || message.senderEmail || 'M').charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p :class="['font-medium line-clamp-1', !message.read ? 'text-gray-900' : 'text-gray-700']">
                      {{ message.senderName || message.senderEmail }}
                    </p>
                    <p class="text-sm text-gray-500 line-clamp-1">{{ message.subject }}</p>
                  </div>
                </div>
                <div class="text-right flex flex-col items-end gap-1">
                  <span
                    :class="[
                      'text-xs px-2 py-0.5 rounded-full',
                      getCategoryClass(message.category)
                    ]"
                  >
                    {{ getCategoryLabel(message.category) }}
                  </span>
                  <p class="text-xs text-gray-400">{{ formatTime(message.createdAt) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Projects -->
        <div class="bg-white rounded-xl shadow-sm min-h-80 border border-gray-100 flex justify-center">
          <div class="w-[95%] h-full mx-auto py-4">
            <div class="flex items-center justify-between h-12">
              <h3 class="text-base font-semibold text-gray-800">Projets Recents</h3>
              <router-link to="/admin/projects" class="text-sm text-[var(--bg-1)] hover:underline">
                Voir tout
              </router-link>
            </div>
            <div v-if="recentProjects.length === 0" class="flex items-center justify-center h-40 text-gray-400">
              Aucun projet
            </div>
            <div v-else class="flex flex-col gap-2 overflow-y-auto max-h-64">
              <div
                v-for="project in recentProjects"
                :key="project._id"
                class="flex items-center justify-between h-16 bg-gray-50 rounded-lg px-3"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span class="material-symbols-outlined text-purple-600">home_work</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800 line-clamp-1">{{ project.title }}</p>
                    <p class="text-sm text-gray-500">{{ project.town }}, {{ project.country }}</p>
                  </div>
                </div>
                <div class="text-right flex flex-col items-end gap-1">
                  <span
                    :class="[
                      'text-xs px-2 py-0.5 rounded-full',
                      project.projectType === 'Commercial' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    ]"
                  >
                    {{ project.projectType || 'Residential' }}
                  </span>
                  <p class="text-xs text-gray-400">{{ formatDate(project.createdAt) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-4 mb-6 bg-white rounded-xl shadow-sm h-44 border border-gray-100 flex justify-center">
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
              <span class="text-sm font-medium text-gray-700">Reservations</span>
            </router-link>
            <router-link
              to="/admin/mailbox"
              class="flex flex-col items-center justify-center h-full bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors relative"
            >
              <span v-if="stats.messages.unread > 0" class="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {{ stats.messages.unread > 9 ? '9+' : stats.messages.unread }}
              </span>
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
      reservations: { total: 0, pendingPayment: 0, confirmed: 0, growth: 0 },
      articles: { total: 0, thisMonth: 0, growth: 0 },
      projects: { total: 0, thisMonth: 0, growth: 0 },
      messages: { total: 0, unread: 0, inbound: 0, outbound: 0 },
      offers: { total: 0, available: 0, unavailable: 0 },
      revenue: { completed: 0, pending: 0, completedCount: 0 }
    })

    // Recent Data
    const recentReservations = ref([])
    const recentArticles = ref([])
    const recentProjects = ref([])
    const recentMessages = ref([])

    // Get auth headers
    const getHeaders = () => {
      const token = localStorage.getItem('accessToken')
      return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    }

    // Fetch data from API
    const fetchDashboardData = async () => {
      isLoading.value = true
      const headers = getHeaders()

      try {
        // Fetch all data in parallel
        const [
          reservationsRes,
          articlesRes,
          projectsRes,
          messagesRes,
          offersRes,
          allReservationsRes
        ] = await Promise.all([
          fetch(`${API_BASE}/reservation?perPage=5&page=1`, { headers }),
          fetch(`${API_BASE}/article?perPage=5&page=1`, { headers }),
          fetch(`${API_BASE}/projects?perPage=5&page=1`, { headers }),
          fetch(`${API_BASE}/message?perPage=5&page=1`, { headers }),
          fetch(`${API_BASE}/offer?perPage=100`, { headers }),
          fetch(`${API_BASE}/reservation?perPage=1000`, { headers }) // For revenue calculation
        ])

        // Process Reservations
        if (reservationsRes.ok) {
          const data = await reservationsRes.json()
          const reservations = data.data || []

          stats.reservations.total = data.totalItems || reservations.length
          recentReservations.value = reservations.slice(0, 5)
        }

        // Process All Reservations for stats and revenue
        if (allReservationsRes.ok) {
          const data = await allReservationsRes.json()
          const allReservations = data.data || []

          stats.reservations.total = data.totalItems || allReservations.length
          stats.reservations.pendingPayment = allReservations.filter(
            r => r.paymentStatus === 'pending' || r.paymentStatus === 'not_initiated'
          ).length
          stats.reservations.confirmed = allReservations.filter(
            r => r.paymentStatus === 'completed'
          ).length

          // Calculate revenue
          const completedPayments = allReservations.filter(r => r.paymentStatus === 'completed')
          const pendingPayments = allReservations.filter(r => r.paymentStatus === 'pending')

          stats.revenue.completed = completedPayments.reduce((sum, r) => sum + (r.paymentAmount || 0), 0)
          stats.revenue.pending = pendingPayments.reduce((sum, r) => sum + (r.paymentAmount || 0), 0)
          stats.revenue.completedCount = completedPayments.length

          // Calculate growth
          stats.reservations.growth = calculateMonthlyGrowth(allReservations)
        }

        // Process Articles
        if (articlesRes.ok) {
          const data = await articlesRes.json()
          const articles = data.data || []

          stats.articles.total = data.totalItems || articles.length
          stats.articles.thisMonth = countThisMonth(articles)
          stats.articles.growth = calculateMonthlyGrowth(articles)
          recentArticles.value = articles.slice(0, 5)
        }

        // Process Projects
        if (projectsRes.ok) {
          const data = await projectsRes.json()
          const projects = data.data || []

          stats.projects.total = data.totalItems || projects.length
          stats.projects.thisMonth = countThisMonth(projects)
          stats.projects.growth = calculateMonthlyGrowth(projects)
          recentProjects.value = projects.slice(0, 5)
        }

        // Process Messages
        if (messagesRes.ok) {
          const data = await messagesRes.json()
          const messages = data.data || []

          stats.messages.total = data.totalItems || messages.length
          stats.messages.unread = messages.filter(m => !m.read).length
          stats.messages.inbound = messages.filter(m => m.direction === 'inbound').length
          stats.messages.outbound = messages.filter(m => m.direction === 'outbound').length
          recentMessages.value = messages.slice(0, 5)

          // Fetch unread count properly with all messages
          try {
            const unreadRes = await fetch(`${API_BASE}/message?perPage=1000&read=false`, { headers })
            if (unreadRes.ok) {
              const unreadData = await unreadRes.json()
              stats.messages.unread = unreadData.totalItems || (unreadData.data || []).length
            }
          } catch (e) {
            console.error('Error fetching unread count:', e)
          }
        }

        // Process Offers
        if (offersRes.ok) {
          const data = await offersRes.json()
          const offers = data.data || []

          stats.offers.total = data.totalItems || offers.length
          stats.offers.available = offers.filter(o => o.availability === true).length
          stats.offers.unavailable = stats.offers.total - stats.offers.available
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
      const now = new Date()
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

      const thisMonthCount = items.filter(item => {
        const createdAt = new Date(item.createdAt)
        return createdAt >= startOfThisMonth
      }).length

      const lastMonthCount = items.filter(item => {
        const createdAt = new Date(item.createdAt)
        return createdAt >= startOfLastMonth && createdAt < startOfThisMonth
      }).length

      if (lastMonthCount === 0) {
        return thisMonthCount > 0 ? 100 : 0
      }

      return Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100)
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

    function formatTime(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      const now = new Date()
      const diff = now - date

      if (diff < 86400000) {
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }
      if (diff < 604800000) {
        return date.toLocaleDateString('fr-FR', { weekday: 'short' })
      }
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    }

    function formatCurrency(amount) {
      if (!amount) return '0 F'
      return new Intl.NumberFormat('fr-FR').format(amount) + ' F'
    }

    function getPaymentStatusLabel(status) {
      const labels = {
        'not_initiated': 'Non initie',
        'pending': 'En attente',
        'completed': 'Paye',
        'failed': 'Echoue',
        'refunded': 'Rembourse'
      }
      return labels[status] || status || 'Non initie'
    }

    function getPaymentStatusClass(status) {
      const classes = {
        'not_initiated': 'bg-gray-100 text-gray-600',
        'pending': 'bg-yellow-100 text-yellow-600',
        'completed': 'bg-green-100 text-green-600',
        'failed': 'bg-red-100 text-red-600',
        'refunded': 'bg-purple-100 text-purple-600'
      }
      return classes[status] || 'bg-gray-100 text-gray-600'
    }

    function getCategoryLabel(category) {
      const labels = {
        contact: 'Contact',
        booking: 'Reservation',
        recruitment: 'Recrutement',
        system: 'Systeme',
        other: 'Autre'
      }
      return labels[category] || category || 'Autre'
    }

    function getCategoryClass(category) {
      const classes = {
        contact: 'bg-blue-100 text-blue-600',
        booking: 'bg-green-100 text-green-600',
        recruitment: 'bg-purple-100 text-purple-600',
        system: 'bg-orange-100 text-orange-600',
        other: 'bg-gray-100 text-gray-600'
      }
      return classes[category] || 'bg-gray-100 text-gray-600'
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      isLoading,
      stats,
      recentReservations,
      recentArticles,
      recentProjects,
      recentMessages,
      getInitials,
      formatDate,
      formatTime,
      formatCurrency,
      getPaymentStatusLabel,
      getPaymentStatusClass,
      getCategoryLabel,
      getCategoryClass,
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
