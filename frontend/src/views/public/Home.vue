<template>
  <div class="relative">
    <div class="relative h-screen w-screen overflow-hidden bg-black">
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
      <div class="absolute inset-0 bg-black/30 backdrop-blur-[3px] z-20"></div>
      <div class="absolute inset-0 z-30 flex items-center justify-center px-4 md:px-8 lg:px-12">
        <div class="max-w-6xl h-[25%] md:h-[25%] lg:h-[25%] xl:h-[40%] 2xl:h-[35%] w-full text-center text-white flex flex-col justify-between">
          <!-- Logo ou Nom -->
          <div class="mb-4 md:mb-6 lg:mb-8">
            <h2
              class="text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-light tracking-widest mb-2 text-[var(--second-orange)]"
                style="font-weight: 700"
            >
              MAISON GANSOU
            </h2>
            <!-- <div class="w-16 md:w-20 lg:w-24 h-0.5 md:h-1 bg-yellow-300 mx-auto"></div> -->
          </div>

          <!-- Service changeant -->
          <transition name="slide-text" mode="out-in">
            <div :key="currentImageIndex" class="mb-4 md:mb-6 lg:mb-8">
              <h1
                class="text-[1.5rem] md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-extrabold mb-2 md:mb-3 lg:mb-4 drop-shadow-2xl leading-tight"
                style="font-weight: 800"
              >
                {{ services[currentImageIndex].title }}
              </h1>
            </div>
          </transition>

          <!-- Devise -->
          <p
            class="text-0.9xl md:text-0.5xl lg:text-xl xl:text-xl 2xl:text-2xl font-light italic mb-6 md:mb-4 lg:mb-5 drop-shadow-lg text-gray-100"
          >
            "L'excellence dans chaque détail de vos projets"
          </p>

          <!-- Bouton CTA -->
          <div class="mt-6 md:mt-10 lg:mt-12">
            <router-link
              to="/services"
              class="inline-block text-[var(--bg-1)] bg-[var(--second-orange)] px-2 py-1 md:px-6 md:py-2 lg:px-6 lg:py-3 xl:px-4 xl:py-2 rounded-lg text-[12px] md:text-lg lg:text-xl xl:text-[15px] hover:bg-yellow-400 hover:text-white hover:font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Réservez maintenant
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div>b</div>
    <div>c</div>
    <div>d</div>
    <div>e</div>
    <div>f</div>
    <div>g</div>
    <div>h</div>
  </div>
</template>
<script>
export default {
  name: 'HomePublicView',
  data() {
    return {
      currentImageIndex: 0,
      images: [
        new URL('@/assets/pictures/A.jpg', import.meta.url).href,
        new URL('@/assets/pictures/A-1.jpg', import.meta.url).href,
        new URL('@/assets/pictures/B.jpg', import.meta.url).href,
        new URL('@/assets/pictures/C.jpg', import.meta.url).href,
      ],
      services: [
        { title: 'Conception Architecturale' },
        { title: "Architecture d'Intérieur" },
        { title: 'Conception et Construction' },
        { title: "Gestion d'Actifs Immobiliers" },
      ],
      intervalId: null,
    }
  },
  mounted() {
    this.startSlideshow()
  },
  beforeUnmount() {
    this.stopSlideshow()
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
</style>
