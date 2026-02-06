<template>
  <div class="relative bg-white w-screen h-auto flex flex-col items-center">
    <div
      class="header relative bg-red-300 h-[110vh] w-[93%] md:h-[150vh] flex flex-col items-center gap-10"
    >
      <nav
        class="bg-green-300 h-[25vh] md:h-[30vh] w-full pt-[20vh] md:pt-[25vh] flex justify-center"
      >
        <ul
          class="flex items-center h-auto gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar text-gray-500 bg-white"
        >
          <li class="">
            <router-link to="" class="px-2 py-2 text-center hover:text-black"
              >CE QUE NOUS FAISONS</router-link
            >
          </li>
          <li class="">
            <router-link to="" class="px-2 py-2 text-center hover:text-black"
              >LE PROCESS</router-link
            >
          </li>
          <li class="">
            <router-link to="" class="px-2 py-2 text-center hover:text-black"
              >SERVICES & FRAIS</router-link
            >
          </li>
        </ul>
      </nav>
      <div
        class="h-[70vh] md:h-[100vh] w-full flex flex-col items-center justify-around text-center bg-white"
      >
        <h2
          class="text-xl tracking-wide md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[var(--bg-1)]"
        >
          CONCEPTION ARCHITECTURALE
        </h2>
        <div class="h-[50vh] md:h-[70vh] md:w-[39%]">
          <img src="@/assets/pictures/L.jpg" alt="" class="object-cover h-full w-full" />
        </div>
      </div>
    </div>
    <div
      class="relative h-[350vh] w-full md:h-[650vh] bg-purple-200 flex flex-col justify-around items-center md:justify-start border-b-[1px] border-[var(--vt-c-text-dark-2)]"
    >
      <div
        class="h-[20%] md:h-[25%] w-[93%] flex flex-col justify-between md:justify-around md:flex-row items-center bg-blue-300"
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
      <div class="h-[10%] md:h-[20%] w-[93%] flex flex-col justify-center">
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
        class="h-[20%] md:h-[25%] w-[93%] flex flex-col justify-between md:justify-around md:flex-row items-center bg-blue-300"
      >
        <div
          class="h-full md:h-[80%] w-full flex flex-col justify-around md:justify-around md:flex-row items-center md:items-start"
        >
          <h3
            class="md:w-[40%] text-[var(--bg-1)] md:tracking-wide text-lg md:text-xl lg:text-2xl font-bold"
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
        class="h-[20%] md:h-[25%] w-[93%] flex flex-col justify-between md:justify-center md:flex-row md:items-end bg-blue-300"
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
  </div>
</template>
<script>
import ProjectsComponent from '@/components/ui/ProjectsComponent.vue'

export default {
  name: 'ArchiDesignView',
  components: {
    ProjectsComponent,
  },
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
