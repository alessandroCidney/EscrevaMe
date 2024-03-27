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

import { useNuxtApp } from '#imports'

type TFirestoreItemBase = Record<string, any>

type TDefaultFirestoreItem <T> = Omit<T, '_id'> & {
  _id: string
}

type TPartialDefaultFirestoreItem <T> = Omit<Partial<T>, '_id'> & {
  _id?: string
}

export function useFirestoreCrud <TBaseType extends TDefaultFirestoreItem<TFirestoreItemBase>> (
  basePath: string,
  converter?: FirestoreDataConverter<TBaseType>,
) {
  const nuxtApp = useNuxtApp()

  async function create (_id: string, data: TDefaultFirestoreItem<TBaseType>) {
    const docRef = doc(nuxtApp.$firestore, basePath, _id)
    await setDoc(docRef, data)
    return { ...data, _id } as TBaseType
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
    await updateDoc(docRef, data)
    return { ...data }
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
