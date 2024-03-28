import type { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'

export interface IDatabaseUser {
  _id: string
  name: string
  active: boolean
  role: string

  profilePhotoUrl: string | null
  backgroundImageUrl: string | null

  createdAt: Date
  updatedAt: Date | null

  firstLogin: boolean
}

export interface IPrivateDatabaseUserData {
  _id: string
  email?: string
}

export type TPartialNewUser = Omit<IDatabaseUser, '_id'> & {
  email: string
  password: string
}

export interface IFirestoreUser extends Omit<IDatabaseUser, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export class UserModel {
  _id!: IDatabaseUser['_id']
  name!: IDatabaseUser['name']
  active: IDatabaseUser['active']
  role!: IDatabaseUser['role']
  createdAt!: IDatabaseUser['createdAt']
  updatedAt: IDatabaseUser['updatedAt']

  profilePhotoUrl: IDatabaseUser['profilePhotoUrl']
  backgroundImageUrl: IDatabaseUser['backgroundImageUrl']

  firstLogin!: IDatabaseUser['firstLogin']

  constructor (user: IDatabaseUser) {
    this._id = user._id
    this.name = user.name
    this.active = user.active
    this.role = user.role
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    this.profilePhotoUrl = user.profilePhotoUrl
    this.backgroundImageUrl = user.backgroundImageUrl
    this.firstLogin = user.firstLogin
  }
}

export const userConverter: FirestoreDataConverter<UserModel> = {
  toFirestore: (user: UserModel) => ({
    ...user,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot<IFirestoreUser>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    return new UserModel({
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate() ?? null,
    })
  },
}
