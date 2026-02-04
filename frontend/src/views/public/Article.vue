<template>
  <div class="relative w-full h-auto flex flex-col items-center bg-[#faf8f5]">
    <!-- Loading State -->
    <template v-if="loading">
      <div class="h-screen w-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--bg-1)]"></div>
      </div>
    </template>

    <!-- Article Content -->
    <template v-else-if="article">
      <div class="h-full w-full flex flex-col items-center">
        <template v-for="(section, index) in article.sections" :key="index">
          <!-- Espacement variable entre sections -->
          <div v-if="index > 0" :class="sectionSpacing(section, article.sections[index - 1])"></div>

          <MainPageComponent
            v-if="section.type === 'main-page'"
            :images="section.images || []"
            :headline="section.headline || article.title"
            :buttonText="section.buttonText"
            @scrollDown="scrollToContent"
          />
          <BioComponent
            v-else-if="section.type === 'bio'"
            :content="section.content"
            :partners="section.partners || ''"
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

        <!-- Article Meta (if no main-page section) -->
        <div v-if="!hasMainPageSection" class="h-[50vh] md:h-[60vh] w-full flex flex-col justify-end items-center">
          <div class="h-[60%] w-[93%] max-w-[1200px] flex flex-col justify-center items-center text-center">
            <!-- Tags -->
            <div class="flex flex-wrap justify-center gap-2 mb-6">
              <span
                v-for="tagId in article.tags"
                :key="tagId"
                class="text-xs bg-gray-100 text-[var(--bg-1)] rounded-full px-3 py-1"
              >
                {{ getTagName(tagId) }}
              </span>
            </div>
            <!-- Title -->
            <h1
              class="font-bold text-[var(--bg-1)] tracking-[3px] md:tracking-[5px] text-[24px] md:text-[40px] lg:text-[50px] leading-tight"
              data-aos="fade-up"
            >
              {{ article.title }}
            </h1>
            <!-- Date -->
            <p class="text-gray-500 mt-4 text-sm md:text-base" data-aos="fade-up" data-aos-delay="100">
              {{ formatDate(article.createdAt) }}
            </p>
          </div>
          <!-- Cover Image (from first section image as fallback) -->
          <div v-if="getArticleCoverImage(article)" class="h-[40%] w-[93%] max-w-[1200px] overflow-hidden rounded-t-xl">
            <img
              :src="getArticleCoverImage(article)"
              :alt="article.title"
              class="w-full h-full object-cover"
              data-aos="fade-up"
              data-aos-delay="200"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Not Found -->
    <template v-else>
      <div class="h-screen w-screen flex flex-col items-center justify-center">
        <span class="material-symbols-outlined text-[80px] text-gray-300">article</span>
        <p class="text-gray-500 text-xl mt-4">Article introuvable</p>
        <router-link
          to="/blog"
          class="mt-6 h-12 px-6 bg-[var(--bg-1)] text-white rounded-lg flex items-center justify-center hover:bg-[var(--bg-1)]/90"
        >
          Retour au blog
        </router-link>
      </div>
    </template>

    <!-- Articles Section -->
    <div class="h-[40vh] md:h-screen w-screen flex justify-center">
      <div class="h-full w-[93%] flex items-center">
        <ArticlesComponent />
      </div>
    </div>

    <!-- Footer -->
    <div
      class="h-[85vh] bg-[var(--bg-1)] w-screen flex justify-center items-center border-[var(--bg-2)] border-t-4"
    >
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MainPageComponent from '@/components/ui/MainPageComponent.vue'
import BioComponent from '@/components/ui/BioComponent.vue'
import FullPictureComponent from '@/components/ui/FullPictureComponent.vue'
import PictureTextComponent from '@/components/ui/PictureTextComponent.vue'
import TextPictureComponent from '@/components/ui/TextPictureComponent.vue'
import TextComponent from '@/components/ui/TextComponent.vue'
import DoublePicturesComponent from '@/components/ui/DoublePicturesComponent.vue'
import ArticlesComponent from '@/components/ui/ArticlesComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'

export default {
  name: 'ArticleView',
  components: {
    MainPageComponent,
    BioComponent,
    FullPictureComponent,
    PictureTextComponent,
    TextPictureComponent,
    TextComponent,
    DoublePicturesComponent,
    ArticlesComponent,
    FooterComponent,
  },
  setup() {
    const route = useRoute()
    const article = ref(null)
    const loading = ref(true)
    const allTags = ref([])
    const API_BASE = '/api/v1'

    const hasMainPageSection = computed(() => {
      return article.value?.sections?.some(s => s.type === 'main-page')
    })

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_BASE}/article/${route.params.id}`)
        if (res.ok) {
          const data = await res.json()
          article.value = data.data || data
        }
      } catch (err) {
        console.error('Error fetching article:', err)
      } finally {
        loading.value = false
      }
    }

    const fetchTags = async () => {
      try {
        const res = await fetch(`${API_BASE}/tags?perPage=100`)
        if (res.ok) {
          const data = await res.json()
          allTags.value = data.data || data.docs || []
        }
      } catch (err) {
        console.error('Error fetching tags:', err)
      }
    }

    const getTagName = (tagId) => {
      const id = typeof tagId === 'object' ? tagId._id : tagId
      const tag = allTags.value.find((t) => t._id === id)
      return tag ? tag.Tags : ''
    }

    // Récupérer l'image de couverture depuis les sections
    const getArticleCoverImage = (art) => {
      if (!art || !art.sections || art.sections.length === 0) return null
      const mainPage = art.sections.find((s) => s.type === 'main-page')
      if (mainPage && mainPage.images && mainPage.images.length > 0) {
        return mainPage.images[0]
      }
      // Fallback: première image trouvée
      for (const section of art.sections) {
        if (section.image) return section.image
        if (section.images && section.images.length > 0) return section.images[0]
      }
      return null
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ''
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    }

    const sectionSpacing = (current, previous) => {
      // Tight after hero
      if (previous && previous.type === 'main-page') return 'h-16 md:h-24'
      // More space before full-width images
      if (current.type === 'full-image' || current.type === 'double-image') return 'h-24 md:h-40'
      // Default
      return 'h-20 md:h-32'
    }

    const scrollToContent = () => {
      const content = document.querySelector('.secondPart')
      if (content) {
        content.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    onMounted(() => {
      fetchTags()
      fetchArticle()
    })

    // Re-fetch when navigating between articles
    watch(() => route.params.id, (newId, oldId) => {
      if (newId && newId !== oldId) {
        loading.value = true
        article.value = null
        fetchArticle()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })

    return {
      article,
      loading,
      allTags,
      hasMainPageSection,
      getTagName,
      getArticleCoverImage,
      formatDate,
      sectionSpacing,
      scrollToContent,
    }
  },
}
</script>

<style scoped></style>
