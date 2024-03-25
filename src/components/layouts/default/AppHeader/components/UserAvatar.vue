<template>
  <v-avatar
    size="40"
    class="ml-5"
    v-bind="$attrs"
  >
    <v-img
      v-if="accountStore.userProfilePhotoUrl"
      :src="accountStore.userProfilePhotoUrl"
      alt="Avatar"
      cover
    />

    <span v-else>
      {{ accountStore.databaseUser?.name[0] }}
    </span>
  </v-avatar>
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()
</script>
