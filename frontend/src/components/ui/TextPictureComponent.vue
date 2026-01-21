<template>
    <div class="text-picture-container">
        <div class="text-section">
            <h2 v-if="title" class="title">{{ title }}</h2>
            <p class="content text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">{{ text }}</p>
        </div>
        <div class="picture-section">
            <img
                :src="image"
                :alt="alt || 'Image'"
                class="w-full h-auto object-cover"
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
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    text: {
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
.text-picture-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.text-section .title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.text-section .content {
  line-height: 1.6;
}

@media (max-width: 768px) {
  .text-picture-container {
    grid-template-columns: 1fr;
  }
}
</style>