<template>
    <div class="text-component w-[93%] md:w-[60%]">
        <h2 v-if="title" class="title">{{ title }}</h2>
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

.text-component .title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.text-component .content {
  line-height: 1.6;
  color: #333;
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