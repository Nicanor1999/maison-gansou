<template>
  <div class="blog-admin h-full w-full overflow-y-auto">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center h-40">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--bg-1)]"></div>
    </div>

    <template v-else>
      <!-- Header Actions -->
      <div class="flex flex-wrap items-center justify-between h-16 mt-4 mb-4">
        <div class="flex items-center gap-2">
          <button
            @click="activeView = 'articles'"
            :class="[
              'h-10 px-6 rounded-lg font-medium transition-colors',
              activeView === 'articles' ? 'bg-[var(--bg-1)] text-white' : 'bg-white text-gray-700 border'
            ]"
          >
            Articles
          </button>
          <button
            @click="activeView = 'tags'"
            :class="[
              'h-10 px-6 rounded-lg font-medium transition-colors',
              activeView === 'tags' ? 'bg-[var(--bg-1)] text-white' : 'bg-white text-gray-700 border'
            ]"
          >
            Tags
          </button>
        </div>
        <button
          v-if="activeView === 'articles' && !showEditor"
          @click="openArticleEditor()"
          class="h-10 px-6 bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg hover:bg-[var(--second-orange)]/90 transition-colors flex items-center justify-center font-medium"
        >
          <span class="material-symbols-outlined mr-1">add</span>
          Nouvel Article
        </button>
        <button
          v-if="activeView === 'tags'"
          @click="showTagModal = true"
          class="h-10 px-6 bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg hover:bg-[var(--second-orange)]/90 transition-colors flex items-center justify-center font-medium"
        >
          <span class="material-symbols-outlined mr-1">add</span>
          Nouveau Tag
        </button>
      </div>

      <!-- Articles View -->
      <div v-if="activeView === 'articles' && !showEditor" class="space-y-4">
        <!-- Search & Filters -->
        <div class="bg-white rounded-xl shadow-sm h-16 border border-gray-100 flex justify-center">
          <div class="flex flex-wrap items-center h-full w-[95%] mx-auto gap-4">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher un article..."
              class="flex-1 min-w-[200px] h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-4"
            />
            <select
              v-model="tagFilter"
              class="h-10 w-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-2"
            >
              <option value="">Tous les tags</option>
              <option v-for="tag in tags" :key="tag._id" :value="tag._id">{{ tag.Tags }}</option>
            </select>
            <select
              v-model="statusFilter"
              class="h-10 w-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent px-2"
            >
              <option value="">Tous</option>
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
            </select>
          </div>
        </div>

        <!-- Articles Grid -->
        <div v-if="filteredArticles.length === 0" class="flex items-center justify-center h-40 text-gray-400">
          Aucun article trouvé
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          <div
            v-for="article in filteredArticles"
            :key="article._id"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col items-center"
          >
            <div class="h-40 w-full bg-gray-200 relative overflow-hidden">
              <img
                v-if="getArticleCoverImage(article)"
                :src="getArticleCoverImage(article)"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="material-symbols-outlined text-gray-400 text-4xl">article</span>
              </div>
              <span
                :class="[
                  'absolute top-2 right-2 text-xs font-medium rounded-full px-2 py-1',
                  article.status ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ article.status ? 'Publié' : 'Brouillon' }}
              </span>
            </div>
            <div class="h-36 w-[90%] mx-auto flex flex-col justify-around py-2">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in article.tags"
                  :key="tag._id || tag"
                  class="text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-1"
                >
                  {{ typeof tag === 'object' ? tag.Tags : getTagName(tag) }}
                </span>
              </div>
              <h3 class="font-semibold text-lg text-gray-800 line-clamp-2">{{ article.title }}</h3>
              <p class="text-sm text-gray-500">{{ formatDate(article.createdAt) }}</p>
              <div class="flex justify-end gap-1">
                <button
                  @click="openArticleEditor(article)"
                  class="h-8 w-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Modifier"
                >
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button
                  @click="deleteArticle(article)"
                  class="h-8 w-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg"
                  title="Supprimer"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Editor -->
      <div v-if="showEditor" class="h-[90vh] flex flex-col gap-4">
        <!-- Editor Header -->
        <div class="flex items-center justify-between h-14 bg-white rounded-xl shadow-sm border border-gray-100 px-6">
          <div class="flex items-center gap-4">
            <button
              @click="closeEditor"
              class="flex items-center text-gray-600 hover:text-gray-800"
            >
              <span class="material-symbols-outlined mr-1">arrow_back</span>
              Retour
            </button>
            <span class="text-gray-300">|</span>
            <h2 class="text-lg font-semibold text-gray-800">{{ editingArticle ? 'Modifier l\'article' : 'Nouvel article' }}</h2>
          </div>
          <div class="flex gap-3">
            <button
              @click="showArticleInfoModal = true"
              class="h-10 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
            >
              <span class="material-symbols-outlined mr-1">settings</span>
              Infos article
            </button>
            <button
              @click="saveArticle(false)"
              :disabled="isSaving"
              class="h-10 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Brouillon
            </button>
            <button
              @click="saveArticle(true)"
              :disabled="isSaving"
              class="h-10 px-6 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 disabled:opacity-50"
            >
              Publier
            </button>
          </div>
        </div>

        <!-- Editor Content: Side by Side -->
        <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
          <!-- Left: Sections Builder -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div class="h-14 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
              <h3 class="text-base font-semibold text-gray-800">Contenu de l'article</h3>
              <div class="relative">
                <button
                  @click="showSectionMenu = !showSectionMenu"
                  class="h-10 px-4 bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg flex items-center justify-center font-medium"
                >
                  <span class="material-symbols-outlined mr-1">add</span>
                  Ajouter
                </button>
                <div
                  v-if="showSectionMenu"
                  class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-10 overflow-y-auto max-h-80"
                >
                  <button
                    v-for="option in sectionOptions"
                    :key="option.type"
                    @click="addSection(option.type)"
                    class="w-full py-3 px-4 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span class="material-symbols-outlined mr-3 text-gray-500">{{ option.icon }}</span>
                    <div>
                      <p class="font-medium text-gray-800">{{ option.label }}</p>
                      <p class="text-xs text-gray-500">{{ option.description }}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Sections List -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col gap-4">
              <div
                v-for="(section, index) in articleForm.sections"
                :key="section.id"
                class="border border-gray-200 rounded-lg"
              >
                <div class="h-12 flex items-center justify-between px-4 bg-gray-50 rounded-t-lg">
                  <span class="text-sm font-medium text-gray-600">{{ getSectionLabel(section.type) }}</span>
                  <div class="flex gap-1">
                    <button
                      v-if="index > 0"
                      @click="moveSection(index, -1)"
                      class="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
                    >
                      <span class="material-symbols-outlined text-sm">arrow_upward</span>
                    </button>
                    <button
                      v-if="index < articleForm.sections.length - 1"
                      @click="moveSection(index, 1)"
                      class="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
                    >
                      <span class="material-symbols-outlined text-sm">arrow_downward</span>
                    </button>
                    <button
                      @click="removeSection(index)"
                      class="h-8 w-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>

                <!-- Main Page Section -->
                <div v-if="section.type === 'main-page'" class="p-4 space-y-3">
                  <div>
                    <label class="text-xs text-gray-500">Images de fond (carrousel)</label>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <div
                        v-for="(img, imgIndex) in section.images"
                        :key="imgIndex"
                        class="relative w-20 h-16 bg-gray-100 rounded overflow-hidden"
                      >
                        <img :src="img" class="w-full h-full object-cover" />
                        <button
                          @click="removeMainImage(section, imgIndex)"
                          class="absolute top-0 right-0 bg-red-500 text-white rounded-bl"
                        >
                          <span class="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                      <div class="w-20 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        <input type="file" accept="image/*" class="hidden" :id="'main-images-' + section.id" @change="(e) => addMainImage(e, section)" />
                        <label :for="'main-images-' + section.id" class="cursor-pointer">
                          <span class="material-symbols-outlined text-gray-400">add</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bio Section -->
                <div v-if="section.type === 'bio'" class="p-4 space-y-3">
                  <div>
                    <label class="text-xs text-gray-500 mb-1 block">Description</label>
                    <textarea
                      v-model="section.content"
                      rows="4"
                      class="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none"
                      placeholder="Texte de présentation..."
                    ></textarea>
                  </div>
                  <div>
                    <label class="text-xs text-gray-500 mb-1 block">Partenaires (séparés par virgule)</label>
                    <input
                      type="text"
                      v-model="section.partners"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm"
                      placeholder="Partenaire 1, Partenaire 2..."
                    />
                  </div>
                </div>

                <!-- Full Text Section -->
                <div v-if="section.type === 'full-text'" class="p-4 space-y-3">
                  <input
                    type="text"
                    v-model="section.title"
                    class="w-full h-10 px-3 border border-gray-300 rounded-lg"
                    placeholder="Titre (optionnel)"
                  />
                  <textarea
                    v-model="section.content"
                    rows="6"
                    class="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg resize-none"
                    placeholder="Contenu du texte..."
                  ></textarea>
                </div>

                <!-- Full Image Section -->
                <div v-if="section.type === 'full-image'" class="p-4 space-y-3">
                  <div class="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center hover:border-[var(--bg-1)] transition-colors">
                    <input type="file" accept="image/*" class="hidden" :id="'section-image-' + section.id" @change="(e) => handleSectionImage(e, section)" />
                    <label :for="'section-image-' + section.id" class="cursor-pointer text-center w-full h-full flex flex-col items-center justify-center">
                      <img v-if="section.image" :src="section.image" class="max-h-24 mx-auto rounded" />
                      <div v-else>
                        <span class="material-symbols-outlined text-gray-400 text-2xl">image</span>
                        <p class="text-sm text-gray-500">Télécharger une image</p>
                      </div>
                    </label>
                  </div>
                  <input
                    type="text"
                    v-model="section.alt"
                    class="w-full h-10 px-3 border border-gray-300 rounded-lg"
                    placeholder="Description de l'image (alt)"
                  />
                </div>

                <!-- Text-Image / Image-Text Section -->
                <div v-if="section.type === 'text-image' || section.type === 'image-text'" class="p-4 grid grid-cols-2 gap-3">
                  <div :class="section.type === 'image-text' ? 'order-2' : ''">
                    <input
                      type="text"
                      v-model="section.title"
                      class="w-full h-10 px-3 border border-gray-300 rounded-lg mb-2"
                      placeholder="Titre (optionnel)"
                    />
                    <textarea
                      v-model="section.content"
                      rows="4"
                      class="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none"
                      placeholder="Texte..."
                    ></textarea>
                  </div>
                  <div :class="section.type === 'image-text' ? 'order-1' : ''">
                    <div class="border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[140px] flex flex-col items-center justify-center hover:border-[var(--bg-1)] transition-colors">
                      <input type="file" accept="image/*" class="hidden" :id="'section-image-' + section.id" @change="(e) => handleSectionImage(e, section)" />
                      <label :for="'section-image-' + section.id" class="cursor-pointer text-center w-full h-full flex flex-col items-center justify-center">
                        <img v-if="section.image" :src="section.image" class="max-h-24 mx-auto rounded" />
                        <div v-else>
                          <span class="material-symbols-outlined text-gray-400 text-xl">image</span>
                          <p class="text-xs text-gray-500">Image</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Double Image Section -->
                <div v-if="section.type === 'double-image'" class="p-4 grid grid-cols-2 gap-3">
                  <div class="border-2 border-dashed border-gray-300 rounded-lg h-28 flex flex-col items-center justify-center hover:border-[var(--bg-1)] transition-colors">
                    <input type="file" accept="image/*" class="hidden" :id="'section-left-' + section.id" @change="(e) => handleSectionImage(e, section, 'leftImage')" />
                    <label :for="'section-left-' + section.id" class="cursor-pointer text-center w-full h-full flex flex-col items-center justify-center">
                      <img v-if="section.leftImage" :src="section.leftImage" class="max-h-20 mx-auto rounded" />
                      <div v-else>
                        <span class="material-symbols-outlined text-gray-400 text-xl">image</span>
                        <p class="text-xs text-gray-500">Image gauche</p>
                      </div>
                    </label>
                  </div>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg h-28 flex flex-col items-center justify-center hover:border-[var(--bg-1)] transition-colors">
                    <input type="file" accept="image/*" class="hidden" :id="'section-right-' + section.id" @change="(e) => handleSectionImage(e, section, 'rightImage')" />
                    <label :for="'section-right-' + section.id" class="cursor-pointer text-center w-full h-full flex flex-col items-center justify-center">
                      <img v-if="section.rightImage" :src="section.rightImage" class="max-h-20 mx-auto rounded" />
                      <div v-else>
                        <span class="material-symbols-outlined text-gray-400 text-xl">image</span>
                        <p class="text-xs text-gray-500">Image droite</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div v-if="articleForm.sections.length === 0" class="h-48 flex flex-col items-center justify-center text-gray-400 text-center">
                <span class="material-symbols-outlined text-4xl mb-2">article</span>
                <p>Ajoutez des sections pour structurer votre article</p>
              </div>
            </div>
          </div>

          <!-- Right: Preview Panel -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div class="h-14 flex items-center px-6 border-b border-gray-100 bg-gray-50 flex-shrink-0">
              <span class="material-symbols-outlined mr-2 text-gray-500">visibility</span>
              <h3 class="font-semibold text-gray-700">Aperçu</h3>
            </div>
            <div class="flex-1 overflow-y-auto p-6 space-y-4">
              <div v-for="section in articleForm.sections" :key="section.id" class="space-y-4">
                <!-- Main Page Preview -->
                <div v-if="section.type === 'main-page'" class="relative h-48 bg-gray-800 rounded-lg overflow-hidden">
                  <div
                    v-if="section.images && section.images.length > 0"
                    class="absolute inset-0 bg-cover bg-center"
                    :style="{ backgroundImage: `url(${section.images[0]})` }"
                  ></div>
                  <div class="absolute inset-0 bg-black/30"></div>
                  <div class="absolute inset-0 flex items-center justify-center text-white text-center">
                    <p class="text-xl font-light italic">{{ articleForm.title || 'Titre de l\'article' }}</p>
                  </div>
                </div>
                <!-- Bio Preview -->
                <div v-if="section.type === 'bio'" class="flex flex-col md:flex-row gap-4 border rounded-lg p-4 bg-gray-50">
                  <div :class="section.partners ? 'md:w-[70%]' : 'w-full'">
                    <p class="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {{ section.content || 'Texte de présentation...' }}
                    </p>
                  </div>
                  <div v-if="section.partners" class="md:w-[30%] flex flex-col gap-3 text-xs">
                    <div class="border-l-2 border-orange-400 pl-2">
                      <span class="text-gray-400 uppercase text-[10px]">Partenaires</span>
                      <p class="text-gray-600">{{ section.partners }}</p>
                    </div>
                  </div>
                </div>
                <!-- Full Text Preview -->
                <div v-if="section.type === 'full-text'" class="space-y-2">
                  <h3 v-if="section.title" class="text-lg font-semibold text-gray-800">{{ section.title }}</h3>
                  <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ section.content || 'Contenu du texte...' }}</p>
                </div>
                <!-- Full Image Preview -->
                <div v-if="section.type === 'full-image'" class="w-full">
                  <img v-if="section.image" :src="section.image" :alt="section.alt" class="w-full rounded-lg" />
                  <div v-else class="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400">Image pleine largeur</span>
                  </div>
                </div>
                <!-- Text-Image Preview -->
                <div v-if="section.type === 'text-image'" class="grid grid-cols-2 gap-4">
                  <div>
                    <h3 v-if="section.title" class="font-semibold mb-2">{{ section.title }}</h3>
                    <p class="text-gray-600 text-sm whitespace-pre-line">{{ section.content || 'Texte...' }}</p>
                  </div>
                  <div>
                    <img v-if="section.image" :src="section.image" class="w-full rounded-lg" />
                    <div v-else class="h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-sm">Image</span>
                    </div>
                  </div>
                </div>
                <!-- Image-Text Preview -->
                <div v-if="section.type === 'image-text'" class="grid grid-cols-2 gap-4">
                  <div>
                    <img v-if="section.image" :src="section.image" class="w-full rounded-lg" />
                    <div v-else class="h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-sm">Image</span>
                    </div>
                  </div>
                  <div>
                    <h3 v-if="section.title" class="font-semibold mb-2">{{ section.title }}</h3>
                    <p class="text-gray-600 text-sm whitespace-pre-line">{{ section.content || 'Texte...' }}</p>
                  </div>
                </div>
                <!-- Double Image Preview -->
                <div v-if="section.type === 'double-image'" class="grid grid-cols-2 gap-4">
                  <div>
                    <img v-if="section.leftImage" :src="section.leftImage" class="w-full rounded-lg" />
                    <div v-else class="h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-sm">Image gauche</span>
                    </div>
                  </div>
                  <div>
                    <img v-if="section.rightImage" :src="section.rightImage" class="w-full rounded-lg" />
                    <div v-else class="h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-gray-400 text-sm">Image droite</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="articleForm.sections.length === 0" class="text-center text-gray-400 py-8">
                <p>L'aperçu s'affichera ici</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Info Modal -->
      <div
        v-if="showArticleInfoModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div class="bg-white rounded-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
          <div class="h-16 border-b flex items-center justify-between px-6">
            <h2 class="text-xl font-semibold text-gray-800">Informations de l'article</h2>
            <button @click="showArticleInfoModal = false" class="text-gray-500 hover:text-gray-700">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-5 flex flex-col gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Titre de l'article</label>
              <input
                type="text"
                v-model="articleForm.title"
                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
                placeholder="Entrez le titre de l'article"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Images du carrousel (Page Principale)</label>
              <div class="flex flex-wrap gap-2 mt-2">
                <div
                  v-for="(img, imgIndex) in mainPageImages"
                  :key="'mp-' + imgIndex + '-' + img"
                  class="relative w-24 h-20 bg-gray-100 rounded overflow-hidden"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                  <button
                    @click="removeMainPageImage(imgIndex)"
                    class="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-0.5"
                  >
                    <span class="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
                <div class="w-24 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-[var(--bg-1)] transition-colors">
                  <input type="file" accept="image/*" class="hidden" id="main-page-images-modal" @change="addMainPageImage" />
                  <label for="main-page-images-modal" class="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <span class="material-symbols-outlined text-gray-400">add</span>
                    <p class="text-xs text-gray-500">Ajouter</p>
                  </label>
                </div>
              </div>
              <p class="text-xs text-gray-400 mt-1">Ces images seront affichées dans le carrousel de la page principale de l'article</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in tags"
                  :key="tag._id"
                  @click="toggleTag(tag._id)"
                  :class="[
                    'h-10 px-4 rounded-full text-sm transition-colors',
                    articleForm.tags.includes(tag._id)
                      ? 'bg-[var(--bg-1)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  ]"
                >
                  {{ tag.Tags }}
                </button>
              </div>
            </div>
          </div>
          <div class="h-16 border-t flex items-center justify-end gap-3 px-6">
            <button
              @click="showArticleInfoModal = false"
              class="h-10 px-6 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>

      <!-- Tags View -->
      <div v-if="activeView === 'tags'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="tags.length === 0">
                <td colspan="3" class="px-6 py-8 text-center text-gray-400">Aucun tag</td>
              </tr>
              <tr v-for="tag in tags" :key="tag._id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                    {{ tag.Tags }}
                  </span>
                </td>
                <td class="px-6 py-4 text-gray-600">
                  {{ getArticleCountForTag(tag._id) }} articles
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                    @click="deleteTag(tag)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tag Modal -->
      <div
        v-if="showTagModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div class="bg-white rounded-xl w-full max-w-md mx-4">
          <div class="p-6 border-b flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-800">Nouveau Tag</h2>
            <button @click="showTagModal = false" class="text-gray-500 hover:text-gray-700">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom du tag</label>
            <input
              type="text"
              v-model="newTagName"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
              placeholder="Ex: Architecture"
              @keyup.enter="createTag"
            />
          </div>
          <div class="p-6 border-t flex justify-end gap-3">
            <button
              @click="showTagModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              @click="createTag"
              :disabled="isCreatingTag"
              class="px-4 py-2 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90 disabled:opacity-50"
            >
              {{ isCreatingTag ? 'Création...' : 'Créer' }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useConfirmModal } from '@/composables/useConfirmModal'

export default {
  name: 'BlogView',
  setup() {
    const { confirm: confirmModal, alert: alertModal } = useConfirmModal()
    const API_BASE = '/api/v1'
    const activeView = ref('articles')
    const showEditor = ref(false)
    const showSectionMenu = ref(false)
    const showTagModal = ref(false)
    const showArticleInfoModal = ref(false)
    const searchQuery = ref('')
    const tagFilter = ref('')
    const statusFilter = ref('')
    const newTagName = ref('')
    const editingArticle = ref(null)
    const isLoading = ref(true)
    const isSaving = ref(false)
    const isCreatingTag = ref(false)

    // Section options
    const sectionOptions = [
      { type: 'main-page', label: 'Page Principale', description: 'Première section avec carrousel', icon: 'home' },
      { type: 'bio', label: 'Bio', description: 'Texte de présentation', icon: 'description' },
      { type: 'full-text', label: 'Full Text', description: 'Bloc de texte complet', icon: 'notes' },
      { type: 'full-image', label: 'Full Image', description: 'Image pleine largeur', icon: 'panorama' },
      { type: 'text-image', label: 'Text-Image', description: 'Texte à gauche, image à droite', icon: 'view_agenda' },
      { type: 'image-text', label: 'Image-Text', description: 'Image à gauche, texte à droite', icon: 'view_agenda' },
      { type: 'double-image', label: 'Double Image', description: 'Deux images côte à côte', icon: 'view_column' }
    ]

    const tags = ref([])
    const articles = ref([])

    // Map blobURL -> File object for upload
    const pendingFiles = new Map()

    const articleForm = reactive({
      _id: null,
      title: '',
      tags: [],
      sections: []
    })

    // Computed pour accéder aux images de la section main-page
    const mainPageSection = computed(() => {
      return articleForm.sections.find(s => s.type === 'main-page')
    })

    const mainPageImages = computed(() => {
      return mainPageSection.value?.images || []
    })

    // API Helper
    const getHeaders = () => {
      const token = localStorage.getItem('accessToken')
      return {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    }

    // Fetch Data
    const fetchData = async () => {
      isLoading.value = true
      try {
        const [articlesRes, tagsRes] = await Promise.all([
          fetch(`${API_BASE}/article?perPage=100`, { headers: getHeaders() }),
          fetch(`${API_BASE}/tags?perPage=100`, { headers: getHeaders() })
        ])

        if (articlesRes.ok) {
          const data = await articlesRes.json()
          articles.value = data.data || data.docs || []
        }

        if (tagsRes.ok) {
          const data = await tagsRes.json()
          tags.value = data.data || data.docs || []
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        isLoading.value = false
      }
    }

    const filteredArticles = computed(() => {
      return articles.value.filter(a => {
        const matchesSearch = searchQuery.value === '' ||
          (a.title && a.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
        const matchesTag = tagFilter.value === '' ||
          (a.tags && a.tags.some(t => (typeof t === 'object' ? t._id : t) === tagFilter.value))
        const matchesStatus = statusFilter.value === '' ||
          (statusFilter.value === 'published' && a.status) ||
          (statusFilter.value === 'draft' && !a.status)
        return matchesSearch && matchesTag && matchesStatus
      })
    })

    function getTagName(tagId) {
      const tag = tags.value.find(t => t._id === tagId)
      return tag ? tag.Tags : ''
    }

    // Récupérer l'image de couverture depuis la section main-page
    function getArticleCoverImage(article) {
      if (!article.sections || article.sections.length === 0) return null
      const mainPage = article.sections.find(s => s.type === 'main-page')
      if (mainPage && mainPage.images && mainPage.images.length > 0) {
        return mainPage.images[0]
      }
      // Fallback: première image trouvée dans les sections
      for (const section of article.sections) {
        if (section.image) return section.image
        if (section.images && section.images.length > 0) return section.images[0]
      }
      return null
    }

    function getArticleCountForTag(tagId) {
      return articles.value.filter(a =>
        a.tags && a.tags.some(t => (typeof t === 'object' ? t._id : t) === tagId)
      ).length
    }

    function formatDate(dateString) {
      if (!dateString) return '-'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '-'
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    function getSectionLabel(type) {
      const option = sectionOptions.find(o => o.type === type)
      return option ? option.label : type
    }

    function openArticleEditor(article = null) {
      pendingFiles.clear()
      editingArticle.value = article
      if (article) {
        Object.assign(articleForm, {
          _id: article._id,
          title: article.title || '',
          tags: article.tags ? article.tags.map(t => typeof t === 'object' ? t._id : t) : [],
          sections: article.sections ? JSON.parse(JSON.stringify(article.sections)).map((s, i) => ({
            ...s,
            id: s.id || s._id || Date.now() + i
          })) : []
        })
      } else {
        Object.assign(articleForm, {
          _id: null,
          title: '',
          tags: [],
          sections: []
        })
      }
      showEditor.value = true
      showArticleInfoModal.value = true
    }

    function closeEditor() {
      showEditor.value = false
      editingArticle.value = null
      pendingFiles.clear()
    }

    function toggleTag(tagId) {
      const index = articleForm.tags.indexOf(tagId)
      if (index === -1) {
        articleForm.tags.push(tagId)
      } else {
        articleForm.tags.splice(index, 1)
      }
    }

    // Ajouter une image au carrousel de la page principale
    function addMainPageImage(event) {
      const file = event.target.files[0]
      if (file) {
        // S'assurer qu'une section main-page existe
        let mainPage = articleForm.sections.find(s => s.type === 'main-page')
        if (!mainPage) {
          mainPage = {
            id: Date.now(),
            type: 'main-page',
            images: [],
            headline: '',
            buttonText: ''
          }
          articleForm.sections.unshift(mainPage) // Ajouter au début
        }
        const blobUrl = URL.createObjectURL(file)
        pendingFiles.set(blobUrl, file)
        mainPage.images.push(blobUrl)
      }
      // Reset input
      event.target.value = ''
    }

    // Supprimer une image du carrousel
    function removeMainPageImage(index) {
      const mainPage = articleForm.sections.find(s => s.type === 'main-page')
      if (mainPage && mainPage.images) {
        const url = mainPage.images[index]
        if (url) pendingFiles.delete(url)
        mainPage.images.splice(index, 1)
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
        // Bio specific field
        partners: ''
      }
      articleForm.sections.push(section)
      showSectionMenu.value = false
    }

    function removeSection(index) {
      const section = articleForm.sections[index]
      // Clean up pending files for this section
      if (section.image && pendingFiles.has(section.image)) {
        pendingFiles.delete(section.image)
      }
      if (section.leftImage && pendingFiles.has(section.leftImage)) {
        pendingFiles.delete(section.leftImage)
      }
      if (section.rightImage && pendingFiles.has(section.rightImage)) {
        pendingFiles.delete(section.rightImage)
      }
      if (section.images) {
        section.images.forEach(img => {
          if (pendingFiles.has(img)) pendingFiles.delete(img)
        })
      }
      articleForm.sections.splice(index, 1)
    }

    function moveSection(index, direction) {
      const newIndex = index + direction
      const removed = articleForm.sections.splice(index, 1)[0]
      articleForm.sections.splice(newIndex, 0, removed)
    }

    function handleSectionImage(event, section, field = 'image') {
      const file = event.target.files[0]
      if (file) {
        const blobUrl = URL.createObjectURL(file)
        pendingFiles.set(blobUrl, file)
        section[field] = blobUrl
      }
    }

    function addMainImage(event, section) {
      const file = event.target.files[0]
      if (file) {
        if (!section.images) section.images = []
        const blobUrl = URL.createObjectURL(file)
        pendingFiles.set(blobUrl, file)
        section.images.push(blobUrl)
      }
    }

    function removeMainImage(section, index) {
      const url = section.images[index]
      if (url) pendingFiles.delete(url)
      section.images.splice(index, 1)
    }

    async function saveArticle(publish) {
      if (!articleForm.title) {
        alertModal({ title: 'Champ requis', message: 'Veuillez entrer un titre pour l\'article', type: 'warning' })
        return
      }

      isSaving.value = true
      try {
        const formData = new FormData()
        const fileMapping = []

        // Build sections data
        const sectionsData = articleForm.sections.map((s, sectionIndex) => {
          const section = {
            type: s.type,
            order: sectionIndex,
            title: s.title || '',
            content: s.content || '',
            alt: s.alt || '',
            headline: s.headline || '',
            buttonText: s.buttonText || '',
            image: '',
            leftImage: '',
            rightImage: '',
            images: [],
            // Bio specific field
            partners: s.partners || '',
          }

          // Handle single image fields
          for (const field of ['image', 'leftImage', 'rightImage']) {
            const val = s[field]
            if (!val) continue
            if (pendingFiles.has(val)) {
              formData.append('Pictures', pendingFiles.get(val))
              fileMapping.push({ sectionIndex, field })
            } else {
              section[field] = val // existing server path
            }
          }

          // Handle images array (main-page carousel)
          if (s.images && s.images.length > 0) {
            for (const imgUrl of s.images) {
              if (pendingFiles.has(imgUrl)) {
                formData.append('Pictures', pendingFiles.get(imgUrl))
                fileMapping.push({ sectionIndex, field: 'images' })
              } else {
                section.images.push(imgUrl) // existing server path
              }
            }
          }

          return section
        })

        formData.append('title', articleForm.title)
        formData.append('tags', JSON.stringify(articleForm.tags))
        formData.append('status', publish)
        formData.append('sections', JSON.stringify(sectionsData))
        formData.append('fileMapping', JSON.stringify(fileMapping))

        const url = articleForm._id
          ? `${API_BASE}/article/${articleForm._id}`
          : `${API_BASE}/article`
        const method = articleForm._id ? 'PUT' : 'POST'

        const token = localStorage.getItem('accessToken')
        const response = await fetch(url, {
          method,
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
          body: formData
        })

        if (response.ok) {
          pendingFiles.clear()
          await fetchData()
          closeEditor()
        } else {
          const error = await response.json()
          alertModal({ title: 'Erreur', message: error.message || 'Erreur lors de la sauvegarde', type: 'danger' })
        }
      } catch (error) {
        console.error('Error saving article:', error)
        alertModal({ title: 'Erreur', message: 'Erreur lors de la sauvegarde', type: 'danger' })
      } finally {
        isSaving.value = false
      }
    }

    async function deleteArticle(article) {
      const ok = await confirmModal({ title: 'Supprimer l\'article', message: 'Êtes-vous sûr de vouloir supprimer cet article ?' })
      if (!ok) return

      try {
        const response = await fetch(`${API_BASE}/article/${article._id}`, {
          method: 'DELETE',
          headers: getHeaders()
        })

        if (response.ok) {
          articles.value = articles.value.filter(a => a._id !== article._id)
        } else {
          alertModal({ title: 'Erreur', message: 'Erreur lors de la suppression', type: 'danger' })
        }
      } catch (error) {
        console.error('Error deleting article:', error)
      }
    }

    async function createTag() {
      if (!newTagName.value.trim()) return

      isCreatingTag.value = true
      try {
        const response = await fetch(`${API_BASE}/tags`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getHeaders()
          },
          body: JSON.stringify({ Tags: newTagName.value.trim() })
        })

        if (response.ok) {
          const data = await response.json()
          tags.value.push(data.data || data)
          newTagName.value = ''
          showTagModal.value = false
        } else {
          const error = await response.json()
          alertModal({ title: 'Erreur', message: error.message || 'Erreur lors de la création', type: 'danger' })
        }
      } catch (error) {
        console.error('Error creating tag:', error)
      } finally {
        isCreatingTag.value = false
      }
    }

    async function deleteTag(tag) {
      const ok = await confirmModal({ title: 'Supprimer le tag', message: 'Êtes-vous sûr de vouloir supprimer ce tag ?' })
      if (!ok) return

      try {
        const response = await fetch(`${API_BASE}/tags/${tag._id}`, {
          method: 'DELETE',
          headers: getHeaders()
        })

        if (response.ok) {
          tags.value = tags.value.filter(t => t._id !== tag._id)
        } else {
          alertModal({ title: 'Erreur', message: 'Erreur lors de la suppression', type: 'danger' })
        }
      } catch (error) {
        console.error('Error deleting tag:', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      activeView,
      showEditor,
      showSectionMenu,
      showTagModal,
      showArticleInfoModal,
      searchQuery,
      tagFilter,
      statusFilter,
      newTagName,
      isLoading,
      isSaving,
      isCreatingTag,
      sectionOptions,
      tags,
      articles,
      filteredArticles,
      articleForm,
      mainPageImages,
      getTagName,
      getArticleCoverImage,
      getArticleCountForTag,
      formatDate,
      getSectionLabel,
      openArticleEditor,
      closeEditor,
      toggleTag,
      addMainPageImage,
      removeMainPageImage,
      addSection,
      removeSection,
      moveSection,
      handleSectionImage,
      addMainImage,
      removeMainImage,
      saveArticle,
      deleteArticle,
      createTag,
      deleteTag,
      editingArticle
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
