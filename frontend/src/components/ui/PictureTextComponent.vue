<template>
  <div class="picture-text-container h-auto md:h-[85vh] flex flex-col md:flex-row justify-between items-center">
    <div class="picture-section h-[50vh] md:h-full w-full md:w-[48%] overflow-hidden">
      <img :src="encodeURI(image).replace(/#/g, '%23')" :alt="alt || 'Image'" class="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
    </div>
    <div class="text-section w-full md:w-[40%] py-8 md:py-0 md:h-full text-center flex flex-col justify-center px-4">
      <h2 v-if="title" class="font-light text-2xl lg:text-3xl tracking-wide text-[var(--bg-1)] mb-6" data-aos="fade-left" data-aos-duration="1500">{{ title }}</h2>
      <p
        class="text-gray-700 leading-relaxed text-[15px] sm:text-[17px] lg:text-[18px]"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PictureTextComponent',
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
.picture-text-container {
  width: 93%;
  max-width: 1200px;
}
</style>
