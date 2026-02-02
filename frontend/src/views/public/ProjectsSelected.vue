<template>
  <div class="relative w-full h-auto flex flex-col items-center gap-20">
    <template v-if="loading">
      <div class="h-screen w-screen flex items-center justify-center">
        <p class="text-gray-500">Chargement...</p>
      </div>
    </template>
    <template v-else-if="project">
      <template v-for="(section, index) in project.sections" :key="index">
        <MainPageComponent
          v-if="section.type === 'main-page'"
          :images="section.images || []"
          :headline="section.headline || project.title"
          :buttonText="section.buttonText"
          @scrollDown="scrollToSecondPart"
        />
        <BioComponent
          v-else-if="section.type === 'bio'"
          :content="section.content"
          :servicesList="section.servicesList || project.services || ''"
          :workTypesList="section.workTypesList || project.worksType || ''"
          :location="project.town ? `${project.town}, ${project.country}` : ''"
          :partners="project.partners"
        />
        <TextComponent
          v-else-if="section.type === 'full-text'"
          :title="section.title"
          :text="section.content"
        />
        <FullPictureComponent
          v-else-if="section.type === 'full-image'"
          :image="section.image"
          :alt="section.alt"
        />
        <PictureTextComponent
          v-else-if="section.type === 'image-text'"
          :image="section.image"
          :title="section.title"
          :text="section.content"
          :alt="section.alt"
        />
        <TextPictureComponent
          v-else-if="section.type === 'text-image'"
          :image="section.image"
          :title="section.title"
          :text="section.content"
          :alt="section.alt"
        />
        <DoublePicturesComponent
          v-else-if="section.type === 'double-image'"
          :leftImage="section.leftImage"
          :rightImage="section.rightImage"
          :leftAlt="section.leftAlt"
          :rightAlt="section.rightAlt"
        />
      </template>
    </template>
    <template v-else>
      <div class="h-screen w-screen flex items-center justify-center">
        <p class="text-gray-500">Projet introuvable</p>
      </div>
    </template>
    <div class="bg-[var(--bg-3)] h-[40vh] md:h-screen w-screen flex justify-center">
      <div class="h-full w-[93%] flex items-center">
        <ProjectsComponent />
      </div>
    </div>
    <div
      class="h-[85vh] bg-[var(--bg-1)] w-screen flex justify-center items-center border-[var(--bg-2)] border-t-4"
    >
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainPageComponent from '@/components/ui/MainPageComponent.vue'
import BioComponent from '@/components/ui/BioComponent.vue'
import FullPictureComponent from '@/components/ui/FullPictureComponent.vue'
import PictureTextComponent from '@/components/ui/PictureTextComponent.vue'
import TextPictureComponent from '@/components/ui/TextPictureComponent.vue'
import TextComponent from '@/components/ui/TextComponent.vue'
import DoublePicturesComponent from '@/components/ui/DoublePicturesComponent.vue'
import ProjectsComponent from '@/components/ui/ProjectsComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'

export default {
  name: 'ProjectsSelected',
  components: {
    MainPageComponent,
    BioComponent,
    FullPictureComponent,
    PictureTextComponent,
    TextPictureComponent,
    TextComponent,
    DoublePicturesComponent,
    ProjectsComponent,
    FooterComponent,
  },
  setup() {
    const route = useRoute()
    const project = ref(null)
    const loading = ref(true)
    const API_BASE = '/api/v1'

    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects/${route.params.id}`)
        if (res.ok) {
          const data = await res.json()
          project.value = data.data || data
        }
      } catch (err) {
        console.error('Error fetching project:', err)
      } finally {
        loading.value = false
      }
    }

    const scrollToSecondPart = () => {
      const sections = document.querySelectorAll('.secondPart')
      if (sections.length) {
        sections[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    onMounted(() => {
      fetchProject()
    })

    return {
      project,
      loading,
      scrollToSecondPart,
    }
  },
}
</script>
<style scoped></style>
