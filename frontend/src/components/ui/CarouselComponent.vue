<template>
  <div class="carousel-container w-full h-full flex items-center justify-center">
    <div class="carousel relative w-full h-full overflow-hidden rounded-xl shadow-lg">
      <div
        v-for="(image, idx) in images"
        :key="image"
        class="carousel-slide absolute w-full h-full transition-opacity duration-700"
        :class="{ 'opacity-100 z-10': idx === current, 'opacity-0 z-0': idx !== current }"
      >
        <img :src="image" class="object-cover w-full h-full" />
      </div>
      <button
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
        @click="prev"
        aria-label="Précédent"
      >
        <span class="text-xl">&#8592;</span>
      </button>
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
        @click="next"
        aria-label="Suivant"
      >
        <span class="text-xl">&#8594;</span>
      </button>
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <span
          v-for="(image, idx) in images"
          :key="'dot-' + idx"
          class="w-3 h-3 rounded-full"
          :class="idx === current ? 'bg-[var(--second-orange)]' : 'bg-gray-300'"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      current: 0,
      timer: null,
    }
  },
  mounted() {
    this.startAutoSlide()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    next() {
      this.current = (this.current + 1) % this.images.length
    },
    prev() {
      this.current = (this.current - 1 + this.images.length) % this.images.length
    },
    startAutoSlide() {
      this.timer = setInterval(() => {
        this.next()
      }, 4000)
    },
  },
}
</script>

<style scoped>
.carousel-container {
  height: 100%;
  width: 100%;
}
.carousel {
  height: 100%;
  width: 100%;
  position: relative;
}
.carousel-slide {
  top: 0;
  left: 0;
}
</style>
