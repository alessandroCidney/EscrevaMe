import type { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'

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

export class PostModel {
  _id!: IPost['_id']

  title!: IPost['title']

  content!: IPost['content']

  backgroundPhotoUrl!: IPost['backgroundPhotoUrl']

  authorId!: IPost['authorId']

  tags!: IPost['tags']

  createdAt!: IPost['createdAt']
  updatedAt!: IPost['updatedAt']

  likedBy!: IPost['likedBy']

  private!: IPost['private']

  constructor (post: IPost) {
    this._id = post._id
    this.title = post.title
    this.content = post.content
    this.backgroundPhotoUrl = post.backgroundPhotoUrl
    this.authorId = post.authorId
    this.tags = post.tags
    this.createdAt = post.createdAt
    this.updatedAt = post.updatedAt
    this.likedBy = post.likedBy
    this.private = post.private
  }
}

export const postConverter: FirestoreDataConverter<PostModel> = {
  toFirestore: (post: PostModel) => ({
    ...post,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot<IDbPost>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    return new PostModel({
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate() ?? null,
    })
  },
}
