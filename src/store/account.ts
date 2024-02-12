import { defineStore } from 'pinia'

import type { User } from 'firebase/auth'

export interface IDatabaseUser {
  _id: string
  name: string
  role: string
  createdAt: Date

  photoUrl: string
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

    userProfilePhotoUrl (state) {
      return state.databaseUser?.photoUrl || state.authUser?.photoURL
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
