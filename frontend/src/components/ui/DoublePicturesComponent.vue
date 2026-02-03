<template>
  <div
    class="double-pictures-container w-[93%] md:w-[80%] h-[70%] md:h-screen flex flex-col md:flex-row justify-between gap-10 md:gap-0"
  >
    <div
      class="w-full md:w-[47%] h-[40vh] md:h-full overflow-hidden rounded-sm"
      data-aos="fade-right"
      data-aos-duration="1500"
    >
      <img
        :src="encodeURI(leftImage).replace(/#/g, '%23')"
        :alt="leftAlt || 'Image gauche'"
        class="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
      />
    </div>
    <div
      class="w-full md:w-[47%] h-[40vh] md:h-full md:mt-16 overflow-hidden rounded-sm"
      data-aos="fade-left"
      data-aos-duration="1500"
    >
      <img
        :src="encodeURI(rightImage).replace(/#/g, '%23')"
        :alt="rightAlt || 'Image droite'"
        class="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
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
      required: true,
    },
    rightImage: {
      type: String,
      required: true,
    },
    leftAlt: {
      type: String,
      default: '',
    },
    rightAlt: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped></style>
