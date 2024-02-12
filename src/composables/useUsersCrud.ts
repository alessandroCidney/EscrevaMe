import type { IDatabaseUser } from '@/store/account'

import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import { useStorageCrud } from '@/composables/firebase/useStorageCrud'

export function useUsersCrud () {
  const firestoreCrud = useFirestoreCrud<IDatabaseUser>('users')

  function getProfilePhoto (userId: string) {
    const storageCrud = useStorageCrud(`users/${userId}/profile`)
    return storageCrud.getFileUrl('profile_photo')
  }

  async function updateProfilePhoto (userId: string, file: File) {
    const storageCrud = useStorageCrud(`users/${userId}/profile`)
    await storageCrud.create(file, 'profile_photo')

    const photoUrl = await storageCrud.getFileUrl('profile_photo')
    await firestoreCrud.update(userId, { photoUrl })
  }

  return {
    ...firestoreCrud,
    getProfilePhoto,
    updateProfilePhoto,
  }
}
