<template>
  <div class="blog-page h-auto w-full bg-white flex flex-col items-center">
    <!-- Loading State -->
    <div v-if="isLoading" class="h-[60vh] w-full flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--bg-1)]"></div>
    </div>

    <template v-else>
      <!-- Header Section -->
      <div class="h-[35vh] md:h-[55vh] w-[93%] flex flex-col justify-end">
        <!-- Title -->
        <div class="h-[60%] 2xl:h-[50%] w-full flex flex-col justify-end items-center">
          <h2
            class="font-bold text-[var(--bg-1)] tracking-[5px] md:tracking-[7px] text-[22px] md:text-[40px] text-center"
            data-aos="fade-up"
          >
            NOTRE BLOG
          </h2>
          <p
            class="text-center text-[15px] sm:text-[18px] md:text-[18px] text-gray-600 max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Découvrez nos articles, conseils et actualités sur l'architecture, le design d'intérieur
            et l'immobilier.
          </p>
        </div>
        <!-- Tags Filter -->
        <div class="h-[30%] 2xl:h-[40%] w-full flex flex-col justify-center items-center">
          <div class="tags-container flex flex-wrap justify-center gap-[2%] w-full md:w-[90%]">
            <button
              v-for="tag in allTags"
              :key="tag._id"
              @click="toggleTag(tag._id)"
              :class="[
                'tag-btn h-[5vh] 2xl:h-[3vh] rounded-full flex items-center justify-center text-[12px] md:text-[14px] transition-all duration-300 hover:scale-105',
                selectedTags.includes(tag._id)
                  ? 'bg-[var(--bg-1)] text-white font-bold'
                  : 'bg-gray-100 text-gray-600 hover:bg-[var(--second-orange)] hover:text-[var(--bg-1)]',
              ]"
              style="padding: 0 2%"
            >
              {{ tag.Tags }}
            </button>
            <button
              v-if="selectedTags.length > 0"
              @click="clearTags"
              class="tag-btn h-[5vh] 2xl:h-[3vh] rounded-full flex items-center justify-center text-[12px] md:text-[14px] bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
              style="padding: 0 4%"
            >
              <span class="material-symbols-outlined text-[16px]">close</span>
              Effacer
            </button>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div class="h-[5vh] w-[93%] flex items-center justify-between">
        <p class="text-gray-500 text-[14px]">{{ filteredArticles.length }} article(s) trouvé(s)</p>
      </div>

      <!-- Blog Grid -->
      <div class="blog-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[1%] md:gap-[3%] w-[93%] h-auto">
        <article
          v-for="(article, index) in filteredArticles"
          :key="article._id"
          class="blog-card h-[55vh] md:h-[60vh] w-full flex flex-col cursor-pointer"
          @click="navigateToArticle(article._id)"
          @mouseenter="showCustomCursor"
          @mouseleave="hideCustomCursor"
          @mousemove="updateCursorPosition"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- Image -->
          <div class="h-[60%] overflow-hidden rounded-lg relative">
            <img
              v-if="getArticleCoverImage(article)"
              :src="getArticleCoverImage(article)"
              :alt="article.title"
              class="h-full w-full object-cover transition-transform duration-500"
            />
            <div v-else class="h-full w-full bg-gray-200 flex items-center justify-center">
              <span class="material-symbols-outlined text-gray-400 text-4xl">article</span>
            </div>
            <!-- Date Badge -->
            <div
              class="absolute top-[5%] left-[3%] bg-white/90 text-[var(--bg-1)] h-[15%] flex items-center justify-center rounded-lg text-[12px] font-semibold"
              style="padding: 0 3%"
            >
              <span class="material-symbols-outlined text-[16px]" style="margin-right: 5px"
                >calendar_month</span
              >
              {{ formatDate(article.createdAt) }}
            </div>
          </div>
          <!-- Content -->
          <div class="h-[40%] flex flex-col justify-around" style="padding: 3% 0">
            <!-- Tags -->
            <div class="flex flex-wrap gap-[2%] h-[25%] items-center">
              <span
                v-for="tagId in article.tags"
                :key="tagId"
                class="text-[11px] md:text-[12px] bg-gray-100 text-[var(--bg-1)] rounded-full flex items-center justify-center h-[70%]"
                style="padding: 0 3%"
              >
                {{ getTagName(tagId) }}
              </span>
            </div>
            <!-- Title -->
            <h3
              class="article-title text-[16px] md:text-[18px] lg:text-[20px] font-bold text-[var(--bg-1)] leading-tight h-[45%] flex items-center"
            >
              {{ article.title }}
            </h3>
            <!-- Read More -->
            <div class="h-[25%] flex items-center">
              <span
                class="read text-gray-400 text-[14px] font-semibold flex items-center gap-[5px] read-more-link"
              >
                Lire l'article
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredArticles.length === 0"
        class="h-[40vh] w-[93%] flex flex-col justify-center items-center"
      >
        <span class="material-symbols-outlined text-[80px] text-gray-300">article</span>
        <p class="text-gray-500 text-[18px]" style="margin-top: 2vh">
          Aucun article trouvé pour ces filtres.
        </p>
        <button
          @click="clearTags"
          class="h-[6vh] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--second-orange)] hover:text-[var(--bg-1)] transition-all duration-300 font-semibold"
          style="margin-top: 2vh; padding: 0 5%"
        >
          Voir tous les articles
        </button>
      </div>

      <!-- Load More -->
      <div
        v-if="filteredArticles.length > 0 && hasMoreArticles"
        class="h-[20vh] md:h-[25vh] w-[93%] flex items-end justify-center"
      >
        <button
          @click="loadMore"
          :disabled="isLoadingMore"
          class="h-[6vh] border-2 border-[var(--bg-1)] text-[var(--bg-1)] rounded-lg hover:bg-[var(--bg-1)] hover:text-white transition-all duration-300 font-semibold tracking-[3px] text-[14px] disabled:opacity-50"
          style="padding: 0 5%"
        >
          {{ isLoadingMore ? 'CHARGEMENT...' : 'VOIR PLUS D\'ARTICLES' }}
        </button>
      </div>

      <!-- Spacer if no load more -->
      <div v-else class="h-[15vh] w-full"></div>

      <!-- Services Section -->
      <div class="h-[50vh] md:h-screen w-[93%]">
        <ServicesComponent />
      </div>

      <!-- Footer -->
      <div
        class="footerPart relative h-[85vh] bg-[var(--bg-1)] w-full flex justify-center items-center border-[var(--bg-2)] border-t-4"
      >
        <FooterComponent />
      </div>
    </template>

    <!-- Curseur personnalisé -->
    <div
      ref="customCursor"
      class="custom-cursor"
      :class="{ active: cursorActive }"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    >
      Lire
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ServicesComponent from '@/components/ui/ServicesComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'

export default {
  name: 'BlogPublicView',
  components: {
    ServicesComponent,
    FooterComponent,
  },
  setup() {
    const router = useRouter()
    const API_BASE = '/api/v1'

    const isLoading = ref(true)
    const isLoadingMore = ref(false)
    const cursorActive = ref(false)
    const cursorX = ref(0)
    const cursorY = ref(0)
    const selectedTags = ref([])

    // Data from API
    const allTags = ref([])
    const articles = ref([])
    const currentPage = ref(1)
    const totalPages = ref(1)

    const hasMoreArticles = computed(() => currentPage.value < totalPages.value)

    // Fetch tags
    const fetchTags = async () => {
      try {
        const response = await fetch(`${API_BASE}/tags?perPage=100`)
        if (response.ok) {
          const data = await response.json()
          allTags.value = data.data || data.docs || []
        }
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }

    // Fetch articles
    const fetchArticles = async (page = 1, append = false) => {
      try {
        const response = await fetch(`${API_BASE}/article?perPage=12&page=${page}&status=true`)
        if (response.ok) {
          const data = await response.json()
          const newArticles = data.data || data.docs || []
          if (append) {
            articles.value = [...articles.value, ...newArticles]
          } else {
            articles.value = newArticles
          }
          currentPage.value = data.page || page
          totalPages.value = data.totalPages || 1
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    // Initial load
    const loadData = async () => {
      isLoading.value = true
      await Promise.all([fetchTags(), fetchArticles(1)])
      isLoading.value = false
    }

    // Load more articles
    const loadMore = async () => {
      if (isLoadingMore.value || !hasMoreArticles.value) return
      isLoadingMore.value = true
      await fetchArticles(currentPage.value + 1, true)
      isLoadingMore.value = false
    }

    // Filtrer les articles selon les tags sélectionnés
    const filteredArticles = computed(() => {
      if (selectedTags.value.length === 0) {
        return articles.value
      }
      return articles.value.filter((article) =>
        article.tags && article.tags.some((tagId) => {
          const id = typeof tagId === 'object' ? tagId._id : tagId
          return selectedTags.value.includes(id)
        })
      )
    })

    // Toggle un tag
    const toggleTag = (tagId) => {
      const index = selectedTags.value.indexOf(tagId)
      if (index === -1) {
        selectedTags.value.push(tagId)
      } else {
        selectedTags.value.splice(index, 1)
      }
    }

    // Effacer tous les tags
    const clearTags = () => {
      selectedTags.value = []
    }

    // Obtenir le nom d'un tag par son ID
    const getTagName = (tagId) => {
      const id = typeof tagId === 'object' ? tagId._id : tagId
      const tag = allTags.value.find((t) => t._id === id)
      return tag ? tag.Tags : ''
    }

    // Récupérer l'image de couverture depuis les sections
    const getArticleCoverImage = (article) => {
      if (!article.sections || article.sections.length === 0) return null
      const mainPage = article.sections.find((s) => s.type === 'main-page')
      if (mainPage && mainPage.images && mainPage.images.length > 0) {
        return mainPage.images[0]
      }
      // Fallback: première image trouvée
      for (const section of article.sections) {
        if (section.image) return section.image
        if (section.images && section.images.length > 0) return section.images[0]
      }
      return null
    }

    // Formater la date
    const formatDate = (dateString) => {
      if (!dateString) return '-'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '-'
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }

    // Navigation vers un article
    const navigateToArticle = (articleId) => {
      router.push({ name: 'blog-article', params: { id: articleId } })
    }

    // Curseur personnalisé
    const showCustomCursor = () => {
      cursorActive.value = true
      document.body.style.cursor = 'none'
    }

    const hideCustomCursor = () => {
      cursorActive.value = false
      document.body.style.cursor = 'auto'
    }

    const updateCursorPosition = (e) => {
      cursorX.value = e.clientX
      cursorY.value = e.clientY
    }

    onMounted(() => {
      loadData()
    })

    return {
      isLoading,
      isLoadingMore,
      allTags,
      articles,
      filteredArticles,
      selectedTags,
      hasMoreArticles,
      cursorActive,
      cursorX,
      cursorY,
      toggleTag,
      clearTags,
      getTagName,
      getArticleCoverImage,
      formatDate,
      navigateToArticle,
      loadMore,
      showCustomCursor,
      hideCustomCursor,
      updateCursorPosition,
    }
  },
}
</script>

<style scoped>
/* Blog Card Styles */
.blog-card {
  cursor: none;
}

.blog-card img {
  transition: transform 0.5s ease;
}

.blog-card:hover img {
  transform: scale(1.1);
}

.article-title {
  transition: color 0.3s ease;
}

.blog-card:hover .article-title {
  color: var(--second-orange);
}

.blog-card:hover .read {
  color: var(--second-orange);
}

.read-more-link {
  transition: all 0.3s ease;
}

.blog-card:hover .read-more-link {
  gap: 10px;
}

/* Tags Button */
.tag-btn {
  white-space: nowrap;
}

/* Custom Cursor */
.custom-cursor {
  position: fixed;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--bg-2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 9999;
}

.custom-cursor.active {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tags-container {
    gap: 2vw;
  }

  .tag-btn {
    height: 4vh;
    font-size: 11px;
  }
}
</style>
