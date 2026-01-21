<template>
  <div class="blog-page min-h-screen w-full bg-white flex flex-col items-center">
    <!-- Header Section -->
    <div class="h-[35vh] md:h-[45vh] w-[93%] flex flex-col justify-end">
      <!-- Tags Filter -->
      <div class="h-[40%] w-full flex flex-col justify-center items-center">
        <div class="tags-container flex flex-wrap justify-center gap-[2%] w-full md:w-[80%]">
          <button
            v-for="tag in allTags"
            :key="tag.id"
            @click="toggleTag(tag.id)"
            :class="[
              'tag-btn h-[5vh] rounded-full flex items-center justify-center text-[12px] md:text-[14px] transition-all duration-300 hover:scale-105',
              selectedTags.includes(tag.id)
                ? 'bg-[var(--bg-1)] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-[var(--second-orange)] hover:text-[var(--bg-1)]',
            ]"
            style="padding: 0 4%;"
          >
            {{ tag.name }}
          </button>
          <button
            v-if="selectedTags.length > 0"
            @click="clearTags"
            class="tag-btn h-[5vh] rounded-full flex items-center justify-center text-[12px] md:text-[14px] bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
            style="padding: 0 4%;"
          >
            <span class="material-symbols-outlined text-[16px]">close</span>
            Effacer
          </button>
        </div>
      </div>
      <!-- Title -->
      <div class="h-[50%] w-full flex flex-col justify-center items-center">
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
    </div>

    <!-- Results Count -->
    <div class="h-[5vh] w-[93%] flex items-center justify-between">
      <p class="text-gray-500 text-[14px]">
        {{ filteredArticles.length }} article(s) trouvé(s)
      </p>
    </div>

    <!-- Blog Grid -->
    <div class="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3%] w-[93%] h-auto">
      <article
        v-for="(article, index) in filteredArticles"
        :key="article.id"
        class="blog-card h-[55vh] md:h-[60vh] w-full flex flex-col cursor-pointer"
        @click="navigateToArticle(article.id)"
        @mouseenter="showCustomCursor"
        @mouseleave="hideCustomCursor"
        @mousemove="updateCursorPosition"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <!-- Image -->
        <div class="h-[60%] overflow-hidden rounded-lg relative">
          <img
            :src="article.image"
            :alt="article.title"
            class="h-full w-full object-cover transition-transform duration-500"
          />
          <!-- Date Badge -->
          <div
            class="absolute top-[5%] left-[3%] bg-white/90 text-[var(--bg-1)] h-[15%] flex items-center justify-center rounded-lg text-[12px] font-semibold"
            style="padding: 0 3%;"
          >
            <span class="material-symbols-outlined text-[16px]" style="margin-right: 5px;">calendar_month</span>
            {{ formatDate(article.createdAt) }}
          </div>
        </div>
        <!-- Content -->
        <div class="h-[40%] flex flex-col justify-around" style="padding: 3% 0;">
          <!-- Tags -->
          <div class="flex flex-wrap gap-[2%] h-[25%] items-center">
            <span
              v-for="tagId in article.tags"
              :key="tagId"
              class="text-[11px] md:text-[12px] bg-[var(--second-orange)]/20 text-[var(--bg-1)] rounded-full flex items-center justify-center h-[70%]"
              style="padding: 0 3%;"
            >
              {{ getTagName(tagId) }}
            </span>
          </div>
          <!-- Title -->
          <h3 class="article-title text-[16px] md:text-[18px] lg:text-[20px] font-bold text-[var(--bg-1)] leading-tight h-[45%] flex items-center">
            {{ article.title }}
          </h3>
          <!-- Read More -->
          <div class="h-[25%] flex items-center">
            <span class="text-[var(--second-orange)] text-[14px] font-semibold flex items-center gap-[5px] read-more-link">
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
      <p class="text-gray-500 text-[18px]" style="margin-top: 2vh;">Aucun article trouvé pour ces filtres.</p>
      <button
        @click="clearTags"
        class="h-[6vh] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--second-orange)] hover:text-[var(--bg-1)] transition-all duration-300 font-semibold"
        style="margin-top: 2vh; padding: 0 5%;"
      >
        Voir tous les articles
      </button>
    </div>

    <!-- Load More -->
    <div
      v-if="filteredArticles.length > 0"
      class="h-[20vh] md:h-[25vh] w-[93%] flex items-center justify-center"
    >
      <button
        class="h-[6vh] border-2 border-[var(--bg-1)] text-[var(--bg-1)] rounded-lg hover:bg-[var(--bg-1)] hover:text-white transition-all duration-300 font-semibold tracking-[3px] text-[14px]"
        style="padding: 0 5%;"
      >
        VOIR PLUS D'ARTICLES
      </button>
    </div>

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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ServicesComponent from '@/components/ui/ServicesComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'
import imageA from '@/assets/pictures/A.jpg'
import imageB from '@/assets/pictures/B.jpg'
import imageC from '@/assets/pictures/C.jpg'
import imageD from '@/assets/pictures/D.jpg'
import imageE from '@/assets/pictures/E.jpg'
import imageF from '@/assets/pictures/F.jpg'
import imageG from '@/assets/pictures/G.jpg'
import imageH from '@/assets/pictures/H.jpg'
import imageI from '@/assets/pictures/I.jpg'

export default {
  name: 'BlogPublicView',
  components: {
    ServicesComponent,
    FooterComponent,
  },
  setup() {
    const router = useRouter()
    const cursorActive = ref(false)
    const cursorX = ref(0)
    const cursorY = ref(0)
    const selectedTags = ref([])

    // Liste des tags disponibles
    const allTags = ref([
      { id: 1, name: 'Architecture' },
      { id: 2, name: 'Design Intérieur' },
      { id: 3, name: 'Immobilier' },
      { id: 4, name: 'Conseils' },
      { id: 5, name: 'Tendances' },
      { id: 6, name: 'Rénovation' },
      { id: 7, name: 'Décoration' },
      { id: 8, name: 'Construction' },
    ])

    // Articles du blog
    const articles = ref([
      {
        id: 1,
        title: "Les tendances architecturales de 2026 : vers un design plus durable",
        image: imageA,
        tags: [1, 5],
        createdAt: '2026-01-15',
      },
      {
        id: 2,
        title: "Comment optimiser l'espace dans un petit appartement",
        image: imageB,
        tags: [2, 4, 7],
        createdAt: '2026-01-10',
      },
      {
        id: 3,
        title: "Investir dans l'immobilier à Cotonou : guide complet",
        image: imageC,
        tags: [3, 4],
        createdAt: '2026-01-05',
      },
      {
        id: 4,
        title: "Rénovation énergétique : par où commencer ?",
        image: imageD,
        tags: [6, 4, 8],
        createdAt: '2025-12-28',
      },
      {
        id: 5,
        title: "Les couleurs tendances pour votre intérieur en 2026",
        image: imageE,
        tags: [7, 5, 2],
        createdAt: '2025-12-20',
      },
      {
        id: 6,
        title: "Architecture moderne : intégrer le verre dans votre maison",
        image: imageF,
        tags: [1, 8],
        createdAt: '2025-12-15',
      },
      {
        id: 7,
        title: "Le minimalisme dans le design d'intérieur africain",
        image: imageG,
        tags: [2, 5, 7],
        createdAt: '2025-12-10',
      },
      {
        id: 8,
        title: "Construire sa maison au Bénin : les étapes clés",
        image: imageH,
        tags: [8, 3, 4],
        createdAt: '2025-12-05',
      },
      {
        id: 9,
        title: "Décoration : mélanger tradition et modernité",
        image: imageI,
        tags: [7, 2],
        createdAt: '2025-11-28',
      },
    ])

    // Filtrer les articles selon les tags sélectionnés
    const filteredArticles = computed(() => {
      if (selectedTags.value.length === 0) {
        return articles.value
      }
      return articles.value.filter((article) =>
        article.tags.some((tagId) => selectedTags.value.includes(tagId))
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
      const tag = allTags.value.find((t) => t.id === tagId)
      return tag ? tag.name : ''
    }

    // Formater la date
    const formatDate = (dateString) => {
      const date = new Date(dateString)
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

    return {
      allTags,
      articles,
      filteredArticles,
      selectedTags,
      cursorActive,
      cursorX,
      cursorY,
      toggleTag,
      clearTags,
      getTagName,
      formatDate,
      navigateToArticle,
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

