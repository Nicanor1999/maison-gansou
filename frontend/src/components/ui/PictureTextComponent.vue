<template>
  <div class="picture-text-container h-[80vh] md:h-screen flex flex-col md:flex-row justify-around">
    <div class="picture-section h-[60%] md:h-full w-full md:w-[40%]">
      <img :src="encodeURI(image)" :alt="alt || 'Image'" class="w-full h-full object-cover" />
    </div>
    <div class="text-section w-full md:w-[30%] md:h-full text-center flex flex-col justify-center">
      <h2 v-if="title" class="title" data-aos="fade-left" data-aos-duration="3000">{{ title }}</h2>
      <p
        class="content text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
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
}

.text-section .title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.text-section .content {
  line-height: 1.6;
}
</style>
