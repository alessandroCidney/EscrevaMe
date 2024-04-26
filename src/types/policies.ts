import type { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'

export interface IPolicy {
  _id: string

  createdAt: Date
  updatedAt: Date | null

  content: string

  authorId: string
}

export interface IDbPolicy extends Omit<IPolicy, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export const policyConverter: FirestoreDataConverter<IPolicy> = {
  toFirestore: (policy: IPolicy) => ({
    ...policy,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot<IDbPolicy>, options: SnapshotOptions) => {
    const data = snapshot.data(options)

    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate() ?? null,
    }
  },
}
