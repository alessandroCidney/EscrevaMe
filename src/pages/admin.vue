<template>
  <tabs-page>
    <template #tabs>
      <v-tab>
        Users
      </v-tab>
    </template>

    <template #windows>
      <v-window-item>
        <users-tab />
      </v-window-item>
    </template>
  </tabs-page>
</template>

<script lang="ts" setup>
import TabsPage from '@/components/commons/TabsPage.vue'
import UsersTab from '@/components/pages/admin/tabs/UsersTab/index.vue'

import { definePageMeta } from '#imports'

definePageMeta({
  requiresAuth: true,
  allowedUserRoles: ['Admin'],
})
</script>
