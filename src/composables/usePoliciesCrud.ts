import { useFirestoreCrud } from '@/composables/firebase/useFirestoreCrud'
import type { IPolicy } from '@/types/policies'

export function usePoliciesCrud () {
  function usePrivacyPolicyVersionsCrud () {
    return useFirestoreCrud<IPolicy>('policies/privacy-policy/versions')
  }

  function useTermsOfUseVersionsCrud () {
    return useFirestoreCrud<IPolicy>('policies/terms-of-use/versions')
  }

  return {
    ...useFirestoreCrud<IPolicy>('policies'),
    usePrivacyPolicyVersionsCrud,
    useTermsOfUseVersionsCrud,
  }
}
