<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--bg-1)] to-[var(--bg-2)]">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    </div>

    <div class="relative z-10 w-full max-w-md mx-4">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4">
          <span class="text-4xl font-bold text-[var(--bg-1)]">MG</span>
        </div>
        <!-- <h1 class="text-3xl font-bold text-white mb-2">Administration</h1> -->
        <p class="text-white/70">Maison GANSOU - Espace Admin</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white flex flex-col rounded-2xl shadow-2xl p-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Connexion</h2>

        <!-- Session Expired Warning -->
        <div
          v-if="sessionExpired"
          class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3"
        >
          <span class="material-symbols-outlined text-amber-500">schedule</span>
          <p class="text-amber-700 text-sm">Votre session a expiré. Veuillez vous reconnecter.</p>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <span class="material-symbols-outlined text-red-500">error</span>
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5 flex flex-col gap-4">
          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                mail
              </span>
              <input
                type="email"
                v-model="form.email"
                required
                placeholder="votre@email.com"
                class="w-full h-12 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent transition-all"
                :disabled="isLoading"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                lock
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                required
                placeholder="••••••••"
                class="w-full h-12 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent transition-all"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span class="material-symbols-outlined">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="form.rememberMe"
                class="w-4 h-4 text-[var(--bg-1)] border-gray-300 rounded focus:ring-[var(--bg-1)]"
              />
              <span class="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <a href="#" class="text-sm text-[var(--bg-1)] hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full h-12 bg-[var(--bg-1)] text-white rounded-lg font-medium hover:bg-[var(--bg-1)]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="material-symbols-outlined animate-spin">progress_activity</span>
            <span v-else class="material-symbols-outlined">login</span>
            {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-200"></div>
          <span class="px-4 text-sm text-gray-400">ou</span>
          <div class="flex-1 border-t border-gray-200"></div>
        </div>

        <!-- Back to Site -->
        <router-link
          to="/"
          class="w-full h-12 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined">arrow_back</span>
          Retour au site
        </router-link>
      </div>

      <!-- Footer -->
      <p class="text-center text-white/50 text-sm mt-6">
        © 2026 Maison GANSOU. Tous droits réservés.
      </p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'LoginAdminView',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const form = reactive({
      email: '',
      password: '',
      rememberMe: false
    })

    const showPassword = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')

    // Check if redirected due to session expiration
    const sessionExpired = computed(() => route.query.expired === '1')

    // Clear any stale session data on mount
    onMounted(() => {
      if (sessionExpired.value) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        localStorage.removeItem('adminLoginTime')
      }
    })

    const handleLogin = async () => {
      isLoading.value = true
      errorMessage.value = ''

      try {
        const response = await fetch('/api/v1/admin/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Erreur de connexion')
        }

        // Store tokens (tokens are directly in response, not in data.data)
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('user', JSON.stringify(data.user))

        // Store login timestamp for session timeout check (3 hours)
        localStorage.setItem('adminLoginTime', Date.now().toString())

        if (form.rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }

        // Check if there's a redirect destination stored
        const redirectPath = localStorage.getItem('redirectAfterLogin')
        localStorage.removeItem('redirectAfterLogin')

        // Redirect to intended page or admin dashboard
        if (redirectPath && redirectPath !== '/admin/login') {
          router.push(redirectPath)
        } else {
          router.push({ name: 'admin-dashboard' })
        }
      } catch (error) {
        errorMessage.value = error.message || 'Email ou mot de passe incorrect'
      } finally {
        isLoading.value = false
      }
    }

    return {
      form,
      showPassword,
      isLoading,
      errorMessage,
      sessionExpired,
      handleLogin
    }
  }
}
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
