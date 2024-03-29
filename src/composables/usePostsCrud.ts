import { where } from 'firebase/firestore'

import { type IPost, postConverter } from '@/types/post'

import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import { useStorageCrud } from '@/composables/firebase/useStorageCrud'

export function usePostsCrud () {
  const firestoreCrud = useFirestoreCrud<IPost>('posts', postConverter)

  function listPublicPosts () {
    return firestoreCrud.list(where('private', '==', false))
  }

  function listUserPosts (authorId: string, listPrivate = false) {
    return firestoreCrud.list(where('authorId', '==', authorId), where('private', '==', listPrivate))
  }

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

  async function updatePost (_id: string, data: Parameters<typeof firestoreCrud.update>[1], backgroundPhoto?: File) {
    await firestoreCrud.update(_id, data)

    if (backgroundPhoto) {
      const storageCrud = useStorageCrud(`posts/${_id}/data`)
      await storageCrud.update(_id, backgroundPhoto, 'background_photo')

      const backgroundPhotoUrl = await storageCrud.getFileUrl('background_photo')

      await firestoreCrud.update(_id, { backgroundPhotoUrl })
    }
  }

  return {
    createPost,
    updatePost,
    listPublicPosts,
    listUserPosts,
    ...firestoreCrud,
  }
}
