<template>
  <div class="relative w-full h-auto flex flex-col items-center gap-20">
    <div class="firstPart relative h-screen w-screen overflow-hidden bg-[var(--bg-hidden)]">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        :class="{
          'opacity-100 z-10': index === currentImageIndex,
          'opacity-0 z-0': index !== currentImageIndex,
        }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div class="absolute inset-0 bg-black/30 z-20"></div>
      <div class="absolute inset-0 z-30 flex items-center justify-center px-4 md:px-8 lg:px-12">
        <div
          class="max-w-6xl h-[25%] md:h-[25%] lg:h-[25%] xl:h-[40%] 2xl:h-[35%] w-full text-center text-white flex flex-col justify-around"
        >
          <p
            class="text-[1.5rem] md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-light italic mb-6 md:mb-4 lg:mb-5 drop-shadow-lg text-gray-100"
          >
            Modern House, Porto-Novo
          </p>
          <div class="mt-6 md:mt-10 lg:mt-12" data-aos="flip-up" data-aos-duration="3000">
            <button
              @click="scrollToSecondPart"
              class="inline-block text-[var(--bg-1)] bg-[var(--second-orange)] px-2 py-1 md:px-6 md:py-2 lg:px-6 lg:py-3 xl:px-4 xl:py-2 rounded-lg text-[12px] md:text-lg lg:text-xl xl:text-[15px] hover:bg-yellow-400 hover:text-white hover:font-bold transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
            >
              Voir Plus
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="secondPart relative h-auto w-[93%] overflow-hidden flex flex-col md:flex-row md:justify-around"
    >
      <div class="h-auto md:w-[50%]"
      data-aos="fade-right"
      >
        <p class="pt-6 text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
          A detached Victorian villa with a basement office, wine cellar, utility room;
          kitchen-diner leading to the garden, sitting room and WC on the ground floor, with five
          bedrooms (two en-suite), family bathroom and a reading room on the upper levels.
        </p>
        <p class="pt-6 text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
          The designer and property developer owners of this London abode, wanted to create a home
          that maximised space and light, with a separate office space for their business in the
          basement.
        </p>
      </div>
      <div
        class="h-[60vh] w-full md:h-[80vh] md:w-[30%] pt-8 pb-8 md:p-0 flex flex-col justify-around"
      >
        <div class="h-auto w-full"
        data-aos="flip-up"
        >
          <h2>SERVICE</h2>
          <ul class="text-[var(--vt-c-text-dark-2)]">
            <li>Conception Architecturale</li>
            <li>Architecture d'Intérieur</li>
            <li>Conception et Construction</li>
            <li>Gestion d'Actifs Immobiliers</li>
          </ul>
        </div>
        <div class="h-auto w-full"
        data-aos="flip-up"
        >
          <h2>TYPE DE TRAVAUX</h2>
          <ul class="text-[var(--vt-c-text-dark-2)]">
            <li>Rénovation Complète</li>
            <li>Aménagement Intérieur</li>
            <li>Construction Neuve</li>
          </ul>
        </div>
        <div class="h-auto w-full"
        data-aos="flip-up"
        >
          <h2>EMPLACEMENT</h2>
          <!-- <ul>
            <li>Rénovation Complète</li>
            <li>Aménagement Intérieur</li>
            <li>Construction Neuve</li>
          </ul> -->
        </div>
        <div class="h-auto w-full"
        data-aos="flip-up"
        >
          <h2>PARTENAIRES</h2>
          <ul class="text-[var(--vt-c-text-dark-2)]">
            <li>G-Tech</li>
          </ul>
        </div>
      </div>
    </div>
    <FullPictureComponent :image="imageK" alt="Project Image" />
    <PictureTextComponent
      :image="imageK"
      title="Un design qui inspire"
      text="Chaque espace de cette maison a été conçu pour maximiser la lumière naturelle et créer une atmosphère accueillante. Les matériaux modernes et les lignes épurées se combinent pour offrir un design élégant et fonctionnel."
      alt="Design Intérieur"
    />
    <TextComponent
      text="Ce projet de maison moderne à Porto-Novo incarne l'harmonie entre esthétique contemporaine et fonctionnalité. Conçue pour répondre aux besoins d'une vie moderne, cette résidence offre des espaces ouverts, une intégration fluide avec l'environnement extérieur, et des finitions de haute qualité. Chaque détail a été soigneusement pensé pour créer un cadre de vie confortable et inspirant."
    />
    <FullPictureComponent :image="imageK" alt="Project Image" />
    <DoublePicturesComponent
      :leftImage="imageK"
      :rightImage="imageK"
      leftAlt="Vue Extérieure"
      rightAlt="Espace de Vie"
    />
    <TextComponent
      text="Si ce projet résidentiel vous plaît et que vous souhaitez en savoir plus sur la manière dont nous pouvons vous aider, contactez-nous !"
    />
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import imageJ from '@/assets/pictures/J.jpg'
import imageK from '@/assets/pictures/K.jpg'
import FullPictureComponent from '@/components/ui/FullPictureComponent.vue'
import PictureTextComponent from '@/components/ui/PictureTextComponent.vue'
import TextComponent from '@/components/ui/TextComponent.vue'
import DoublePicturesComponent from '@/components/ui/DoublePicturesComponent.vue'
import ProjectsComponent from '@/components/ui/ProjectsComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'

export default {
  name: 'ProjectsSelected',
  components: {
    FullPictureComponent,
    PictureTextComponent,
    TextComponent,
    DoublePicturesComponent,
    ProjectsComponent,
    FooterComponent,
  },
  setup() {
    const route = useRoute()
    const currentImageIndex = ref(0)

    // Exemple d'images - à remplacer par vos vraies images
    const images = ref([imageJ, imageJ, imageJ])

    // Exemple de services - à adapter selon vos besoins
    const services = ref([
      { title: 'Projet Moderne' },
      { title: 'Design Élégant' },
      { title: 'Architecture Unique' },
    ])

    let intervalId = null

    onMounted(() => {
      // Rotation automatique des images toutes les 5 secondes
      intervalId = setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
      }, 5000)
    })

    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    })

    const scrollToSecondPart = () => {
      const element = document.getElementById('secondPart')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    return {
      images,
      currentImageIndex,
      services,
      projectId: route.params.id,
      scrollToSecondPart,
      imageK,
    }
  },
}
</script>
<style scoped></style>
