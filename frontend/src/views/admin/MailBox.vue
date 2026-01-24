<template>
  <div class="mailbox h-full w-full overflow-y-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
      <!-- Messages List -->
      <div class="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <!-- Search -->
        <div class="h-16 flex items-center border-b px-4 flex-shrink-0">
          <div class="relative w-full">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher un message..."
              class="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
            />
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
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
            :key="message.id"
            @click="selectMessage(message)"
            :class="[
              'p-4 border-b cursor-pointer transition-colors',
              selectedMessage?.id === message.id ? 'bg-blue-50' : 'hover:bg-gray-50',
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
                  {{ message.senderName.charAt(0) }}
                </div>
                <div class="ml-3">
                  <p :class="['font-medium', !message.read ? 'text-gray-800' : 'text-gray-600']">
                    {{ message.senderName }}
                  </p>
                  <p class="text-xs text-gray-400">{{ message.senderEmail }}</p>
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
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  message.category === 'contact' ? 'bg-blue-100 text-blue-600' :
                  message.category === 'booking' ? 'bg-green-100 text-green-600' :
                  message.category === 'recruitment' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ getCategoryLabel(message.category) }}
              </span>
            </div>
          </div>

          <div v-if="filteredMessages.length === 0" class="h-48 flex flex-col items-center justify-center text-gray-400">
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
                  {{ selectedMessage.senderName.charAt(0) }}
                </div>
                <div class="ml-4">
                  <p class="font-semibold text-gray-800">{{ selectedMessage.senderName }}</p>
                  <p class="text-sm text-gray-500">{{ selectedMessage.senderEmail }}</p>
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
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  selectedMessage.category === 'contact' ? 'bg-blue-100 text-blue-600' :
                  selectedMessage.category === 'booking' ? 'bg-green-100 text-green-600' :
                  selectedMessage.category === 'recruitment' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ getCategoryLabel(selectedMessage.category) }}
              </span>
              <span v-if="selectedMessage.phone" class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                {{ selectedMessage.phone }}
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
            class="h-10 px-6 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 flex items-center justify-center"
          >
            <span class="material-symbols-outlined mr-2">send</span>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'

export default {
  name: 'MailBoxView',
  setup() {
    const searchQuery = ref('')
    const activeFilter = ref('all')
    const selectedMessage = ref(null)
    const showReplyModal = ref(false)
    const isForwarding = ref(false)

    const filters = computed(() => [
      { id: 'all', label: 'Tous', count: messages.value.length },
      { id: 'unread', label: 'Non lus', count: messages.value.filter(m => !m.read).length },
      { id: 'starred', label: 'Favoris', count: messages.value.filter(m => m.starred).length },
      { id: 'archived', label: 'Archivés', count: messages.value.filter(m => m.archived).length }
    ])

    const replyForm = reactive({
      to: '',
      subject: '',
      content: ''
    })

    // Mock messages
    const messages = ref([
      {
        id: 1,
        senderName: 'Jean Dupont',
        senderEmail: 'jean.dupont@email.com',
        phone: '+229 97 12 34 56',
        subject: 'Demande de devis pour rénovation',
        content: `Bonjour,

Je souhaiterais obtenir un devis pour la rénovation complète de mon appartement situé à Cotonou. Il s'agit d'un appartement de 120m² composé de 3 chambres, un salon, une cuisine et 2 salles de bain.

Je suis particulièrement intéressé par vos services de design intérieur et j'aimerais discuter des différentes options possibles.

Pourriez-vous me contacter pour convenir d'un rendez-vous ?

Cordialement,
Jean Dupont`,
        category: 'contact',
        read: false,
        starred: true,
        archived: false,
        createdAt: '2026-01-22T10:30:00',
        attachments: []
      },
      {
        id: 2,
        senderName: 'Marie Claire',
        senderEmail: 'marie.claire@email.com',
        phone: '+33 6 12 34 56 78',
        subject: 'Réservation appartement luxe - Février 2026',
        content: `Bonjour,

Je souhaite réserver l'appartement luxe pour la période du 15 au 22 février 2026.

Nous serons 4 personnes (2 adultes et 2 enfants).

Merci de me confirmer la disponibilité et le tarif.

Cordialement,
Marie Claire`,
        category: 'booking',
        read: false,
        starred: false,
        archived: false,
        createdAt: '2026-01-21T15:45:00',
        attachments: []
      },
      {
        id: 3,
        senderName: 'Paul Martin',
        senderEmail: 'paul.martin@email.com',
        phone: '+229 91 23 45 67',
        subject: 'Candidature - Architecte Junior',
        content: `Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste d'architecte junior au sein de votre cabinet.

Diplômé de l'École d'Architecture de Porto-Novo, j'ai acquis une solide formation technique et une sensibilité particulière pour l'architecture contemporaine africaine.

Vous trouverez ci-joint mon CV et mon portfolio.

Dans l'attente de votre retour, je vous prie d'agréer mes salutations distinguées.

Paul Martin`,
        category: 'recruitment',
        read: true,
        starred: false,
        archived: false,
        createdAt: '2026-01-20T09:15:00',
        attachments: [
          { name: 'CV_Paul_Martin.pdf', url: '#' },
          { name: 'Portfolio_2026.pdf', url: '#' }
        ]
      },
      {
        id: 4,
        senderName: 'Sophie Lefebvre',
        senderEmail: 'sophie.l@email.com',
        phone: '+229 96 78 90 12',
        subject: 'Question sur vos services',
        content: `Bonjour,

J'ai découvert votre site et je suis impressionnée par vos réalisations.

J'aurais quelques questions concernant vos services de gestion d'actifs immobiliers. Proposez-vous également des services de location pour des propriétaires souhaitant mettre en location leur bien ?

Merci d'avance pour votre réponse.

Sophie Lefebvre`,
        category: 'contact',
        read: true,
        starred: true,
        archived: false,
        createdAt: '2026-01-19T14:20:00',
        attachments: []
      }
    ])

    const filteredMessages = computed(() => {
      return messages.value.filter(m => {
        // Filter by search
        const matchesSearch = searchQuery.value === '' ||
          m.senderName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          m.senderEmail.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          m.subject.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        // Filter by tab
        let matchesFilter = true
        if (activeFilter.value === 'unread') matchesFilter = !m.read
        if (activeFilter.value === 'starred') matchesFilter = m.starred
        if (activeFilter.value === 'archived') matchesFilter = m.archived
        if (activeFilter.value === 'all') matchesFilter = !m.archived
        
        return matchesSearch && matchesFilter
      })
    })

    function getCategoryLabel(category) {
      const labels = {
        contact: 'Contact',
        booking: 'Réservation',
        recruitment: 'Recrutement',
        other: 'Autre'
      }
      return labels[category] || category
    }

    function formatTime(dateString) {
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
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    function selectMessage(message) {
      selectedMessage.value = message
      if (!message.read) {
        message.read = true
      }
    }

    function toggleStar(message) {
      message.starred = !message.starred
    }

    function archiveMessage(message) {
      message.archived = true
      selectedMessage.value = null
    }

    function deleteMessage(message) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
        messages.value = messages.value.filter(m => m.id !== message.id)
        selectedMessage.value = null
      }
    }

    function openReplyModal() {
      isForwarding.value = false
      replyForm.to = selectedMessage.value.senderEmail
      replyForm.subject = 'Re: ' + selectedMessage.value.subject
      replyForm.content = ''
      showReplyModal.value = true
    }

    function openForwardModal() {
      isForwarding.value = true
      replyForm.to = ''
      replyForm.subject = 'Fwd: ' + selectedMessage.value.subject
      replyForm.content = `\n\n---------- Message transféré ----------\nDe: ${selectedMessage.value.senderName} <${selectedMessage.value.senderEmail}>\nDate: ${formatDate(selectedMessage.value.createdAt)}\nSujet: ${selectedMessage.value.subject}\n\n${selectedMessage.value.content}`
      showReplyModal.value = true
    }

    function closeReplyModal() {
      showReplyModal.value = false
    }

    function sendReply() {
      // TODO: Implement email sending via API
      console.log('Sending email:', replyForm)
      alert('Email envoyé avec succès !')
      closeReplyModal()
    }

    return {
      searchQuery,
      activeFilter,
      filters,
      messages,
      filteredMessages,
      selectedMessage,
      showReplyModal,
      isForwarding,
      replyForm,
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
      sendReply
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