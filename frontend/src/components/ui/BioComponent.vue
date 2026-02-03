<template>
  <div
    class="secondPart relative h-auto w-[93%] max-w-[1200px] overflow-hidden flex flex-col md:flex-row md:justify-between"
  >
    <div class="h-auto md:w-[55%]" data-aos="fade-right">
      <p class="pt-6 text-gray-700 leading-relaxed text-[15px] sm:text-[17px] lg:text-[18px]">
        {{ content }}
      </p>
    </div>
    <div class="w-full md:w-px md:mx-8 my-8 md:my-0 bg-gray-200 flex-shrink-0"></div>
    <div
      class="h-auto w-full md:w-[35%] flex flex-col gap-8 md:gap-10 py-4"
    >
      <div class="border-l-2 border-[var(--second-orange)] pl-4" data-aos="fade-up">
        <h2 class="tracking-[0.2em] text-[11px] text-gray-400 uppercase font-medium mb-2">Service</h2>
        <ul class="text-gray-600 text-sm">
          <li v-for="(service, i) in serviceItems" :key="i">{{ service }}</li>
        </ul>
      </div>
      <div class="border-l-2 border-[var(--second-orange)] pl-4" data-aos="fade-up">
        <h2 class="tracking-[0.2em] text-[11px] text-gray-400 uppercase font-medium mb-2">Type de travaux</h2>
        <ul class="text-gray-600 text-sm">
          <li v-for="(work, i) in workTypeItems" :key="i">{{ work }}</li>
        </ul>
      </div>
      <div class="border-l-2 border-[var(--second-orange)] pl-4" data-aos="fade-up">
        <h2 class="tracking-[0.2em] text-[11px] text-gray-400 uppercase font-medium mb-2">Emplacement</h2>
        <p class="text-gray-600 text-sm">{{ location || '-' }}</p>
      </div>
      <div class="border-l-2 border-[var(--second-orange)] pl-4" data-aos="fade-up">
        <h2 class="tracking-[0.2em] text-[11px] text-gray-400 uppercase font-medium mb-2">Partenaires</h2>
        <ul class="text-gray-600 text-sm">
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
