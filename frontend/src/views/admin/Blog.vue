<template>
  <div class="blog-admin h-full w-full overflow-y-auto">
    <!-- Header Actions -->
    <div class="flex flex-wrap items-center justify-between h-[8vh] min-h-[60px] mt-[2vh] mb-[2vh]">
      <div class="flex items-center gap-[1vw]">
        <button
          @click="activeView = 'articles'"
          :class="[
            'h-[5vh] min-h-[40px] w-[10vw] min-w-[100px] rounded-lg font-medium transition-colors',
            activeView === 'articles' ? 'bg-[var(--bg-1)] text-white' : 'bg-white text-gray-700 border'
          ]"
        >
          Articles
        </button>
        <button
          @click="activeView = 'tags'"
          :class="[
            'h-[5vh] min-h-[40px] w-[10vw] min-w-[100px] rounded-lg font-medium transition-colors',
            activeView === 'tags' ? 'bg-[var(--bg-1)] text-white' : 'bg-white text-gray-700 border'
          ]"
        >
          Tags
        </button>
      </div>
      <button
        v-if="activeView === 'articles'"
        @click="openArticleEditor()"
        class="h-[5vh] min-h-[40px] w-[15%] min-w-[150px] bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg hover:bg-[var(--second-orange)]/90 transition-colors flex items-center justify-center font-medium"
      >
        <span class="material-symbols-outlined mr-[0.5vw]">add</span>
        Nouvel Article
      </button>
      <button
        v-if="activeView === 'tags'"
        @click="showTagModal = true"
        class="h-[5vh] min-h-[40px] w-[15%] min-w-[150px] bg-[var(--second-orange)] text-[var(--bg-1)] rounded-lg hover:bg-[var(--second-orange)]/90 transition-colors flex items-center justify-center font-medium"
      >
        <span class="material-symbols-outlined mr-[0.5vw]">add</span>
        Nouveau Tag
      </button>
    </div>

    <!-- Articles View -->
    <div v-if="activeView === 'articles' && !showEditor" class="space-y-[2vh]">
      <!-- Search & Filters -->
      <div class="bg-white rounded-xl shadow-sm h-[8vh] min-h-[60px] border border-gray-100">
        <div class="flex flex-wrap items-center h-full w-[95%] mx-auto gap-[2%]">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher un article..."
            class="flex-1 min-w-[200px] h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
          />
          <select
            v-model="tagFilter"
            class="h-[5vh] min-h-[40px] w-[12%] min-w-[120px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
          >
            <option value="">Tous les tags</option>
            <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
          </select>
          <select
            v-model="statusFilter"
            class="h-[5vh] min-h-[40px] w-[12%] min-w-[120px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
          </select>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2%]">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
        >
          <div class="h-[20vh] min-h-[150px] bg-gray-200 relative overflow-hidden">
            <img
              v-if="article.thumbnail"
              :src="article.thumbnail"
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="material-symbols-outlined text-gray-400 text-4xl">article</span>
            </div>
            <span
              :class="[
                'absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full',
                article.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              ]"
            >
              {{ article.published ? 'Publié' : 'Brouillon' }}
            </span>
          </div>
          <div class="h-[18vh] min-h-[140px] w-[90%] mx-auto flex flex-col justify-around">
            <div class="flex flex-wrap gap-[0.5vw]">
              <span
                v-for="tagId in article.tags"
                :key="tagId"
                class="text-xs bg-blue-100 text-blue-600 rounded-full"
              >
                {{ getTagName(tagId) }}
              </span>
            </div>
            <h3 class="font-semibold text-lg text-gray-800 line-clamp-2">{{ article.title }}</h3>
            <p class="text-sm text-gray-500">{{ formatDate(article.createdAt) }}</p>
            <div class="flex justify-end gap-[0.5vw]">
              <button
                @click="openArticleEditor(article)"
                class="h-[4vh] min-h-[32px] w-[4vh] min-w-[32px] flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
                title="Modifier"
              >
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button
                @click="deleteArticle(article)"
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

    <!-- Article Editor -->
    <div v-if="showEditor" class="space-y-[2vh]">
      <div class="flex items-center justify-between h-[6vh] min-h-[50px]">
        <button
          @click="closeEditor"
          class="flex items-center text-gray-600 hover:text-gray-800"
        >
          <span class="material-symbols-outlined mr-[0.5vw]">arrow_back</span>
          Retour aux articles
        </button>
        <div class="flex gap-[1vw]">
          <button
            @click="togglePreview"
            :class="[
              'h-[5vh] min-h-[40px] w-[12%] min-w-[120px] rounded-lg flex items-center justify-center transition-colors',
              showPreview ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
            ]"
          >
            <span class="material-symbols-outlined mr-[0.5vw]">{{ showPreview ? 'edit' : 'visibility' }}</span>
            {{ showPreview ? 'Éditer' : 'Aperçu' }}
          </button>
          <button
            @click="saveArticle(false)"
            class="h-[5vh] min-h-[40px] w-[15%] min-w-[150px] bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Enregistrer brouillon
          </button>
          <button
            @click="saveArticle(true)"
            class="h-[5vh] min-h-[40px] w-[10%] min-w-[100px] bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90"
          >
            Publier
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[2vw]">
        <!-- Editor Panel -->
        <div v-show="!showPreview || isLargeScreen" class="space-y-[2vh]">
          <!-- Article Info -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 w-[95%] mx-auto">
            <div class="h-[8vh] min-h-[60px] flex items-center border-b border-gray-100 w-[90%] mx-auto">
              <h3 class="text-lg font-semibold">Informations de l'article</h3>
            </div>
            <div class="w-[90%] mx-auto space-y-[2vh] py-[2vh]">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Titre</label>
                <input
                  type="text"
                  v-model="articleForm.title"
                  class="w-full h-[5vh] min-h-[40px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--bg-1)] focus:border-transparent"
                  placeholder="Titre de l'article"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Image de couverture</label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg h-[15vh] min-h-[120px] flex flex-col items-center justify-center">
                  <input type="file" accept="image/*" class="hidden" id="article-thumbnail" @change="handleThumbnail" />
                  <label for="article-thumbnail" class="cursor-pointer text-center">
                    <span class="material-symbols-outlined text-gray-400 text-3xl">cloud_upload</span>
                    <p class="text-sm text-gray-500">Télécharger une image</p>
                  </label>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-[0.5vh]">Tags</label>
                <div class="flex flex-wrap gap-[0.5vw]">
                  <button
                    v-for="tag in tags"
                    :key="tag.id"
                    @click="toggleTag(tag.id)"
                    :class="[
                      'h-[4vh] min-h-[32px] rounded-full text-sm transition-colors px-[1vw]',
                      articleForm.tags.includes(tag.id)
                        ? 'bg-[var(--bg-1)] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ]"
                  >
                    {{ tag.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sections Builder -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="h-[8vh] min-h-[60px] flex items-center justify-between w-[90%] mx-auto border-b border-gray-100">
              <h3 class="text-lg font-semibold">Contenu de l'article</h3>
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
                  class="absolute right-0 mt-[1vh] w-[15vw] min-w-[220px] bg-white rounded-lg shadow-lg border z-10"
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
                v-for="(section, index) in articleForm.sections"
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
                      v-if="index < articleForm.sections.length - 1"
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

                <!-- Bio Section -->
                <div v-if="section.type === 'bio'" class="w-[95%] mx-auto pb-[2vh]">
                  <textarea
                    v-model="section.content"
                    rows="4"
                    class="w-full h-[15vh] min-h-[120px] border border-gray-300 rounded-lg"
                    placeholder="Texte de présentation..."
                  ></textarea>
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
                      placeholder="Texte..."
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

              <div v-if="articleForm.sections.length === 0" class="h-[20vh] min-h-[160px] flex flex-col items-center justify-center text-gray-400">
                <span class="material-symbols-outlined text-4xl mb-[1vh]">article</span>
                <p>Ajoutez des sections pour construire votre article</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Panel -->
        <div v-show="showPreview || isLargeScreen" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="h-[6vh] min-h-[48px] bg-gray-50 flex items-center border-b w-[90%] mx-auto">
            <h3 class="font-semibold text-gray-700">Aperçu</h3>
          </div>
          <div class="w-[90%] mx-auto space-y-[2vh] py-[2vh]">
            <h1 class="text-2xl font-bold text-gray-800">{{ articleForm.title || 'Titre de l\'article' }}</h1>
            <div class="flex flex-wrap gap-[0.5vw]">
              <span
                v-for="tagId in articleForm.tags"
                :key="tagId"
                class="text-xs bg-blue-100 text-blue-600 rounded-full"
              >
                {{ getTagName(tagId) }}
              </span>
            </div>
            <div v-for="section in articleForm.sections" :key="section.id" class="space-y-[2vh]">
              <!-- Bio Preview -->
              <div v-if="section.type === 'bio'" class="text-gray-600 leading-relaxed">
                {{ section.content || 'Texte de présentation...' }}
              </div>
              <!-- Full Image Preview -->
              <div v-if="section.type === 'full-image'" class="w-full">
                <img v-if="section.image" :src="section.image" :alt="section.alt" class="w-full rounded-lg" />
                <div v-else class="h-[20vh] min-h-[160px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <span class="text-gray-400">Image pleine largeur</span>
                </div>
              </div>
              <!-- Text-Image Preview -->
              <div v-if="section.type === 'text-image'" class="grid grid-cols-2 gap-[1vw]">
                <div>
                  <h3 v-if="section.title" class="font-semibold mb-[1vh]">{{ section.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ section.content || 'Texte...' }}</p>
                </div>
                <div>
                  <img v-if="section.image" :src="section.image" class="w-full rounded-lg" />
                  <div v-else class="h-[15vh] min-h-[120px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400 text-sm">Image</span>
                  </div>
                </div>
              </div>
              <!-- Image-Text Preview -->
              <div v-if="section.type === 'image-text'" class="grid grid-cols-2 gap-[1vw]">
                <div>
                  <img v-if="section.image" :src="section.image" class="w-full rounded-lg" />
                  <div v-else class="h-[15vh] min-h-[120px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400 text-sm">Image</span>
                  </div>
                </div>
                <div>
                  <h3 v-if="section.title" class="font-semibold mb-[1vh]">{{ section.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ section.content || 'Texte...' }}</p>
                </div>
              </div>
              <!-- Double Image Preview -->
              <div v-if="section.type === 'double-image'" class="grid grid-cols-2 gap-[1vw]">
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
            <tr v-for="tag in tags" :key="tag.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                  {{ tag.name }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-600">
                {{ getArticleCountForTag(tag.id) }} articles
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
            class="px-4 py-2 bg-[var(--bg-1)] text-white rounded-lg hover:bg-[var(--bg-1)]/90"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'BlogView',
  setup() {
    const activeView = ref('articles')
    const showEditor = ref(false)
    const showPreview = ref(false)
    const showSectionMenu = ref(false)
    const showTagModal = ref(false)
    const searchQuery = ref('')
    const tagFilter = ref('')
    const statusFilter = ref('')
    const newTagName = ref('')
    const editingArticle = ref(null)
    const isLargeScreen = ref(window.innerWidth >= 1024)

    // Section options
    const sectionOptions = [
      { type: 'bio', label: 'Bio', description: 'Texte de présentation', icon: 'description' },
      { type: 'full-image', label: 'Full Image', description: 'Image pleine largeur', icon: 'panorama' },
      { type: 'text-image', label: 'Text-Image', description: 'Texte à gauche, image à droite', icon: 'view_agenda' },
      { type: 'image-text', label: 'Image-Text', description: 'Image à gauche, texte à droite', icon: 'view_agenda' },
      { type: 'double-image', label: 'Double Image', description: 'Deux images côte à côte', icon: 'view_column' }
    ]

    // Mock Data
    const tags = ref([
      { id: 1, name: 'Architecture' },
      { id: 2, name: 'Design Intérieur' },
      { id: 3, name: 'Rénovation' },
      { id: 4, name: 'Conseils' },
      { id: 5, name: 'Tendances' }
    ])

    const articles = ref([
      {
        id: 1,
        title: 'Les tendances architecturales 2026',
        thumbnail: null,
        tags: [1, 5],
        published: true,
        createdAt: '2026-01-20',
        sections: []
      },
      {
        id: 2,
        title: 'Comment choisir son architecte d\'intérieur',
        thumbnail: null,
        tags: [2, 4],
        published: true,
        createdAt: '2026-01-18',
        sections: []
      },
      {
        id: 3,
        title: 'Rénovation écologique : les bonnes pratiques',
        thumbnail: null,
        tags: [3, 4],
        published: false,
        createdAt: '2026-01-15',
        sections: []
      }
    ])

    const articleForm = reactive({
      id: null,
      title: '',
      thumbnail: null,
      tags: [],
      sections: []
    })

    const filteredArticles = computed(() => {
      return articles.value.filter(a => {
        const matchesSearch = searchQuery.value === '' ||
          a.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesTag = tagFilter.value === '' || a.tags.includes(Number(tagFilter.value))
        const matchesStatus = statusFilter.value === '' ||
          (statusFilter.value === 'published' && a.published) ||
          (statusFilter.value === 'draft' && !a.published)
        return matchesSearch && matchesTag && matchesStatus
      })
    })

    function getTagName(tagId) {
      const tag = tags.value.find(t => t.id === tagId)
      return tag ? tag.name : ''
    }

    function getArticleCountForTag(tagId) {
      return articles.value.filter(a => a.tags.includes(tagId)).length
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

    function openArticleEditor(article = null) {
      editingArticle.value = article
      if (article) {
        Object.assign(articleForm, {
          id: article.id,
          title: article.title,
          thumbnail: article.thumbnail,
          tags: [...article.tags],
          sections: JSON.parse(JSON.stringify(article.sections))
        })
      } else {
        Object.assign(articleForm, {
          id: null,
          title: '',
          thumbnail: null,
          tags: [],
          sections: []
        })
      }
      showEditor.value = true
      showPreview.value = false
    }

    function closeEditor() {
      showEditor.value = false
      editingArticle.value = null
    }

    function togglePreview() {
      showPreview.value = !showPreview.value
    }

    function toggleTag(tagId) {
      const index = articleForm.tags.indexOf(tagId)
      if (index === -1) {
        articleForm.tags.push(tagId)
      } else {
        articleForm.tags.splice(index, 1)
      }
    }

    function handleThumbnail(event) {
      const file = event.target.files[0]
      if (file) {
        articleForm.thumbnail = URL.createObjectURL(file)
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
        rightImage: null
      }
      articleForm.sections.push(section)
      showSectionMenu.value = false
    }

    function removeSection(index) {
      articleForm.sections.splice(index, 1)
    }

    function moveSection(index, direction) {
      const newIndex = index + direction
      const sections = articleForm.sections
      ;[sections[index], sections[newIndex]] = [sections[newIndex], sections[index]]
    }

    function handleSectionImage(event, section, field = 'image') {
      const file = event.target.files[0]
      if (file) {
        section[field] = URL.createObjectURL(file)
      }
    }

    function saveArticle(publish) {
      const articleData = {
        ...articleForm,
        published: publish,
        createdAt: articleForm.id ? editingArticle.value.createdAt : new Date().toISOString().split('T')[0]
      }

      if (articleForm.id) {
        const index = articles.value.findIndex(a => a.id === articleForm.id)
        if (index !== -1) {
          articles.value[index] = articleData
        }
      } else {
        articleData.id = Date.now()
        articles.value.unshift(articleData)
      }

      closeEditor()
    }

    function deleteArticle(article) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        articles.value = articles.value.filter(a => a.id !== article.id)
      }
    }

    function createTag() {
      if (newTagName.value.trim()) {
        tags.value.push({
          id: Date.now(),
          name: newTagName.value.trim()
        })
        newTagName.value = ''
        showTagModal.value = false
      }
    }

    function deleteTag(tag) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce tag ?')) {
        tags.value = tags.value.filter(t => t.id !== tag.id)
        // Remove tag from all articles
        articles.value.forEach(a => {
          a.tags = a.tags.filter(t => t !== tag.id)
        })
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
      activeView,
      showEditor,
      showPreview,
      showSectionMenu,
      showTagModal,
      searchQuery,
      tagFilter,
      statusFilter,
      newTagName,
      isLargeScreen,
      sectionOptions,
      tags,
      articles,
      filteredArticles,
      articleForm,
      getTagName,
      getArticleCountForTag,
      formatDate,
      getSectionLabel,
      openArticleEditor,
      closeEditor,
      togglePreview,
      toggleTag,
      handleThumbnail,
      addSection,
      removeSection,
      moveSection,
      handleSectionImage,
      saveArticle,
      deleteArticle,
      createTag,
      deleteTag
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
