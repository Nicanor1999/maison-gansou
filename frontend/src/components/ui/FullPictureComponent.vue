<template>
    <div class="w-full h-[40vh] md:h-screen overflow-hidden"
    data-aos="fade">
        <img
            :src="encodeURI(image).replace(/#/g, '%23')"
            :alt="alt || 'Image pleine largeur'"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
        />
    </div>
</template>
<script>
export default {
  name: 'FullPictureComponent',
  props: {
    image: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped></style>