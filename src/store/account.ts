import { defineStore } from 'pinia'

import type { User } from 'firebase/auth'

import type { IDatabaseUser } from '@/types/user'

import { useNuxtApp } from '#imports'

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
      return state.databaseUser?.profilePhotoUrl
    },

    userBackgroundImageUrl (state) {
      return state.databaseUser?.backgroundImageUrl
    },

    userDisplayName (state) {
      return state.databaseUser?.name
    },

    userEmail (state) {
      return state.authUser?.email
    },

    userId (state) {
      return state.databaseUser?._id
    },

    userCreatedAt (state) {
      return state.databaseUser?.createdAt
    },

    userRole (state) {
      return state.databaseUser?.role
    },
  },

  actions: {
    setAuthUser (value: typeof this.authUser) {
      this.authUser = value
    },

    setDatabaseUser (value: typeof this.databaseUser) {
      this.databaseUser = value
    },

    async signOut () {
      const nuxtApp = useNuxtApp()
      await nuxtApp.$auth.signOut()

      this.authUser = undefined
      this.databaseUser = undefined

      nuxtApp.$router.push('/login')
    },
  },
})
