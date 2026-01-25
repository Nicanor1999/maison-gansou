<template>
  <div class="bookings h-full w-full overflow-y-auto flex flex-col gap-4">
    <!-- Tabs -->
    <div
      class="bg-white rounded-xl shadow-sm h-[8vh] min-h-[60px] mt-[2vh] mb-[3vh] border border-gray-100"
    >
      <div class="flex h-full border-b">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 h-full flex items-center justify-center text-center font-medium transition-colors',
            activeTab === tab.id
              ? 'text-[var(--bg-1)] border-b-2 border-[var(--bg-1)]'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          <span class="material-symbols-outlined align-middle mr-[0.5vw]">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Reservations Tab -->
    <div v-if="activeTab === 'reservations'" class="space-y-[2vh] flex flex-col gap-4">
      <!-- Filters -->
      <div
        class="bg-white rounded-xl shadow-sm h-[15vh] min-h-[60px] border border-gray-100 flex justify-center"
      >
        <div class="flex flex-wrap items-center h-full w-[95%] mx-auto gap-[2%]">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher un client..."
            class="flex-1 min-w-[200px] h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
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
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table class="w-full min-w-[800px]">
          <thead class="bg-gray-50 h-[6vh] min-h-[45px]">
            <tr>
              <th
                class="w-[20%] pl-[1%] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                class="w-[20%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                class="w-[20%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Offre
              </th>
              <th
                class="w-[15%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Durée
              </th>
              <th
                class="w-[10%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                class="w-[15%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="reservation in filteredReservations"
              :key="reservation.id"
              class="h-[10vh] min-h-[80px] hover:bg-gray-50"
            >
              <td class="w-[20%]">
                <div class="flex items-center h-full pl-[3%]">
                  <div
                    class="w-[4vh] min-w-[35px] h-[4vh] min-h-[35px] bg-[var(--bg-1)] rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    {{ reservation.firstName?.charAt(0) || '?'
                    }}{{ reservation.lastName?.charAt(0) || '?' }}
                  </div>
                  <div class="pl-[5%]">
                    <p class="font-medium text-gray-800">
                      {{ reservation.firstName }} {{ reservation.lastName }}
                    </p>
                    <p class="text-sm text-gray-500">{{ reservation.country }}</p>
                  </div>
                </div>
              </td>
              <td class="w-[20%] text-center">
                <p class="text-sm text-gray-800">{{ reservation.email }}</p>
                <p class="text-sm text-gray-500">{{ reservation.phone }}</p>
              </td>
              <td class="w-[20%] text-center">
                <p class="text-sm font-medium text-gray-800">{{ reservation.offer }}</p>
              </td>
              <td class="w-[15%] text-center">
                <p class="text-sm text-gray-800">{{ reservation.duration }}</p>
              </td>
              <td class="w-[20%] text-center">
                <span
                  :class="[
                    'text-xs font-medium rounded-full p-[2%]',
                    reservation.status === 'confirmed'
                      ? 'bg-green-100 text-green-600'
                      : reservation.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600',
                  ]"
                >
                  {{ getStatusLabel(reservation.status) }}
                </span>
              </td>
              <td class="w-[15%] text-center">
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2%] md:gap-y-[5%]">
        <div
          v-for="offer in offers"
          :key="offer.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[55vh] md:h-[60vh] flex flex-col"
        >
          <!-- Image Section - 55% -->
          <div class="relative h-[55%] overflow-hidden">
            <!-- Image Carousel -->
            <div
              v-if="offer.raw.Pictures && offer.raw.Pictures.length"
              class="relative w-full h-full"
            >
              <div
                v-for="(img, idx) in offer.raw.Pictures"
                :key="idx"
                v-show="offer._carouselIndex === idx"
                class="absolute inset-0 w-full h-full"
              >
                <img
                  :src="img"
                  :alt="offer.name"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <!-- Navigation Arrows -->
              <button
                v-if="offer.raw.Pictures.length > 1"
                @click="prevImage(offer)"
                class="absolute left-[2%] top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-[var(--second-orange)] text-[var(--bg-1)] rounded-full w-[35px] h-[35px] flex items-center justify-center transition-all duration-300"
              >
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                v-if="offer.raw.Pictures.length > 1"
                @click="nextImage(offer)"
                class="absolute right-[2%] top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-[var(--second-orange)] text-[var(--bg-1)] rounded-full w-[35px] h-[35px] flex items-center justify-center transition-all duration-300"
              >
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <!-- Placeholder if no images -->
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <span class="material-symbols-outlined text-gray-400 text-5xl">apartment</span>
            </div>

            <!-- Price Badge -->
            <div
              class="absolute top-[5%] right-[3%] bg-[var(--second-orange)] text-[var(--bg-1)] h-[12%] flex items-center justify-center rounded-full font-bold text-sm px-3"
            >
              {{ formatPrice(offer.pricePerNight) }} / Nuit
            </div>

            <!-- Availability Badge -->
            <span
              :class="[
                'absolute top-[5%] left-[3%] px-3 py-1 text-xs font-medium rounded-full',
                offer.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
              ]"
            >
              {{ offer.available ? 'Disponible' : 'Indisponible' }}
            </span>
          </div>

          <!-- Info Section - 45% -->
          <div class="h-[45%] flex flex-col justify-around items-center text-center" style="padding: 4%;">
            <!-- Title -->
            <h3 class="text-[15px] sm:text-[20px] md:text-[18px] text-[var(--bg-1)] font-semibold">{{ offer.name }}</h3>

            <!-- Amenities Grid -->
            <div class="grid grid-cols-2 gap-[3%] text-sm text-gray-600 h-[40%] w-full">
              <div class="flex items-center pl-4 gap-[5%]">
                <span class="material-symbols-outlined text-[var(--second-orange)]">bed</span>
                <span>{{ offer.raw?.Bed_Number || 0 }} Lit(s)</span>
              </div>
              <div class="flex items-center pl-4 gap-[5%]">
                <span class="material-symbols-outlined text-[var(--second-orange)]">door_open</span>
                <span>{{ offer.raw?.Room_Number || 0 }} Chambre(s)</span>
              </div>
              <div class="flex items-center pl-4 gap-[5%]">
                <span class="material-symbols-outlined text-[var(--second-orange)]">kitchen</span>
                <span>{{ offer.raw?.Kitchen_Number ? offer.raw.Kitchen_Number + ' Cuisine(s)' : 'Non' }}</span>
              </div>
              <div class="flex items-center pl-4 gap-[5%]">
                <span class="material-symbols-outlined text-[var(--second-orange)]">local_parking</span>
                <span>{{ offer.raw?.Parking ? 'Parking' : 'Non' }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="w-full flex gap-2">
              <button
                @click="openOfferModal(offer)"
                class="flex-1 h-[20%] min-h-[40px] bg-white text-[var(--bg-1)] border-[2px] border-[var(--bg-1)] rounded-lg hover:bg-[var(--bg-1)] hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined">edit</span>
                Modifier
              </button>
              <button
                @click="deleteOffer(offer)"
                class="h-[20%] min-h-[40px] w-[40px] bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center"
                title="Supprimer"
              >
                <span class="material-symbols-outlined">delete</span>
              </button>
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
      <div
        class="bg-white rounded-xl w-[90%] max-w-lg h-auto max-h-[90vh] overflow-y-auto flex flex-col items-center"
      >
        <div
          class="h-[8vh] min-h-[60px] border-b flex items-center justify-between w-[90%] mx-auto"
        >
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
        <div
          class="h-[10vh] min-h-[80px] border-t flex items-center justify-end gap-[1vw] w-[90%] mx-auto"
        >
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
    <div v-if="showOfferModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div
        class="relative bg-white rounded-2xl w-[95%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
      >
        <!-- Close Button -->
        <button
          @click="showOfferModal = false"
          class="absolute top-[2%] right-[2%] z-20 bg-gray-100 hover:bg-[var(--second-orange)] text-[var(--bg-1)] rounded-full w-[40px] h-[40px] flex items-center justify-center transition-all duration-300"
        >
          <span class="material-symbols-outlined">close</span>
        </button>

        <!-- Header -->
        <div class="h-auto w-full px-[5%] pt-[5%] pb-[2%]">
          <h2 class="text-2xl md:text-3xl font-bold text-[var(--bg-1)] text-center">
            {{ editingOffer ? "Modifier l'offre" : 'Nouvelle offre' }}
          </h2>
        </div>
        <div class="w-full px-[5%] py-[2vh] space-y-5 flex flex-col gap-4">
          <!-- Informations de base -->
          <div class="space-y-[1.5vh] flex flex-col gap-4">
            <h3 class="text-sm font-semibold text-gray-800 border-b pb-1">Informations de base</h3>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]"
                >Nom de l'offre *</label
              >
              <input
                type="text"
                v-model="offerForm.name"
                class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
                placeholder="Ex: Appartement Luxe"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]"
                >Description *</label
              >
              <textarea
                v-model="offerForm.description"
                rows="3"
                class="w-full h-[12vh] min-h-[100px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4 py-2"
                placeholder="Décrivez l'offre..."
                required
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-[1vw]">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Ville *</label>
                <input
                  type="text"
                  v-model="offerForm.town"
                  class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
                  placeholder="Ex: Dakar,Sénégal"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]"
                  >Prix/nuit (XOF) *</label
                >
                <input
                  type="number"
                  v-model="offerForm.pricePerNight"
                  class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
                  placeholder="50000"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Caractéristiques -->
          <div class="space-y-[1.5vh] flex flex-col gap-4">
            <h3 class="text-sm font-semibold text-gray-800 border-b pb-1">Caractéristiques</h3>
            <div class="grid grid-cols-3 gap-[1vw]">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Chambres</label>
                <input
                  type="number"
                  v-model="offerForm.roomNumber"
                  class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Lits</label>
                <input
                  type="number"
                  v-model="offerForm.bedNumber"
                  class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Cuisines</label>
                <input
                  type="number"
                  v-model="offerForm.kitchenNumber"
                  class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          <!-- Équipements -->
          <div class="space-y-[1.5vh] flex flex-col gap-4">
            <h3 class="text-sm font-semibold text-gray-800 border-b pb-1">Équipements</h3>
            <div class="grid grid-cols-2 gap-x-[1vw] gap-y-2">
              <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  v-model="offerForm.wifi"
                  class="w-4 h-4 text-[var(--bg-1)] border-gray-300 rounded focus:ring-[var(--bg-1)]"
                />
                <span class="material-symbols-outlined text-gray-600 text-xl">wifi</span>
                <span class="text-sm text-gray-700">WiFi</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  v-model="offerForm.ac"
                  class="w-4 h-4 text-[var(--bg-1)] border-gray-300 rounded focus:ring-[var(--bg-1)]"
                />
                <span class="material-symbols-outlined text-gray-600 text-xl">ac_unit</span>
                <span class="text-sm text-gray-700">Climatisation</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  v-model="offerForm.parking"
                  class="w-4 h-4 text-[var(--bg-1)] border-gray-300 rounded focus:ring-[var(--bg-1)]"
                />
                <span class="material-symbols-outlined text-gray-600 text-xl">local_parking</span>
                <span class="text-sm text-gray-700">Parking</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  v-model="offerForm.washingMachine"
                  class="w-4 h-4 text-[var(--bg-1)] border-gray-300 rounded focus:ring-[var(--bg-1)]"
                />
                <span class="material-symbols-outlined text-gray-600 text-xl"
                  >local_laundry_service</span
                >
                <span class="text-sm text-gray-700">Machine à laver</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  v-model="offerForm.security"
                  class="w-4 h-4 text-[var(--bg-1)] border-gray-300 rounded focus:ring-[var(--bg-1)]"
                />
                <span class="material-symbols-outlined text-gray-600 text-xl">security</span>
                <span class="text-sm text-gray-700">Sécurité</span>
              </label>
            </div>
          </div>

          <!-- Disponibilité -->
          <div class="space-y-[1.5vh] flex flex-col gap-4">
            <h3 class="text-sm font-semibold text-gray-800 border-b pb-1">Statut</h3>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]"
                >Disponibilité</label
              >
              <select
                v-model="offerForm.available"
                class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
              >
                <option :value="true">Disponible</option>
                <option :value="false">Indisponible</option>
              </select>
            </div>
          </div>

          <!-- Images -->
          <div class="space-y-[1.5vh] flex flex-col gap-4">
            <h3 class="text-sm font-semibold text-gray-800 border-b pb-1">Images</h3>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]"
                >Images (jusqu'à 4)</label
              >
              <!-- Image Upload Section -->
              <div
                class="border-2 border-dashed border-gray-300 rounded-lg h-[12vh] min-h-[100px] flex flex-col items-center justify-center hover:border-[var(--bg-1)] transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  class="hidden"
                  id="offer-image"
                  @change="handleOfferImage"
                />
                <label
                  for="offer-image"
                  class="cursor-pointer text-center w-full h-full flex flex-col items-center justify-center"
                >
                  <span class="material-symbols-outlined text-gray-400 text-4xl mb-[1vh]"
                    >cloud_upload</span
                  >
                  <p class="text-sm text-gray-500">Cliquez pour sélectionner des images</p>
                  <p class="text-xs text-gray-400 mt-1">
                    {{ offerForm.pictures.length }} image(s) sélectionnée(s)
                  </p>
                </label>
              </div>
              <!-- Image Preview Section -->
              <div v-if="offerForm.pictures.length" class="mt-[2vh]">
                <label class="block text-sm font-medium text-gray-700 mb-[1vh]"
                  >Aperçu des images</label
                >
                <div class="flex gap-2 flex-wrap">
                  <div v-for="(pic, idx) in offerForm.pictures" :key="idx" class="relative">
                    <img
                      :src="getImagePreview(pic)"
                      class="h-20 w-20 object-cover rounded border-2 border-gray-200"
                    />
                    <button
                      @click="removeImage(idx)"
                      type="button"
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 shadow-md"
                    >
                      <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="h-[10vh] min-h-[80px] border-t flex items-center justify-end gap-[1vw] w-[90%] mx-auto"
        >
          <button
            @click="saveOffer"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90"
          >
            {{ editingOffer ? 'Enregistrer' : 'Créer' }}
          </button>
          <button
            @click="showOfferModal = false"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
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
            Êtes-vous sûr de vouloir annuler cette réservation ? Un email sera envoyé au client pour
            l'informer.
          </p>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]"
              >Message personnalisé (optionnel)</label
            >
            <textarea
              v-model="cancelMessage"
              rows="3"
              class="w-full h-[12vh] min-h-[100px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              placeholder="Raison de l'annulation..."
            ></textarea>
          </div>
        </div>
        <div
          class="h-[10vh] min-h-[80px] border-t flex items-center justify-end gap-[1vw] w-[90%] mx-auto"
        >
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
import { ref, computed, reactive, onMounted, toRaw } from 'vue'

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
      { id: 'offers', label: 'Offres', icon: 'apartment' },
    ]

    // Réservations depuis l'API
    const reservations = ref([])

    async function fetchReservations() {
      try {
        const token = localStorage.getItem('accessToken')
        const res = await fetch('/api/v1/reservation', {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        })
        const data = await res.json()
        // Adapter la structure pour l'affichage
        reservations.value = (data.data?.docs || data.data || []).map((r) => ({
          id: r._id,
          firstName: r.Prenom_Client || '',
          lastName: r.Nom_Client || '',
          email: r.Email || '',
          phone: r.Phone || '',
          country: r.Country || '',
          offer: r.Offer || '',
          duration: r.Start_Date && r.Arrival_Date ? `${r.Start_Date} - ${r.Arrival_Date}` : '',
          status: r.Status ? r.Status.toLowerCase() : 'pending',
          raw: r,
        }))
      } catch (e) {
        console.error('Erreur lors du chargement des réservations', e)
      }
    }

    // Offres depuis l'API
    const offers = ref([])

    async function fetchOffers() {
      try {
        const token = localStorage.getItem('accessToken')
        const res = await fetch('/api/v1/offer', {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        })
        console.log('Fetch offers response:', res)
        const data = await res.json()
        offers.value = (data.data?.docs || data.data || []).map((o) => {
          // Fix image URLs to use relative paths instead of localhost
          const fixImageUrl = (url) => {
            if (!url) return null
            // Remove http://localhost:3000 or http://backend:3000 from URLs
            return url.replace(/^https?:\/\/(localhost|backend):3000/, '')
          }

          const fixedPictures = o.Pictures ? o.Pictures.map(fixImageUrl) : []

          return reactive({
            id: o._id,
            name: o.Title || '',
            description: o.Bio || '',
            pricePerNight: o.Nightly_Price || 0,
            available: o.Availability === 'Disponible' || o.Availability === true,
            image: fixedPictures.length > 0 ? fixedPictures[0] : null,
            _carouselIndex: 0,
            raw: {
              ...o,
              Pictures: fixedPictures,
            },
          })
        })
      } catch (e) {
        console.error('Erreur lors du chargement des offres', e)
      }
    }

    // Charger les réservations et offres au montage
    onMounted(() => {
      fetchReservations()
      fetchOffers()
    })

    const offerForm = reactive({
      name: '',
      description: '',
      pricePerNight: '',
      town: '',
      bedNumber: '',
      roomNumber: '',
      kitchenNumber: '',
      available: true,
      parking: false,
      washingMachine: false,
      wifi: false,
      ac: false,
      security: false,
      pictures: [],
    })

    const filteredReservations = computed(() => {
      return reservations.value.filter((r) => {
        const matchesSearch =
          searchQuery.value === '' ||
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

    async function confirmCancellation() {
      if (selectedReservation.value) {
        try {
          const token = localStorage.getItem('accessToken')
          await fetch(`/api/v1/reservation/${selectedReservation.value.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token ? `Bearer ${token}` : undefined,
            },
            body: JSON.stringify({ Status: 'cancelled', Cancel_Message: cancelMessage.value }),
          })
          await fetchReservations()
        } catch (e) {
          console.error("Erreur lors de l'annulation", e)
        }
      }
      showCancelModal.value = false
      cancelMessage.value = ''
    }

    function openOfferModal(offer = null) {
      editingOffer.value = offer
      if (offer) {
        // Populate form with existing offer data
        offerForm.name = offer.name || ''
        offerForm.description = offer.description || ''
        offerForm.pricePerNight = offer.pricePerNight || ''
        offerForm.town = offer.raw?.Town || ''
        offerForm.bedNumber = offer.raw?.Bed_Number || ''
        offerForm.roomNumber = offer.raw?.Room_Number || ''
        offerForm.kitchenNumber = offer.raw?.Kitchen_Number || ''
        offerForm.available = offer.available !== undefined ? offer.available : true
        offerForm.parking = offer.raw?.Parking || false
        offerForm.washingMachine = offer.raw?.Washing_Name || false
        offerForm.wifi = offer.raw?.Wifi || false
        offerForm.ac = offer.raw?.AC || false
        offerForm.security = offer.raw?.Security || false
        offerForm.pictures = [] // reset images when editing
      } else {
        // Reset form for new offer
        offerForm.name = ''
        offerForm.description = ''
        offerForm.pricePerNight = ''
        offerForm.town = ''
        offerForm.bedNumber = ''
        offerForm.roomNumber = ''
        offerForm.kitchenNumber = ''
        offerForm.available = true
        offerForm.parking = false
        offerForm.washingMachine = false
        offerForm.wifi = false
        offerForm.ac = false
        offerForm.security = false
        offerForm.pictures = []
      }
      showOfferModal.value = true
    }

    function handleOfferImage(event) {
      const files = event.target.files
      if (files && files.length > 0) {
        // Add new files to existing pictures, up to a maximum of 4
        const newFiles = Array.from(files)
        const currentCount = offerForm.pictures.length
        const availableSlots = 4 - currentCount

        if (availableSlots > 0) {
          offerForm.pictures.push(...newFiles.slice(0, availableSlots))
        }

        // Reset the input so the same file can be selected again if needed
        event.target.value = ''
      }
    }

    function removeImage(index) {
      offerForm.pictures.splice(index, 1)
    }

    function getImagePreview(file) {
      return URL.createObjectURL(file)
    }

    function prevImage(offer) {
      if (!offer.raw.Pictures || offer.raw.Pictures.length === 0) return
      offer._carouselIndex =
        (offer._carouselIndex - 1 + offer.raw.Pictures.length) % offer.raw.Pictures.length
    }

    function nextImage(offer) {
      if (!offer.raw.Pictures || offer.raw.Pictures.length === 0) return
      offer._carouselIndex = (offer._carouselIndex + 1) % offer.raw.Pictures.length
    }

    async function saveOffer() {
      // Validation
      if (
        !offerForm.name ||
        !offerForm.description ||
        !offerForm.pricePerNight ||
        !offerForm.town
      ) {
        alert('Veuillez remplir tous les champs obligatoires (*)')
        return
      }

      const token = localStorage.getItem('accessToken')
      try {
        const formData = new FormData()

        // Basic information
        formData.append('Title', offerForm.name)
        formData.append('Bio', offerForm.description)
        formData.append('Nightly_Price', offerForm.pricePerNight)
        formData.append('Town', offerForm.town)

        // Property characteristics
        if (offerForm.bedNumber) formData.append('Bed_Number', offerForm.bedNumber)
        if (offerForm.roomNumber) formData.append('Room_Number', offerForm.roomNumber)
        if (offerForm.kitchenNumber) formData.append('Kitchen_Number', offerForm.kitchenNumber)

        // Amenities
        formData.append('Parking', offerForm.parking)
        formData.append('Washing_Name', offerForm.washingMachine)
        formData.append('Wifi', offerForm.wifi)
        formData.append('AC', offerForm.ac)
        formData.append('Security', offerForm.security)

        // Availability
        formData.append('Availability', offerForm.available)

        // Add images if any
        if (offerForm.pictures && offerForm.pictures.length > 0) {
          offerForm.pictures.forEach((pic) => {
            formData.append('Pictures', pic)
          })
        }

        const headers = {}
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }

        if (editingOffer.value) {
          // Modification
          await fetch(`/api/v1/offer/${editingOffer.value.id}`, {
            method: 'PUT',
            headers: headers,
            body: formData,
          })
        } else {
          // Création
          await fetch('/api/v1/offer', {
            method: 'POST',
            headers: headers,
            body: formData,
          })
        }
        await fetchOffers()
      } catch (e) {
        console.error("Erreur lors de la sauvegarde de l'offre", e)
      }
      showOfferModal.value = false
    }

    async function deleteOffer(offer) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
        const token = localStorage.getItem('accessToken')
        try {
          await fetch(`/api/v1/offer/${offer.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          })
          await fetchOffers()
        } catch (e) {
          console.error("Erreur lors de la suppression de l'offre", e)
        }
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
      removeImage,
      getImagePreview,
      prevImage,
      nextImage,
      saveOffer,
      deleteOffer,
    }
  },
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
