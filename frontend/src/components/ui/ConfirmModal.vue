<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="fixed inset-0 z-[100] flex items-center justify-center" @click.self="handleCancel">
        <div class="absolute inset-0 bg-black/50"></div>
        <div class="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 flex flex-col gap-4 z-10">
          <div class="flex items-start gap-3">
            <span
              class="material-symbols-outlined text-2xl mt-0.5"
              :class="{
                'text-red-500': type === 'danger',
                'text-yellow-500': type === 'warning',
                'text-green-500': type === 'success',
                'text-blue-500': type === 'info',
              }"
            >
              {{ iconName }}
            </span>
            <div class="flex flex-col gap-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
              <p class="text-sm text-gray-600">{{ message }}</p>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-2">
            <button
              v-if="showCancel"
              @click="handleCancel"
              class="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {{ cancelText }}
            </button>
            <button
              @click="handleConfirm"
              class="px-4 py-2 text-sm rounded-lg text-white transition-colors cursor-pointer"
              :class="{
                'bg-red-500 hover:bg-red-600': type === 'danger',
                'bg-yellow-500 hover:bg-yellow-600': type === 'warning',
                'bg-green-500 hover:bg-green-600': type === 'success',
                'bg-blue-500 hover:bg-blue-600': type === 'info',
              }"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ConfirmModal',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: 'Confirmation' },
    message: { type: String, default: '' },
    type: { type: String, default: 'danger', validator: v => ['danger', 'warning', 'success', 'info'].includes(v) },
    confirmText: { type: String, default: 'Confirmer' },
    cancelText: { type: String, default: 'Annuler' },
    showCancel: { type: Boolean, default: true },
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const iconName = computed(() => {
      const icons = { danger: 'warning', warning: 'error', success: 'check_circle', info: 'info' }
      return icons[props.type] || 'info'
    })

    const handleConfirm = () => emit('confirm')
    const handleCancel = () => emit('cancel')

    return { iconName, handleConfirm, handleCancel }
  },
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
