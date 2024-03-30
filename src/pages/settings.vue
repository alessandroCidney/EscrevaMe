<template>
  <tabs-page>
    <template #tabs>
      <v-tab>
        Account
      </v-tab>

      <v-tab>
        Security
      </v-tab>
    </template>

    <template #windows>
      <v-window-item>
        <account-tab />
      </v-window-item>

      <v-window-item>
        <security-tab />
      </v-window-item>
    </template>
  </tabs-page>
</template>

<script lang="ts" setup>
import TabsPage from '@/components/commons/TabsPage.vue'
import AccountTab from '@/components/pages/settings/tabs/AccountTab.vue'
import SecurityTab from '@/components/pages/settings/tabs/SecurityTab.vue'

import { definePageMeta } from '#imports'

definePageMeta({
  requiresAuth: true,
})
</script>
