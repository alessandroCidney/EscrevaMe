import { v4 as uuidv4 } from 'uuid'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { getFilenameExtension } from '@/utils'

import { useNuxtApp } from '#imports'

export function useStorageCrud (basePath: string) {
  const nuxtApp = useNuxtApp()

  function getFileUrl (filename: string) {
    const storageRef = ref(nuxtApp.$storage, `${basePath}/${filename}`)
    return getDownloadURL(storageRef)
  }

  async function create (file: File, customFilename?: string) {
    const savedFilename = customFilename || `${uuidv4()}.${getFilenameExtension(file.name)}`
    const storageRef = ref(nuxtApp.$storage, `${basePath}/${savedFilename}`)
    await uploadBytes(storageRef, file)
    return savedFilename
  }

  return {
    getFileUrl,
    create,
  }
}
