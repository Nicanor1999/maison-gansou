<template>
    <div class="full-picture-container h-[30vh] md:h-screen flex justify-center items-center"
    data-aos="zoom-out">
        <img
            :src="encodeURI(image)"
            :alt="alt || 'Image pleine largeur'"
            class="w-full h-full object-cover"
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
<style scoped>
.full-picture-container {
  width: 93%;
}
</style>