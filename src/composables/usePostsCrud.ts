import { type IPost, postConverter } from '@/types/post'

import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import { useStorageCrud } from '@/composables/firebase/useStorageCrud'

export function usePostsCrud () {
  const firestoreCrud = useFirestoreCrud<IPost>('posts', postConverter)

  async function createPost (_id: string, data: Parameters<typeof firestoreCrud.create>[1], backgroundPhoto?: File) {
    const savedPost = await firestoreCrud.create(_id, data)

    if (backgroundPhoto) {
      const storageCrud = useStorageCrud(`posts/${_id}/data`)
      await storageCrud.create(backgroundPhoto, 'background_photo')

      const backgroundPhotoUrl = await storageCrud.getFileUrl('background_photo')

      await firestoreCrud.update(_id, { backgroundPhotoUrl })
    }

    return savedPost
  }

  return {
    createPost,
    ...firestoreCrud,
  }
}
