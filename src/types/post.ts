export interface IPost {
  _id: string

  title: string
  description?: string

  picture?: string

  content: string

  tags: string[]

  createdAt: Date
  updatedAt?: Date
}
