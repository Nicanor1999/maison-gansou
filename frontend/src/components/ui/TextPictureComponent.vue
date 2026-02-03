<template>
  <div class="text-picture-container">
    <div class="text-section flex flex-col justify-center px-4">
      <h2 v-if="title" class="font-light text-2xl lg:text-3xl tracking-wide text-gray-800 mb-6" data-aos="fade-right" data-aos-duration="1500">{{ title }}</h2>
      <p
        class="text-gray-700 leading-relaxed text-[15px] sm:text-[17px] lg:text-[18px]"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        {{ text }}
      </p>
    </div>
    <div class="picture-section overflow-hidden">
      <img
        :src="encodeURI(image).replace(/#/g, '%23')"
        :alt="alt || 'Image'"
        class="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TextPictureComponent',
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped>
.text-picture-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  width: 93%;
  max-width: 1200px;
}

.picture-section {
  height: 50vh;
}

@media (min-width: 768px) {
  .picture-section {
    height: 85vh;
  }
}

@media (max-width: 768px) {
  .text-picture-container {
    grid-template-columns: 1fr;
  }
}
</style>
