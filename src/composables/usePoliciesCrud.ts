import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import type { IPolicy } from '@/types/policies'

export function usePoliciesCrud () {
  function usePrivacyPolicyCrud () {
    return useFirestoreCrud<IPolicy>('policies/privacy-policy')
  }

  function useTermsOfUseCrud () {
    return useFirestoreCrud<IPolicy>('policies/terms-of-use')
  }

  return {
    usePrivacyPolicyCrud,
    useTermsOfUseCrud,
  }
}
