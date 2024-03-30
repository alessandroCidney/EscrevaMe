import { where } from 'firebase/firestore'

import { type IPost, postConverter } from '@/types/post'

import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import { useStorageCrud } from '@/composables/firebase/useStorageCrud'

import type { IDatabaseUser } from '@/types/user'

export function usePostsCrud () {
  const firestoreCrud = useFirestoreCrud<IPost>('posts', postConverter)

  function listPublicPosts () {
    return firestoreCrud.list(where('private', '==', false))
  }

  function listUserPosts (authorId: string, listPrivate?: boolean) {
    const queries = [where('authorId', '==', authorId)]

    if (typeof listPrivate === 'boolean') {
      queries.push(where('private', '==', listPrivate))
    }

    return firestoreCrud.list(...queries)
  }

  function listFollowingPosts (userData: IDatabaseUser) {
    if (userData.following.length === 0) {
      return []
    }

    return firestoreCrud.list(
      where('private', '==', false),
      where('authorId', 'in', userData.following),
    )
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
    listFollowingPosts,
    listUserPosts,
    ...firestoreCrud,
  }
}
