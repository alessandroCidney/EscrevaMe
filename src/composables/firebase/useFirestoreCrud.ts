import {
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  query,
  updateDoc,
  deleteDoc,
  type QueryConstraint,
  type FirestoreDataConverter,
} from 'firebase/firestore'

import { type Optional } from '@/types'

import { useNuxtApp } from '#imports'

type TFirestoreItemBase = Record<string, any>

type TDefaultFirestoreItem <T> = Omit<T, '_id'> & {
  _id: string
  createdAt: Date
  updatedAt: Date | null
}

type TPartialDefaultFirestoreItem <T> = Omit<Partial<T>, '_id'> & {
  _id?: string
}

export function useFirestoreCrud <TBaseType extends TDefaultFirestoreItem<TFirestoreItemBase>> (
  basePath: string,
  converter?: FirestoreDataConverter<TBaseType>,
) {
  const nuxtApp = useNuxtApp()

  async function create (
    _id: string,
    data: Optional<TDefaultFirestoreItem<TBaseType>, 'createdAt' | 'updatedAt'>,
  ) {
    const docRef = doc(nuxtApp.$firestore, basePath, _id)

    const payload = { ...data, createdAt: new Date(), updatedAt: null, _id }
    await setDoc(docRef, payload)

    return payload as TBaseType
  }

  async function get (_id: string) {
    const docRef = converter
      ? doc(nuxtApp.$firestore, basePath, _id).withConverter(converter)
      : doc(nuxtApp.$firestore, basePath, _id)

    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()

    if (docData) {
      return ({ _id, ...docSnap.data() }) as TBaseType
    } else {
      throw new Error('Not found')
    }
  }

  async function list (...customQuery: QueryConstraint[]) {
    const collectionRef = converter
      ? collection(nuxtApp.$firestore, basePath).withConverter(converter)
      : collection(nuxtApp.$firestore, basePath)

    const queryRef = query(collectionRef, ...customQuery)
    const querySnapshot = await getDocs(queryRef)

    return querySnapshot.docs
      .map(querySnapshotItem => ({ _id: querySnapshotItem.id, ...querySnapshotItem.data() })) as TBaseType[]
  }

  async function update (_id: string, data: TPartialDefaultFirestoreItem<TBaseType>) {
    const docRef = doc(nuxtApp.$firestore, basePath, _id)

    const payload = { ...data, updatedAt: new Date() }
    await updateDoc(docRef, payload)

    return { ...payload }
  }

  async function remove (_id: string) {
    const docRef = converter
      ? doc(nuxtApp.$firestore, basePath, _id).withConverter(converter)
      : doc(nuxtApp.$firestore, basePath, _id)

    return await deleteDoc(docRef)
  }

  return {
    create,
    get,
    list,
    update,
    remove,
  }
}
