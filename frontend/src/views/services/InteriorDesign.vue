<template>
  <div class="relative bg-white w-screen h-auto flex flex-col items-center">
    <div class="header relative h-[110vh] w-[93%] md:h-[150vh] flex flex-col items-center gap-10">
      <nav class="h-[25vh] md:h-[30vh] w-full pt-[20vh] md:pt-[25vh] flex justify-center">
        <ul
          class="flex items-center h-auto gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar text-gray-500 bg-white"
        >
          <li class="">
            <a href="#firstSection" class="px-2 py-2 text-center hover:text-[var(--bg-2)] cursor-pointer"
              @click.prevent="scrollToSection('firstSection')"
              >NOTRE VISION</a
            >
          </li>
          <li class="">
            <a href="#processSection" class="px-2 py-2 text-center hover:text-[var(--bg-2)] cursor-pointer"
              @click.prevent="scrollToSection('processSection')"
              >LE PROCESSUS</a
            >
          </li>
          <li class="">
            <a href="#servicesSection" class="px-2 py-2 text-center hover:text-[var(--bg-2)] cursor-pointer"
              @click.prevent="scrollToSection('servicesSection')"
              >SERVICES & FRAIS</a
            >
          </li>
        </ul>
      </nav>
      <div
        class="h-[70vh] md:h-[200vh] w-full relative flex flex-col items-center justify-around text-center bg-white"
      >
        <h2
          class="text-xl tracking-wide md:hidden md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[var(--bg-1)]"
        >
          ARCHITECTURE D'INTÉRIEUR
        </h2>
        <div class="h-[50vh] md:h-[90vh] md:w-[50%]">
          <img src="@/assets/pictures/H.jpg" alt="Architecture d'intérieur MAISON GANSOU" class="object-cover h-full w-full" />
        </div>
        <h2
          class="hidden md:block sticky bottom-20 text-xl tracking-wide md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[var(--bg-1)]"
        >
          ARCHITECTURE D'INTÉRIEUR
        </h2>
      </div>
    </div>
    <div
      id="firstSection"
      class="relative h-[350vh] w-full md:h-[650vh] flex flex-col justify-around items-center md:justify-start border-b-[1px] border-[var(--vt-c-text-dark-2)]"
    >
      <div
        class="h-[20%] md:h-[25%] w-[93%] flex flex-col justify-between md:justify-around md:flex-row items-center"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-around md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide text-lg md:text-xl lg:text-2xl font-bold"
          >
            NOTRE VISION
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Notre équipe de design d'intérieur conçoit des espaces sur mesure, sophistiqués et
              richement texturés, insufflant vie, couleur et âme à chaque réalisation. Nous créons
              des intérieurs qui racontent votre histoire et reflètent votre personnalité unique.
            </p>
            <br />
            <p class="pb-4">
              Animés par le goût de la simplicité et le sens de l'harmonie, nos concepts allient
              originalité et authenticité, soigneusement pensés tout en restant naturellement
              inspirants. Nous croyons profondément au pouvoir du design de qualité et à son
              impact positif sur le quotidien.
            </p>
          </div>
        </div>
      </div>
      <div class="h-[10%] md:h-[20%] w-[93%] flex flex-col justify-center md:justify-start">
        <div class="h-full md:h-[80%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/G.jpg" alt="Architecture d'intérieur MAISON GANSOU" class="h-[100%] md:w-[50%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Salon Contemporain, Cotonou
          </div>
        </div>
      </div>
      <div
        class="h-[20%] md:h-[25%] w-[93%] flex flex-col justify-between md:justify-around md:flex-row items-center"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-around md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide text-lg md:text-xl lg:text-2xl font-bold text-center md:text-left"
          >
            NOS SERVICES DE DESIGN D'INTÉRIEUR
          </h3>
          <div
            class="md:w-[40%] text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Nous proposons un service complet de design d'intérieur, de la conception initiale
              à la réalisation finale. Notre approche holistique intègre architecture, mobilier,
              textiles, éclairage et accessoires pour créer des espaces cohérents et harmonieux.
            </p>
            <br />
            <p class="pb-4">Nos domaines d'expertise comprennent :</p>
            <div>
              - Conception d'espaces résidentiels : salons, chambres, cuisines et salles de bains
            </div>
            <div>
              - Sélection et coordination des palettes de couleurs et matériaux
            </div>
            <div>- Design textile : rideaux, coussins, tapis et revêtements sur mesure</div>
            <div>
              - Mobilier personnalisé et sélection de pièces design
            </div>
            <div>
              - Conception d'éclairage et mise en scène lumineuse
            </div>
          </div>
        </div>
      </div>
      <div class="h-[10%] md:h-[25%] w-[93%] flex flex-col items-center">
        <img src="@/assets/pictures/H.jpg" alt="Architecture d'intérieur MAISON GANSOU" class="h-full w-full" />
        <div class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide">
          Suite Parentale, Porto-Novo
        </div>
      </div>
      <div
        class="h-[20%] md:h-[25%] w-[93%] flex flex-col justify-between md:justify-center md:flex-row md:items-end"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-around md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide text-lg md:text-xl lg:text-2xl font-bold"
          >
            L'ART DU TEXTILE
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Le textile est au cœur de notre approche du design d'intérieur. Les tissus apportent
              chaleur, texture et personnalité à chaque espace. Nous travaillons avec les meilleurs
              fabricants pour vous proposer des tissus d'exception, du lin naturel aux soies
              précieuses.
            </p>
            <br />
            <p class="">
              Nos créations textiles sont conçues sur mesure : rideaux élégants, coussins aux
              motifs uniques, têtes de lit capitonnées, et bien plus encore. Chaque pièce est
              réalisée par des artisans qualifiés pour garantir une finition impeccable.
            </p>
            <br />
            <p class="">
              Nous accordons une attention particulière aux détails : choix des passementeries,
              qualité des confections, harmonie des textures. C'est cette exigence qui fait la
              différence et transforme un intérieur ordinaire en un espace d'exception.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      id="processSection"
      class="relative h-auto w-[93%] border-b-[1px] border-[var(--vt-c-text-dark-2)] flex flex-col items-center gap-30"
    >
      <div class="h-auto w-full md:w-[80%] flex flex-col">
        <h3
          class="pb-10 pt-10 md:w-[40%] text-[var(--bg-1)] md:tracking-wide text-lg md:text-xl lg:text-2xl font-bold"
        >
          LE PROCESSUS
        </h3>
        <div
          class="grid grid-rows-6 md:grid-rows-3 gap-20 md:gap-6 md:gap-y-30 md:grid-cols-2 h-auto w-full"
        >
          <div class="h-auto md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Architecture d'intérieur MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 1 – Consultation et Analyse
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Notre première rencontre est consacrée à la découverte de votre univers : vos goûts,
              votre mode de vie, vos inspirations. Nous analysons l'espace existant, ses atouts
              et ses contraintes, pour définir ensemble les orientations du projet et établir
              un brief créatif détaillé.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Consultation<span class="text-gray-600"> (1-2 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Architecture d'intérieur MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 2 – Concept et Moodboard
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nous développons un concept créatif unique, présenté sous forme de moodboards
              visuels. Ces planches d'ambiance rassemblent couleurs, matières, mobilier et
              références pour vous permettre de visualiser l'atmosphère du projet. C'est le
              moment où votre intérieur prend forme.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Concept<span class="text-gray-600"> (2-3 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Architecture d'intérieur MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 3 – Plans et Visualisations
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Après validation du concept, nous réalisons les plans d'aménagement détaillés et
              les visualisations 3D photoréalistes. Ces documents vous permettent de vous projeter
              dans votre futur intérieur et de valider chaque détail avant la phase de réalisation.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Design<span class="text-gray-600"> (3-4 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-[60vh] bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Architecture d'intérieur MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 4 – Sélection et Sourcing
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nous sélectionnons avec soin chaque élément du projet : mobilier, textiles,
              luminaires, accessoires. Notre réseau de fournisseurs nous permet d'accéder
              aux meilleures pièces, qu'il s'agisse d'éditions limitées ou de créations
              sur mesure.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Sourcing<span class="text-gray-600"> (2-4 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Architecture d'intérieur MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 5 – Réalisation et Installation
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nous coordonnons l'ensemble des artisans et fournisseurs pour la réalisation
              du projet. Peinture, pose de revêtements, confection textile, installation du
              mobilier : chaque intervention est suivie avec rigueur pour garantir une
              exécution parfaite.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Installation<span class="text-gray-600"> (variable selon projet)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/G.jpg" alt="Architecture d'intérieur MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 6 – Styling Final
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              La touche finale qui fait toute la différence : mise en place des accessoires,
              arrangement des coussins et plaids, disposition des objets décoratifs. C'est
              le moment où votre intérieur prend vie et révèle toute sa personnalité.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Styling<span class="text-gray-600"> (1 semaine)</span></span
            >
          </div>
        </div>
      </div>
      <div class="h-[35vh] md:h-screen w-full flex flex-col justify-center">
        <div class="h-full md:h-[95%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/H.jpg" alt="Architecture d'intérieur MAISON GANSOU" class="h-[100%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Détails Textiles, Cotonou
          </div>
        </div>
      </div>
      <div
        class="h-[35vh] md:h-[60vh] w-screen flex flex-col justify-between md:justify-center md:flex-row md:items-end bg-[var(--bg-1)]"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-around md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-2)] md:tracking-wide text-lg md:text-xl lg:text-2xl font-bold"
          >
            POURQUOI CHOISIR MAISON GANSOU?
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] text-white"
          >
            <p>
              - Une expertise pointue en design textile et palettes de couleurs
            </p>
            <br />
            <p class="">- Des créations sur mesure réalisées par des artisans qualifiés</p>
            <br />
            <p class="">
              - Un accompagnement personnalisé de la conception à l'installation finale
            </p>
          </div>
        </div>
      </div>
      <div class="h-[35vh] md:h-screen w-full flex flex-col justify-start">
        <div class="h-[80%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/G.jpg" alt="Architecture d'intérieur MAISON GANSOU" class="h-[100%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Espace de Vie, Abomey-Calavi
          </div>
        </div>
      </div>
    </div>
    <div
      id="servicesSection"
     class="relative h-auto w-[93%] flex flex-col items-center">
      <div
        class="h-[80vh] md:h-[120vh] w-full flex flex-col justify-between md:justify-center md:flex-row md:items-center"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-around md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide text-lg md:text-xl lg:text-2xl font-bold"
          >
            SERVICES ET FRAIS
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Nous proposons différentes formules adaptées à l'envergure de votre projet et à
              vos besoins. Du conseil ponctuel à la prise en charge complète de votre intérieur,
              nous avons une solution pour vous.
            </p>
            <br />
            <p class="">
              Notre service de consultation permet d'obtenir des conseils personnalisés sur une
              pièce ou un aspect spécifique de votre intérieur. Pour les projets plus ambitieux,
              notre formule complète inclut la conception, le sourcing et la coordination de
              l'ensemble des travaux.
            </p>
            <br />
            <p class="">
              Nos honoraires sont calculés en fonction de la surface à aménager et de la
              complexité du projet. Un devis détaillé vous est remis après la première
              consultation, sans engagement. Transparence et qualité sont nos maîtres-mots.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="thirdPart relative border-[1px] border-[var(--vt-c-text-dark-2)] bg-[var(--bg-3)] h-[40vh] md:h-screen w-screen flex justify-center"
    >
      <div class="h-full w-[93%] flex items-center">
        <ProjectsComponent title="Nos Créations" />
      </div>
    </div>
    <div class="h-[50vh] md:h-screen w-[93%] flex items-center">
      <ServicesComponent />
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
import ServicesComponent from '@/components/ui/ServicesComponent.vue'
import FooterComponent from '@/components/views/public/FooterComponent.vue'
import { useSeoMeta, seoConfigs } from '@/composables/useSeoMeta'

export default {
  name: 'InteriorDesignView',
  components: {
    ProjectsComponent,
    ServicesComponent,
    FooterComponent,
  },
  setup() {
    useSeoMeta(seoConfigs.services.interiorDesign)
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>
<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE et Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari et Opera */
}
</style>
