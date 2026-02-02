<template>
  <div
    class="secondPart relative h-auto w-[93%] overflow-hidden flex flex-col md:flex-row md:justify-around"
  >
    <div class="h-auto md:w-[50%]" data-aos="fade-right">
      <p class="pt-6 text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
        {{ content }}
      </p>
    </div>
    <div
      class="h-[60vh] w-full md:h-[80vh] md:w-[30%] pt-8 pb-8 md:p-0 flex flex-col justify-around"
    >
      <div class="h-auto w-full" data-aos="flip-up">
        <h2>SERVICE</h2>
        <ul class="text-[var(--vt-c-text-dark-2)]">
          <li v-for="(service, i) in serviceItems" :key="i">{{ service }}</li>
        </ul>
      </div>
      <div class="h-auto w-full" data-aos="flip-up">
        <h2>TYPE DE TRAVAUX</h2>
        <ul class="text-[var(--vt-c-text-dark-2)]">
          <li v-for="(work, i) in workTypeItems" :key="i">{{ work }}</li>
        </ul>
      </div>
      <div class="h-auto w-full" data-aos="flip-up">
        <h2>EMPLACEMENT</h2>
        <p class="text-[var(--vt-c-text-dark-2)]">{{ location || '-' }}</p>
      </div>
      <div class="h-auto w-full" data-aos="flip-up">
        <h2>PARTENAIRES</h2>
        <ul class="text-[var(--vt-c-text-dark-2)]">
          <li v-for="(partner, i) in partnerItems" :key="i">{{ partner }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'

export default {
  name: 'BioComponent',
  props: {
    content: { type: String, default: '' },
    servicesList: { type: String, default: '' },
    workTypesList: { type: String, default: '' },
    location: { type: String, default: '' },
    partners: { type: [Array, String], default: '' },
  },
  setup(props) {
    const serviceItems = computed(() =>
      (props.servicesList || '').split(/[,\n]/).map(s => s.trim()).filter(Boolean)
    )
    const workTypeItems = computed(() =>
      (props.workTypesList || '').split(/[,\n]/).map(s => s.trim()).filter(Boolean)
    )
    const partnerItems = computed(() => {
      if (Array.isArray(props.partners)) return props.partners.filter(p => p)
      return (props.partners || '').split('\n').filter(s => s.trim())
    })

    return { serviceItems, workTypeItems, partnerItems }
  },
}
</script>
