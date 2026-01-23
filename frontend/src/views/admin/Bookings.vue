<template>
  <div class="bookings h-full w-full overflow-y-auto">
    <!-- Tabs -->
    <div class="bg-white rounded-xl shadow-sm h-[8vh] min-h-[60px] mt-[2vh] mb-[3vh] border border-gray-100">
      <div class="flex h-full border-b">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 h-full flex items-center justify-center text-center font-medium transition-colors',
            activeTab === tab.id
              ? 'text-[var(--bg-1)] border-b-2 border-[var(--bg-1)]'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          <span class="material-symbols-outlined align-middle mr-[0.5vw]">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Reservations Tab -->
    <div v-if="activeTab === 'reservations'" class="space-y-[2vh]">
      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm h-[8vh] min-h-[60px] border border-gray-100">
        <div class="flex flex-wrap items-center h-full w-[95%] mx-auto gap-[2%]">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher un client..."
            class="flex-1 min-w-[200px] h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
          />
          <select
            v-model="statusFilter"
            class="h-[5vh] min-h-[40px] w-[15%] min-w-[150px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
      </div>

      <!-- Reservations List -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 h-[6vh] min-h-[45px]">
            <tr>
              <th class="w-[20%] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th class="w-[20%] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th class="w-[20%] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offre</th>
              <th class="w-[15%] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée</th>
              <th class="w-[10%] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th class="w-[15%] text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="reservation in filteredReservations" :key="reservation.id" class="h-[10vh] min-h-[80px] hover:bg-gray-50">
              <td class="w-[20%]">
                <div class="flex items-center h-full ml-[5%]">
                  <div class="w-[4vh] min-w-[35px] h-[4vh] min-h-[35px] bg-[var(--bg-1)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {{ reservation.firstName.charAt(0) }}{{ reservation.lastName.charAt(0) }}
                  </div>
                  <div class="ml-[10%]">
                    <p class="font-medium text-gray-800">{{ reservation.firstName }} {{ reservation.lastName }}</p>
                    <p class="text-sm text-gray-500">{{ reservation.country }}</p>
                  </div>
                </div>
              </td>
              <td class="w-[20%]">
                <p class="text-sm text-gray-800">{{ reservation.email }}</p>
                <p class="text-sm text-gray-500">{{ reservation.phone }}</p>
              </td>
              <td class="w-[20%]">
                <p class="text-sm font-medium text-gray-800">{{ reservation.offer }}</p>
              </td>
              <td class="w-[15%]">
                <p class="text-sm text-gray-800">{{ reservation.duration }}</p>
              </td>
              <td class="w-[10%]">
                <span
                  :class="[
                    'text-xs font-medium rounded-full',
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                    reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                  ]"
                >
                  {{ getStatusLabel(reservation.status) }}
                </span>
              </td>
              <td class="w-[15%] text-right">
                <button
                  @click="viewReservation(reservation)"
                  class="text-blue-600 hover:text-blue-800 mr-[1vw]"
                  title="Voir détails"
                >
                  <span class="material-symbols-outlined">visibility</span>
                </button>
                <button
                  v-if="reservation.status !== 'cancelled'"
                  @click="cancelReservation(reservation)"
                  class="text-red-600 hover:text-red-800"
                  title="Annuler"
                >
                  <span class="material-symbols-outlined">cancel</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Offers Tab -->
    <div v-if="activeTab === 'offers'" class="space-y-[2vh]">
      <!-- Add Offer Button -->
      <div class="flex justify-end h-[6vh] min-h-[45px] items-center">
        <button
          @click="openOfferModal()"
          class="h-[5vh] min-h-[40px] w-[15%] min-w-[150px] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 transition-colors flex items-center justify-center"
        >
          <span class="material-symbols-outlined mr-[0.5vw]">add</span>
          Nouvelle Offre
        </button>
      </div>

      <!-- Offers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2%]">
        <div
          v-for="offer in offers"
          :key="offer.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div class="h-[20vh] min-h-[150px] bg-gray-200 relative">
            <img
              v-if="offer.image"
              :src="offer.image"
              :alt="offer.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="material-symbols-outlined text-gray-400 text-4xl">apartment</span>
            </div>
            <span
              :class="[
                'absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full',
                offer.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              ]"
            >
              {{ offer.available ? 'Disponible' : 'Indisponible' }}
            </span>
          </div>
          <div class="h-[15vh] min-h-[120px] w-[90%] mx-auto flex flex-col justify-around">
            <h3 class="font-semibold text-lg text-gray-800">{{ offer.name }}</h3>
            <p class="text-sm text-gray-600 line-clamp-2">{{ offer.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-[var(--bg-1)]">{{ formatPrice(offer.pricePerNight) }}/nuit</span>
              <div class="flex gap-[0.5vw]">
                <button
                  @click="openOfferModal(offer)"
                  class="h-[4vh] min-h-[32px] w-[4vh] min-w-[32px] flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Modifier"
                >
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button
                  @click="deleteOffer(offer)"
                  class="h-[4vh] min-h-[32px] w-[4vh] min-w-[32px] flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg"
                  title="Supprimer"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reservation Detail Modal -->
    <div
      v-if="showReservationModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded-xl w-[90%] max-w-lg h-auto max-h-[90vh] overflow-y-auto">
        <div class="h-[8vh] min-h-[60px] border-b flex items-center justify-between w-[90%] mx-auto">
          <h2 class="text-xl font-semibold text-gray-800">Détails de la réservation</h2>
          <button @click="showReservationModal = false" class="text-gray-500 hover:text-gray-700">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="w-[90%] mx-auto space-y-[2vh] my-[2vh]" v-if="selectedReservation">
          <div class="grid grid-cols-2 gap-[3%]">
            <div>
              <label class="text-sm text-gray-500">Prénom</label>
              <p class="font-medium">{{ selectedReservation.firstName }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Nom</label>
              <p class="font-medium">{{ selectedReservation.lastName }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Email</label>
              <p class="font-medium">{{ selectedReservation.email }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Téléphone</label>
              <p class="font-medium">{{ selectedReservation.phone }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Pays</label>
              <p class="font-medium">{{ selectedReservation.country }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Durée</label>
              <p class="font-medium">{{ selectedReservation.duration }}</p>
            </div>
            <div class="col-span-2">
              <label class="text-sm text-gray-500">Offre</label>
              <p class="font-medium">{{ selectedReservation.offer }}</p>
            </div>
          </div>
        </div>
        <div class="h-[10vh] min-h-[80px] border-t flex items-center justify-end gap-[1vw] w-[90%] mx-auto">
          <button
            @click="showReservationModal = false"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Fermer
          </button>
          <button
            v-if="selectedReservation && selectedReservation.status !== 'cancelled'"
            @click="cancelReservation(selectedReservation)"
            class="h-[5vh] min-h-[40px] w-[18%] min-w-[180px] bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Annuler la réservation
          </button>
        </div>
      </div>
    </div>

    <!-- Offer Modal -->
    <div
      v-if="showOfferModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded-xl w-[40vw] min-w-[400px] max-w-lg max-h-[90vh] overflow-y-auto">
        <div class="h-[8vh] min-h-[60px] border-b flex items-center justify-between w-[90%] mx-auto">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ editingOffer ? 'Modifier l\'offre' : 'Nouvelle offre' }}
          </h2>
          <button @click="showOfferModal = false" class="text-gray-500 hover:text-gray-700">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="w-[90%] mx-auto py-[2vh] space-y-[2vh]">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Nom de l'offre</label>
            <input
              type="text"
              v-model="offerForm.name"
              class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              placeholder="Ex: Appartement Luxe"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Description</label>
            <textarea
              v-model="offerForm.description"
              rows="3"
              class="w-full h-[12vh] min-h-[100px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              placeholder="Décrivez l'offre..."
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-[1vw]">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Prix par nuit (XOF)</label>
              <input
                type="number"
                v-model="offerForm.pricePerNight"
                class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
                placeholder="50000"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Disponibilité</label>
              <select
                v-model="offerForm.available"
                class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              >
                <option :value="true">Disponible</option>
                <option :value="false">Indisponible</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Image</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg h-[15vh] min-h-[120px] flex flex-col items-center justify-center hover:border-[var(--bg-1)] transition-colors">
              <input type="file" accept="image/*" class="hidden" id="offer-image" @change="handleOfferImage" />
              <label for="offer-image" class="cursor-pointer text-center">
                <span class="material-symbols-outlined text-gray-400 text-4xl mb-[1vh]">cloud_upload</span>
                <p class="text-sm text-gray-500">Cliquez pour télécharger une image</p>
              </label>
            </div>
          </div>
        </div>
        <div class="h-[10vh] min-h-[80px] border-t flex items-center justify-end gap-[1vw] w-[90%] mx-auto">
          <button
            @click="showOfferModal = false"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="saveOffer"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90"
          >
            {{ editingOffer ? 'Enregistrer' : 'Créer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div
      v-if="showCancelModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded-xl w-[35vw] min-w-[350px] max-w-md">
        <div class="h-[8vh] min-h-[60px] border-b flex items-center w-[90%] mx-auto">
          <h2 class="text-xl font-semibold text-gray-800">Confirmer l'annulation</h2>
        </div>
        <div class="w-[90%] mx-auto py-[2vh]">
          <p class="text-gray-600 mb-[2vh]">
            Êtes-vous sûr de vouloir annuler cette réservation ? Un email sera envoyé au client pour l'informer.
          </p>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Message personnalisé (optionnel)</label>
            <textarea
              v-model="cancelMessage"
              rows="3"
              class="w-full h-[12vh] min-h-[100px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              placeholder="Raison de l'annulation..."
            ></textarea>
          </div>
        </div>
        <div class="h-[10vh] min-h-[80px] border-t flex items-center justify-end gap-[1vw] w-[90%] mx-auto">
          <button
            @click="showCancelModal = false"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Retour
          </button>
          <button
            @click="confirmCancellation"
            class="h-[5vh] min-h-[40px] w-[18%] min-w-[180px] bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Confirmer l'annulation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'

export default {
  name: 'BookingsView',
  setup() {
    const activeTab = ref('reservations')
    const searchQuery = ref('')
    const statusFilter = ref('')
    const showReservationModal = ref(false)
    const showOfferModal = ref(false)
    const showCancelModal = ref(false)
    const selectedReservation = ref(null)
    const editingOffer = ref(null)
    const cancelMessage = ref('')

    const tabs = [
      { id: 'reservations', label: 'Réservations', icon: 'calendar_month' },
      { id: 'offers', label: 'Offres', icon: 'apartment' }
    ]

    // Mock Data
    const reservations = ref([
      {
        id: 1,
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@email.com',
        phone: '+229 97 12 34 56',
        country: 'Bénin',
        offer: 'Appartement Luxe',
        duration: '7 jours (15-22 Jan)',
        status: 'confirmed'
      },
      {
        id: 2,
        firstName: 'Marie',
        lastName: 'Claire',
        email: 'marie.claire@email.com',
        phone: '+33 6 12 34 56 78',
        country: 'France',
        offer: 'Studio Moderne',
        duration: '3 jours (18-21 Jan)',
        status: 'pending'
      },
      {
        id: 3,
        firstName: 'Paul',
        lastName: 'Martin',
        email: 'paul.martin@email.com',
        phone: '+1 555 123 4567',
        country: 'États-Unis',
        offer: 'Villa Premium',
        duration: '14 jours (20 Jan - 3 Fév)',
        status: 'confirmed'
      },
      {
        id: 4,
        firstName: 'Sophie',
        lastName: 'Lefebvre',
        email: 'sophie.l@email.com',
        phone: '+229 91 23 45 67',
        country: 'Bénin',
        offer: 'Appartement Standard',
        duration: '5 jours (10-15 Jan)',
        status: 'cancelled'
      }
    ])

    const offers = ref([
      {
        id: 1,
        name: 'Appartement Luxe',
        description: 'Appartement haut de gamme avec vue panoramique, 3 chambres, cuisine équipée et terrasse.',
        pricePerNight: 75000,
        available: true,
        image: null
      },
      {
        id: 2,
        name: 'Studio Moderne',
        description: 'Studio élégant et fonctionnel, parfait pour les courts séjours.',
        pricePerNight: 35000,
        available: true,
        image: null
      },
      {
        id: 3,
        name: 'Villa Premium',
        description: 'Villa spacieuse avec piscine privée, jardin et 5 chambres de luxe.',
        pricePerNight: 150000,
        available: false,
        image: null
      }
    ])

    const offerForm = reactive({
      name: '',
      description: '',
      pricePerNight: '',
      available: true,
      image: null
    })

    const filteredReservations = computed(() => {
      return reservations.value.filter(r => {
        const matchesSearch = searchQuery.value === '' ||
          `${r.firstName} ${r.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          r.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesStatus = statusFilter.value === '' || r.status === statusFilter.value
        return matchesSearch && matchesStatus
      })
    })

    function getStatusLabel(status) {
      const labels = { confirmed: 'Confirmé', pending: 'En attente', cancelled: 'Annulé' }
      return labels[status] || status
    }

    function formatPrice(price) {
      return new Intl.NumberFormat('fr-FR').format(price) + ' XOF'
    }

    function viewReservation(reservation) {
      selectedReservation.value = reservation
      showReservationModal.value = true
    }

    function cancelReservation(reservation) {
      selectedReservation.value = reservation
      showCancelModal.value = true
      showReservationModal.value = false
    }

    function confirmCancellation() {
      if (selectedReservation.value) {
        selectedReservation.value.status = 'cancelled'
        // TODO: Send cancellation email via API
        console.log('Cancellation email sent with message:', cancelMessage.value)
      }
      showCancelModal.value = false
      cancelMessage.value = ''
    }

    function openOfferModal(offer = null) {
      editingOffer.value = offer
      if (offer) {
        Object.assign(offerForm, offer)
      } else {
        Object.assign(offerForm, { name: '', description: '', pricePerNight: '', available: true, image: null })
      }
      showOfferModal.value = true
    }

    function handleOfferImage(event) {
      const file = event.target.files[0]
      if (file) {
        offerForm.image = URL.createObjectURL(file)
      }
    }

    function saveOffer() {
      if (editingOffer.value) {
        Object.assign(editingOffer.value, offerForm)
      } else {
        offers.value.push({
          id: Date.now(),
          ...offerForm,
          pricePerNight: Number(offerForm.pricePerNight)
        })
      }
      showOfferModal.value = false
    }

    function deleteOffer(offer) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
        offers.value = offers.value.filter(o => o.id !== offer.id)
      }
    }

    return {
      activeTab,
      tabs,
      searchQuery,
      statusFilter,
      reservations,
      filteredReservations,
      offers,
      offerForm,
      showReservationModal,
      showOfferModal,
      showCancelModal,
      selectedReservation,
      editingOffer,
      cancelMessage,
      getStatusLabel,
      formatPrice,
      viewReservation,
      cancelReservation,
      confirmCancellation,
      openOfferModal,
      handleOfferImage,
      saveOffer,
      deleteOffer
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
