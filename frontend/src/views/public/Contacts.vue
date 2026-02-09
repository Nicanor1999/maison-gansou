<template>
  <div class="contacts-page min-h-screen w-full bg-white flex flex-col items-center">
    <!-- Header Section -->
    <div class="h-[35vh] md:h-[40vh] w-[93%] flex flex-col justify-end">
      <div class="h-[60%] w-full flex flex-col justify-center items-center">
        <h1
          class="font-bold text-[var(--bg-1)] tracking-[5px] md:tracking-[7px] text-[22px] md:text-[40px] text-center"
          data-aos="fade-up"
        >
          CONTACTEZ-NOUS
        </h1>
        <p
          class="text-center text-[15px] sm:text-[18px] md:text-[20px] lg:text-[18px] text-gray-600 max-w-3xl mt-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Nous sommes à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets.
        </p>
      </div>
    </div>

    <!-- Contact Content -->
    <div class="w-[93%] py-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <!-- Contact Information -->
        <div class="order-2 lg:order-1 flex flex-col gap-10" data-aos="fade-right">

          <!-- Address -->
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-[var(--second-orange)] rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-white">location_on</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-gray-700">Adresse</h3>
              <p class="text-gray-600">Quartier Tanto, Cotonou Benin</p>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-[var(--second-orange)] rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-white">phone</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg text-gray-700">Telephone</h3>
              <p class="text-gray-600">+229 01 60 73 97 55</p>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-[var(--second-orange)] rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-white">mail</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg  text-gray-700">Email</h3>
              <p class="text-gray-600">contacts@maisongansou.com</p>
              <!-- <p class="text-gray-600">info@maisongansou.com</p> -->
            </div>
          </div>

          <!-- Hours -->
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 bg-[var(--second-orange)] rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-white">schedule</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg  text-gray-700">Horaires d'ouverture</h3>
              <p class="text-gray-600">Lundi - Vendredi: 9h00 - 18h00</p>
              <p class="text-gray-600">Samedi: 9h00 - 13h00</p>
            </div>
          </div>

          <!-- Social Media -->
          <div class="pt-8 flex flex-col gap-3">
            <h3 class="font-semibold text-[var(--bg-1)] text-lg mb-4">Suivez-nous</h3>
            <div class="flex gap-4">
              <a
                href="https://facebook.com/maisongansou"
                target="_blank"
                class="w-12 h-12 bg-[var(--bg-1)] hover:bg-[var(--second-orange)] rounded-full flex items-center justify-center transition-all duration-300"
              >
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/maisongansou"
                target="_blank"
                class="w-12 h-12 bg-[var(--bg-1)] hover:bg-[var(--second-orange)] rounded-full flex items-center justify-center transition-all duration-300"
              >
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@maisongansou"
                target="_blank"
                class="w-12 h-12 bg-[var(--bg-1)] hover:bg-[var(--second-orange)] rounded-full flex items-center justify-center transition-all duration-300"
              >
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/22901607397555"
                target="_blank"
                class="w-12 h-12 bg-[var(--bg-1)] hover:bg-[var(--second-orange)] rounded-full flex items-center justify-center transition-all duration-300"
              >
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="order-1 lg:order-2" data-aos="fade-left">
          <div class="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col gap-6">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-700 mb-6">Envoyez-nous un message</h3>

            <form @submit.prevent="submitContact" class="flex flex-col gap-5">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Prenom *</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                    placeholder="Votre prenom"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Telephone</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                  placeholder="+229 00 00 00 00"
                />
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Sujet *</label>
                <select
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300"
                >
                  <option value="">Selectionnez un sujet</option>
                  <option value="Demande d'information">Demande d'information</option>
                  <option value="Projet d'architecture">Projet d'architecture</option>
                  <option value="Design d'interieur">Design d'interieur</option>
                  <option value="Location d'appartement">Location d'appartement</option>
                  <option value="Partenariat">Partenariat</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--second-orange)] focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Decrivez votre projet ou votre demande..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-[var(--bg-1)] text-white py-4 rounded-lg hover:bg-[var(--second-orange)] hover:text-[var(--bg-1)] transition-all duration-300 font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="isSubmitting" class="material-symbols-outlined animate-spin">progress_activity</span>
                <span>{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="w-full h-[50vh] bg-gray-200 mt-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.12839051976!2d2.2941373!3d6.3702928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355e59af3c6a3%3A0xc53b8e0937c8b7c3!2sCotonou%2C%20Benin!5e0!3m2!1sen!2sfr!4v1707123456789!5m2!1sen!2sfr"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <!-- Footer -->
    <div class="footerPart relative h-[85vh] bg-[var(--bg-1)] w-screen flex justify-center items-center border-[var(--bg-2)] border-t-4">
      <FooterComponent />
    </div>

    <!-- Success Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showSuccessModal"
          class="fixed inset-0 z-[9999] flex items-center justify-center"
          @click.self="closeSuccessModal"
        >
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            class="relative bg-white rounded-2xl w-[90%] md:w-[50%] lg:w-[30%] z-10 shadow-2xl text-center flex flex-col items-center justify-around p-8"
          >
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
            </div>
            <h2 class="text-2xl font-bold text-[var(--bg-1)] mt-4">Message Envoye!</h2>
            <p class="text-gray-600 mt-4">
              Votre message a ete envoye avec succes. Nous vous repondrons dans les plus brefs delais.
            </p>
            <button
              @click="closeSuccessModal"
              class="w-full mt-6 h-12 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--second-orange)] hover:text-[var(--bg-1)] transition-all duration-300 font-semibold"
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
import { ref, reactive } from 'vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'
import { useConfirmModal } from '@/composables/useConfirmModal'

export default {
  name: 'ContactsPublicView',
  components: {
    FooterComponent,
  },
  setup() {
    const { alert: alertModal } = useConfirmModal()
    const isSubmitting = ref(false)
    const showSuccessModal = ref(false)

    const form = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })

    const submitContact = async () => {
      if (!form.firstName || !form.lastName || !form.email || !form.subject || !form.message) {
        alertModal({
          title: 'Erreur',
          message: 'Veuillez remplir tous les champs obligatoires.',
          type: 'error'
        })
        return
      }

      isSubmitting.value = true

      try {
        // Create a message in the admin mailbox
        const response = await fetch('/api/v1/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderName: `${form.firstName} ${form.lastName}`,
            senderEmail: form.email,
            phone: form.phone,
            subject: form.subject,
            content: form.message,
            category: 'contact',
            direction: 'inbound',
            status: 'received',
          }),
        })

        if (response.ok) {
          showSuccessModal.value = true
          // Reset form
          form.firstName = ''
          form.lastName = ''
          form.email = ''
          form.phone = ''
          form.subject = ''
          form.message = ''
        } else {
          throw new Error('Erreur lors de l\'envoi')
        }
      } catch (error) {
        console.error('Erreur:', error)
        alertModal({
          title: 'Erreur',
          message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez reessayer.',
          type: 'error'
        })
      } finally {
        isSubmitting.value = false
      }
    }

    const closeSuccessModal = () => {
      showSuccessModal.value = false
    }

    return {
      form,
      isSubmitting,
      showSuccessModal,
      submitContact,
      closeSuccessModal,
    }
  },
}
</script>

<style scoped>
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

/* Spin animation */
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
