<template>
  <div class="h-[80%] w-full flex flex-col items-between">
    <div class="h-[10%] w-full flex justify-between" data-aos="fade-up">
      <div class="text-black text-sm sm:text-base md:text-lg lg:text-xl font-bold">
        Nos Services
      </div>
      <div
        class="text-black hover:text-[#F79315] cursor-pointer hover:underline underline-offset-1 text-sm sm:text-base md:text-lg lg:text-xl"
      >
        Voir Tout→
      </div>
    </div>
    <div class="h-[80%] w-full flex gap-4 overflow-x-scroll hide-scrollbar">
      <div
        class="servicesElement h-full relative w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col items-center justify-around"
        data-aos="fade-left"
        data-aos-delay="0"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="Service de conception architecturale MAISON GANSOU" loading="lazy" decoding="async" />
        <div class="h-full w-[80%] flex items-center justify-center absolute z-0">
          <div
            class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
          >
            Conception Architecturale
          </div>
        </div>
      </div>
      <div
        class="servicesElement h-full relative w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col items-center justify-around"
        data-aos="fade-left"
        data-aos-delay="100"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Service de conception et construction MAISON GANSOU" loading="lazy" decoding="async" />
        <div class="h-full w-[80%] flex items-center justify-center absolute">
          <div
            class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
          >
            Conception et Construction
          </div>
        </div>
      </div>
      <div
        class="servicesElement h-full relative w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col items-center justify-around"
        data-aos="fade-left"
        data-aos-delay="200"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <img class="h-full w-full object-cover blur-[0.5px]" src="@/assets/pictures/H.jpg" alt="Service d'architecture d'intérieur MAISON GANSOU" loading="lazy" decoding="async" />
        <div class="h-full w-[80%] flex items-center justify-center absolute">
          <div
            class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
          >
            Architecture d'Intérieur
          </div>
        </div>
      </div>
      <div
        class="servicesElement h-full relative w-[80%] sm:w-[40%] xl:w-[31%] flex-shrink-0 flex flex-col items-center justify-around"
        data-aos="fade-left"
        data-aos-delay="300"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <img class="h-full w-full object-cover" src="@/assets/pictures/I.jpg" alt="Service de gestion d'actifs immobiliers MAISON GANSOU" loading="lazy" decoding="async" />
        <div class="h-full w-[80%] flex items-center justify-center absolute">
          <div
            class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
          >
            Gestion d'Actifs Immobiliers
          </div>
        </div>
      </div>
    </div>
    <!-- Curseur personnalisé -->
    <div 
      ref="customCursor" 
      class="custom-cursor"
      :class="{ 'active': cursorActive }"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    >
      Ouvrir
    </div>
  </div>
</template>
<script>
export default {
  name: 'ServicesComponent',
  data() {
    return {
      cursorActive: false,
      cursorX: 0,
      cursorY: 0,
    }
  },
  methods: {
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
    }
  }
}
</script>
<style scoped>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE et Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.servicesElement {
  overflow: hidden;
}

.servicesElement img {
  transition: transform 0.3s ease;
}

.servicesElement:hover img {
  transform: scale(1.1);
}

.servicesElement div {
  transition: color 0.3s ease;
}

.servicesElement:hover div {
  color: #f79315;
}

.servicesElement {
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
