import { defineStore } from 'pinia'

import type { User } from 'firebase/auth'

export interface IDatabaseUser {
  _id: string
  name: string
  role: string
  createdAt: Date
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    authUser: undefined as User | undefined,
    databaseUser: undefined as IDatabaseUser | undefined,
  }),

  getters: {
    isAuthenticated (state) {
      return !!state.databaseUser
    },
  },

  actions: {
    setAuthUser (value: typeof this.authUser) {
      this.authUser = value
    },

    setDatabaseUser (value: typeof this.databaseUser) {
      this.databaseUser = value
    },
  },
})
