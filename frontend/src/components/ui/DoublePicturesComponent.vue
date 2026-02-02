<template>
  <div class="double-pictures-container w-[93%] md:w-[80%] h-[70%] md:h-screen flex flex-col md:flex-row justify-between gap-10 md:gap-0">
    <div class="picture-wrapper w-full md:w-[47%] h-full">
      <img
        :src="encodeURI(leftImage)"
        :alt="leftAlt || 'Image gauche'"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="picture-wrapper w-full md:w-[47%] h-full">
      <img
        :src="encodeURI(rightImage)"
        :alt="rightAlt || 'Image droite'"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'DoublePicturesComponent',
  props: {
    leftImage: {
      type: String,
      required: true
    },
    rightImage: {
      type: String,
      required: true
    },
    leftAlt: {
      type: String,
      default: ''
    },
    rightAlt: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
</style>
