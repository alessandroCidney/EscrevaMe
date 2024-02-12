<template>
  <input type="file" @input="handleSave">
</template>

<script setup lang="ts">
import { useUsersCrud } from '@/composables/useUsersCrud'

import { useAccountStore } from '@/store/account'

import { useRoute } from '#imports'

const route = useRoute()

const accountStore = useAccountStore()

const usersCrud = useUsersCrud()

async function handleSave (event: Event) {
  if (event.target instanceof HTMLInputElement && typeof route.params.userId === 'string' && event.target.files?.[0]) {
    await usersCrud.updateProfilePhoto(route.params.userId, event.target.files[0])

    const updatedUserData = await usersCrud.get(route.params.userId)
    accountStore.setDatabaseUser(updatedUserData)
  }
}
</script>
