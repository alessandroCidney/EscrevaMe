import { defineStore } from 'pinia'

type TPopupTypes = 'info' | 'error' | 'success'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    active: false,
    message: '',
    type: 'success' as TPopupTypes,

    icons: {
      info: 'mdi-information',
      success: 'mdi-check-circle',
      error: 'mdi-alert-circle',
    },
  }),

  actions: {
    showPopup (message: string, type: TPopupTypes) {
      this.message = message
      this.type = type
      this.active = true
    },

    closePopup () {
      this.active = false
    },

    showErrorPopup (message?: string) {
      this.showPopup(message ?? 'Unidentified error', 'error')
    },

    showSuccessPopup (message: string) {
      this.showPopup(message, 'success')
    },

    showInfoPopup (message: string) {
      this.showPopup(message, 'info')
    },
  },
})
