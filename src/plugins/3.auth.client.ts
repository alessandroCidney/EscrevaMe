import { deleteUser, type Auth } from 'firebase/auth'

import { useUsersCrud } from '@/composables/useUsersCrud'

import { useAccountStore } from '@/store/account'

import { ApplicationError } from '@/utils/error'

import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const accountStore = useAccountStore()

  const auth = nuxtApp.$auth as Auth

  const usersCrud = useUsersCrud()

  await new Promise<void>((resolve) => {
    auth.onAuthStateChanged(async (authUser) => {
      try {
        if (authUser) {
          const databaseUser = await usersCrud.get(authUser.uid)

          if (!databaseUser.active) {
            throw new ApplicationError('Disabled user')
          }

          if (databaseUser.firstLogin) {
            databaseUser.profilePhotoUrl = databaseUser.profilePhotoUrl ?? authUser.photoURL
            databaseUser.firstLogin = false

            await usersCrud.update(databaseUser._id, databaseUser)
          }

          accountStore.setAuthUser(authUser)
          accountStore.setDatabaseUser(databaseUser)
        }
      } catch (err) {
        if (err instanceof ApplicationError) {
          accountStore.setAuthUser(undefined)
          accountStore.setDatabaseUser(undefined)
        } else if (authUser) {
          await deleteUser(authUser)
        }
      } finally {
        resolve()
      }
    })
  })
})
