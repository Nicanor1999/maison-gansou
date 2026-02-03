<template>
    <div class="text-component w-[93%] max-w-[800px] mx-auto" data-aos="fade-up">
        <h2 v-if="title" class="font-light text-2xl lg:text-3xl tracking-wide text-gray-800 mb-6">{{ title }}</h2>
        <div class="content" v-html="text"></div>
    </div>
</template>
<script>
export default {
  name: 'TextComponent',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.text-component {
  padding: 1rem 0;
  text-align: center;
}

.text-component .content {
  line-height: 1.8;
  color: #4b5563;
  font-size: 15px;
}

@media (min-width: 640px) {
  .text-component .content {
    font-size: 20px;
  }
}

@media (min-width: 768px) {
  .text-component .content {
    font-size: 25px;
  }
}

@media (min-width: 1024px) {
  .text-component .content {
    font-size: 18px;
  }
}
</style>