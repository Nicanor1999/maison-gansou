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
              >CE QUE NOUS FAISONS</a
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
          CONCEPTION ARCHITECTURALE
        </h2>
        <div class="h-[50vh] md:h-[90vh] md:w-[50%]">
          <img src="@/assets/pictures/L.jpg" alt="" class="object-cover h-full w-full" />
        </div>
        <h2
          class="hidden md:block sticky bottom-20 text-xl tracking-wide md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[var(--bg-1)]"
        >
          CONCEPTION ARCHITECTURALE
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
            CE QUE NOUS FAISONS
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
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
            <!-- <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button> -->
          </div>
        </div>
      </div>
      <div class="h-[10%] md:h-[20%] w-[93%] flex flex-col justify-center md:justify-start">
        <div class="h-full md:h-[80%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/L.jpg" alt="" class="h-[100%] md:w-[50%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Open Plan Living, London
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
            NOS SERVICES DE CONCEPTION ARCHITECTURALE
          </h3>
          <div
            class="md:w-[40%] text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Nous proposons un service complet de conception architecturale, entièrement adapté à
              chaque client et à chaque projet. De l’étude de faisabilité initiale et des démarches
              administratives jusqu’à la conception technique et à la réalisation de plans
              d’exécution détaillés, nous vous accompagnons à chaque étape pour garantir un projet
              maîtrisé et parfaitement abouti.
            </p>
            <br />
            <p class="pb-4">Nos principaux domaines d’expertise comprennent :</p>
            <div>
              - Extensions et rénovations résidentielles, pensées pour valoriser durablement votre
              habitat
            </div>
            <div>
              - Reconfiguration de maisons de caractère, alliant respect du patrimoine et confort
              contemporain
            </div>
            <div>- Aménagements de combles et de sous-sols, pour optimiser chaque mètre carré</div>
            <div>
              - Conception de constructions neuves contemporaines, aux lignes élégantes et
              fonctionnelles
            </div>
            <div>
              - Solutions de design durables et évolutives, conçues pour répondre aux enjeux de
              demain
            </div>

            <!-- <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button> -->
          </div>
        </div>
      </div>
      <div class="h-[10%] md:h-[25%] w-[93%] flex flex-col items-center">
        <img src="@/assets/pictures/L.jpg" alt="" class="h-full w-full" />
        <div class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide">
          Open Plan Living, London
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
            NOTRE APPROCHE
          </h3>
          <div
            class="md:w-[40%] text-justify md:text-left text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]"
          >
            <p>
              Notre équipe de design adopte une approche créative et engagée, travaillant en étroite
              collaboration avec chaque client pour révéler tout le potentiel de son projet. Grâce à
              des concepts innovants et sur mesure, nous transformons les espaces de vie avec
              précision, en parfaite harmonie avec le lieu, les attentes et le budget.
            </p>
            <br />
            <p class="">
              Grâce à notre service de construction intégré, chaque projet est conçu en tenant
              compte des réalités du chantier dès l’origine. Nous proposons ainsi des designs
              inspirants, techniquement réalisables et financièrement maîtrisés, alliant créativité,
              performance et pragmatisme.
            </p>
            <br />
            <p class="">
              Nous travaillons en étroite collaboration avec nos clients afin de valider toutes les
              décisions clés en amont des travaux. Grâce à une spécification détaillée et chiffrée,
              nous assurons une maîtrise budgétaire optimale, avec une marge de contingence
              généralement limitée à 5 %, pour un projet mené en toute transparence et sérénité.
            </p>
            <!-- <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button> -->
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
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  RIBA 1 – Cahier des charges et Étude de Conception
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              La première étape consiste à bien comprendre vos objectifs. Nous prenons en compte vos
              besoins afin de concevoir une solution adaptée à votre budget. Après une première
              visite sur place, nous établissons une proposition détaillée d'honoraires de
              conception et un devis pour la consultation initiale. Sur votre demande, nous
              réalisons un relevé topographique complet de la propriété.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >RIBA Etape 0 & 1<span class="text-gray-600"> (2 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  RIBA 2 – Développement du Concept
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Cette phase de conception est un processus collaboratif et agréable où nous
              travaillons avec vous pour définir l'agencement optimal répondant à vos besoins. Nous
              proposons un service complet de dessin CAO architectural, complété par des
              visualisations 3D, allant de l'esquisse de base aux images de synthèse détaillées,
              afin de vous aider à visualiser pleinement le projet proposé.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >RIBA Etape 2<span class="text-gray-600"> (4-6 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  RIBA 3 – Planification et Conception dévelopée
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Après validation du concept, nous gérons les autorisations administratives avec un
              taux de réussite de plus de 97 %, puis coordonnons l’ensemble des intervenants
              techniques afin d’assurer une conception fluide, collaborative.Nous assurons la
              centralisation et l’intégration de toutes les études techniques, garantissant ainsi un
              projet parfaitement maîtrisé.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >RIBA Etape 3<span class="text-gray-600"> (10 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-[60vh] bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  RIBA 4 – Conception Technique
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              La coordination du design est au cœur de la phase de pré-construction. Nous préparons
              un dossier technique complet, intégrant l’ensemble des études spécialisées, afin de
              valider tous les choix en amont et d’optimiser coûts et délais. Une fois finalisé, le
              dossier de consultation est transmis pour chiffrage définitif.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              >RIBA Etape 4<span class="text-gray-600"> (6-8 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  CONCEPTION - Accord de Mitoyenneté
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Dans la plupart des cas, les travaux de structure nécessiteront un accord de
              mitoyenneté. Nous vous recommanderons un géomètre-expert qui se chargera d'émettre les
              notifications nécessaires dès le début du processus. Ce processus pouvant être long à
              mettre en œuvre, nous recommandons généralement de l'entamer le plus tôt possible dans
              la phase de conception.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              ><span class="text-gray-600"> (10-12 semaines)</span></span
            >
          </div>
          <div class="h-[60vh] md:h-screen 2xl:h-50vh bg-white flex flex-col justify-between">
            <div class="h-[50%] w-full relative">
              <img class="h-full w-full object-cover" src="@/assets/pictures/E.jpg" alt="" />
              <div class="h-full w-full flex items-center justify-center absolute top-0 z-0">
                <div
                  class="h-[25%] w-[80%] rounded-[8px] bg-white opacity-70 flex items-center justify-center text-[var(--font-color)] text-center text-xl sm:text-xl md:text-xl xl:text-2xl"
                >
                  CONCEPTION – Design D'intérieur
                </div>
              </div>
            </div>
            <p class="text-justify text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px]">
              Lorsqu’un projet représente un investissement important, le choix des finitions est
              essentiel. Nous proposons un service de design d’intérieur complet ou à l’heure,
              parfaitement intégré à notre démarche architecturale, afin de vous accompagner dans la
              sélection des matériaux, équipements sanitaires, palettes de couleurs, luminaires et
              finitions, pour un résultat cohérent et maîtrisé.
            </p>
            <span class="italic text-[var(--bg-1)] font-bold"
              ><span class="text-gray-600">(8-12 semaines)</span></span
            >
          </div>
        </div>
      </div>
      <div class="h-[35vh] md:h-screen w-full flex flex-col justify-center">
        <div class="h-full md:h-[95%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/L.jpg" alt="" class="h-[100%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Open Plan Living, London
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
              - Découvrez les demeures les plus prestigieuses et les zones protégées de Cotonou.
            </p>
            <br />
            <p class="">- Service intégré : architecture, aménagement intérieur, construction</p>
            <br />
            <p class="">
              - Des solutions sur mesure qui respectent le patrimoine tout en embrassant la vie
              moderne
            </p>
            <!-- <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button> -->
          </div>
        </div>
      </div>
      <div class="h-[35vh] md:h-screen w-full flex flex-col justify-start">
        <div class="h-[80%] w-full flex flex-col items-center">
          <img src="@/assets/pictures/L.jpg" alt="" class="h-[100%] w-full" />
          <div
            class="text-[15px] sm:text-[20px] md:text-[25px] lg:text-[18px] pt-4 md:tracking-wide"
          >
            Open Plan Living, London
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
              Nos honoraires de conception sont extrêmement compétitifs au regard du service que
              nous offrons. Nous ne pratiquons ni frais cachés ni formules de rémunération complexes
              et opaques basées sur un pourcentage. Notre processus, jusqu'à l'appel d'offres, se
              déroule en trois étapes définies, chacune reposant sur des livrables précis et le plan
              de travail RIBA. Ainsi, nos clients connaissent l'intégralité de nos honoraires dès le
              départ et ne s'engagent que pour chaque étape.
            </p>
            <br />
            <p class="">
              Lorsque Zulufish est engagé pour entreprendre la construction, tous les frais de
              gestion de projet ultérieurs sont inclus dans le prix de la construction, ce qui fait
              de la formule conception-construction un choix très rentable par rapport au modèle
              traditionnel architecte/entrepreneur.
            </p>
            <br />
            <button
              class="bg-transparent border border-[var(--second-orange)] rounded-[8px] text-[var(--second-orange)] p-2 hover:bg-[var(--second-orange)] hover:text-white transition-colors duration-300"
            >
              En savoir plus
            </button>
            <p class="pt-6">→ Prendre rendez-vous pour une consultation</p>
            <p class="">→ Découvrez nos projets</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="thirdPart relative border-[1px] border-[var(--vt-c-text-dark-2)] bg-[var(--bg-3)] h-[40vh] md:h-screen w-screen flex justify-center"
    >
      <div class="h-full w-[93%] flex items-center">
        <ProjectsComponent title="Projets Phares" />
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

export default {
  name: 'ArchiDesignView',
  components: {
    ProjectsComponent,
    ServicesComponent,
    FooterComponent,
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
