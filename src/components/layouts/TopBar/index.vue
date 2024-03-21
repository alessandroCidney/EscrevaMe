<template>
  <v-app-bar name="app-bar" class="appBar px-6" flat>
    <template #prepend>
      <v-img
        class="cursorPointer"
        src="@/assets/images/logos/black_logo.svg"
        width="130px"
        @click="$router.push('/')"
      />
    </template>

    <template #append>
      <v-btn
        variant="text"
      >
        <v-icon class="mr-1">
          mdi-home
        </v-icon>

        <span>Home</span>
      </v-btn>

      <v-menu v-if="accountStore.isAuthenticated" width="300px">
        <template #activator="{ props }">
          <user-avatar class="cursorPointer" v-bind="props" />
        </template>

        <v-list>
          <v-list-item class="pl-0 mb-4">
            <template #prepend>
              <user-avatar />
            </template>

            <v-list-item-title>
              {{ accountStore.userDisplayName }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ accountStore.userEmail }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item :to="`/users/${accountStore.userId}`">
            <template #prepend>
              <v-icon>
                mdi-account-circle
              </v-icon>
            </template>

            <v-list-item-title>
              Perfil
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="accountStore.signOut">
            <template #prepend>
              <v-icon>
                mdi-arrow-left
              </v-icon>
            </template>

            <v-list-item-title>
              Sair
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        v-else
        prepend-icon="mdi-login"
        color="primary"
        variant="flat"
      >
        Login
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import UserAvatar from './components/UserAvatar.vue'

import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()
</script>
