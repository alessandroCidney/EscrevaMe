import { doc, getDoc } from 'firebase/firestore'

import { useNuxtApp } from '#imports'

export function useFirestoreCrud <TBaseType> (basePath: string) {
  const nuxtApp = useNuxtApp()

  async function get (_id: string) {
    const docRef = doc(nuxtApp.$firestore, basePath, _id)
    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()

    if (docData) {
      return docSnap.data() as TBaseType
    } else {
      throw new Error('Not found')
    }
  }

  return {
    get,
  }
}
