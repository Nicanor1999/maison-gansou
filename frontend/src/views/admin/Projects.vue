<template>
  <div class="projects-admin">
    <!-- Header -->
    <div class="h-[8vh] min-h-[60px] flex flex-wrap items-center justify-between gap-[1vw]">
      <h2 class="text-xl font-semibold text-gray-800">Gestion des Projets</h2>
      <button
        v-if="!showEditor"
        @click="openProjectEditor()"
        class="h-[5vh] min-h-[40px] w-[12%] min-w-[160px] bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg hover:bg-[var(--second-orange)]/90 transition-colors flex items-center justify-center font-medium"
      >
        <span class="material-symbols-outlined mr-[0.5vw]">add</span>
        Nouveau Projet
      </button>
    </div>

    <!-- Projects List View -->
    <div v-if="!showEditor" class="space-y-[2vh]">
      <!-- Search & Filters -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="h-[8vh] min-h-[60px] flex flex-wrap gap-[1vw] items-center w-[95%] mx-auto">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher un projet..."
            class="flex-1 min-w-[15vw] h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
          />
          <select
            v-model="serviceFilter"
            class="h-[5vh] min-h-[40px] w-[12vw] min-w-[150px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
          >
            <option value="">Tous les services</option>
            <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
          </select>
          <select
            v-model="statusFilter"
            class="h-[5vh] min-h-[40px] w-[10vw] min-w-[130px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
          </select>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2vw]">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
        >
          <div class="h-[22vh] min-h-[180px] bg-gray-200 relative overflow-hidden">
            <img
              v-if="project.coverImage"
              :src="project.coverImage"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="material-symbols-outlined text-gray-400 text-4xl">architecture</span>
            </div>
            <span
              :class="[
                'absolute top-[1vh] right-[1vw] text-xs font-medium rounded-full',
                project.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              ]"
            >
              {{ project.published ? 'Publié' : 'Brouillon' }}
            </span>
          </div>
          <div class="h-[18vh] min-h-[140px] w-[90%] mx-auto flex flex-col justify-around">
            <div class="flex flex-wrap gap-[0.5vw]">
              <span
                v-for="serviceId in project.services"
                :key="serviceId"
                class="text-xs bg-purple-100 text-purple-600 rounded-full"
              >
                {{ getServiceName(serviceId) }}
              </span>
            </div>
            <h3 class="font-semibold text-lg text-gray-800 line-clamp-1">{{ project.title }}</h3>
            <p class="text-sm text-gray-500">{{ project.location }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-400">{{ formatDate(project.createdAt) }}</span>
              <div class="flex gap-[0.5vw]">
                <button
                  @click="openProjectEditor(project)"
                  class="h-[4vh] min-h-[32px] w-[4vh] min-w-[32px] flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Modifier"
                >
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button
                  @click="deleteProject(project)"
                  class="h-[4vh] min-h-[32px] w-[4vh] min-w-[32px] flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg"
                  title="Supprimer"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredProjects.length === 0" class="h-[25vh] min-h-[200px] flex flex-col items-center justify-center text-gray-400">
        <span class="material-symbols-outlined text-5xl mb-[1vh]">architecture</span>
        <p>Aucun projet trouvé</p>
      </div>
    </div>

    <!-- Project Editor -->
    <div v-if="showEditor" class="space-y-[2vh]">
      <div class="h-[6vh] min-h-[50px] flex items-center justify-between">
        <button
          @click="closeEditor"
          class="flex items-center text-gray-600 hover:text-gray-800"
        >
          <span class="material-symbols-outlined mr-[0.5vw]">arrow_back</span>
          Retour aux projets
        </button>
        <div class="flex gap-[1vw]">
          <button
            @click="togglePreview"
            :class="[
              'h-[5vh] min-h-[40px] w-[10%] min-w-[100px] rounded-lg flex items-center justify-center transition-colors',
              showPreview ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
            ]"
          >
            <span class="material-symbols-outlined mr-[0.5vw]">{{ showPreview ? 'edit' : 'visibility' }}</span>
            {{ showPreview ? 'Éditer' : 'Aperçu' }}
          </button>
          <button
            @click="saveProject(false)"
            class="h-[5vh] min-h-[40px] w-[15%] min-w-[150px] bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Enregistrer brouillon
          </button>
          <button
            @click="saveProject(true)"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90"
          >
            Publier
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[2vw]">
        <!-- Editor Panel -->
        <div v-show="!showPreview || isLargeScreen" class="space-y-[2vh]">
          <!-- Project Info -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="h-[8vh] min-h-[60px] flex items-center border-b border-gray-100 w-[90%] mx-auto">
              <h3 class="text-lg font-semibold">Informations du projet</h3>
            </div>
            <div class="w-[90%] mx-auto space-y-[2vh] py-[2vh]">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Titre du projet</label>
                <input
                  type="text"
                  v-model="projectForm.title"
                  class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
                  placeholder="Ex: Modern House, Porto-Novo"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Emplacement</label>
                <input
                  type="text"
                  v-model="projectForm.location"
                  class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
                  placeholder="Ex: Porto-Novo, Bénin"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Services</label>
                <div class="flex flex-wrap gap-[0.5vw]">
                  <button
                    v-for="service in services"
                    :key="service.id"
                    @click="toggleService(service.id)"
                    :class="[
                      'h-[4vh] min-h-[32px] rounded-full text-sm transition-colors px-[1vw]',
                      projectForm.services.includes(service.id)
                        ? 'bg-[var(--bg-1)] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ]"
                  >
                    {{ service.name }}
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-[1vw]">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Type de travaux</label>
                  <input
                    type="text"
                    v-model="projectForm.workType"
                    class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
                    placeholder="Ex: Rénovation Complète"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Partenaires</label>
                  <input
                    type="text"
                    v-model="projectForm.partners"
                    class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
                    placeholder="Ex: G-Tech"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Sections Builder -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="h-[8vh] min-h-[60px] flex items-center justify-between w-[90%] mx-auto border-b border-gray-100">
              <h3 class="text-lg font-semibold">Contenu du projet</h3>
              <div class="relative">
                <button
                  @click="showSectionMenu = !showSectionMenu"
                  class="h-[5vh] min-h-[40px] w-[12vw] min-w-[150px] bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg flex items-center justify-center font-medium"
                >
                  <span class="material-symbols-outlined mr-[0.5vw]">add</span>
                  Ajouter une section
                </button>
                <div
                  v-if="showSectionMenu"
                  class="absolute right-0 mt-[1vh] w-[16vw] min-w-[250px] bg-white rounded-lg shadow-lg border z-10"
                >
                  <button
                    v-for="option in sectionOptions"
                    :key="option.type"
                    @click="addSection(option.type)"
                    class="w-full h-[8vh] min-h-[60px] text-left hover:bg-gray-50 flex items-center px-[1vw]"
                  >
                    <span class="material-symbols-outlined mr-[1vw] text-gray-500">{{ option.icon }}</span>
                    <div>
                      <p class="font-medium text-gray-800">{{ option.label }}</p>
                      <p class="text-xs text-gray-500">{{ option.description }}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Sections List -->
            <div class="w-[90%] mx-auto space-y-[2vh] py-[2vh]">
              <div
                v-for="(section, index) in projectForm.sections"
                :key="section.id"
                class="border border-gray-200 rounded-lg"
              >
                <div class="h-[6vh] min-h-[48px] flex items-center justify-between w-[95%] mx-auto">
                  <span class="text-sm font-medium text-gray-500">{{ getSectionLabel(section.type) }}</span>
                  <div class="flex gap-[0.5vw]">
                    <button
                      v-if="index > 0"
                      @click="moveSection(index, -1)"
                      class="h-[4vh] min-h-[32px] w-[4vh] min-w-[32px] flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
                      <span class="material-symbols-outlined text-sm">arrow_upward</span>
                    </button>
                    <button
                      v-if="index < projectForm.sections.length - 1"
                      @click="moveSection(index, 1)"
                      class="h-[4vh] min-h-[32px] w-[4vh] min-w-[32px] flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
                      <span class="material-symbols-outlined text-sm">arrow_downward</span>
                    </button>
                    <button
                      @click="removeSection(index)"
                      class="h-[4vh] min-h-[32px] w-[4vh] min-w-[32px] flex items-center justify-center text-red-400 hover:text-red-600"
                    >
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>

                <!-- Main Page Section -->
                <div v-if="section.type === 'main-page'" class="w-[95%] mx-auto pb-[2vh] space-y-[1vh]">
                  <div>
                    <label class="text-xs text-gray-500">Images de fond (carrousel)</label>
                    <div class="flex flex-wrap gap-[0.5vw] mt-[0.5vh]">
                      <div
                        v-for="(img, imgIndex) in section.images"
                        :key="imgIndex"
                        class="relative w-[6vw] min-w-[80px] h-[8vh] min-h-[64px] bg-gray-100 rounded overflow-hidden"
                      >
                        <img :src="img" class="w-full h-full object-cover" />
                        <button
                          @click="removeMainImage(section, imgIndex)"
                          class="absolute top-0 right-0 bg-red-500 text-white rounded-bl"
                        >
                          <span class="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                      <div class="w-[6vw] min-w-[80px] h-[8vh] min-h-[64px] border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        <input type="file" accept="image/*" class="hidden" :id="'main-images-' + section.id" @change="(e) => addMainImage(e, section)" />
                        <label :for="'main-images-' + section.id" class="cursor-pointer">
                          <span class="material-symbols-outlined text-gray-400">add</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    v-model="section.headline"
                    class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg"
                    placeholder="Titre principal (ex: Modern House, Porto-Novo)"
                  />
                  <input
                    type="text"
                    v-model="section.buttonText"
                    class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg"
                    placeholder="Texte du bouton (ex: Voir Plus)"
                  />
                </div>

                <!-- Bio Section -->
                <div v-if="section.type === 'bio'" class="w-[95%] mx-auto pb-[2vh] space-y-[1vh]">
                  <textarea
                    v-model="section.content"
                    rows="4"
                    class="w-full h-[15vh] min-h-[120px] border border-gray-300 rounded-lg"
                    placeholder="Description du projet..."
                  ></textarea>
                  <div class="grid grid-cols-2 gap-[1vw]">
                    <div>
                      <label class="text-xs text-gray-500">Services</label>
                      <textarea
                        v-model="section.servicesList"
                        rows="2"
                        class="w-full h-[10vh] min-h-[80px] border border-gray-300 rounded-lg text-sm"
                        placeholder="Un service par ligne"
                      ></textarea>
                    </div>
                    <div>
                      <label class="text-xs text-gray-500">Types de travaux</label>
                      <textarea
                        v-model="section.workTypesList"
                        rows="2"
                        class="w-full h-[10vh] min-h-[80px] border border-gray-300 rounded-lg text-sm"
                        placeholder="Un type par ligne"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Full Image Section -->
                <div v-if="section.type === 'full-image'" class="w-[95%] mx-auto pb-[2vh] space-y-[1vh]">
                  <div class="border-2 border-dashed border-gray-300 rounded-lg h-[18vh] min-h-[140px] flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" class="hidden" :id="'section-image-' + section.id" @change="(e) => handleSectionImage(e, section)" />
                    <label :for="'section-image-' + section.id" class="cursor-pointer text-center">
                      <img v-if="section.image" :src="section.image" class="max-h-[15vh] mx-auto rounded" />
                      <div v-else>
                        <span class="material-symbols-outlined text-gray-400 text-3xl">image</span>
                        <p class="text-sm text-gray-500">Télécharger une image</p>
                      </div>
                    </label>
                  </div>
                  <input
                    type="text"
                    v-model="section.alt"
                    class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg"
                    placeholder="Description de l'image (alt)"
                  />
                </div>

                <!-- Text-Image / Image-Text Section -->
                <div v-if="section.type === 'text-image' || section.type === 'image-text'" class="w-[95%] mx-auto pb-[2vh] grid grid-cols-2 gap-[1vw]">
                  <div :class="section.type === 'image-text' ? 'order-2' : ''">
                    <input
                      type="text"
                      v-model="section.title"
                      class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg mb-[1vh]"
                      placeholder="Titre (optionnel)"
                    />
                    <textarea
                      v-model="section.content"
                      rows="4"
                      class="w-full h-[15vh] min-h-[120px] border border-gray-300 rounded-lg"
                      placeholder="Description..."
                    ></textarea>
                  </div>
                  <div :class="section.type === 'image-text' ? 'order-1' : ''">
                    <div class="border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[18vh] flex flex-col items-center justify-center">
                      <input type="file" accept="image/*" class="hidden" :id="'section-image-' + section.id" @change="(e) => handleSectionImage(e, section)" />
                      <label :for="'section-image-' + section.id" class="cursor-pointer text-center">
                        <img v-if="section.image" :src="section.image" class="max-h-[12vh] mx-auto rounded" />
                        <div v-else>
                          <span class="material-symbols-outlined text-gray-400 text-2xl">image</span>
                          <p class="text-xs text-gray-500">Image</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Double Image Section -->
                <div v-if="section.type === 'double-image'" class="w-[95%] mx-auto pb-[2vh] grid grid-cols-2 gap-[1vw]">
                  <div class="border-2 border-dashed border-gray-300 rounded-lg h-[15vh] min-h-[120px] flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" class="hidden" :id="'section-left-' + section.id" @change="(e) => handleSectionImage(e, section, 'leftImage')" />
                    <label :for="'section-left-' + section.id" class="cursor-pointer text-center">
                      <img v-if="section.leftImage" :src="section.leftImage" class="max-h-[10vh] mx-auto rounded" />
                      <div v-else>
                        <span class="material-symbols-outlined text-gray-400 text-2xl">image</span>
                        <p class="text-xs text-gray-500">Image gauche</p>
                      </div>
                    </label>
                  </div>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg h-[15vh] min-h-[120px] flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" class="hidden" :id="'section-right-' + section.id" @change="(e) => handleSectionImage(e, section, 'rightImage')" />
                    <label :for="'section-right-' + section.id" class="cursor-pointer text-center">
                      <img v-if="section.rightImage" :src="section.rightImage" class="max-h-[10vh] mx-auto rounded" />
                      <div v-else>
                        <span class="material-symbols-outlined text-gray-400 text-2xl">image</span>
                        <p class="text-xs text-gray-500">Image droite</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div v-if="projectForm.sections.length === 0" class="h-[20vh] min-h-[160px] flex flex-col items-center justify-center text-gray-400">
                <span class="material-symbols-outlined text-4xl mb-[1vh]">architecture</span>
                <p>Ajoutez des sections pour construire votre projet</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Panel -->
        <div v-show="showPreview || isLargeScreen" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="h-[6vh] min-h-[48px] bg-gray-50 flex items-center border-b w-[90%] mx-auto">
            <h3 class="font-semibold text-gray-700">Aperçu du projet</h3>
          </div>
          <div class="overflow-y-auto max-h-[80vh]">
            <!-- Main Page Preview -->
            <div v-for="section in projectForm.sections" :key="section.id">
              <div v-if="section.type === 'main-page'" class="relative h-[30vh] min-h-[240px] bg-gray-800">
                <div
                  v-if="section.images && section.images.length > 0"
                  class="absolute inset-0 bg-cover bg-center"
                  :style="{ backgroundImage: `url(${section.images[0]})` }"
                ></div>
                <div class="absolute inset-0 bg-black/30"></div>
                <div class="absolute inset-0 flex items-center justify-center text-white text-center">
                  <div>
                    <p class="text-2xl font-light italic mb-[2vh]">{{ section.headline || projectForm.title || 'Titre du projet' }}</p>
                    <button class="h-[5vh] min-h-[40px] bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg text-sm px-[1.5vw]">
                      {{ section.buttonText || 'Voir Plus' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Bio Preview -->
              <div v-if="section.type === 'bio'" class="w-[90%] mx-auto py-[2vh]">
                <div class="grid grid-cols-2 gap-[2vw]">
                  <div>
                    <p class="text-gray-600 text-sm leading-relaxed">{{ section.content || 'Description du projet...' }}</p>
                  </div>
                  <div class="space-y-[2vh] text-sm">
                    <div>
                      <h4 class="font-semibold text-gray-800">SERVICE</h4>
                      <ul class="text-gray-500">
                        <li v-for="(service, i) in (section.servicesList || '').split('\n').filter(s => s.trim())" :key="i">{{ service }}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">TYPE DE TRAVAUX</h4>
                      <ul class="text-gray-500">
                        <li v-for="(work, i) in (section.workTypesList || '').split('\n').filter(s => s.trim())" :key="i">{{ work }}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">EMPLACEMENT</h4>
                      <p class="text-gray-500">{{ projectForm.location || '-' }}</p>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800">PARTENAIRES</h4>
                      <p class="text-gray-500">{{ projectForm.partners || '-' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Full Image Preview -->
              <div v-if="section.type === 'full-image'" class="w-[90%] mx-auto py-[1vh]">
                <img v-if="section.image" :src="section.image" :alt="section.alt" class="w-full rounded-lg" />
                <div v-else class="h-[20vh] min-h-[160px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <span class="text-gray-400">Image pleine largeur</span>
                </div>
              </div>

              <!-- Text-Image Preview -->
              <div v-if="section.type === 'text-image'" class="w-[90%] mx-auto py-[1vh]">
                <div class="grid grid-cols-2 gap-[1vw]">
                  <div>
                    <h3 v-if="section.title" class="font-semibold mb-[1vh]">{{ section.title }}</h3>
                    <p class="text-gray-600 text-sm">{{ section.content || 'Description...' }}</p>
                  </div>
                  <div>
                    <img v-if="section.image" :src="section.image" class="w-full rounded-lg" />
                    <div v-else class="h-[15vh] min-h-[120px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-sm">Image</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Image-Text Preview -->
              <div v-if="section.type === 'image-text'" class="w-[90%] mx-auto py-[1vh]">
                <div class="grid grid-cols-2 gap-[1vw]">
                  <div>
                    <img v-if="section.image" :src="section.image" class="w-full rounded-lg" />
                    <div v-else class="h-[15vh] min-h-[120px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-sm">Image</span>
                    </div>
                  </div>
                  <div>
                    <h3 v-if="section.title" class="font-semibold mb-[1vh]">{{ section.title }}</h3>
                    <p class="text-gray-600 text-sm">{{ section.content || 'Description...' }}</p>
                  </div>
                </div>
              </div>

              <!-- Double Image Preview -->
              <div v-if="section.type === 'double-image'" class="w-[90%] mx-auto py-[1vh]">
                <div class="grid grid-cols-2 gap-[1vw]">
                  <div>
                    <img v-if="section.leftImage" :src="section.leftImage" class="w-full rounded-lg" />
                    <div v-else class="h-[15vh] min-h-[120px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-sm">Image gauche</span>
                    </div>
                  </div>
                  <div>
                    <img v-if="section.rightImage" :src="section.rightImage" class="w-full rounded-lg" />
                    <div v-else class="h-[15vh] min-h-[120px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-sm">Image droite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="projectForm.sections.length === 0" class="h-[20vh] min-h-[160px] flex flex-col items-center justify-center text-gray-400">
              <span class="material-symbols-outlined text-4xl mb-[1vh]">preview</span>
              <p>L'aperçu apparaîtra ici</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ProjectsView',
  setup() {
    const showEditor = ref(false)
    const showPreview = ref(false)
    const showSectionMenu = ref(false)
    const searchQuery = ref('')
    const serviceFilter = ref('')
    const statusFilter = ref('')
    const editingProject = ref(null)
    const isLargeScreen = ref(window.innerWidth >= 1024)

    // Services list
    const services = ref([
      { id: 1, name: 'Conception Architecturale' },
      { id: 2, name: 'Architecture d\'Intérieur' },
      { id: 3, name: 'Conception et Construction' },
      { id: 4, name: 'Gestion d\'Actifs Immobiliers' }
    ])

    // Section options
    const sectionOptions = [
      { type: 'main-page', label: 'Page Principale', description: 'Première section avec carrousel', icon: 'home' },
      { type: 'bio', label: 'Bio', description: 'Description et informations', icon: 'description' },
      { type: 'full-image', label: 'Full Image', description: 'Image pleine largeur', icon: 'panorama' },
      { type: 'text-image', label: 'Text-Image', description: 'Texte à gauche, image à droite', icon: 'view_agenda' },
      { type: 'image-text', label: 'Image-Text', description: 'Image à gauche, texte à droite', icon: 'view_agenda' },
      { type: 'double-image', label: 'Double Image', description: 'Deux images côte à côte', icon: 'view_column' }
    ]

    // Mock projects
    const projects = ref([
      {
        id: 1,
        title: 'Modern House, Porto-Novo',
        location: 'Porto-Novo, Bénin',
        services: [1, 2],
        workType: 'Rénovation Complète',
        partners: 'G-Tech',
        coverImage: null,
        published: true,
        createdAt: '2026-01-15',
        sections: []
      },
      {
        id: 2,
        title: 'Villa Contemporaine, Cotonou',
        location: 'Cotonou, Bénin',
        services: [3],
        workType: 'Construction Neuve',
        partners: 'BTP Solutions',
        coverImage: null,
        published: true,
        createdAt: '2026-01-10',
        sections: []
      },
      {
        id: 3,
        title: 'Appartement Luxe, Parakou',
        location: 'Parakou, Bénin',
        services: [2, 4],
        workType: 'Aménagement Intérieur',
        partners: '',
        coverImage: null,
        published: false,
        createdAt: '2026-01-05',
        sections: []
      }
    ])

    const projectForm = reactive({
      id: null,
      title: '',
      location: '',
      services: [],
      workType: '',
      partners: '',
      coverImage: null,
      sections: []
    })

    const filteredProjects = computed(() => {
      return projects.value.filter(p => {
        const matchesSearch = searchQuery.value === '' ||
          p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesService = serviceFilter.value === '' || p.services.includes(Number(serviceFilter.value))
        const matchesStatus = statusFilter.value === '' ||
          (statusFilter.value === 'published' && p.published) ||
          (statusFilter.value === 'draft' && !p.published)
        return matchesSearch && matchesService && matchesStatus
      })
    })

    function getServiceName(serviceId) {
      const service = services.value.find(s => s.id === serviceId)
      return service ? service.name : ''
    }

    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    function getSectionLabel(type) {
      const option = sectionOptions.find(o => o.type === type)
      return option ? option.label : type
    }

    function openProjectEditor(project = null) {
      editingProject.value = project
      if (project) {
        Object.assign(projectForm, {
          id: project.id,
          title: project.title,
          location: project.location,
          services: [...project.services],
          workType: project.workType,
          partners: project.partners,
          coverImage: project.coverImage,
          sections: JSON.parse(JSON.stringify(project.sections))
        })
      } else {
        Object.assign(projectForm, {
          id: null,
          title: '',
          location: '',
          services: [],
          workType: '',
          partners: '',
          coverImage: null,
          sections: []
        })
      }
      showEditor.value = true
      showPreview.value = false
    }

    function closeEditor() {
      showEditor.value = false
      editingProject.value = null
    }

    function togglePreview() {
      showPreview.value = !showPreview.value
    }

    function toggleService(serviceId) {
      const index = projectForm.services.indexOf(serviceId)
      if (index === -1) {
        projectForm.services.push(serviceId)
      } else {
        projectForm.services.splice(index, 1)
      }
    }

    function addSection(type) {
      const section = {
        id: Date.now(),
        type,
        content: '',
        title: '',
        image: null,
        alt: '',
        leftImage: null,
        rightImage: null,
        images: [],
        headline: '',
        buttonText: '',
        servicesList: '',
        workTypesList: ''
      }
      projectForm.sections.push(section)
      showSectionMenu.value = false
    }

    function removeSection(index) {
      projectForm.sections.splice(index, 1)
    }

    function moveSection(index, direction) {
      const newIndex = index + direction
      const sections = projectForm.sections
      ;[sections[index], sections[newIndex]] = [sections[newIndex], sections[index]]
    }

    function handleSectionImage(event, section, field = 'image') {
      const file = event.target.files[0]
      if (file) {
        section[field] = URL.createObjectURL(file)
      }
    }

    function addMainImage(event, section) {
      const file = event.target.files[0]
      if (file) {
        if (!section.images) section.images = []
        section.images.push(URL.createObjectURL(file))
      }
    }

    function removeMainImage(section, index) {
      section.images.splice(index, 1)
    }

    function saveProject(publish) {
      const projectData = {
        ...projectForm,
        published: publish,
        createdAt: projectForm.id ? editingProject.value.createdAt : new Date().toISOString().split('T')[0]
      }

      // Set cover image from first main-page section if available
      const mainSection = projectForm.sections.find(s => s.type === 'main-page')
      if (mainSection && mainSection.images && mainSection.images.length > 0) {
        projectData.coverImage = mainSection.images[0]
      }

      if (projectForm.id) {
        const index = projects.value.findIndex(p => p.id === projectForm.id)
        if (index !== -1) {
          projects.value[index] = projectData
        }
      } else {
        projectData.id = Date.now()
        projects.value.unshift(projectData)
      }

      closeEditor()
    }

    function deleteProject(project) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        projects.value = projects.value.filter(p => p.id !== project.id)
      }
    }

    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 1024
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      showEditor,
      showPreview,
      showSectionMenu,
      searchQuery,
      serviceFilter,
      statusFilter,
      isLargeScreen,
      services,
      sectionOptions,
      projects,
      filteredProjects,
      projectForm,
      getServiceName,
      formatDate,
      getSectionLabel,
      openProjectEditor,
      closeEditor,
      togglePreview,
      toggleService,
      addSection,
      removeSection,
      moveSection,
      handleSectionImage,
      addMainImage,
      removeMainImage,
      saveProject,
      deleteProject
    }
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
