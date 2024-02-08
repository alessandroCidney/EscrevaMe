import type { IDatabaseUser } from '@/store/account'

import { useFirestoreCrud } from '@/composables/useFirestoreCrud'

export function useUsersCrud () {
  return useFirestoreCrud<IDatabaseUser>('users')
}
