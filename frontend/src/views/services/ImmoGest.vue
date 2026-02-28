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
              >NOS SERVICES</a
            >
          </li>
          <li class="">
            <a href="#processSection" class="px-2 py-2 text-center hover:text-[var(--bg-2)] cursor-pointer"
              @click.prevent="scrollToSection('processSection')"
              >NOTRE APPROCHE</a
            >
          </li>
          <li class="">
            <a href="#servicesSection" class="px-2 py-2 text-center hover:text-[var(--bg-2)] cursor-pointer"
              @click.prevent="scrollToSection('servicesSection')"
              >TARIFICATION</a
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
          GESTION IMMOBILIÈRE
        </h2>
        <div class="h-[50vh] md:h-[90vh] md:w-[50%]">
          <img src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" class="object-cover h-full w-full" />
        </div>
        <h2
          class="hidden md:block sticky bottom-20 text-xl tracking-wide md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[var(--bg-1)]"
        >
          GESTION IMMOBILIÈRE
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
            NOS SERVICES
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Notre service de gestion immobilière offre une prise en charge complète de vos
              biens, qu'il s'agisse de propriétés résidentielles, commerciales ou de portefeuilles
              d'investissement. Nous assurons la valorisation et la rentabilité optimale de vos
              actifs immobiliers.
            </p>
            <br />
            <p class="pb-4">
              Forts de notre expertise en architecture et en construction, nous apportons une
              vision globale unique à la gestion de votre patrimoine. Nous anticipons les besoins
              d'entretien, optimisons les performances énergétiques et veillons à la préservation
              de la valeur de vos biens sur le long terme.
            </p>
          </div>
        </div>
      </div>
      <div class="h-[10%] md:h-[20%] w-[93%] flex flex-col justify-center md:justify-start">
        <div class="h-full md:h-[80%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" class="h-[100%] md:w-[50%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Résidence Gérée, Cotonou
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
            GESTION LOCATIVE COMPLÈTE
          </h3>
          <div
            class="md:w-[40%] text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Nous prenons en charge l'intégralité de la gestion locative de vos biens, vous
              libérant de toutes les contraintes administratives et techniques. Notre équipe
              dédiée assure un suivi rigoureux et une communication transparente.
            </p>
            <br />
            <p class="pb-4">Nos services de gestion locative comprennent :</p>
            <div>
              - Recherche et sélection rigoureuse des locataires
            </div>
            <div>
              - Rédaction des baux et états des lieux
            </div>
            <div>- Encaissement des loyers et relances</div>
            <div>
              - Gestion des charges et régularisations
            </div>
            <div>
              - Coordination de l'entretien courant et des réparations
            </div>
          </div>
        </div>
      </div>
      <div class="h-[10%] md:h-[25%] w-[93%] flex flex-col items-center">
        <img src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" class="h-full w-full" />
        <div class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide">
          Immeuble de Rapport, Porto-Novo
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
            VALORISATION PATRIMONIALE
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Au-delà de la gestion courante, nous vous accompagnons dans la valorisation de
              votre patrimoine immobilier. Notre expertise en architecture nous permet d'identifier
              les opportunités d'amélioration et d'optimisation de vos biens.
            </p>
            <br />
            <p class="">
              Nous réalisons des audits techniques complets, proposons des plans de rénovation
              stratégiques et coordonnons les travaux d'amélioration. Chaque intervention vise
              à augmenter la valeur locative et patrimoniale de vos biens.
            </p>
            <br />
            <p class="">
              Notre connaissance approfondie du marché immobilier local nous permet de vous
              conseiller sur les meilleures stratégies d'investissement et de développement
              de votre portefeuille.
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
          NOTRE APPROCHE
        </h3>
        <div
          class="grid grid-rows-6 md:grid-rows-3 gap-20 md:gap-6 md:gap-y-30 md:grid-cols-2 h-auto w-full"
        >
          <div class="h-auto md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Audit Initial
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nous commençons par un audit complet de votre bien : état technique, conformité
              réglementaire, positionnement sur le marché locatif. Cette analyse approfondie
              nous permet d'établir une stratégie de gestion personnalisée et d'identifier
              les axes d'amélioration prioritaires.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Diagnostic<span class="text-gray-600"> (1-2 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Mise en Location
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Pour les biens vacants, nous assurons une mise en location rapide et efficace.
              Photos professionnelles, rédaction d'annonces attractives, diffusion multicanale,
              organisation des visites et sélection rigoureuse des candidats selon des critères
              de solvabilité stricts.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Commercialisation<span class="text-gray-600"> (2-4 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Gestion Administrative
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nous prenons en charge toute la gestion administrative : rédaction et renouvellement
              des baux, quittances de loyer, déclarations fiscales, gestion des assurances.
              Vous bénéficiez d'un espace propriétaire en ligne pour suivre vos biens en
              temps réel.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Administration<span class="text-gray-600"> (continu)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-[60vh] bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Maintenance Technique
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Notre équipe technique assure le suivi de l'entretien de vos biens. Interventions
              d'urgence, maintenance préventive, travaux de rénovation : nous coordonnons
              tous les prestataires et garantissons la qualité des interventions avec notre
              expertise en construction.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Technique<span class="text-gray-600"> (continu)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Suivi Financier
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Nous assurons un suivi financier rigoureux de vos biens : encaissement et
              reversement des loyers, gestion des charges, suivi des impayés et procédures
              de recouvrement si nécessaire. Des rapports mensuels détaillés vous tiennent
              informé de la performance de vos investissements.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Comptabilité<span class="text-gray-600"> (mensuel)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  Conseil Stratégique
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Au-delà de la gestion quotidienne, nous vous accompagnons dans vos réflexions
              stratégiques : opportunités d'acquisition, arbitrage de portefeuille, projets
              de rénovation ou de construction. Notre vision globale vous aide à prendre
              les meilleures décisions pour votre patrimoine.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >Conseil<span class="text-gray-600"> (sur demande)</span></span
            >
          </div>
        </div>
      </div>
      <div class="h-[35vh] md:h-screen w-full flex flex-col justify-center">
        <div class="h-full md:h-[95%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" class="h-[100%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Propriété sous Gestion, Cotonou
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
              - Une expertise unique combinant architecture et gestion immobilière
            </p>
            <br />
            <p class="">- Un suivi personnalisé et une communication transparente</p>
            <br />
            <p class="">
              - Une équipe technique intégrée pour l'entretien et la valorisation de vos biens
            </p>
          </div>
        </div>
      </div>
      <div class="h-[35vh] md:h-screen w-full flex flex-col justify-start">
        <div class="h-[80%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/I.jpg" alt="Gestion immobilière MAISON GANSOU" class="h-[100%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Programme Immobilier, Abomey-Calavi
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
            TARIFICATION
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Nos honoraires de gestion sont calculés en pourcentage des loyers encaissés,
              avec un taux dégressif selon la taille du portefeuille. Cette rémunération
              au résultat aligne nos intérêts avec les vôtres : optimiser la rentabilité
              de vos biens.
            </p>
            <br />
            <p class="">
              Les frais de mise en location sont facturés séparément et correspondent à
              un mois de loyer. Ce tarif inclut l'ensemble des prestations de commercialisation,
              la rédaction du bail et la réalisation de l'état des lieux d'entrée.
            </p>
            <br />
            <p class="">
              Pour les prestations de conseil et d'accompagnement dans vos projets d'investissement,
              nous établissons des devis personnalisés en fonction de la complexité de la mission.
              Contactez-nous pour discuter de vos besoins spécifiques.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="thirdPart relative border-[1px] border-[var(--vt-c-text-dark-2)] bg-[var(--bg-3)] h-[40vh] md:h-screen w-screen flex justify-center"
    >
      <div class="h-full w-[93%] flex items-center">
        <ProjectsComponent title="Biens Gérés" />
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
  name: 'ImmoGestView',
  components: {
    ProjectsComponent,
    ServicesComponent,
    FooterComponent,
  },
  setup() {
    useSeoMeta(seoConfigs.services.immoGest)
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
