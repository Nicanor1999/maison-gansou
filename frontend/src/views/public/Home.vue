<template>
  <div class="relative">
    <div class="firstPart relative h-screen w-screen overflow-hidden bg-[var(--bg-hidden)]">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        :class="{
          'opacity-100 z-10': index === currentImageIndex,
          'opacity-0 z-0': index !== currentImageIndex,
        }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div class="absolute inset-0 bg-black/30 z-20"></div>
      <div class="absolute inset-0 z-30 flex items-center justify-center px-4 md:px-8 lg:px-12">
        <div
          class="max-w-6xl h-[25%] md:h-[25%] lg:h-[25%] xl:h-[40%] 2xl:h-[35%] w-full text-center text-white flex flex-col justify-around"
        >
          <!-- Logo ou Nom -->
          <!-- <div class="mb-4 md:mb-6 lg:mb-8">
            <h2
              class="text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl tracking-widest mb-2 text-[var(--second-orange)]"
              style="font-weight: bold"
            >
              MAISON GANSOU
            </h2>
          </div> -->

          <!-- Service changeant -->
          <transition name="slide-text" mode="out-in">
            <div :key="currentImageIndex" class="mb-4 md:mb-6 lg:mb-8">
              <h1
                class="text-[1.5rem] md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-extrabold mb-2 md:mb-3 lg:mb-4 drop-shadow-2xl leading-tight"
                style="font-weight: 100"
              >
                {{ services[currentImageIndex].title }}
              </h1>
            </div>
          </transition>

          <!-- Devise -->
          <p
            class="text-0.9xl md:text-0.5xl lg:text-xl xl:text-xl 2xl:text-2xl font-light italic mb-6 md:mb-4 lg:mb-5 drop-shadow-lg text-gray-100"
          >
            "L'excellence dans chaque détails de vos projets"
          </p>

          <!-- Bouton CTA -->
          <div class="mt-6 md:mt-10 lg:mt-12" data-aos="flip-up" data-aos-duration="3000">
            <router-link
              to="/contacts"
              class="inline-block text-[var(--bg-1)] bg-[var(--second-orange)] px-2 py-1 md:px-6 md:py-2 lg:px-6 lg:py-3 xl:px-4 xl:py-2 rounded-lg text-[12px] md:text-lg lg:text-xl xl:text-[15px] hover:bg-yellow-400 hover:text-white hover:font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Prendre Rendez-vous
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="secondPart relative h-[120vh] w-screen overflow-hidden flex justify-center">
      <div class="h-full w-[93%] pt-[12vh] flex flex-col justify-between md:justify-around">
        <p
          class="h-[20%] md:h-[40%] text-center text-[20px] sm:text-[35px] md:text-[40px] lg:text-[30px] 2xl:text-[45px]"
          data-aos="fade-up"
        >
          <span class="text-[var(--bg-1)] font-bold">MAISON GANSOU</span> est un cabinet
          d'architecture et de conception situé à Cotonou, c'est également un cabinet de conseil en
          design d'intérieur et de gestion d'actifs immobiliers.
        </p>
        <div class="h-[70%] md:h-[60%] flex flex-col sm:flex-row justify-between">
          <div class="h-[40%] sm:w-[35%] sm:h-[50%]" data-aos="fade-right">
            <img class="h-full w-full object-cover" src="@/assets/pictures/D.jpg" alt="Cabinet d'architecture MAISON GANSOU Cotonou" />
          </div>
          <div class="h-[50%] sm:w-[65%] flex flex-col justify-end items-center md:justify-around">
            <p
              class="h-[70%] lg:w-[90%] text-center flex items-center text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
              data-aos="fade-left"
            >
              Nous proposons une gamme complète de services en design d’intérieur et en
              architecture, accompagnée d’une offre globale de conception et de réalisation. Nous
              créons des espaces de vie d’exception, soigneusement conçus, réalisés avec expertise
              et planifiés avec rigueur afin de répondre aux exigences de la vie contemporaine.
            </p>
            <div class="h-[20%] w-full text-center underline text-[var(--bg-1)]">MG Team</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="thirdPart relative border-[1px] border-[var(--vt-c-text-dark-2)] bg-[var(--bg-3)] h-[40vh] md:h-screen w-screen flex justify-center"
    >
      <div class="h-full w-[93%] flex items-center">
        <ProjectsComponent />
      </div>
    </div>
    <div
      class="fourthPart relative border-b border-[var(--vt-c-text-dark-2)] h-auto w-screen flex flex-col items-center"
    >
      <div
        class="h-[40vh] md:h-[50vh] w-[93%] md:w-[60%] flex flex-col justify-around text-center text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
      >
        <p>
          Notre équipe pluridisciplinaire rassemble un large éventail de compétences spécialisées
          couvrant l’ensemble des domaines de l’aménagement intérieur, de l’architecture et de la
          construction, donnant naissance à un portefeuille de projets remarquable et diversifié.
        </p>
        <h2 class="font-bold text-[var(--bg-1)] md:tracking-wide md:text-xl lg:text-2xl">
          DU CONCEPT À LA RÉALISATION
        </h2>
      </div>
      <div class="h-[50vh] md:h-screen w-[93%]">
        <ServicesComponent />
      </div>
      <div
        class="h-[50vh] md:h-[80vh] w-[93%] flex flex-col justify-start md:justify-start items-center"
      >
        <div class="h-[75%] md:h-[50%] md:w-[60%] flex flex-col justify-between">
          <h2
            class="text-center font-bold text-[var(--bg-1)] md:tracking-wide md:text-xl lg:text-2xl"
          >
            UN SERVICE UNIQUE
          </h2>
          <div class="h-[90%] w-full flex flex-col justify-around text-center">
            <p
              class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
              data-aos="fade-right"
            >
              Pour Maison Gansou, chaque nouveau projet est l'occasion de créer quelque chose de
              remarquable et d'unique: un design soigné, une planification experte et une
              réalisation professionnelle.
            </p>
            <p
              class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
              data-aos="fade-left"
            >
              En établissant un lien personnel avec chacun de nos clients, vous constaterez dans ces
              témoignages que nous sommes impliqués, présents et investis émotionnellement pour vous
              garantir la maison que vous méritez.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fifthPart relative h-[70vh] md:h-[80vh] w-screen bg-[var(--bg-1)] flex justify-center items-center"
    >
      <div
        class="h-[70%] w-[93%] md:w-[60%] bg-white rounded-[8px] flex flex-col justify-between items-center p-6 md:p-8 relative overflow-hidden"
      >
        <transition name="fade-slide" mode="out-in">
          <div
            v-if="reviews && reviews.length > 0"
            :key="currentReviewIndex"
            class="flex flex-col justify-between items-center h-full w-full"
          >
            <p
              class="md:w-[90%] text-center text-[15px] md:text-[18px] lg:text-[18px] flex-grow flex items-center"
            >
              <span
                ><strong class="text-[var(--bg-1)]">MG</strong>
                {{ reviews[currentReviewIndex].text }}</span
              >
            </p>
            <div class="flex flex-col items-center gap-3">
              <!-- Photo de profil avec image ou initiales -->
              <div
                v-if="reviews[currentReviewIndex].image"
                class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg"
              >
                <img
                  :src="reviews[currentReviewIndex].image"
                  :alt="reviews[currentReviewIndex].name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg"
                :style="{ backgroundColor: reviews[currentReviewIndex].avatarColor }"
              >
                {{ reviews[currentReviewIndex].initials }}
              </div>
              <div class="flex flex-col items-center gap-1">
                <span class="font-semibold text-[var(--bg-1)] text-lg">{{
                  reviews[currentReviewIndex].name
                }}</span>
                <span class="text-sm text-gray-600">{{ reviews[currentReviewIndex].company }}</span>
              </div>
            </div>
          </div>
        </transition>
        <!-- Indicateurs de navigation -->
        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          <button
            v-for="(review, index) in reviews"
            :key="index"
            @click="currentReviewIndex = index"
            class="w-2 h-2 rounded-full transition-all"
            :class="index === currentReviewIndex ? 'bg-[var(--bg-1)] w-6' : 'bg-gray-400'"
          ></button>
        </div>
      </div>
    </div>
    <div class="sixthPart relative h-screen w-screen flex justify-center items-center">
      <div class="h-[75%] w-[93%] flex flex-col items-around">
        <div class="h-[10%] w-full flex justify-between">
          <div class="text-black text-sm sm:text-base md:text-lg lg:text-xl font-bold">Blog</div>
          <div
            class="text-black hover:text-[#F79315] cursor-pointer hover:underline underline-offset-1 text-sm sm:text-base md:text-lg lg:text-xl"
          >
            Voir Tout→
          </div>
        </div>
        <div class="h-[80%] w-full flex gap-4 overflow-x-scroll hide-scrollbar">
          <div
            class="journalElement h-full w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col justify-between"
            @mouseenter="showCustomCursor"
            @mouseleave="hideCustomCursor"
            @mousemove="updateCursorPosition"
          >
            <div class="h-[80%]">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Article blog architecture MAISON GANSOU" />
            </div>
            <div class="h-[15%] flex flex-col justify-around text-center">
              <span>~~12 Décembre 2025~~</span>
              <span class="font-bold">Bien réaliser son habitation locale.</span>
            </div>
          </div>
          <div
            class="journalElement h-full w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col justify-between"
            @mouseenter="showCustomCursor"
            @mouseleave="hideCustomCursor"
            @mousemove="updateCursorPosition"
          >
            <div class="h-[80%]">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Article blog architecture MAISON GANSOU" />
            </div>
            <div class="h-[15%] flex flex-col justify-around text-center">
              <span>~~12 Décembre 2025~~</span>
              <span class="font-bold">Bien réaliser son habitation locale.</span>
            </div>
          </div>
          <div
            class="journalElement h-full w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col justify-between"
            @mouseenter="showCustomCursor"
            @mouseleave="hideCustomCursor"
            @mousemove="updateCursorPosition"
          >
            <div class="h-[80%]">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Article blog architecture MAISON GANSOU" />
            </div>
            <div class="h-[15%] flex flex-col justify-around text-center">
              <span>~~12 Décembre 2025~~</span>
              <span class="font-bold">Bien réaliser son habitation locale.</span>
            </div>
          </div>
          <div
            class="journalElement h-full w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col justify-between"
            @mouseenter="showCustomCursor"
            @mouseleave="hideCustomCursor"
            @mousemove="updateCursorPosition"
          >
            <div class="h-[80%]">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Article blog architecture MAISON GANSOU" />
            </div>
            <div class="h-[15%] flex flex-col justify-around text-center">
              <span>~~12 Décembre 2025~~</span>
              <span class="font-bold">Bien réaliser son habitation locale.</span>
            </div>
          </div>
          <div
            class="journalElement h-full w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col justify-between"
            @mouseenter="showCustomCursor"
            @mouseleave="hideCustomCursor"
            @mousemove="updateCursorPosition"
          >
            <div class="h-[80%]">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Article blog architecture MAISON GANSOU" />
            </div>
            <div class="h-[15%] flex flex-col justify-around text-center">
              <span>~~12 Décembre 2025~~</span>
              <span class="font-bold">Bien réaliser son habitation locale.</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Curseur personnalisé -->
      <div
        ref="customCursor"
        class="custom-cursor"
        :class="{ active: cursorActive }"
        :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
      >
        Ouvrir
      </div>
    </div>
    <div
      class="footerPart relative h-[85vh] bg-[var(--bg-1)] w-screen flex justify-center items-center border-[var(--bg-2)] border-t-4"
    >
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import ProjectsComponent from '@/components/ui/ProjectsComponent.vue'
import ServicesComponent from '@/components/ui/ServicesComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'
import { useSeoMeta, seoConfigs } from '@/composables/useSeoMeta'

export default {
  name: 'HomePublicView',
  components: {
    ProjectsComponent,
    ServicesComponent,
    FooterComponent,
  },
  setup() {
    useSeoMeta(seoConfigs.home)
  },
  data() {
    return {
      currentImageIndex: 0,
      currentReviewIndex: 0,
      images: [
        new URL('@/assets/pictures/A.jpg', import.meta.url).href,
        new URL('@/assets/pictures/B.jpg', import.meta.url).href,
        new URL('@/assets/pictures/A-1.jpg', import.meta.url).href,
        new URL('@/assets/pictures/C.jpg', import.meta.url).href,
      ],
      services: [
        { title: 'Conception Architecturale' },
        { title: "Décoration Textile" },
        { title: 'Conception et Construction' },
        { title: "Gestion d'Actifs Immobiliers" },
      ],
      reviews: [
        {
          text: "possède un talent exceptionnel pour créer des intérieurs chaleureux et accueillants qui allient simplicité et lignes épurées, avec des touches d'originalité inattendues et des idées inspirantes.",
          name: 'Nick AHG',
          company: 'G-Tech',
          initials: 'NA',
          avatarColor: '#032B5E',
          image: new URL('@/assets/pictures/nick.jpg', import.meta.url).href,
        },
        {
          text: 'a transformé notre espace avec un professionnalisme remarquable. Leur attention aux détails et leur créativité ont dépassé toutes nos attentes.',
          name: 'Marie Dupont',
          company: 'Design & Co',
          initials: 'MD',
          avatarColor: '#F79315',
          image: null, // Exemple: new URL('@/assets/pictures/profile1.jpg', import.meta.url).href
        },
        {
          text: "offre un service complet et personnalisé. L'équipe est à l'écoute et sait concrétiser parfaitement nos idées en un projet cohérent et moderne.",
          name: 'Jean Kouassi',
          company: 'Immobilier Plus',
          initials: 'JK',
          avatarColor: '#BB4430',
          image: null,
        },
        {
          text: 'nous a accompagnés de A à Z dans notre projet de rénovation. Le résultat est magnifique et fonctionnel. Une vraie réussite !',
          name: 'Sophie Martin',
          company: 'Résidence Luxe',
          initials: 'SM',
          avatarColor: '#2c3e50',
          image: null,
        },
      ],
      intervalId: null,
      reviewIntervalId: null,
      cursorActive: false,
      cursorX: 0,
      cursorY: 0,
    }
  },
  mounted() {
    this.startSlideshow()
    this.startReviewCarousel()
  },
  beforeUnmount() {
    this.stopSlideshow()
    this.stopReviewCarousel()
  },
  methods: {
    startSlideshow() {
      this.intervalId = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length
      }, 5000) // Change d'image toutes les 5 secondes
    },
    stopSlideshow() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
    },
    startReviewCarousel() {
      this.reviewIntervalId = setInterval(() => {
        this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length
      }, 6000) // Change d'avis toutes les 6 secondes
    },
    stopReviewCarousel() {
      if (this.reviewIntervalId) {
        clearInterval(this.reviewIntervalId)
      }
    },
    showCustomCursor() {
      this.cursorActive = true
      document.body.style.cursor = 'none'
    },
    hideCustomCursor() {
      this.cursorActive = false
      document.body.style.cursor = 'auto'
    },
    updateCursorPosition(e) {
      this.cursorX = e.clientX
      this.cursorY = e.clientY
    },
  },
}
</script>
<style scoped>
.slide-text-enter-active,
.slide-text-leave-active {
  transition: all 0.5s ease;
}

.slide-text-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-text-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Cacher la scrollbar horizontale */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE et Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari et Opera */
}

.journalElement {
  cursor: none;
}

.custom-cursor {
  position: fixed;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--bg-2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 9999;
}

.custom-cursor.active {
  opacity: 1;
}
</style>
