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
              >NOTRE APPROCHE</a
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
          CONCEPTION ET CONSTRUCTION
        </h2>
        <div class="h-[50vh] md:h-[90vh] md:w-[50%]">
          <img src="@/assets/pictures/L.jpg" alt="Conception et construction MAISON GANSOU" class="object-cover h-full w-full" />
        </div>
        <h2
          class="hidden md:block sticky bottom-20 text-xl tracking-wide md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[var(--bg-1)]"
        >
          CONCEPTION ET CONSTRUCTION
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
            NOTRE APPROCHE
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Le Design & Build est au cœur de la philosophie de Maison Gansou. Nous proposons une
              solution clé en main qui intègre la conception architecturale et la réalisation des
              travaux au sein d'une même équipe. Cette approche garantit une cohérence parfaite
              entre le projet imaginé et le résultat final, tout en optimisant les délais et les coûts.
            </p>
            <br />
            <p class="pb-4">
              Notre équipe pluridisciplinaire réunit architectes, ingénieurs et artisans qualifiés,
              travaillant ensemble dès la phase de conception. Cette synergie nous permet d'anticiper
              les contraintes techniques et de proposer des solutions créatives, réalisables et
              économiquement viables.
            </p>
          </div>
        </div>
      </div>
      <div class="h-[10%] md:h-[20%] w-[93%] flex flex-col justify-center md:justify-start">
        <div class="h-full md:h-[80%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/L.jpg" alt="Conception et construction MAISON GANSOU" class="h-[100%] md:w-[50%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Villa Moderne, Cotonou
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
            NOS SERVICES DE CONCEPTION-CONSTRUCTION
          </h3>
          <div
            class="md:w-[40%] text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Nous proposons un service intégré de conception et construction, adapté à chaque
              projet, qu'il s'agisse d'une construction neuve, d'une rénovation complète ou
              d'une extension. Notre approche garantit un interlocuteur unique tout au long
              du projet.
            </p>
            <br />
            <p class="pb-4">Nos principaux domaines d'intervention comprennent :</p>
            <div>
              - Construction de maisons individuelles et résidences, de la fondation à la finition
            </div>
            <div>
              - Rénovations complètes avec restructuration et mise aux normes
            </div>
            <div>- Extensions et surélévations intégrées à l'existant</div>
            <div>
              - Projets commerciaux et tertiaires clé en main
            </div>
            <div>
              - Coordination de tous les corps de métiers et suivi de chantier rigoureux
            </div>
          </div>
        </div>
      </div>
      <div class="h-[10%] md:h-[25%] w-[93%] flex flex-col items-center">
        <img src="@/assets/pictures/L.jpg" alt="Conception et construction MAISON GANSOU" class="h-full w-full" />
        <div class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide">
          Résidence Familiale, Porto-Novo
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
            AVANTAGES DU DESIGN & BUILD
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              En confiant la conception et la construction à une seule équipe, vous bénéficiez
              d'une communication fluide, d'une responsabilité unique et d'une maîtrise optimale
              des coûts. Les décisions sont prises rapidement et les ajustements intégrés sans
              friction.
            </p>
            <br />
            <p class="">
              Notre connaissance approfondie des réalités du terrain nous permet de concevoir
              des projets réalistes, techniquement aboutis et adaptés aux contraintes locales.
              Chaque détail est pensé pour faciliter la construction et garantir un résultat
              à la hauteur de vos attentes.
            </p>
            <br />
            <p class="">
              Grâce à notre approche intégrée, nous réduisons les délais de réalisation tout
              en maintenant un niveau de qualité exceptionnel. Vous êtes informé à chaque
              étape et gardez le contrôle total sur votre projet.
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
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="Conception et construction MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 1 – Consultation Initiale
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nous commençons par une rencontre approfondie pour comprendre vos besoins, votre
              vision et votre budget. Une visite du site nous permet d'évaluer les contraintes
              et les opportunités. Nous établissons ensuite une proposition détaillée incluant
              le calendrier prévisionnel et l'estimation budgétaire.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Consultation<span class="text-gray-600"> (1-2 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="Conception et construction MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 2 – Conception et Planification
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Notre équipe de conception développe les plans architecturaux en collaboration
              étroite avec vous. Nous intégrons dès cette phase les considérations techniques
              et constructives. Les visualisations 3D vous permettent de vous projeter dans
              votre futur espace avant le début des travaux.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Conception<span class="text-gray-600"> (4-8 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="Conception et construction MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 3 – Autorisations Administratives
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nous prenons en charge l'ensemble des démarches administratives : permis de
              construire, déclarations préalables, conformité aux règlements d'urbanisme.
              Notre expérience nous permet d'optimiser ces délais et de garantir la conformité
              de votre projet.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Autorisations<span class="text-gray-600"> (6-10 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-[60vh] bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="Conception et construction MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 4 – Préparation du Chantier
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Avant le démarrage des travaux, nous finalisons tous les détails techniques :
              sélection des matériaux, planification des interventions, coordination des
              équipes. Un calendrier détaillé est établi avec des jalons clairs pour un
              suivi optimal.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Préparation<span class="text-gray-600"> (2-4 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="Conception et construction MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 5 – Construction
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nos équipes de construction prennent le relais avec un suivi quotidien du
              chantier. Vous êtes régulièrement informé de l'avancement et pouvez visiter
              le site à tout moment. Notre chef de projet assure la coordination de tous
              les corps de métiers.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Construction<span class="text-gray-600"> (variable selon projet)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="Conception et construction MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Étape 6 – Livraison et Garantie
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              À l'achèvement des travaux, nous procédons à une inspection complète avec vous.
              Tous les détails sont vérifiés avant la remise des clés. Nous assurons un
              service après-vente réactif et une garantie sur l'ensemble de nos réalisations
              pour votre tranquillité d'esprit.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Livraison<span class="text-gray-600"> (1-2 semaines)</span></span
            >
          </div>
        </div>
      </div>
      <div class="h-[35vh] md:h-screen w-full flex flex-col justify-center">
        <div class="h-full md:h-[95%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/L.jpg" alt="Conception et construction MAISON GANSOU" class="h-[100%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Chantier en cours, Cotonou
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
              - Un interlocuteur unique de la conception à la livraison
            </p>
            <br />
            <p class="">- Maîtrise des coûts et des délais garantie par contrat</p>
            <br />
            <p class="">
              - Une équipe expérimentée combinant créativité architecturale et expertise technique
            </p>
          </div>
        </div>
      </div>
      <div class="h-[35vh] md:h-screen w-full flex flex-col justify-start">
        <div class="h-[80%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/L.jpg" alt="Conception et construction MAISON GANSOU" class="h-[100%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Projet Achevé, Abomey-Calavi
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
              Notre formule Design & Build offre un excellent rapport qualité-prix. En regroupant
              conception et construction, nous éliminons les intermédiaires et optimisons chaque
              étape du projet. Nos devis sont détaillés, transparents et sans surprise.
            </p>
            <br />
            <p class="">
              Nous proposons différentes formules adaptées à vos besoins : du package complet
              clé en main à des interventions ciblées sur certaines phases du projet. Chaque
              proposition est personnalisée en fonction de la complexité et de l'envergure
              de votre projet.
            </p>
            <br />
            <p class="">
              Un acompte initial permet de démarrer la phase de conception. Le solde est
              échelonné selon l'avancement des travaux, avec des paiements liés à des
              étapes clairement définies. Cette approche vous assure un contrôle total
              sur votre investissement.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="thirdPart relative border-[1px] border-[var(--vt-c-text-dark-2)] bg-[var(--bg-3)] h-[40vh] md:h-screen w-screen flex justify-center"
    >
      <div class="h-full w-[93%] flex items-center">
        <ProjectsComponent title="Nos Réalisations" />
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
  name: 'DesignBuildView',
  components: {
    ProjectsComponent,
    ServicesComponent,
    FooterComponent,
  },
  setup() {
    useSeoMeta(seoConfigs.services.designBuild)
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
