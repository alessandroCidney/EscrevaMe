import { where } from 'firebase/firestore'

import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import { useStorageCrud } from '@/composables/firebase/useStorageCrud'

import { type IPost, postConverter, type IPostComment, postCommentConverter } from '@/types/post'
import { type IDatabaseUser } from '@/types/user'
import { type Optional } from '@/types'

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

  function listSavedPosts (userData: IDatabaseUser) {
    if (userData.savedPosts.length === 0) {
      return []
    }

    return firestoreCrud.list(
      where('private', '==', false),
      where('_id', 'in', userData.savedPosts),
    )
  }

  async function createPost (_id: string, data: Parameters<typeof firestoreCrud.create>[1], backgroundPhoto: File | null) {
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

  function like (postData: IPost, userId: string) {
    const likedBy = [...postData.likedBy]

    if (likedBy.includes(userId)) {
      throw new Error('Already liked')
    }

    likedBy.push(userId)

    return firestoreCrud.update(postData._id, { ...postData, likedBy }, false)
  }

  function unlike (postData: IPost, userId: string) {
    const likedBy = [...postData.likedBy]

    if (!likedBy.includes(userId)) {
      throw new Error('Not liked yet')
    }

    const likedIndex = likedBy.findIndex(likedUserId => likedUserId === userId)

    likedBy.splice(likedIndex, 1)

    return firestoreCrud.update(postData._id, { ...postData, likedBy }, false)
  }

  async function createComment (
    postId: string,
    commentId: string,
    commentData: Optional<IPostComment, 'createdAt' | 'updatedAt'>,
  ) {
    const commentsFirestoreCrud = useFirestoreCrud<IPostComment>(`posts/${postId}/comments`, postCommentConverter)

    return await commentsFirestoreCrud.create(commentId, commentData)
  }

  function listComments (postId: string) {
    const commentsFirestoreCrud = useFirestoreCrud<IPostComment>(`posts/${postId}/comments`, postCommentConverter)
    return commentsFirestoreCrud.list()
  }

  function updateComment (
    postId: string,
    commentId: string,
    commentData: IPostComment,
  ) {
    const commentsFirestoreCrud = useFirestoreCrud<IPostComment>(`posts/${postId}/comments`, postCommentConverter)

    commentsFirestoreCrud.update(commentId, commentData)
  }

  function likeComment (
    postId: string,
    userId: string,
    commentData: IPostComment,
  ) {
    const commentsFirestoreCrud = useFirestoreCrud<IPostComment>(`posts/${postId}/comments`, postCommentConverter)

    const likedBy = [...commentData.likedBy]

    if (likedBy.includes(userId)) {
      throw new Error('Already liked')
    }

    likedBy.push(userId)

    return commentsFirestoreCrud.update(commentData._id, { ...commentData, likedBy }, false)
  }

  function unlikeComment (
    postId: string,
    userId: string,
    commentData: IPostComment,
  ) {
    const commentsFirestoreCrud = useFirestoreCrud<IPostComment>(`posts/${postId}/comments`, postCommentConverter)

    const likedBy = [...commentData.likedBy]

    if (!likedBy.includes(userId)) {
      throw new Error('Not liked yet')
    }

    const likedIndex = likedBy.findIndex(likedUserId => likedUserId === userId)

    likedBy.splice(likedIndex, 1)

    return commentsFirestoreCrud.update(commentData._id, { ...commentData, likedBy }, false)
  }

  function removeComent (
    postId: string,
    commentId: string,
  ) {
    const commentsFirestoreCrud = useFirestoreCrud<IPostComment>(`posts/${postId}/comments`, postCommentConverter)

    return commentsFirestoreCrud.update(commentId, {
      removed: true,
      authorId: null,
      content: null,
    })
  }

  return {
    createPost,
    updatePost,

    listPublicPosts,
    listFollowingPosts,
    listSavedPosts,
    listUserPosts,

    like,
    unlike,

    listComments,
    createComment,
    updateComment,
    removeComent,

    likeComment,
    unlikeComment,

    ...firestoreCrud,
  }
}
