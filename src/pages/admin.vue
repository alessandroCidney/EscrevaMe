<template>
  <div class="adminUserPage py-10">
    <div class="d-flex contentContainer px-16">
      <v-tabs
        v-model="adminUserPageTab"
        direction="vertical"
      >
        <v-tab>
          Usuários
        </v-tab>
      </v-tabs>

      <v-window
        v-model="adminUserPageTab"
        class="px-5 px-10"
        :style="{ flex: '1 1 0' }"
      >
        <v-window-item>
          <users-tab />
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UsersTab from '@/components/pages/admin/tabs/UsersTab/index.vue'

import { definePageMeta } from '#imports'

definePageMeta({
  requiresAuth: true,
  allowedUserRoles: ['Admin'],
})

const adminUserPageTab = ref<number | null>(null)
</script>

<style lang="scss" scoped>
.adminUserPage {
  .contentContainer {
    max-width: 1500px;

    margin: 0 auto
  }
}
</style>
