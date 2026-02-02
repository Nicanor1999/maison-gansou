<template>
  <div class="min-h-screen w-full flex flex-col bg-black">
    <div ref="viewContainer">
      <router-view></router-view>
    </div>

    <!-- Modal de confirmation globale -->
    <ConfirmModal
      :visible="modalState.visible"
      :title="modalState.title"
      :message="modalState.message"
      :type="modalState.type"
      :confirmText="modalState.confirmText"
      :cancelText="modalState.cancelText"
      :showCancel="modalState.showCancel"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />

    <!-- Loader avec animation Lottie -->
    <div v-if="ui.isLoading" class="fixed inset-0 bg-[var(--bg-hidden)] flex items-center justify-center z-50">
      <div class="flex flex-col items-center gap-4">
        <Vue3Lottie
          :animationData="loaderAnimation"
          :height="200"
          :width="200"
          :loop="true"
        />
        <p class="text-white text-lg font-medium">Chargement...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { Vue3Lottie } from 'vue3-lottie'
import loaderAnimation from '@/assets/MG.json'
import { useUiStore } from '@/stores/ui'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import { useConfirmModal } from '@/composables/useConfirmModal'

const ui = useUiStore()
const { modalState, handleConfirm, handleCancel } = useConfirmModal()
const router = useRouter()
const viewContainer = ref(null)

/**
 * Attend que toutes les images (img src + background-image) du conteneur soient chargées
 */
const waitForImages = (container) => {
  if (!container) return Promise.resolve()
  const promises = []

  container.querySelectorAll('img[src]').forEach((img) => {
    if (!img.complete) {
      promises.push(new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
      }))
    }
  })

  container.querySelectorAll('[style*="background-image"]').forEach((el) => {
    const match = el.style.backgroundImage.match(/url\(["']?(.+?)["']?\)/)
    if (match) {
      promises.push(new Promise((resolve) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = resolve
        img.src = match[1]
      }))
    }
  })

  return Promise.all(promises)
}

let observer = null
let safetyTimeout = null

const hideLoaderWhenReady = () => {
  if (observer) { observer.disconnect(); observer = null }
  if (safetyTimeout) { clearTimeout(safetyTimeout); safetyTimeout = null }

  // Sécurité : cacher le loader après 8s max
  safetyTimeout = setTimeout(() => {
    if (observer) { observer.disconnect(); observer = null }
    ui.hideLoader()
  }, 8000)

  const checkReady = async () => {
    await nextTick()
    const container = viewContainer.value
    if (!container) { ui.hideLoader(); return }

    // Laisser Vue rendre le contenu après un fetch
    await new Promise(r => setTimeout(r, 150))
    await waitForImages(container)

    if (safetyTimeout) { clearTimeout(safetyTimeout); safetyTimeout = null }
    if (observer) { observer.disconnect(); observer = null }
    ui.hideLoader()
  }

  nextTick(() => {
    const container = viewContainer.value
    if (!container) { ui.hideLoader(); return }

    // Observer les ajouts dans le DOM (contenu rendu après un fetch API)
    observer = new MutationObserver(() => {
      checkReady()
    })
    observer.observe(container, { childList: true, subtree: true })

    // Vérifier immédiatement si le contenu est déjà présent
    checkReady()
  })
}

router.afterEach(() => {
  hideLoaderWhenReady()
})
</script>

<style>
#app {
  display: flex;
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
</style>
