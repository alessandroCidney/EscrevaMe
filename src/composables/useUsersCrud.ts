import type { IDatabaseUser } from '@/store/account'

import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import { useStorageCrud } from '@/composables/firebase/useStorageCrud'

export function useUsersCrud () {
  const firestoreCrud = useFirestoreCrud<IDatabaseUser>('users')

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
    getProfilePhoto,
    updateProfilePhoto,
    getBackgroundImage,
    updateBackgroundImage,
  }
}
