import { doc, collection, getDoc, getDocs, addDoc, setDoc, query, type QueryConstraint, updateDoc } from 'firebase/firestore'

import { useNuxtApp } from '#imports'

type TFirestoreItemBase = Record<string, any>

type TDefaultFirestoreItem <T> = T & {
  _id: string
}

type TPartialDefaultFirestoreItem <T> = Omit<Partial<T>, '_id'> & {
  _id?: string
}

export function useFirestoreCrud <TBaseType extends TDefaultFirestoreItem<TFirestoreItemBase>> (basePath: string) {
  const nuxtApp = useNuxtApp()

  async function create (data: TPartialDefaultFirestoreItem<TBaseType>, _id?: string) {
    if (_id) {
      const docRef = doc(nuxtApp.$firestore, basePath, _id)
      await setDoc(docRef, data)
      return { ...data, _id } as TBaseType
    } else {
      const collectionRef = collection(nuxtApp.$firestore, basePath)
      const docRef = await addDoc(collectionRef, data)
      return { ...data, _id: docRef.id } as TBaseType
    }
  }

  async function get (_id: string) {
    const docRef = doc(nuxtApp.$firestore, basePath, _id)
    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()

    if (docData) {
      return ({ _id, ...docSnap.data() }) as TBaseType
    } else {
      throw new Error('Not found')
    }
  }

  async function list (...customQuery: QueryConstraint[]) {
    const collectionRef = collection(nuxtApp.$firestore, basePath)
    const queryRef = query(collectionRef, ...customQuery)
    const querySnapshot = await getDocs(queryRef)

    return querySnapshot.docs
      .map(querySnapshotItem => ({ _id: querySnapshotItem.id, ...querySnapshotItem.data() })) as TBaseType[]
  }

  async function update (_id: string, data: TPartialDefaultFirestoreItem<TBaseType>) {
    const docRef = doc(nuxtApp.$firestore, basePath, _id)
    await updateDoc(docRef, data)
  }

  return {
    create,
    get,
    list,
    update,
  }
}
