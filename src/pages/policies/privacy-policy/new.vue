<template>
  <post-edit-page
    v-model:title="title"
    v-model:content="content"
    :initial-photo-url="null"
    :allow-images="false"
    readonly-title
    @save="save"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import { useRouter, definePageMeta } from '#imports'

import { useMainStore } from '@/store/index'
import { useAccountStore } from '@/store/account'

import { usePoliciesCrud } from '@/composables/usePoliciesCrud'

import PostEditPage from '@/components/pages/PostEditPage.vue'

import { defaultErrorHandling } from '@/utils/error'

definePageMeta({
  requiresAuth: true,
})

const mainStore = useMainStore()
const accountStore = useAccountStore()

const policiesCrud = usePoliciesCrud().usePrivacyPolicyVersionsCrud()
const router = useRouter()

const title = ref('Política de Privacidade')
const content = ref('')

async function save () {
  try {
    mainStore.setOverlay(true)

    if (!accountStore.authUser?.uid) {
      throw new Error('The user is not authenticated')
    }

    const policyId = uuidv4()

    await policiesCrud.create(policyId, {
      _id: policyId,
      authorId: accountStore.authUser.uid,
      content: content.value,
      createdAt: new Date(),
      updatedAt: null,
    })

    await router.push('/policies/privacy-policy')
  } catch (err) {
    defaultErrorHandling(err)
  } finally {
    mainStore.setOverlay(false)
  }
}
</script>

<style lang="scss">
.postEditorTitle {
  input {
    font-size: 30px !important;
  }
}
</style>
