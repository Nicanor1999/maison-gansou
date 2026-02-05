<template>
  <div class="relative bg-white">
    <div
      class="header relative h-[130vh] w-screen md:h-[200vh] flex flex-col items-center justify-around border-b-[1px] border-[var(--vt-c-text-dark-2)]"
    >
      <nav class="h-[10vh] w-screen flex justify-center items-end pt-[20vh] md:pt-[25vh]">
        <ul
          class="flex h-auto w-full md:w-[70%] gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar text-gray-500"
        >
          <li class="min-w-max h-[4vh] flex items-center justify-center">
            <router-link
              to="/services/architectural-design"
              class="px-2 py-2 text-center hover:text-black"
              >CONCEPTION ARCHITECTURALE</router-link
            >
          </li>
          <li class="min-w-max h-[4vh] bg-white flex items-center justify-center">
            <router-link
              to="/services/interior-design"
              class="px-2 py-2 text-center hover:text-black"
              >DECORATION TEXTILE</router-link
            >
          </li>
          <li class="min-w-max h-[4vh] bg-white flex items-center justify-center">
            <router-link to="/services/design-build" class="px-2 py-2 text-center hover:text-black"
              >CONCEPTION ET CONSTRUCTION</router-link
            >
          </li>
          <li class="min-w-max h-[4vh] bg-white flex items-center justify-center">
            <router-link to="/services/immo-gest" class="px-2 py-2 text-center hover:text-black"
              >GESTION IMMOBILIERE</router-link
            >
          </li>
        </ul>
      </nav>
      <div
        class="h-[15%] md:h-[10%] md:w-[45%] text-center bg-white flex items-center text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
      >
        Nous offrons une gamme complète de services en architecture et en design d’intérieur,
        complétée par une solution clé en main pour un accompagnement sans contrainte. Faites
        défiler la page pour découvrir une vue d’ensemble de nos prestations, ou utilisez les
        onglets ci-dessus pour accéder à des informations détaillées sur chaque service.
      </div>
      <div class="h-[50%] w-full bg-white flex items-center justify-center">
        <CarouselComponent :images="carouselImages" class="h-[90%] w-[50%] md:w-[50%]" />
      </div>
    </div>
    <div
      class="relative h-[180vh] w-full md:h-[350vh] flex flex-col justify-around items-center md:justify-end border-b-[1px] border-[var(--vt-c-text-dark-2)]"
    >
      <div
        class="h-[40%] w-[93%] flex flex-col justify-between md:justify-around md:flex-row items-center"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-between md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide md:text-xl lg:text-2xl font-bold"
          >
            CONCEPTION ARCHITECTURALE
          </h3>
          <div
            class="md:w-[40%] text-center md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Sous la direction de Saeadeh Birjandi, architecte agréée RIBA III et ARB, notre équipe
              de conception architecturale crée des espaces de vie exceptionnels, au design soigné
              et à l'agencement méticuleux, conçus pour répondre au mieux aux exigences de la vie
              contemporaine. Nous personnalisons chaque projet en fonction de votre style et de
              votre budget, tout en mettant en valeur votre personnalité, vos goûts et votre sens
              esthétique.
            </p>
            <br />
            <p class="pb-4">
              Nous excellons dans la conception de maisons d'exception, chaque projet nous offrant
              l'opportunité de créer un lieu original et spectaculaire. Si cela implique
              inévitablement une coordination minutieuse et complexe, nous avons mis au point un
              processus simple et convivial. Nous utilisons une approche par étapes, basée sur les
              normes RIBA et jalonnée de jalons clés et concrets, permettant à nos clients de
              s'impliquer pleinement dans le processus de conception et d'en profiter pleinement.
            </p>
            <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
      <div class="h-[40%] md:h-[60%] w-[93%] flex flex-col justify-between">
        <div class="h-[40%] md:h-[55%]">
          <img src="@/assets/pictures/L.jpg" alt="" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Open Plan Living, London
          </div>
        </div>
        <div class="h-[60%] md:h-[35%] flex items-end md:items-center">
          <ProjectsComponent />
        </div>
      </div>
    </div>
    <div
      class="relative h-[180vh] w-full md:h-[350vh] flex flex-col justify-around items-center md:justify-end border-b-[1px] border-[var(--vt-c-text-dark-2)]"
    >
      <div
        class="h-[40%] w-[93%] flex flex-col justify-between md:justify-around md:flex-row items-center"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-between md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide md:text-xl lg:text-2xl font-bold"
          >
            ARCHITECTURE D'INTÉRIEUR
          </h3>
          <div
            class="md:w-[40%] text-center md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              S’appuyant sur l’expertise de Caroline Milns en design textile et sur sa maîtrise
              pointue des palettes de couleurs, notre équipe de design d’intérieur conçoit des
              espaces sur mesure, sophistiqués et richement texturés, insufflant vie, couleur et âme
              à nos réalisations primées.
            </p>
            <br />
            <p class="pb-4">
              Animés par le goût de la simplicité et le sens de l’harmonie, nos concepts allient
              originalité et authenticité, soigneusement pensées tout en restant naturellement
              inspirantes. Nous croyons profondément au pouvoir du design de qualité et à son impact
              positif sur le quotidien, en favorisant le calme, le bien-être et une touche de
              créativité ludique.
            </p>
            <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
      <div class="h-[40%] md:h-[60%] w-[93%] flex flex-col justify-between">
        <div class="h-[40%] md:h-[55%]">
          <img src="@/assets/pictures/L.jpg" alt="" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Open Plan Living, London
          </div>
        </div>
        <div class="h-[60%] md:h-[35%] flex items-end md:items-center">
          <ProjectsComponent />
        </div>
      </div>
    </div>
    <div
      class="relative h-[180vh] w-full md:h-[350vh] flex flex-col justify-around items-center md:justify-end border-b-[1px] border-[var(--vt-c-text-dark-2)]"
    >
      <div
        class="h-[40%] w-[93%] flex flex-col justify-between md:justify-around md:flex-row items-center"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-between md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide md:text-xl lg:text-2xl font-bold"
          >
            GESTION IMMOBILIÈRE
          </h3>
          <div
            class="md:w-[40%] text-center md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Sous la direction de Saeadeh Birjandi, architecte agréée RIBA III et ARB, notre équipe
              de conception architecturale crée des espaces de vie exceptionnels, au design soigné
              et à l'agencement méticuleux, conçus pour répondre au mieux aux exigences de la vie
              contemporaine. Nous personnalisons chaque projet en fonction de votre style et de
              votre budget, tout en mettant en valeur votre personnalité, vos goûts et votre sens
              esthétique.
            </p>
            <br />
            <p class="pb-4">
              Nous excellons dans la conception de maisons d'exception, chaque projet nous offrant
              l'opportunité de créer un lieu original et spectaculaire. Si cela implique
              inévitablement une coordination minutieuse et complexe, nous avons mis au point un
              processus simple et convivial. Nous utilisons une approche par étapes, basée sur les
              normes RIBA et jalonnée de jalons clés et concrets, permettant à nos clients de
              s'impliquer pleinement dans le processus de conception et d'en profiter pleinement.
            </p>
            <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
      <div class="h-[40%] md:h-[60%] w-[93%] flex flex-col justify-between">
        <div class="h-[40%] md:h-[55%]">
          <img src="@/assets/pictures/L.jpg" alt="" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Open Plan Living, London
          </div>
        </div>
        <div class="h-[60%] md:h-[35%] flex items-end md:items-center">
          <ProjectsComponent />
        </div>
      </div>
    </div>
    <div
      class="relative h-[180vh] w-full md:h-[350vh] flex flex-col justify-around items-center md:justify-end border-b-[1px] border-[var(--vt-c-text-dark-2)]"
    >
      <div
        class="h-[40%] w-[93%] flex flex-col justify-between md:justify-around md:flex-row items-center"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-between md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide md:text-xl lg:text-2xl font-bold"
          >
            CONCEPTION ET CONSTRUCTION
          </h3>
          <div
            class="md:w-[40%] text-center md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Le Design & Build est au cœur de la philosophie de Zulufish. Depuis 2005, nous faisons
              évoluer et perfectionnons continuellement notre approche afin d’offrir des solutions
              toujours plus abouties. Grâce à une équipe pluridisciplinaire réunissant des
              expertises pointues en architecture, design d’intérieur et construction, nous
              proposons un accompagnement complet, de la conception à la livraison finale, sans
              compromis sur la qualité.
            </p>
            <br />
            <p class="pb-4">
              Notre service principal de conception et réalisation architecturale peut être enrichi
              par des prestations complémentaires, telles que le design d’intérieur et la menuiserie
              sur mesure, conçue et fabriquée au Royaume-Uni par notre société sœur HUX London. Nous
              intégrons également l’ensemble des intervenants spécialisés — notamment l’audiovisuel
              et le vitrage structurel — afin de vous offrir une solution clé en main, avec un
              interlocuteur unique et une responsabilité centralisée à chaque étape du projet.
            </p>
            <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
      <div class="h-[40%] md:h-[60%] w-[93%] flex flex-col justify-between">
        <div class="h-[40%] md:h-[55%]">
          <img src="@/assets/pictures/L.jpg" alt="" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Open Plan Living, London
          </div>
        </div>
        <div class="h-[60%] md:h-[35%] flex items-end md:items-center">
          <ProjectsComponent />
        </div>
      </div>
    </div>
    <div
      class="footerPart relative h-[85vh] bg-[var(--bg-1)] w-screen flex justify-center items-center border-[var(--bg-2)] border-t-4"
    >
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import ProjectsComponent from '@/components/ui/ProjectsComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'
import CarouselComponent from '@/components/ui/CarouselComponent.vue'

export default {
  name: 'HomeServicesView',
  components: {
    ProjectsComponent,
    FooterComponent,
    CarouselComponent,
  },
  data() {
    return {
      carouselImages: [
        new URL('@/assets/pictures/A.jpg', import.meta.url).href,
        new URL('@/assets/pictures/B.jpg', import.meta.url).href,
        new URL('@/assets/pictures/C.jpg', import.meta.url).href,
      ],
    }
  },
}
</script>
<style scoped>
@media (min-width: 768px) {
  .hide-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE et Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari et Opera */
  }
}
@media (min-width: 1536px) {
  .hide-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE et Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari et Opera */
  }
}
</style>
