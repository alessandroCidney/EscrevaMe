import type { IPost } from '@/types/post'

import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'

export function usePostsCrud () {
  return useFirestoreCrud<IPost>('posts')
}
