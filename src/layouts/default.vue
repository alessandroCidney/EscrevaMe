<template>
  <v-layout ref="app" class="defaultLayout">
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
          class="text-none"
        >
          <v-icon class="mr-1">
            mdi-home
          </v-icon>

          <span>Home</span>
        </v-btn>

        <v-btn
          variant="text"
          class="text-none"
        >
          <v-icon class="mr-1">
            mdi-plus-box
          </v-icon>

          <span>New Post</span>
        </v-btn>

        <v-avatar
          v-if="accountStore.isAuthenticated"
          size="40"
          class="ml-5"
          @click="$router.push(`/users/${accountStore.authUser?.uid}`)"
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

    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()
</script>

<style lang="scss">
.defaultLayout {
  .appBar {
    // border-bottom: 1px solid rgb(219, 219, 219);
    position: relative;

    background-color: rgb(255, 255, 255) !important;

    border-bottom: 1px solid #e5e5e5;
    // backdrop-filter: blur(5px);

    > .v-toolbar__content {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      .v-toolbar__prepend {
        margin-inline: 0 0 !important;

        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      .v-toolbar__append {
        margin-inline: 0 0 !important;

        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      .logoArea {
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
}
</style>
