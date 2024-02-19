<template>
  <div>
    <div :style="{ height: '400px' }">
      <v-parallax
        v-if="accountStore.userBackgroundImageUrl"
        :src="accountStore.userBackgroundImageUrl"
      />
    </div>

    <div :style="{ position: 'relative' }">
      <v-avatar
        :style="{ position: 'absolute', left: '200px', transform: 'translateY(-50%)', border: '5px solid white' }"
        size="250"
      >
        <v-img
          v-if="accountStore.userProfilePhotoUrl"
          :src="accountStore.userProfilePhotoUrl"
          alt="Profile photo"
          cover
        />
      </v-avatar>
    </div>
  </div>
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

async function handleSaveBackground (event: Event) {
  if (event.target instanceof HTMLInputElement && typeof route.params.userId === 'string' && event.target.files?.[0]) {
    await usersCrud.updateBackgroundImage(route.params.userId, event.target.files[0])

    const updatedUserData = await usersCrud.get(route.params.userId)
    accountStore.setDatabaseUser(updatedUserData)
  }
}
</script>
