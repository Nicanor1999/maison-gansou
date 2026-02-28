<template>
  <div class="h-[70%] w-full flex flex-col justify-around">
    <div class="w-full flex justify-between" data-aos="fade-up">
      <div class="text-black text-sm sm:text-base md:text-lg lg:text-xl font-bold">Articles Récents</div>
      <router-link to="/blog" class="text-black hover:text-[#F79315] cursor-pointer hover:underline underline-offset-1 text-sm sm:text-base md:text-lg lg:text-xl">Voir Tout→</router-link>
    </div>
    <div
      ref="scrollContainer"
      class="h-[80%] w-full flex gap-8 overflow-x-scroll hide-scrollbar"
      @mouseenter="pauseScroll"
      @mouseleave="resumeScroll"
    >
      <router-link
        v-for="(article, index) in displayedArticles"
        :key="`article-${index}`"
        :to="`/blog/${article.id}`"
        class="articleElement h-full w-[70%] sm:w-[35%] xl:w-[30%] flex-shrink-0 flex flex-col justify-around"
        data-aos="fade-left"
        :data-aos-delay="(index % 4) * 100"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
      >
        <div v-if="article.image" class="h-[80%] w-full overflow-hidden rounded-lg">
          <img class="h-full w-full object-cover" :src="article.image" :alt="article.title" loading="lazy" decoding="async" />
        </div>
        <div v-else class="h-[80%] w-full bg-gray-200 flex items-center justify-center rounded-lg">
          <span class="material-symbols-outlined text-gray-400 text-5xl">article</span>
        </div>
        <div class="text-center text-base sm:text-md md:text-xl line-clamp-2">{{ article.title }}</div>
      </router-link>
    </div>
    <!-- Curseur personnalisé -->
    <div
      ref="customCursor"
      class="custom-cursor"
      :class="{ 'active': cursorActive }"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    >
      Lire
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticlesComponent',
  data() {
    return {
      articles: [],
      scrollInterval: null,
      isPaused: false,
      cursorActive: false,
      cursorX: 0,
      cursorY: 0,
    }
  },
  computed: {
    displayedArticles() {
      if (this.articles.length === 0) return []
      // Dupliquer les articles pour créer un effet de boucle infinie
      return [...this.articles, ...this.articles]
    }
  },
  mounted() {
    this.fetchArticles()
  },
  beforeUnmount() {
    this.stopAutoScroll()
  },
  methods: {
    async fetchArticles() {
      try {
        const res = await fetch('/api/v1/article?perPage=10&status=true')
        if (res.ok) {
          const json = await res.json()
          const items = json.data || json
          this.articles = (Array.isArray(items) ? items : [])
            .filter(a => a.status) // Only published articles
            .map(a => ({
              id: a._id,
              title: a.title,
              image: this.getCoverImage(a)
            }))
          // Start auto-scroll after articles are loaded
          this.$nextTick(() => {
            this.startAutoScroll()
          })
        }
      } catch (err) {
        console.error('Error fetching articles:', err)
      }
    },
    getCoverImage(article) {
      // Get cover image from main-page section
      if (article.sections && article.sections.length > 0) {
        const mainPage = article.sections.find(s => s.type === 'main-page')
        if (mainPage && mainPage.images && mainPage.images.length > 0) {
          return mainPage.images[0]
        }
        // Fallback to first section with an image
        for (const section of article.sections) {
          if (section.image) return section.image
          if (section.images && section.images.length > 0) return section.images[0]
        }
      }
      return null
    },
    startAutoScroll() {
      if (this.articles.length === 0) return
      this.scrollInterval = setInterval(() => {
        if (!this.isPaused && this.$refs.scrollContainer) {
          const container = this.$refs.scrollContainer
          const scrollSpeed = 1 // pixels par frame

          container.scrollLeft += scrollSpeed

          // Réinitialiser le scroll quand on atteint la moitié (première série d'articles terminée)
          const maxScroll = container.scrollWidth / 2
          if (container.scrollLeft >= maxScroll) {
            container.scrollLeft = 0
          }
        }
      }, 20) // Update toutes les 20ms pour un scroll fluide
    },
    stopAutoScroll() {
      if (this.scrollInterval) {
        clearInterval(this.scrollInterval)
      }
    },
    pauseScroll() {
      this.isPaused = true
    },
    resumeScroll() {
      this.isPaused = false
    },
    showCustomCursor() {
      this.cursorActive = true
      document.body.style.cursor = 'none'
    },
    hideCustomCursor() {
      this.cursorActive = false
      document.body.style.cursor = 'auto'
    },
    updateCursorPosition(e) {
      this.cursorX = e.clientX
      this.cursorY = e.clientY
    }
  }
}
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE et Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.articleElement {
  text-decoration: none;
  color: inherit;
}

.articleElement img {
  transition: transform 0.3s ease;
}

.articleElement:hover img {
  transform: scale(1.1);
}

.articleElement > div:last-child {
  transition: color 0.3s ease;
}

.articleElement:hover > div:last-child {
  color: #F79315;
  font-weight: bold;
}

.articleElement {
  cursor: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-cursor {
  position: fixed;
  width: 80px;
  height: 80px;
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
</style>
