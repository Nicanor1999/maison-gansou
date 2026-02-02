import { ref } from 'vue'

const modalState = ref({
  visible: false,
  title: 'Confirmation',
  message: '',
  type: 'danger',
  confirmText: 'Confirmer',
  cancelText: 'Annuler',
  showCancel: true,
  resolve: null,
})

export function useConfirmModal() {
  /**
   * Open the confirm modal and return a Promise<boolean>
   * Usage: const ok = await confirm({ title: '...', message: '...' })
   */
  const confirm = (options = {}) => {
    return new Promise((resolve) => {
      modalState.value = {
        visible: true,
        title: options.title || 'Confirmation',
        message: options.message || '',
        type: options.type || 'danger',
        confirmText: options.confirmText || 'Confirmer',
        cancelText: options.cancelText || 'Annuler',
        showCancel: options.showCancel !== false,
        resolve,
      }
    })
  }

  /**
   * Shortcut for alert-style modal (no cancel button)
   */
  const alert = (options = {}) => {
    return confirm({
      showCancel: false,
      confirmText: 'OK',
      type: 'info',
      ...options,
    })
  }

  const handleConfirm = () => {
    if (modalState.value.resolve) modalState.value.resolve(true)
    modalState.value.visible = false
  }

  const handleCancel = () => {
    if (modalState.value.resolve) modalState.value.resolve(false)
    modalState.value.visible = false
  }

  return { modalState, confirm, alert, handleConfirm, handleCancel }
}
