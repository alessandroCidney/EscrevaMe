<template>
  <div class="py-10 fillWidth">
    {{ currentPrivacyPolicy?.content ?? 'Nenhum conteúdo' }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useMainStore } from '@/store'

import { usePoliciesCrud } from '@/composables/usePoliciesCrud'
import type { IPolicy } from '@/types/policies'

import { defaultErrorHandling } from '@/utils/error'

const mainStore = useMainStore()

const policiesCrud = usePoliciesCrud()

const currentPrivacyPolicy = ref<IPolicy | null>(null)

onMounted(() => {
  loadPrivacyPolicy()
})

async function loadPrivacyPolicy () {
  try {
    mainStore.setOverlay(true)
    currentPrivacyPolicy.value = await policiesCrud.get('privacy-policy')
  } catch (err) {
    defaultErrorHandling(err)
  } finally {
    mainStore.setOverlay(false)
  }
}
</script>
