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
    <div
      v-if="activeTab === 'reservations'"
      @click="fetchReservations"
      class="space-y-[2vh] flex flex-col gap-4"
    >
      <!-- Filters -->
      <div
        class="bg-white rounded-xl shadow-sm min-h-[80px] border border-gray-100 flex justify-center py-4"
      >
        <div class="flex flex-wrap items-center w-[95%] mx-auto gap-3">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher un client..."
            class="flex-1 min-w-[180px] h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
          />
          <select
            v-model="statusFilter"
            class="h-[40px] w-[180px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-2"
          >
            <option value="">Tous les statuts</option>
            <option value="not_initiated">Non initié</option>
            <option value="pending">En attente</option>
            <option value="completed">Payé</option>
            <option value="failed">Échoué</option>
            <option value="refunded">Remboursé</option>
          </select>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">Du:</label>
            <input
              type="date"
              v-model="dateFrom"
              class="h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-3"
            />
          </div>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">Au:</label>
            <input
              type="date"
              v-model="dateTo"
              class="h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-3"
            />
          </div>
          <button
            v-if="dateFrom || dateTo"
            @click="clearDateFilters"
            class="h-[40px] px-3 text-gray-500 hover:text-red-500 flex items-center"
            title="Effacer les filtres de date"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
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
                Prix Total
              </th>
              <th
                class="w-[20%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date de paiement
              </th>
              <th
                class="w-[15%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Durée
              </th>
              <th
                class="w-[10%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Paiement
              </th>
              <th
                class="w-[10%] text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="reservation in paginatedReservations"
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
                <p class="text-lg font-bold text-[var(--bg-1)]">
                  {{ reservation.price ? formatPrice(reservation.price) : '-' }}
                </p>
              </td>
              <td class="w-[20%] text-center">
                <p class="text-sm text-gray-800">
                  {{ reservation.paymentCompletedAt ? formatDate(reservation.paymentCompletedAt) : '-' }}
                </p>
              </td>
              <td class="w-[15%] text-center">
                <p class="text-sm text-gray-800">{{ reservation.duration }}</p>
              </td>
              <td class="w-[10%] text-center">
                <span
                  :class="[
                    'text-xs font-medium rounded-full px-2 py-1',
                    reservation.paymentStatus === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : reservation.paymentStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : reservation.paymentStatus === 'failed'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600',
                  ]"
                >
                  {{ getPaymentStatusLabel(reservation.paymentStatus) }}
                </span>
              </td>
              <td class="w-[10%] text-center">
                <button
                  @click="viewReservation(reservation)"
                  class="text-blue-600 hover:text-blue-800 mr-[0.5vw]"
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

      <!-- Pagination -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Page {{ currentPage }} sur {{ totalPages }}</span>
          <span class="text-sm text-gray-400">({{ filteredReservations.length }} résultats)</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="currentPage = 1"
            :disabled="currentPage === 1"
            class="h-[36px] w-[36px] flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-sm">first_page</span>
          </button>
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="h-[36px] w-[36px] flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <span class="px-3 text-sm font-medium text-gray-700">{{ currentPage }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="h-[36px] w-[36px] flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
          <button
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            class="h-[36px] w-[36px] flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-sm">last_page</span>
          </button>
        </div>
      </div>

      <!-- Total des réservations payées -->
      <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200 p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-[50px] h-[50px] bg-green-500 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-2xl">payments</span>
            </div>
            <div>
              <p class="text-sm text-green-700 font-medium">Total des réservations payées</p>
              <p class="text-xs text-green-600">
                {{ dateFrom || dateTo ? 'Période sélectionnée' : 'Toutes les réservations' }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-green-700">{{ formatPrice(totalPaidAmount) }}</p>
            <p class="text-sm text-green-600">{{ paidReservationsCount }} réservation(s) payée(s)</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Offers Tab -->
    <div v-if="activeTab === 'offers'" @click="fetchOffers" class="flex flex-col gap-4">
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
          <div
            class="h-[45%] flex flex-col justify-around items-center text-center"
            style="padding: 4%"
          >
            <!-- Title -->
            <h3 class="text-[15px] sm:text-[20px] md:text-[18px] text-[var(--bg-1)] font-semibold">
              {{ offer.name }}
            </h3>

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
                <span>{{
                  offer.raw?.Kitchen_Number ? offer.raw.Kitchen_Number + ' Cuisine(s)' : 'Non'
                }}</span>
              </div>
              <div class="flex items-center pl-4 gap-[5%]">
                <span class="material-symbols-outlined text-[var(--second-orange)]"
                  >local_parking</span
                >
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
        class="bg-white rounded-xl w-[90%] max-w-xl h-auto md:h-[80vh] 2xl:h-[55vh] overflow-y-auto flex flex-col items-center justify-between"
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
            <div>
              <label class="text-sm text-gray-500">Prix Total</label>
              <p class="font-medium text-[var(--bg-1)]">{{ selectedReservation.price ? formatPrice(selectedReservation.price) : '-' }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-500">Statut Paiement</label>
              <span
                :class="[
                  'text-xs font-medium rounded-full px-2 py-1',
                  selectedReservation.paymentStatus === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : selectedReservation.paymentStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : selectedReservation.paymentStatus === 'failed'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600',
                ]"
              >
                {{ getPaymentStatusLabel(selectedReservation.paymentStatus) }}
              </span>
            </div>
            <div v-if="selectedReservation.paymentCompletedAt">
              <label class="text-sm text-gray-500">Date de Paiement</label>
              <p class="font-medium text-green-600">{{ formatDate(selectedReservation.paymentCompletedAt) }}</p>
            </div>
            <!-- Payment URL if pending -->
            <div v-if="selectedReservation.paymentUrl" class="col-span-2">
              <label class="text-sm text-gray-500">Lien de Paiement</label>
              <a
                :href="selectedReservation.paymentUrl"
                target="_blank"
                class="text-blue-600 hover:text-blue-800 underline text-sm break-all"
              >
                {{ selectedReservation.paymentUrl }}
              </a>
            </div>
          </div>
        </div>
        <div
          class="h-[10vh] min-h-[80px] border-t flex items-center justify-end gap-[1vw] w-[90%] mx-auto"
        >
          <button
            v-if="selectedReservation && selectedReservation.status !== 'cancelled'"
            @click="cancelReservation(selectedReservation)"
            class="h-[5vh] min-h-[40px] w-[18%] min-w-[180px] bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Annuler la réservation
          </button>
          <button
            @click="showReservationModal = false"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Offer Modal -->
    <div v-if="showOfferModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div
        class="absolute inset-0 bg-black/70 backdrop-blur-sm"
        @click="showOfferModal = false"
      ></div>
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
                v-model="offerForm.title"
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
                v-model="offerForm.bio"
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
                  v-model="offerForm.nightlyPrice"
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
                  v-model="offerForm.washingName"
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
                v-model="offerForm.availability"
                class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
              >
                <option value="Disponible">Disponible</option>
                <option value="Indisponible">Indisponible</option>
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
      <div class="bg-white rounded-xl w-[35vw] min-w-[350px] max-w-md flex flex-col items-center">
        <div class="h-[8vh] min-h-[60px] border-b flex items-center w-[90%] mx-auto">
          <h2 class="text-xl font-semibold text-gray-800">Confirmer l'annulation</h2>
        </div>
        <div class="w-[90%] mx-auto py-[2vh] flex flex-col gap-4">
          <p class="text-gray-600 mb-[2vh]">
            Êtes-vous sûr de vouloir annuler cette réservation ? Un email sera envoyé au client pour
            l'informer.
          </p>
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]"
              >Message personnalisé (optionnel)</label
            >
            <textarea
              v-model="cancelMessage"
              rows="3"
              class="w-full h-[12vh] min-h-[100px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--bg-1)] focus:border-transparent px-2"
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
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useConfirmModal } from '@/composables/useConfirmModal'

export default {
  name: 'BookingsView',
  setup() {
    const { confirm: confirmModal, alert: alertModal } = useConfirmModal()
    const activeTab = ref('reservations')
    const searchQuery = ref('')
    const statusFilter = ref('')
    const dateFrom = ref('')
    const dateTo = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 10
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
        const res = await fetch('/api/v1/reservation?perPage=100', {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        })
        const data = await res.json()
        // Adapter la structure pour l'affichage
        console.log('Fetch reservations data:', data)
        reservations.value = (data.data?.docs || data.data || []).map((r) => ({
          id: r._id,
          firstName: r.firstNameClient || '',
          lastName: r.lastNameClient || '',
          email: r.email || '',
          phone: r.phone || '',
          country: r.country || '',
          offer: r.offer || '',
          duration:
            r.startDate && r.arrivalDate
              ? `${formatDate(r.startDate)} - ${formatDate(r.arrivalDate)}`
              : '',
          startDate: r.startDate,
          arrivalDate: r.arrivalDate,
          status: r.status ? r.status.toLowerCase() : 'pending',
          price: r.price || null,
          paymentStatus: r.paymentStatus || 'not_initiated',
          paymentTransactionId: r.paymentTransactionId || null,
          paymentAmount: r.paymentAmount || null,
          paymentCompletedAt: r.paymentCompletedAt || null,
          paymentUrl: null,
          createdAt: r.createdAt || '',
          raw: r,
        })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
          const fixImageUrl = (url) => {
            if (!url) return null
            return url.replace(/^https?:\/\/(localhost|backend):3000/, '')
          }
          // Support both lowercase (new) and uppercase (old) field names
          const pictures = o.pictures || o.Pictures || []
          const fixedPictures = pictures.map(fixImageUrl)
          return reactive({
            id: o._id,
            name: o.title || o.Title || '',
            description: o.bio || o.Bio || '',
            pricePerNight: o.nightlyPrice || 0,
            available:
              o.availability === true || o.Availability === 'Disponible' || o.Availability === true,
            image: fixedPictures.length > 0 ? fixedPictures[0] : null,
            _carouselIndex: 0,
            raw: {
              ...o,
              Pictures: fixedPictures,
              // Map fields for backwards compatibility
              bedNumber: o.bedNumber || o.Bed_Number,
              roomNumber: o.roomNumber || o.Room_Number,
              kitchenNumber: o.kitchenNumber || o.Kitchen_Number,
              parking: o.parking ?? o.Parking ?? false,
              town: o.town || o.Town,
              wifi: o.wifi ?? o.Wifi ?? false,
              ac: o.ac ?? o.AC ?? false,
              security: o.security ?? o.Security ?? false,
              washingName: o.washingName ?? o.Washing_Name ?? false,
              // Keep uppercase for template display
              Bed_Number: o.bedNumber || o.Bed_Number,
              Room_Number: o.roomNumber || o.Room_Number,
              Kitchen_Number: o.kitchenNumber || o.Kitchen_Number,
              Parking: o.parking ?? o.Parking ?? false,
              Town: o.town || o.Town,
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

    // Formulaire avec les noms de champs correspondant au backend
    const offerForm = reactive({
      title: '',
      bio: '',
      nightlyPrice: '',
      town: '',
      bedNumber: '',
      roomNumber: '',
      kitchenNumber: '',
      availability: 'Disponible',
      parking: false,
      washingName: false,
      wifi: false,
      ac: false,
      security: false,
      pictures: [],
    })

    const filteredReservations = computed(() => {
      // Reset to page 1 when filters change
      return reservations.value.filter((r) => {
        const matchesSearch =
          searchQuery.value === '' ||
          `${r.firstName} ${r.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          r.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesStatus = statusFilter.value === '' || r.paymentStatus === statusFilter.value

        // Date filtering based on paymentCompletedAt
        let matchesDateFrom = true
        let matchesDateTo = true

        if (dateFrom.value) {
          const fromDate = new Date(dateFrom.value)
          fromDate.setHours(0, 0, 0, 0)
          if (r.paymentCompletedAt) {
            const paymentDate = new Date(r.paymentCompletedAt)
            matchesDateFrom = paymentDate >= fromDate
          } else {
            matchesDateFrom = false // Exclude unpaid if filtering by date
          }
        }

        if (dateTo.value) {
          const toDate = new Date(dateTo.value)
          toDate.setHours(23, 59, 59, 999)
          if (r.paymentCompletedAt) {
            const paymentDate = new Date(r.paymentCompletedAt)
            matchesDateTo = paymentDate <= toDate
          } else {
            matchesDateTo = false // Exclude unpaid if filtering by date
          }
        }

        return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo
      })
    })

    // Reset page when filters change
    const resetPage = () => {
      currentPage.value = 1
    }

    // Watch for filter changes to reset page
    const totalPages = computed(() => {
      return Math.max(1, Math.ceil(filteredReservations.value.length / itemsPerPage))
    })

    const paginatedReservations = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredReservations.value.slice(start, end)
    })

    // Total of paid reservations (filtered)
    const paidReservationsFiltered = computed(() => {
      return filteredReservations.value.filter(r => r.paymentStatus === 'completed')
    })

    const totalPaidAmount = computed(() => {
      return paidReservationsFiltered.value.reduce((sum, r) => sum + (r.price || r.paymentAmount || 0), 0)
    })

    const paidReservationsCount = computed(() => {
      return paidReservationsFiltered.value.length
    })

    function clearDateFilters() {
      dateFrom.value = ''
      dateTo.value = ''
      currentPage.value = 1
    }

    // Watch filters to reset page
    watch([searchQuery, statusFilter, dateFrom, dateTo], () => {
      currentPage.value = 1
    })

    function getStatusLabel(status) {
      const labels = { confirmed: 'Confirmé', pending: 'En attente', cancelled: 'Annulé' }
      return labels[status] || status
    }

    function getPaymentStatusLabel(status) {
      const labels = {
        not_initiated: 'Non initié',
        pending: 'En attente',
        completed: 'Payé',
        failed: 'Échoué',
        refunded: 'Remboursé',
      }
      return labels[status] || status || 'Non initié'
    }

    async function initiatePayment(reservation) {
      try {
        const token = localStorage.getItem('accessToken')
        const res = await fetch('/api/v1/payment/initiate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({
            reservationId: reservation.id,
            email: reservation.email,
            phone: reservation.phone,
          }),
        })

        if (!res.ok) {
          throw new Error('Erreur lors de l\'initiation du paiement')
        }

        const data = await res.json()
        if (data.data?.paymentUrl) {
          // Update the reservation with payment URL
          reservation.paymentUrl = data.data.paymentUrl
          reservation.paymentStatus = 'pending'

          // Open payment URL in new tab
          window.open(data.data.paymentUrl, '_blank')

          // Refresh reservations
          await fetchReservations()
        }
      } catch (e) {
        console.error('Erreur lors de l\'initiation du paiement', e)
        alertModal({ title: 'Erreur', message: 'Erreur lors de l\'initiation du paiement: ' + e.message, type: 'danger' })
      }
    }

    async function getPaymentStatus(reservationId) {
      try {
        const token = localStorage.getItem('accessToken')
        const res = await fetch(`/api/v1/payment/status/${reservationId}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        })
        if (res.ok) {
          return await res.json()
        }
      } catch (e) {
        console.error('Erreur lors de la récupération du statut de paiement', e)
      }
      return null
    }

    function formatPrice(price) {
      return new Intl.NumberFormat('fr-FR').format(price) + ' XOF'
    }

    function formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
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
            body: JSON.stringify({ status: 'cancelled', cancelMessage: cancelMessage.value }),
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
        // Mode édition - remplir le formulaire avec les données existantes
        // Support both lowercase (new) and uppercase (old) field names
        offerForm.title = offer.name || offer.raw?.title || ''
        offerForm.bio = offer.description || offer.raw?.bio || ''
        offerForm.nightlyPrice = offer.pricePerNight || offer.raw?.nightlyPrice || ''
        offerForm.town = offer.raw?.town || offer.raw?.Town || ''
        offerForm.bedNumber = offer.raw?.bedNumber || offer.raw?.Bed_Number || ''
        offerForm.roomNumber = offer.raw?.roomNumber || offer.raw?.Room_Number || ''
        offerForm.kitchenNumber = offer.raw?.kitchenNumber || offer.raw?.Kitchen_Number || ''
        offerForm.availability = offer.available ? 'Disponible' : 'Indisponible'
        offerForm.parking = offer.raw?.parking ?? offer.raw?.Parking ?? false
        offerForm.washingName = offer.raw?.washingName ?? offer.raw?.Washing_Name ?? false
        offerForm.wifi = offer.raw?.wifi ?? offer.raw?.Wifi ?? false
        offerForm.ac = offer.raw?.ac ?? offer.raw?.AC ?? false
        offerForm.security = offer.raw?.security ?? offer.raw?.Security ?? false
        offerForm.pictures = []
      } else {
        // Mode création - réinitialiser le formulaire
        offerForm.title = ''
        offerForm.bio = ''
        offerForm.nightlyPrice = ''
        offerForm.town = ''
        offerForm.bedNumber = ''
        offerForm.roomNumber = ''
        offerForm.kitchenNumber = ''
        offerForm.availability = 'Disponible'
        offerForm.parking = false
        offerForm.washingName = false
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
        // Ajouter les nouvelles images, maximum 4
        const newFiles = Array.from(files)
        const currentCount = offerForm.pictures.length
        const availableSlots = 4 - currentCount

        if (availableSlots > 0) {
          offerForm.pictures.push(...newFiles.slice(0, availableSlots))
        }

        // Réinitialiser l'input
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
      if (!offer.raw.pictures || offer.raw.pictures.length === 0) return
      offer._carouselIndex =
        (offer._carouselIndex - 1 + offer.raw.pictures.length) % offer.raw.pictures.length
    }

    function nextImage(offer) {
      if (!offer.raw.pictures || offer.raw.pictures.length === 0) return
      offer._carouselIndex = (offer._carouselIndex + 1) % offer.raw.pictures.length
    }

    // async function saveOffer() {
    //   // Validation
    //   if (
    //     !offerForm.Title ||
    //     !offerForm.Bio ||
    //     !offerForm.nightlyPrice ||
    //     !offerForm.Town
    //   ) {
    //     alert('Veuillez remplir tous les champs obligatoires (*)')
    //     return
    //   }

    //   const token = localStorage.getItem('accessToken')
    //   try {
    //     const formData = new FormData()

    //     // Champs avec les noms correspondant au backend
    //     formData.append('title', offerForm.title)
    //     formData.append('bio', offerForm.bio)
    //     formData.append('nightlyPrice', offerForm.nightlyPrice)
    //     formData.append('town', offerForm.town)

    //     if (offerForm.bedNumber) formData.append('bedNumber', offerForm.bedNumber)
    //     if (offerForm.roomNumber) formData.append('roomNumber', offerForm.roomNumber)
    //     if (offerForm.kitchenNumber) formData.append('kitchenNumber', offerForm.kitchenNumber)

    //     formData.append('parking', offerForm.parking)
    //     formData.append('washingName', offerForm.washingName)
    //     formData.append('wifi', offerForm.wifi)
    //     formData.append('ac', offerForm.ac)
    //     formData.append('security', offerForm.security)
    //     formData.append('availability', offerForm.availability)

    //     // Images avec le nom de champ "Pictures" (majuscule)
    //     if (offerForm.pictures && offerForm.pictures.length > 0) {
    //       offerForm.pictures.forEach((pic) => {
    //         formData.append('Pictures', pic)
    //       })
    //     }

    //     const headers = {}
    //     if (token) {
    //       headers['Authorization'] = `Bearer ${token}`
    //     }

    //     if (editingOffer.value) {
    //       // Modification
    //       await fetch(`/api/v1/offer/${editingOffer.value.id}`, {
    //         method: 'PUT',
    //         headers: headers,
    //         body: formData,
    //       })
    //     } else {
    //       // Création
    //       await fetch('/api/v1/offer', {
    //         method: 'POST',
    //         headers: headers,
    //         body: formData,
    //       })
    //     }
    //     await fetchOffers()
    //   } catch (e) {
    //     console.error("Erreur lors de la sauvegarde de l'offre", e)
    //   }
    //   showOfferModal.value = false
    // }

    // Dans la fonction saveOffer(), remplacez tout le contenu par ceci:

    async function saveOffer() {
      // Validation
      if (!offerForm.title || !offerForm.bio || !offerForm.nightlyPrice || !offerForm.town) {
        console.log('Validation failed:', offerForm)
        alertModal({ title: 'Champ requis', message: 'Veuillez remplir tous les champs obligatoires (*)', type: 'warning' })
        return
      }

      const token = localStorage.getItem('accessToken')
      try {
        const formData = new FormData()

        // Champs avec les noms correspondant au backend (MINUSCULES)
        formData.append('title', offerForm.title)
        formData.append('bio', offerForm.bio)
        formData.append('nightlyPrice', offerForm.nightlyPrice)
        formData.append('town', offerForm.town)

        if (offerForm.bedNumber) formData.append('bedNumber', offerForm.bedNumber)
        if (offerForm.roomNumber) formData.append('roomNumber', offerForm.roomNumber)
        if (offerForm.kitchenNumber) formData.append('kitchenNumber', offerForm.kitchenNumber)

        formData.append('parking', offerForm.parking)
        formData.append('washingName', offerForm.washingName)
        formData.append('wifi', offerForm.wifi)
        formData.append('ac', offerForm.ac)
        formData.append('security', offerForm.security)
        formData.append('availability', offerForm.availability === 'Disponible')

        // IMPORTANT: Les fichiers doivent être envoyés avec le nom "Pictures" (MAJUSCULE)
        // car c'est ce que Multer attend dans la route: .array("Pictures")
        if (offerForm.pictures && offerForm.pictures.length > 0) {
          offerForm.pictures.forEach((pic) => {
            formData.append('Pictures', pic) // <-- MAJUSCULE ici !
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
      const ok = await confirmModal({ title: 'Supprimer l\'offre', message: 'Êtes-vous sûr de vouloir supprimer cette offre ?' })
      if (ok) {
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
      dateFrom,
      dateTo,
      currentPage,
      totalPages,
      reservations,
      filteredReservations,
      paginatedReservations,
      totalPaidAmount,
      paidReservationsCount,
      offers,
      offerForm,
      showReservationModal,
      showOfferModal,
      showCancelModal,
      selectedReservation,
      editingOffer,
      cancelMessage,
      getStatusLabel,
      getPaymentStatusLabel,
      formatPrice,
      formatDate,
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
      initiatePayment,
      getPaymentStatus,
      fetchReservations,
      clearDateFilters,
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
