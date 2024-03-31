import type { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'
import type { IDatabaseUser } from './user'

export interface IPost {
  _id: string

  title: string
  description?: string

  content: string

  backgroundPhotoUrl: string | null

  authorId: string

  tags: string[]

  likedBy: string[]

  createdAt: Date
  updatedAt: Date | null

  private: boolean
}

export interface IDbPost extends Omit<IPost, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export const postConverter: FirestoreDataConverter<IPost> = {
  toFirestore: (post: IPost) => ({
    ...post,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot<IDbPost>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate() ?? null,
    }
  },
}

export interface IPostComment {
  _id: string
  content: string | null
  authorId: string | null
  inReplyTo: string | null

  createdAt: Date
  updatedAt: Date | null

  removed: boolean
}

export interface IDbPostComment extends Omit<IPostComment, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export const postCommentConverter: FirestoreDataConverter<IPostComment> = {
  toFirestore: (postComment: IPostComment) => ({
    ...postComment,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot<IDbPostComment>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate() ?? null,
    }
  },
}

export interface IFormattedPostComment extends IPostComment {
  replies: IFormattedPostComment[]
}

export type TPostCommentWithUserData = IPostComment & {
  userData: IDatabaseUser | null
}

export type TFormattedPostCommentWithUserData = Omit<IFormattedPostComment, 'replies'> & {
  replies: TFormattedPostCommentWithUserData[]
  userData: IDatabaseUser | null
}
