<template>
  <tabs-page>
    <template #tabs>
      <v-tab>
        Account
      </v-tab>
    </template>

    <template #windows>
      <v-window-item>
        <account-tab />
      </v-window-item>
    </template>
  </tabs-page>
</template>

<script lang="ts" setup>
import TabsPage from '@/components/commons/TabsPage.vue'
import AccountTab from '@/components/pages/settings/tabs/AccountTab.vue'

import { definePageMeta } from '#imports'

definePageMeta({
  requiresAuth: true,
})
</script>
