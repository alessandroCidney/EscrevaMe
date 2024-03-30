<template>
  <v-app-bar name="app-bar" class="appBar px-5" flat>
    <template #prepend>
      <v-img
        class="cursorPointer"
        src="@/assets/images/logos/blue_logo.svg"
        width="130px"
        @click="$router.push('/home')"
      />
    </template>

    <template #append>
      <v-btn
        v-if="accountStore.isAuthenticated && accountStore.userRole === 'Admin'"
        color="secondary"
        class="mx-2"
        variant="text"
        @click="$router.push('/admin')"
      >
        Admin panel
      </v-btn>

      <v-menu v-if="accountStore.isAuthenticated" width="300px">
        <template #activator="{ props }">
          <user-avatar
            :src="accountStore.userProfilePhotoUrl"
            :name="accountStore.userDisplayName"
            class="cursorPointer"
            v-bind="props"
          />
        </template>

        <v-list>
          <v-list-item class="pl-0 mb-4">
            <template #prepend>
              <user-avatar
                :src="accountStore.userProfilePhotoUrl"
                :name="accountStore.userDisplayName"
                class="ml-3"
              />
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
              Profile
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/settings">
            <template #prepend>
              <v-icon>
                mdi-cog
              </v-icon>
            </template>

            <v-list-item-title>
              Settings
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

      <template v-else>
        <v-btn
          variant="text"
          color="secondary"
          @click="$router.push('/login')"
        >
          Sign in
        </v-btn>

        <v-btn
          variant="text"
          color="secondary"
          @click="$router.push('/signup')"
        >
          Join us
        </v-btn>
      </template>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import UserAvatar from './components/UserAvatar.vue'

import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()
</script>
