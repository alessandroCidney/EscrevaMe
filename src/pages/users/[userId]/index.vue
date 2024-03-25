<template>
  <div class="userProfilePage">
    <div :style="{ height: '400px' }">
      <parallax-with-loader
        v-if="accountStore.userBackgroundImageUrl"
        :src="accountStore.userBackgroundImageUrl"
      />
    </div>

    <div class="detailsSection">
      <div class="startArea">
        <v-avatar
          class="profilePhoto"
          size="250"
        >
          <image-with-loader
            v-if="accountStore.userProfilePhotoUrl"
            :src="accountStore.userProfilePhotoUrl"
            alt="Profile photo"
            cover
          />
        </v-avatar>

        <div class="py-7 ml-6">
          <h2 class="text-h4 font-weight-bold mb-3">
            {{ accountStore.userDisplayName }}
          </h2>

          <div v-if="accountStore.userCreatedAt">
            Joined {{ formatDate(accountStore.userCreatedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'

import ImageWithLoader from '@/components/commons/ImageWithLoader.vue'
import ParallaxWithLoader from '@/components/commons/ParallaxWithLoader.vue'

import { useUsersCrud } from '@/composables/useUsersCrud'

import { useAccountStore } from '@/store/account'

import { useRoute, definePageMeta } from '#imports'

definePageMeta({
  requiresAuth: true,
})

const route = useRoute()

const accountStore = useAccountStore()

const usersCrud = useUsersCrud()

function formatDate (date: Date) {
  return moment(date).format('LL')
}

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

<style lang="scss" scoped>
.userProfilePage {
  .detailsSection {
    .startArea {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      max-width: 1200px;

      margin: 0 auto;

      .profilePhoto {
        transform: translateY(-30%);

        border: 5px solid white;
      }
    }
  }
}
</style>
