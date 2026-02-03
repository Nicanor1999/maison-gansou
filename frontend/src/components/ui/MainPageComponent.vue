<template>
  <div class="firstPart relative h-screen w-screen overflow-hidden bg-[var(--bg-hidden)]">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
      :class="{
        'opacity-100 z-10': index === currentImageIndex,
        'opacity-0 z-0': index !== currentImageIndex,
      }"
      :style="{ backgroundImage: `url(${encodeURI(image).replace(/#/g, '%23')})` }"
    ></div>
    <div class="absolute inset-0 bg-black/20 z-20"></div>
    <div class="absolute inset-0 z-30 flex items-center justify-center px-4 md:px-8 lg:px-12">
      <div
        class="max-w-6xl h-[25%] md:h-[25%] lg:h-[25%] xl:h-[40%] 2xl:h-[35%] w-full text-center text-white flex flex-col justify-around"
      >
        <p
          class="text-[1.5rem] md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-light italic mb-6 md:mb-4 lg:mb-5 drop-shadow-lg text-gray-100"
        >
          {{ headline }}
        </p>
        <div class="mt-6 md:mt-10 lg:mt-12" data-aos="flip-up" data-aos-duration="3000">
          <button
            @click="$emit('scrollDown')"
            class="inline-block text-[var(--bg-1)] bg-[var(--second-orange)] px-2 py-1 md:px-6 md:py-2 lg:px-6 lg:py-3 xl:px-4 xl:py-2 rounded-lg text-[12px] md:text-lg lg:text-xl xl:text-[15px] hover:bg-yellow-400 hover:text-white hover:font-bold transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
          >
            {{ buttonText || 'Voir Plus' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch, onUnmounted } from 'vue'

export default {
  name: 'MainPageComponent',
  props: {
    images: { type: Array, default: () => [] },
    headline: { type: String, default: '' },
    buttonText: { type: String, default: 'Voir Plus' },
  },
  emits: ['scrollDown'],
  setup(props) {
    const currentImageIndex = ref(0)
    let intervalId = null

    watch(() => props.images, (imgs) => {
      if (intervalId) { clearInterval(intervalId); intervalId = null }
      currentImageIndex.value = 0
      if (imgs && imgs.length > 1) {
        intervalId = setInterval(() => {
          currentImageIndex.value = (currentImageIndex.value + 1) % imgs.length
        }, 5000)
      }
    }, { immediate: true })

    onUnmounted(() => {
      if (intervalId) clearInterval(intervalId)
    })

    return { currentImageIndex }
  },
}
</script>
