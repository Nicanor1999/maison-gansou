<template>
  <div class="mailbox h-full w-full overflow-y-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
      <!-- Messages List -->
      <div class="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <!-- Search + Sync + Compose -->
        <div class="h-16 flex items-center border-b px-4 gap-2 flex-shrink-0">
          <div class="relative flex-1">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher..."
              class="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
          <button
            @click="syncEmails"
            :disabled="syncing"
            class="h-10 w-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center flex-shrink-0 disabled:opacity-50"
            title="Synchroniser les emails"
          >
            <span :class="['material-symbols-outlined text-gray-600', syncing ? 'animate-spin' : '']">sync</span>
          </button>
          <button
            @click="openComposeModal"
            class="h-10 px-4 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 transition-colors flex items-center gap-1 flex-shrink-0"
            title="Nouveau message"
          >
            <span class="material-symbols-outlined text-lg">edit_square</span>
            <span class="hidden xl:inline text-sm">Nouveau</span>
          </button>
        </div>

        <!-- Filters -->
        <div class="h-12 flex items-center border-b px-4 gap-2 flex-shrink-0">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="activeFilter = filter.id"
            :class="[
              'h-8 px-3 text-sm rounded-full transition-colors',
              activeFilter === filter.id
                ? 'bg-[var(--bg-1)] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ filter.label }}
            <span v-if="filter.count" class="ml-1 text-xs opacity-75">({{ filter.count }})</span>
          </button>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto">
          <div
            v-for="message in filteredMessages"
            :key="message._id"
            @click="selectMessage(message)"
            :class="[
              'p-4 border-b cursor-pointer transition-colors',
              selectedMessage?._id === message._id ? 'bg-blue-50' : 'hover:bg-gray-50',
              !message.read ? 'bg-blue-50/50' : ''
            ]"
          >
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center">
                <div
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm',
                    message.read ? 'bg-gray-400' : 'bg-[var(--bg-1)]'
                  ]"
                >
                  {{ message.direction === 'outbound' ? (message.recipientEmail || 'E').charAt(0).toUpperCase() : (message.senderName || 'M').charAt(0).toUpperCase() }}
                </div>
                <div class="ml-3">
                  <p :class="['font-medium', !message.read ? 'text-gray-800' : 'text-gray-600']">
                    <span v-if="message.direction === 'outbound'" class="text-xs text-gray-400 mr-1">À:</span>
                    {{ message.direction === 'outbound' ? message.recipientEmail : message.senderName }}
                  </p>
                  <p class="text-xs text-gray-400">{{ message.direction === 'outbound' ? message.senderName : message.senderEmail }}</p>
                </div>
              </div>
              <span class="text-xs text-gray-400">{{ formatTime(message.createdAt) }}</span>
            </div>
            <p :class="['text-sm mt-1 line-clamp-1', !message.read ? 'font-medium text-gray-800' : 'text-gray-500']">
              {{ message.subject }}
            </p>
            <p class="text-xs text-gray-400 mt-1 line-clamp-1">{{ message.content }}</p>
            <div class="flex gap-2 mt-2">
              <span
                v-if="message.starred"
                class="material-symbols-outlined text-yellow-500 text-sm"
              >star</span>
              <span
                v-if="message.direction === 'outbound'"
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  message.status === 'sent' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                ]"
              >
                {{ message.status === 'sent' ? 'Envoyé' : 'Échoué' }}
              </span>
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  message.category === 'contact' ? 'bg-blue-100 text-blue-600' :
                  message.category === 'booking' ? 'bg-green-100 text-green-600' :
                  message.category === 'recruitment' ? 'bg-purple-100 text-purple-600' :
                  message.category === 'system' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ getCategoryLabel(message.category) }}
              </span>
            </div>
          </div>

          <div v-if="loading" class="h-48 flex flex-col items-center justify-center text-gray-400">
            <span class="material-symbols-outlined text-4xl mb-2 animate-spin">progress_activity</span>
            <p>Chargement...</p>
          </div>
          <div v-else-if="filteredMessages.length === 0" class="h-48 flex flex-col items-center justify-center text-gray-400">
            <span class="material-symbols-outlined text-4xl mb-2">inbox</span>
            <p>Aucun message</p>
          </div>
        </div>
      </div>

      <!-- Message Detail -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div v-if="selectedMessage" class="flex flex-col h-full">
          <!-- Header -->
          <div class="border-b flex-shrink-0">
            <div class="h-16 flex items-center justify-between px-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-[var(--bg-1)] rounded-full flex items-center justify-center text-white font-bold">
                  {{ selectedMessage.direction === 'outbound' ? (selectedMessage.recipientEmail || 'E').charAt(0).toUpperCase() : (selectedMessage.senderName || 'M').charAt(0).toUpperCase() }}
                </div>
                <div class="ml-4">
                  <p class="font-semibold text-gray-800">
                    <span v-if="selectedMessage.direction === 'outbound'" class="text-xs text-gray-400 mr-1">À:</span>
                    {{ selectedMessage.direction === 'outbound' ? selectedMessage.recipientEmail : selectedMessage.senderName }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ selectedMessage.direction === 'outbound' ? ('De: ' + selectedMessage.senderName) : selectedMessage.senderEmail }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="toggleStar(selectedMessage)"
                  class="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
                  :title="selectedMessage.starred ? 'Retirer des favoris' : 'Ajouter aux favoris'"
                >
                  <span
                    :class="[
                      'material-symbols-outlined',
                      selectedMessage.starred ? 'text-yellow-500' : 'text-gray-400'
                    ]"
                  >{{ selectedMessage.starred ? 'star' : 'star_border' }}</span>
                </button>
                <button
                  @click="archiveMessage(selectedMessage)"
                  class="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-400"
                  title="Archiver"
                >
                  <span class="material-symbols-outlined">archive</span>
                </button>
                <button
                  @click="deleteMessage(selectedMessage)"
                  class="h-10 w-10 flex items-center justify-center hover:bg-red-50 rounded-lg text-red-500"
                  title="Supprimer"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
            <div class="h-14 flex items-center justify-between px-6">
              <h2 class="text-xl font-semibold text-gray-800">{{ selectedMessage.subject }}</h2>
              <span class="text-sm text-gray-400">{{ formatDate(selectedMessage.createdAt) }}</span>
            </div>
            <div class="h-10 flex items-center gap-2 px-6">
              <span
                v-if="selectedMessage.direction === 'outbound'"
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  selectedMessage.status === 'sent' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                ]"
              >
                {{ selectedMessage.status === 'sent' ? 'Envoyé' : 'Échoué' }}
              </span>
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  selectedMessage.category === 'contact' ? 'bg-blue-100 text-blue-600' :
                  selectedMessage.category === 'booking' ? 'bg-green-100 text-green-600' :
                  selectedMessage.category === 'recruitment' ? 'bg-purple-100 text-purple-600' :
                  selectedMessage.category === 'system' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ getCategoryLabel(selectedMessage.category) }}
              </span>
              <span v-if="selectedMessage.phone" class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                {{ selectedMessage.phone }}
              </span>
              <span v-if="selectedMessage.template" class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                {{ selectedMessage.template }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 p-6 overflow-y-auto">
            <div class="prose max-w-none">
              <p class="text-gray-700 whitespace-pre-wrap leading-relaxed">{{ selectedMessage.content }}</p>
            </div>

            <!-- Attachments -->
            <div v-if="selectedMessage.attachments && selectedMessage.attachments.length > 0" class="mt-6">
              <h4 class="text-sm font-medium text-gray-600 mb-2">Pièces jointes</h4>
              <div class="flex flex-wrap gap-2">
                <a
                  v-for="attachment in selectedMessage.attachments"
                  :key="attachment.name"
                  :href="attachment.url"
                  class="flex items-center h-10 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span class="material-symbols-outlined text-gray-500 mr-2">attach_file</span>
                  <span class="text-sm text-gray-700">{{ attachment.name }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Reply Section -->
          <div class="h-16 border-t flex items-center px-6 flex-shrink-0">
            <div class="flex gap-3 w-full">
              <button
                @click="openReplyModal"
                class="flex-1 h-10 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 transition-colors flex items-center justify-center"
              >
                <span class="material-symbols-outlined mr-2">reply</span>
                Répondre
              </button>
              <button
                @click="openForwardModal"
                class="h-10 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <span class="material-symbols-outlined mr-2">forward</span>
                Transférer
              </button>
            </div>
          </div>
        </div>

        <!-- No Message Selected -->
        <div v-else class="flex-1 flex items-center justify-center text-gray-400">
          <div class="text-center">
            <span class="material-symbols-outlined text-6xl mb-4">mail</span>
            <p class="text-lg">Sélectionnez un message pour le lire</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Reply Modal -->
    <div
      v-if="showReplyModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        <div class="h-16 border-b flex items-center justify-between px-6">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ isForwarding ? 'Transférer le message' : 'Répondre' }}
          </h2>
          <button @click="closeReplyModal" class="text-gray-500 hover:text-gray-700">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-6 space-y-5">
          <div v-if="isForwarding">
            <label class="block text-sm font-medium text-gray-700 mb-2">À</label>
            <input
              type="email"
              v-model="replyForm.to"
              class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              placeholder="email@exemple.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
            <input
              type="text"
              v-model="replyForm.subject"
              class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              v-model="replyForm.content"
              rows="8"
              class="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent resize-none"
              placeholder="Écrivez votre réponse..."
            ></textarea>
          </div>
        </div>
        <div class="h-16 border-t flex items-center justify-end gap-3 px-6">
          <button
            @click="closeReplyModal"
            class="h-10 px-6 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="sendReply"
            :disabled="sendingReply"
            class="h-10 px-6 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 flex items-center justify-center disabled:opacity-50"
          >
            <span v-if="sendingReply" class="material-symbols-outlined mr-2 animate-spin">progress_activity</span>
            <span v-else class="material-symbols-outlined mr-2">send</span>
            {{ sendingReply ? 'Envoi...' : 'Envoyer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Compose Modal -->
    <div
      v-if="showComposeModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        <div class="h-16 border-b flex items-center justify-between px-6">
          <h2 class="text-xl font-semibold text-gray-800">Nouveau message</h2>
          <button @click="closeComposeModal" class="text-gray-500 hover:text-gray-700">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-6 space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">À</label>
            <input
              type="email"
              v-model="composeForm.to"
              class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              placeholder="email@exemple.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
            <input
              type="text"
              v-model="composeForm.subject"
              class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              placeholder="Objet du message"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <select
              v-model="composeForm.category"
              class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            >
              <option value="contact">Contact</option>
              <option value="booking">Réservation</option>
              <option value="recruitment">Recrutement</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              v-model="composeForm.content"
              rows="8"
              class="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent resize-none"
              placeholder="Écrivez votre message..."
            ></textarea>
          </div>
        </div>
        <div class="h-16 border-t flex items-center justify-end gap-3 px-6">
          <button
            @click="closeComposeModal"
            class="h-10 px-6 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="sendCompose"
            :disabled="sendingCompose"
            class="h-10 px-6 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 flex items-center justify-center disabled:opacity-50"
          >
            <span v-if="sendingCompose" class="material-symbols-outlined mr-2 animate-spin">progress_activity</span>
            <span v-else class="material-symbols-outlined mr-2">send</span>
            {{ sendingCompose ? 'Envoi...' : 'Envoyer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useConfirmModal } from '@/composables/useConfirmModal'

export default {
  name: 'MailBoxView',
  setup() {
    const { confirm: confirmModal, alert: alertModal } = useConfirmModal()
    const API_BASE = '/api/v1'
    const searchQuery = ref('')
    const activeFilter = ref('all')
    const selectedMessage = ref(null)
    const showReplyModal = ref(false)
    const showComposeModal = ref(false)
    const isForwarding = ref(false)
    const loading = ref(false)
    const sendingReply = ref(false)
    const sendingCompose = ref(false)
    const syncing = ref(false)

    const getHeaders = () => {
      const token = localStorage.getItem('accessToken')
      return {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    }

    const filters = computed(() => [
      { id: 'all', label: 'Tous', count: messages.value.filter(m => !m.archived).length },
      { id: 'inbound', label: 'Reçus', count: messages.value.filter(m => m.direction === 'inbound' && !m.archived).length },
      { id: 'outbound', label: 'Envoyés', count: messages.value.filter(m => m.direction === 'outbound' && !m.archived).length },
      { id: 'unread', label: 'Non lus', count: messages.value.filter(m => !m.read && !m.archived).length },
      { id: 'starred', label: 'Favoris', count: messages.value.filter(m => m.starred && !m.archived).length },
      { id: 'archived', label: 'Archivés', count: messages.value.filter(m => m.archived).length }
    ])

    const replyForm = reactive({
      to: '',
      subject: '',
      content: ''
    })

    const composeForm = reactive({
      to: '',
      subject: '',
      content: '',
      category: 'contact'
    })

    const messages = ref([])

    // Fetch messages from API
    async function fetchMessages() {
      loading.value = true
      try {
        const response = await fetch(`${API_BASE}/message?perPage=100`, {
          headers: getHeaders()
        })
        const result = await response.json()
        if (result.success && result.data) {
          messages.value = result.data.map(m => ({
            ...m,
            id: m._id,
            senderName: m.senderName || m.senderEmail || 'Système',
            senderEmail: m.senderEmail || '',
            recipientEmail: m.recipientEmail || '',
          }))
        }
      } catch (error) {
        console.error('Erreur chargement messages:', error)
      } finally {
        loading.value = false
      }
    }

    const filteredMessages = computed(() => {
      return messages.value.filter(m => {
        const senderName = (m.senderName || '').toLowerCase()
        const senderEmail = (m.senderEmail || '').toLowerCase()
        const subject = (m.subject || '').toLowerCase()
        const search = searchQuery.value.toLowerCase()

        const matchesSearch = search === '' ||
          senderName.includes(search) ||
          senderEmail.includes(search) ||
          subject.includes(search)

        let matchesFilter = true
        switch (activeFilter.value) {
          case 'inbound':
            matchesFilter = m.direction === 'inbound' && !m.archived
            break
          case 'outbound':
            matchesFilter = m.direction === 'outbound' && !m.archived
            break
          case 'unread':
            matchesFilter = !m.read && !m.archived
            break
          case 'starred':
            matchesFilter = m.starred && !m.archived
            break
          case 'archived':
            matchesFilter = m.archived
            break
          case 'all':
          default:
            matchesFilter = !m.archived
            break
        }

        return matchesSearch && matchesFilter
      })
    })

    function getCategoryLabel(category) {
      const labels = {
        contact: 'Contact',
        booking: 'Réservation',
        recruitment: 'Recrutement',
        system: 'Système',
        other: 'Autre'
      }
      return labels[category] || category
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

    function formatDate(dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    async function selectMessage(message) {
      selectedMessage.value = message
      if (!message.read) {
        message.read = true
        try {
          await fetch(`${API_BASE}/message/${message._id}`, {
            method: 'PUT',
            headers: { ...getHeaders(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ read: true })
          })
        } catch (error) {
          console.error('Erreur marquage lu:', error)
        }
      }
    }

    async function toggleStar(message) {
      const newValue = !message.starred
      message.starred = newValue
      try {
        await fetch(`${API_BASE}/message/${message._id}`, {
          method: 'PUT',
          headers: { ...getHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ starred: newValue })
        })
      } catch (error) {
        console.error('Erreur toggle star:', error)
        message.starred = !newValue
      }
    }

    async function archiveMessage(message) {
      message.archived = true
      selectedMessage.value = null
      try {
        await fetch(`${API_BASE}/message/${message._id}`, {
          method: 'PUT',
          headers: { ...getHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ archived: true })
        })
      } catch (error) {
        console.error('Erreur archivage:', error)
        message.archived = false
      }
    }

    async function deleteMessage(message) {
      const ok = await confirmModal({ title: 'Supprimer le message', message: 'Êtes-vous sûr de vouloir supprimer ce message ?' })
      if (ok) {
        try {
          await fetch(`${API_BASE}/message/${message._id}`, {
            method: 'DELETE',
            headers: getHeaders()
          })
          messages.value = messages.value.filter(m => m._id !== message._id)
          selectedMessage.value = null
        } catch (error) {
          console.error('Erreur suppression:', error)
        }
      }
    }

    function openReplyModal() {
      isForwarding.value = false
      const msg = selectedMessage.value
      replyForm.to = msg.direction === 'outbound' ? msg.recipientEmail : msg.senderEmail
      replyForm.subject = 'Re: ' + (msg.subject || '')
      replyForm.content = ''
      showReplyModal.value = true
    }

    function openForwardModal() {
      isForwarding.value = true
      replyForm.to = ''
      replyForm.subject = 'Fwd: ' + (selectedMessage.value.subject || '')
      replyForm.content = `\n\n---------- Message transféré ----------\nDe: ${selectedMessage.value.senderName} <${selectedMessage.value.senderEmail}>\nDate: ${formatDate(selectedMessage.value.createdAt)}\nSujet: ${selectedMessage.value.subject}\n\n${selectedMessage.value.content}`
      showReplyModal.value = true
    }

    function closeReplyModal() {
      showReplyModal.value = false
    }

    function openComposeModal() {
      composeForm.to = ''
      composeForm.subject = ''
      composeForm.content = ''
      composeForm.category = 'contact'
      showComposeModal.value = true
    }

    function closeComposeModal() {
      showComposeModal.value = false
    }

    async function sendCompose() {
      if (!composeForm.to || !composeForm.subject || !composeForm.content) {
        alertModal({ title: 'Erreur', message: 'Veuillez remplir tous les champs obligatoires.', type: 'error' })
        return
      }
      sendingCompose.value = true
      try {
        const response = await fetch(`${API_BASE}/message/compose`, {
          method: 'POST',
          headers: { ...getHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: composeForm.to,
            subject: composeForm.subject,
            content: composeForm.content,
            category: composeForm.category
          })
        })
        const result = await response.json()
        if (result.success) {
          alertModal({ title: 'Succès', message: 'Email envoyé avec succès !', type: 'success' })
          closeComposeModal()
          await fetchMessages()
        } else {
          alertModal({ title: 'Erreur', message: result.message || 'Erreur lors de l\'envoi', type: 'error' })
        }
      } catch (error) {
        console.error('Erreur envoi message:', error)
        alertModal({ title: 'Erreur', message: 'Erreur lors de l\'envoi de l\'email.', type: 'error' })
      } finally {
        sendingCompose.value = false
      }
    }

    async function sendReply() {
      if (!replyForm.to || !replyForm.subject || !replyForm.content) {
        alertModal({ title: 'Erreur', message: 'Veuillez remplir tous les champs.', type: 'error' })
        return
      }
      sendingReply.value = true
      try {
        const response = await fetch(`${API_BASE}/message/${selectedMessage.value._id}/reply`, {
          method: 'POST',
          headers: { ...getHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: replyForm.to,
            subject: replyForm.subject,
            content: replyForm.content
          })
        })
        const result = await response.json()
        if (result.success) {
          alertModal({ title: 'Succès', message: 'Email envoyé avec succès !', type: 'success' })
          closeReplyModal()
          await fetchMessages()
        } else {
          alertModal({ title: 'Erreur', message: result.message || 'Erreur lors de l\'envoi', type: 'error' })
        }
      } catch (error) {
        console.error('Erreur envoi réponse:', error)
        alertModal({ title: 'Erreur', message: 'Erreur lors de l\'envoi de l\'email.', type: 'error' })
      } finally {
        sendingReply.value = false
      }
    }

    async function syncEmails() {
      syncing.value = true
      try {
        const response = await fetch(`${API_BASE}/message/sync`, {
          method: 'POST',
          headers: getHeaders()
        })
        const result = await response.json()
        if (result.success) {
          alertModal({
            title: 'Synchronisation terminée',
            message: result.message || `${result.data?.saved || 0} nouveaux emails synchronisés`,
            type: 'success'
          })
          await fetchMessages()
        } else {
          alertModal({
            title: 'Erreur',
            message: result.message || 'Erreur lors de la synchronisation',
            type: 'error'
          })
        }
      } catch (error) {
        console.error('Erreur sync:', error)
        alertModal({
          title: 'Erreur',
          message: 'Erreur lors de la synchronisation des emails.',
          type: 'error'
        })
      } finally {
        syncing.value = false
      }
    }

    onMounted(() => {
      fetchMessages()
    })

    return {
      searchQuery,
      activeFilter,
      filters,
      messages,
      filteredMessages,
      selectedMessage,
      showReplyModal,
      showComposeModal,
      isForwarding,
      replyForm,
      composeForm,
      loading,
      sendingReply,
      sendingCompose,
      syncing,
      getCategoryLabel,
      formatTime,
      formatDate,
      selectMessage,
      toggleStar,
      archiveMessage,
      deleteMessage,
      openReplyModal,
      openForwardModal,
      closeReplyModal,
      sendReply,
      openComposeModal,
      closeComposeModal,
      sendCompose,
      fetchMessages,
      syncEmails
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