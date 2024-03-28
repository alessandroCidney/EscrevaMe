import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    appOverlay: false,
  }),

  actions: {
    setOverlay (bool: boolean) {
      this.appOverlay = bool
    },
  },
})
