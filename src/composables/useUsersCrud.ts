import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'

import { type IDatabaseUser, userConverter, type TPartialNewUser, type IPrivateDatabaseUserData } from '@/types/user'

import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import { useStorageCrud } from '@/composables/firebase/useStorageCrud'

import { useNuxtApp } from '#imports'

export function useUsersCrud () {
  const nuxtApp = useNuxtApp()

  const firestoreCrud = useFirestoreCrud<IDatabaseUser>('users', userConverter)

  async function create (partialNewUser: TPartialNewUser) {
    // Secondary app prevents current user logout
    const secondaryApp = nuxtApp.$initializeFirebaseApp('secondaryApp')
    const secondaryAuth = nuxtApp.$getAuth(secondaryApp)

    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, partialNewUser.email, partialNewUser.password)

    await signOut(secondaryAuth)

    await nuxtApp.$deleteApp(secondaryApp)

    const payload: IDatabaseUser = {
      _id: userCredential.user.uid,
      active: partialNewUser.active,
      createdAt: partialNewUser.createdAt,
      name: partialNewUser.name,
      role: partialNewUser.role,
      backgroundImageUrl: partialNewUser.backgroundImageUrl,
      profilePhotoUrl: partialNewUser.profilePhotoUrl,
      updatedAt: partialNewUser.updatedAt,
      firstLogin: partialNewUser.firstLogin,
    }

    const createdUser = await firestoreCrud.create(userCredential.user.uid, payload)

    const privateUserDataCrud = useFirestoreCrud<IPrivateDatabaseUserData>(`users/${userCredential.user.uid}/private`)

    await privateUserDataCrud.create('profile', {
      _id: 'profile',
      email: userCredential.user.email ?? undefined,
    })

    return createdUser
  }

  async function remove (_id: string) {
    const privateUserDataCrud = useFirestoreCrud<IPrivateDatabaseUserData>(`users/${_id}/private`)
    await privateUserDataCrud.remove('profile')

    await firestoreCrud.remove(_id)
  }

  function getPhoto (userId: string, path: string) {
    const storageCrud = useStorageCrud(`users/${userId}/profile`)
    return storageCrud.getFileUrl(path)
  }

  async function updatePhoto (userId: string, path: string, property: string, file: File) {
    const storageCrud = useStorageCrud(`users/${userId}/profile`)
    await storageCrud.create(file, path)

    const profilePhotoUrl = await storageCrud.getFileUrl(path)
    await firestoreCrud.update(userId, { [property]: profilePhotoUrl })
  }

  function getProfilePhoto (userId: string) {
    return getPhoto(userId, 'profile_photo')
  }

  function updateProfilePhoto (userId: string, file: File) {
    return updatePhoto(userId, 'profile_photo', 'profilePhotoUrl', file)
  }

  function getBackgroundImage (userId: string) {
    return getPhoto(userId, 'background_image')
  }

  function updateBackgroundImage (userId: string, file: File) {
    return updatePhoto(userId, 'background_image', 'backgroundImageUrl', file)
  }

  return {
    ...firestoreCrud,
    create,
    remove,
    getProfilePhoto,
    updateProfilePhoto,
    getBackgroundImage,
    updateBackgroundImage,
  }
}
