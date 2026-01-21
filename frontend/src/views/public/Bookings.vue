<template>
  <div class="bookings-page min-h-screen w-full bg-white flex flex-col items-center">
    <!-- Header Section -->
    <div class="h-[35vh] md:h-[40vh] w-[93%] flex flex-col justify-end">
      <div class="h-[60%] w-full flex flex-col justify-center items-center">
        <h1
          class="font-bold text-[var(--bg-1)] tracking-[5px] md:tracking-[7px] text-[22px] md:text-[40px] text-center"
          data-aos="fade-up"
        >
          LOCATIONS D'APPARTEMENTS
        </h1>
        <p
          class="text-center text-[15px] sm:text-[18px] md:text-[20px] lg:text-[18px] text-gray-600 max-w-3xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Découvrez nos appartements de standing, entièrement meublés et équipés pour des séjours
          inoubliables à Cotonou.
        </p>
      </div>
    </div>

    <!-- Apartments Grid -->
    <div class="apartments-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2%] w-[93%] h-auto">
      <div
        v-for="(apartment, index) in apartments"
        :key="apartment.id"
        class="apartment-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-[55vh] md:h-[60vh] flex flex-col"
        @click="openApartmentDetails(apartment)"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <div class="relative h-[55%] overflow-hidden">
          <img
            :src="apartment.images[0]"
            :alt="apartment.name"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div
            class="absolute top-[5%] right-[3%] bg-[var(--second-orange)] text-[var(--bg-1)] h-[12%] flex items-center justify-center rounded-full font-bold text-sm"
            style="padding: 0 3%;"
          >
            {{ formatPrice(apartment.pricePerNight) }} / Nuit
          </div>
        </div>
        <div class="h-[45%] flex flex-col justify-around" style="padding: 4%;">
          <h3 class="text-xl font-bold text-[var(--bg-1)]">{{ apartment.name }}</h3>
          <div class="grid grid-cols-2 gap-[3%] text-sm text-gray-600 h-[40%]">
            <div class="flex items-center gap-[5%]">
              <span class="material-symbols-outlined text-[var(--second-orange)]">bed</span>
              <span>{{ apartment.beds }} Lit(s)</span>
            </div>
            <div class="flex items-center gap-[5%]">
              <span class="material-symbols-outlined text-[var(--second-orange)]">door_open</span>
              <span>{{ apartment.rooms }} Chambre(s)</span>
            </div>
            <div class="flex items-center gap-[5%]">
              <span class="material-symbols-outlined text-[var(--second-orange)]">kitchen</span>
              <span>{{ apartment.hasKitchen ? 'Cuisine' : 'Non' }}</span>
            </div>
            <div class="flex items-center gap-[5%]">
              <span class="material-symbols-outlined text-[var(--second-orange)]">local_parking</span>
              <span>{{ apartment.hasParking ? 'Parking' : 'Non' }}</span>
            </div>
          </div>
          <button
            class="w-full h-[20%] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--second-orange)] hover:text-[var(--bg-1)] transition-all duration-300 font-semibold"
          >
            Voir les détails
          </button>
        </div>
      </div>
    </div>

    <!-- Spacer -->
    <div class="h-[10vh] w-full"></div>

    <!-- Apartment Details Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showModal"
          class="fixed inset-0 z-[9999] flex items-center justify-center"
          @click.self="closeModal"
        >
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            class="relative bg-white rounded-2xl w-[95%] md:w-[80%] lg:w-[60%] max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
            data-aos="zoom-in"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-[2%] right-[2%] z-20 bg-white/90 hover:bg-[var(--second-orange)] text-[var(--bg-1)] rounded-full w-[40px] h-[40px] flex items-center justify-center transition-all duration-300 shadow-lg"
            >
              <span class="material-symbols-outlined">close</span>
            </button>

            <!-- Image Gallery -->
            <div class="relative h-[35vh] md:h-[45vh] overflow-hidden">
              <img
                :src="selectedApartment?.images[currentImageIndex]"
                :alt="selectedApartment?.name"
                class="w-full h-full object-cover"
              />
              <!-- Image Navigation -->
              <div class="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 flex gap-[0.5vw]">
                <button
                  v-for="(image, index) in selectedApartment?.images"
                  :key="index"
                  @click="currentImageIndex = index"
                  :class="[
                    'w-[12px] h-[12px] rounded-full transition-all duration-300',
                    index === currentImageIndex
                      ? 'bg-[var(--second-orange)] scale-125'
                      : 'bg-white/70 hover:bg-white',
                  ]"
                ></button>
              </div>
              <!-- Arrow Navigation -->
              <button
                @click="prevImage"
                class="absolute left-[2%] top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-[var(--second-orange)] text-[var(--bg-1)] rounded-full w-[40px] h-[40px] flex items-center justify-center transition-all duration-300"
              >
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                @click="nextImage"
                class="absolute right-[2%] top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-[var(--second-orange)] text-[var(--bg-1)] rounded-full w-[40px] h-[40px] flex items-center justify-center transition-all duration-300"
              >
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            <!-- Apartment Info -->
            <div class="modal-info-section h-auto w-full" style="padding: 4%;">
              <div class="flex flex-col md:flex-row md:justify-between md:items-start h-auto">
                <div class="h-auto">
                  <h2 class="text-2xl md:text-3xl font-bold text-[var(--bg-1)]">
                    {{ selectedApartment?.name }}
                  </h2>
                  <p class="text-gray-600">{{ selectedApartment?.location }}</p>
                </div>
                <div class="h-auto text-right">
                  <div class="text-3xl font-bold text-[var(--second-orange)]">
                    {{ formatPrice(selectedApartment?.pricePerNight) }}
                  </div>
                  <div class="text-gray-500">par nuit</div>
                </div>
              </div>

              <p class="text-gray-700 leading-relaxed h-auto" style="margin: 3vh 0;">
                {{ selectedApartment?.description }}
              </p>

              <!-- Amenities Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-[2%] h-auto" style="margin-bottom: 3vh;">
                <div class="amenity-item flex flex-col items-center justify-center bg-gray-50 rounded-lg h-[10vh]">
                  <span class="material-symbols-outlined text-[var(--bg-1)] text-3xl">bed</span>
                  <span class="font-semibold">{{ selectedApartment?.beds }} Lit(s)</span>
                </div>
                <div class="amenity-item flex flex-col items-center justify-center bg-gray-50 rounded-lg h-[10vh]">
                  <span class="material-symbols-outlined text-[var(--bg-1)] text-3xl">door_open</span>
                  <span class="font-semibold">{{ selectedApartment?.rooms }} Chambre(s)</span>
                </div>
                <div
                  v-if="selectedApartment?.hasKitchen"
                  class="amenity-item flex flex-col items-center justify-center bg-gray-50 rounded-lg h-[10vh]"
                >
                  <span class="material-symbols-outlined text-[var(--bg-1)] text-3xl">kitchen</span>
                  <span class="font-semibold">Cuisine</span>
                </div>
                <div
                  v-if="selectedApartment?.hasParking"
                  class="amenity-item flex flex-col items-center justify-center bg-gray-50 rounded-lg h-[10vh]"
                >
                  <span class="material-symbols-outlined text-[var(--bg-1)] text-3xl">local_parking</span>
                  <span class="font-semibold">Parking</span>
                </div>
                <div
                  v-if="selectedApartment?.hasWashingMachine"
                  class="amenity-item flex flex-col items-center justify-center bg-gray-50 rounded-lg h-[10vh]"
                >
                  <span class="material-symbols-outlined text-[var(--bg-1)] text-3xl">local_laundry_service</span>
                  <span class="font-semibold">Machine à laver</span>
                </div>
                <div
                  v-if="selectedApartment?.hasWifi"
                  class="amenity-item flex flex-col items-center justify-center bg-gray-50 rounded-lg h-[10vh]"
                >
                  <span class="material-symbols-outlined text-[var(--bg-1)] text-3xl">wifi</span>
                  <span class="font-semibold">WiFi</span>
                </div>
                <div
                  v-if="selectedApartment?.hasAC"
                  class="amenity-item flex flex-col items-center justify-center bg-gray-50 rounded-lg h-[10vh]"
                >
                  <span class="material-symbols-outlined text-[var(--bg-1)] text-3xl">ac_unit</span>
                  <span class="font-semibold">Climatisation</span>
                </div>
                <div
                  v-if="selectedApartment?.hasSecurity"
                  class="amenity-item flex flex-col items-center justify-center bg-gray-50 rounded-lg h-[10vh]"
                >
                  <span class="material-symbols-outlined text-[var(--bg-1)] text-3xl">security</span>
                  <span class="font-semibold">Sécurité 24h</span>
                </div>
              </div>

              <!-- Book Now Button -->
              <button
                @click="openBookingForm"
                class="w-full h-[6vh] bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg hover:bg-[var(--bg-1)] hover:text-white transition-all duration-300 font-bold text-lg shadow-lg"
              >
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Booking Form Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showBookingForm"
          class="fixed inset-0 z-[10000] flex items-center justify-center"
          @click.self="closeBookingForm"
        >
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            class="relative bg-white rounded-2xl w-[95%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
          >
            <!-- Close Button -->
            <button
              @click="closeBookingForm"
              class="absolute top-[2%] right-[2%] z-20 bg-gray-100 hover:bg-[var(--second-orange)] text-[var(--bg-1)] rounded-full w-[40px] h-[40px] flex items-center justify-center transition-all duration-300"
            >
              <span class="material-symbols-outlined">close</span>
            </button>

            <div class="form-container h-auto w-full" style="padding: 5%;">
              <h2 class="text-2xl md:text-3xl font-bold text-[var(--bg-1)] mb-2 text-center">
                Formulaire de Réservation
              </h2>
              <p class="text-gray-600 text-center mb-6">{{ selectedApartment?.name }}</p>

              <form @submit.prevent="submitBooking" class="space-y-5">
                <!-- Name Fields -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                    <input
                      v-model="bookingForm.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Prénoms *</label>
                    <input
                      v-model="bookingForm.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                      placeholder="Vos prénoms"
                    />
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Adresse Mail *</label>
                  <input
                    v-model="bookingForm.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>

                <!-- Country & Phone -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pays *</label>
                    <select
                      v-model="bookingForm.country"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Sélectionnez un pays</option>
                      <option value="BJ">Bénin</option>
                      <option value="FR">France</option>
                      <option value="CI">Côte d'Ivoire</option>
                      <option value="SN">Sénégal</option>
                      <option value="TG">Togo</option>
                      <option value="CM">Cameroun</option>
                      <option value="GA">Gabon</option>
                      <option value="US">États-Unis</option>
                      <option value="CA">Canada</option>
                      <option value="OTHER">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                    <input
                      v-model="bookingForm.phone"
                      type="tel"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                      placeholder="+229 00 00 00 00"
                    />
                  </div>
                </div>

                <!-- Date Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Date d'arrivée *</label>
                    <input
                      v-model="bookingForm.checkIn"
                      type="date"
                      required
                      :min="minDate"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Date de départ *</label>
                    <input
                      v-model="bookingForm.checkOut"
                      type="date"
                      required
                      :min="bookingForm.checkIn || minDate"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <!-- Duration & Total Price Display -->
                <div
                  v-if="stayDuration > 0"
                  class="bg-[var(--bg-1)]/5 border border-[var(--bg-1)]/20 rounded-lg p-4"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-600">Durée du séjour:</span>
                    <span class="font-semibold">{{ stayDuration }} nuit(s)</span>
                  </div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-600">Prix par nuit:</span>
                    <span class="font-semibold">{{ formatPrice(selectedApartment?.pricePerNight) }}</span>
                  </div>
                  <div class="border-t border-[var(--bg-1)]/20 pt-2 mt-2">
                    <div class="flex justify-between items-center">
                      <span class="text-lg font-bold text-[var(--bg-1)]">Total:</span>
                      <span class="text-2xl font-bold text-[var(--second-orange)]">
                        {{ formatPrice(totalPrice) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Number of Guests -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre de personnes *</label>
                  <select
                    v-model="bookingForm.guests"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                  >
                    <option v-for="n in 10" :key="n" :value="n">{{ n }} personne(s)</option>
                  </select>
                </div>

                <!-- Special Requests -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Demandes spéciales</label>
                  <textarea
                    v-model="bookingForm.specialRequests"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Précisez toute demande particulière..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="!isFormValid || isSubmitting"
                  class="w-full bg-[var(--second-orange)] text-[var(--bg-1)] py-4 rounded-lg hover:bg-[var(--bg-1)] hover:text-white transition-all duration-300 font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span v-if="isSubmitting" class="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>{{ isSubmitting ? 'Traitement en cours...' : 'Procéder au paiement' }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Success Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showSuccessModal"
          class="fixed inset-0 z-[10001] flex items-center justify-center"
        >
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            class="relative bg-white rounded-2xl w-[90%] md:w-[50%] lg:w-[30%] h-auto z-10 shadow-2xl text-center flex flex-col items-center justify-around"
            style="padding: 5%;"
          >
            <div class="w-[80px] h-[80px] bg-green-100 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
            </div>
            <h2 class="text-2xl font-bold text-[var(--bg-1)]" style="margin: 2vh 0;">Réservation Confirmée!</h2>
            <p class="text-gray-600" style="margin-bottom: 3vh;">
              Votre réservation a été enregistrée avec succès. Vous recevrez un email de confirmation
              à l'adresse {{ bookingForm.email }}.
            </p>
            <button
              @click="closeSuccessModal"
              class="w-full h-[6vh] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--second-orange)] hover:text-[var(--bg-1)] transition-all duration-300 font-semibold"
            >
              Fermer
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import imageA from '@/assets/pictures/A.jpg'
import imageB from '@/assets/pictures/B.jpg'
import imageC from '@/assets/pictures/C.jpg'
import imageD from '@/assets/pictures/D.jpg'
import imageE from '@/assets/pictures/E.jpg'
import imageF from '@/assets/pictures/F.jpg'
import imageG from '@/assets/pictures/G.jpg'
import imageH from '@/assets/pictures/H.jpg'
import imageI from '@/assets/pictures/I.jpg'
import imageJ from '@/assets/pictures/J.jpg'
import imageK from '@/assets/pictures/K.jpg'

export default {
  name: 'BookingsPublicView',
  setup() {
    const showModal = ref(false)
    const showBookingForm = ref(false)
    const showSuccessModal = ref(false)
    const selectedApartment = ref(null)
    const currentImageIndex = ref(0)
    const isSubmitting = ref(false)

    const bookingForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      specialRequests: '',
    })

    const apartments = ref([
      {
        id: 1,
        name: 'Appartement Luxe - Cotonou Centre',
        location: 'Cotonou, Bénin',
        description:
          "Magnifique appartement de standing situé au cœur de Cotonou. Entièrement meublé avec des finitions haut de gamme, cet espace offre tout le confort nécessaire pour un séjour inoubliable. Vue panoramique sur la ville et accès à toutes les commodités.",
        pricePerNight: 75000,
        beds: 2,
        rooms: 3,
        hasKitchen: true,
        hasParking: true,
        hasWashingMachine: true,
        hasWifi: true,
        hasAC: true,
        hasSecurity: true,
        images: [imageA, imageB, imageC, imageD],
      },
      {
        id: 2,
        name: 'Studio Moderne - Fidjrossè',
        location: 'Fidjrossè, Cotonou',
        description:
          "Studio moderne et fonctionnel idéal pour les voyageurs d'affaires ou les courts séjours. Proche de la plage et des restaurants, ce studio offre un cadre de vie agréable avec toutes les commodités essentielles.",
        pricePerNight: 45000,
        beds: 1,
        rooms: 1,
        hasKitchen: true,
        hasParking: false,
        hasWashingMachine: false,
        hasWifi: true,
        hasAC: true,
        hasSecurity: true,
        images: [imageE, imageF, imageG],
      },
      {
        id: 3,
        name: 'Villa Premium - Akpakpa',
        location: 'Akpakpa, Cotonou',
        description:
          "Villa spacieuse avec jardin privatif, parfaite pour les familles ou les groupes. Espace de vie généreux, cuisine équipée et ambiance chaleureuse pour un séjour en toute tranquillité.",
        pricePerNight: 120000,
        beds: 4,
        rooms: 5,
        hasKitchen: true,
        hasParking: true,
        hasWashingMachine: true,
        hasWifi: true,
        hasAC: true,
        hasSecurity: true,
        images: [imageH, imageI, imageJ, imageK],
      },
      {
        id: 4,
        name: 'Appartement Cosy - Ganhi',
        location: 'Ganhi, Cotonou',
        description:
          "Charmant appartement au style contemporain, idéalement situé dans le quartier animé de Ganhi. Parfait pour découvrir la vie locale tout en bénéficiant d'un espace confortable.",
        pricePerNight: 55000,
        beds: 1,
        rooms: 2,
        hasKitchen: true,
        hasParking: true,
        hasWashingMachine: false,
        hasWifi: true,
        hasAC: true,
        hasSecurity: false,
        images: [imageB, imageD, imageF],
      },
      {
        id: 5,
        name: 'Penthouse Vue Mer',
        location: 'Haie Vive, Cotonou',
        description:
          "Penthouse exceptionnel avec vue imprenable sur l'océan. Décoration raffinée, terrasse privée et prestations haut de gamme pour une expérience unique à Cotonou.",
        pricePerNight: 150000,
        beds: 3,
        rooms: 4,
        hasKitchen: true,
        hasParking: true,
        hasWashingMachine: true,
        hasWifi: true,
        hasAC: true,
        hasSecurity: true,
        images: [imageA, imageC, imageE, imageG],
      },
      {
        id: 6,
        name: 'Studio Économique - Cadjèhoun',
        location: 'Cadjèhoun, Cotonou',
        description:
          "Studio fonctionnel à prix accessible, idéal pour les étudiants ou les voyageurs au budget limité. Propre, sécurisé et bien situé près des transports.",
        pricePerNight: 25000,
        beds: 1,
        rooms: 1,
        hasKitchen: false,
        hasParking: false,
        hasWashingMachine: false,
        hasWifi: true,
        hasAC: true,
        hasSecurity: true,
        images: [imageI, imageJ, imageK],
      },
    ])

    const minDate = computed(() => {
      const today = new Date()
      return today.toISOString().split('T')[0]
    })

    const stayDuration = computed(() => {
      if (!bookingForm.value.checkIn || !bookingForm.value.checkOut) return 0
      const checkIn = new Date(bookingForm.value.checkIn)
      const checkOut = new Date(bookingForm.value.checkOut)
      const diffTime = checkOut - checkIn
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    })

    const totalPrice = computed(() => {
      if (!selectedApartment.value || stayDuration.value <= 0) return 0
      return selectedApartment.value.pricePerNight * stayDuration.value
    })

    const isFormValid = computed(() => {
      const form = bookingForm.value
      return (
        form.firstName &&
        form.lastName &&
        form.email &&
        form.country &&
        form.phone &&
        form.checkIn &&
        form.checkOut &&
        stayDuration.value > 0
      )
    })

    const formatPrice = (price) => {
      if (!price) return '0 FCFA'
      return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
    }

    const openApartmentDetails = (apartment) => {
      selectedApartment.value = apartment
      currentImageIndex.value = 0
      showModal.value = true
      document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
      showModal.value = false
      document.body.style.overflow = 'auto'
    }

    const openBookingForm = () => {
      showModal.value = false
      showBookingForm.value = true
    }

    const closeBookingForm = () => {
      showBookingForm.value = false
      document.body.style.overflow = 'auto'
    }

    const closeSuccessModal = () => {
      showSuccessModal.value = false
      document.body.style.overflow = 'auto'
      // Reset form
      bookingForm.value = {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        specialRequests: '',
      }
    }

    const prevImage = () => {
      if (selectedApartment.value) {
        currentImageIndex.value =
          (currentImageIndex.value - 1 + selectedApartment.value.images.length) %
          selectedApartment.value.images.length
      }
    }

    const nextImage = () => {
      if (selectedApartment.value) {
        currentImageIndex.value =
          (currentImageIndex.value + 1) % selectedApartment.value.images.length
      }
    }

    const submitBooking = async () => {
      if (!isFormValid.value) return

      isSubmitting.value = true

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      isSubmitting.value = false
      showBookingForm.value = false
      showSuccessModal.value = true
    }

    return {
      apartments,
      showModal,
      showBookingForm,
      showSuccessModal,
      selectedApartment,
      currentImageIndex,
      bookingForm,
      minDate,
      stayDuration,
      totalPrice,
      isFormValid,
      isSubmitting,
      formatPrice,
      openApartmentDetails,
      closeModal,
      openBookingForm,
      closeBookingForm,
      closeSuccessModal,
      prevImage,
      nextImage,
      submitBooking,
    }
  },
}
</script>

<style scoped>
.apartment-card {
  border: 1px solid #e5e7eb;
}

.apartment-card:hover {
  border-color: var(--second-orange);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
}

/* Custom scrollbar for modals */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--bg-1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--second-orange);
}

/* Spin animation for loading */
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
