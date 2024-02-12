import type { Auth } from 'firebase/auth'

import { useUsersCrud } from '@/composables/useUsersCrud'

import { useAccountStore } from '@/store/account'

import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const accountStore = useAccountStore()

  const auth = nuxtApp.$auth as Auth

  const usersCrud = useUsersCrud()

  await new Promise<void>((resolve, reject) => {
    auth.onAuthStateChanged(async (authUser) => {
      try {
        if (authUser) {
          const databaseUser = await usersCrud.get(authUser.uid)

          accountStore.setAuthUser(authUser)
          accountStore.setDatabaseUser(databaseUser)
        }

        resolve()
      } catch (err) {
        reject(err)
      }
    })
  })
})
