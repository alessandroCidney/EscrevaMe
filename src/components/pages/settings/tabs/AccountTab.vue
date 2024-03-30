<template>
  <div>
    <div class="d-flex align-center justify-space-between mt-3">
      <div>
        <h1 class="text-h5 font-weight-bold">
          Account
        </h1>

        <p class="text-subtitle-1 mb-10">
          Update your account data.
        </p>
      </div>
    </div>

    <div>
      <v-form
        v-model:model-value="validModel"
        class="mb-10"
      >
        <v-text-field
          v-model="currentName"
          :rules="[rules.required]"
          variant="underlined"
          label="Name"
        />
      </v-form>

      <v-row>
        <v-col cols="6">
          <div :style="{ width: '100%', height: '200px' }">
            <image-with-loader
              :src="currentBackgroundUrl || '/images/backgrounds/gray_square.svg'"
              width="100%"
              height="100%"
            />
          </div>

          <div class="fillWidth d-flex align-center justify-center">
            <user-avatar
              :src="currentPhotoUrl"
              :style="{ transform: 'translateY(-50%)' }"
              size="200px"
            />
          </div>
        </v-col>

        <v-col cols="6">
          <v-btn
            color="secondary"
            variant="text"
            class="mb-2"
            block
            @click="updatePhotoFile"
          >
            Change profile photo
          </v-btn>

          <v-btn
            color="secondary"
            variant="text"
            class="mb-2"
            block
            @click="updateBackgroundFile"
          >
            Change background photo
          </v-btn>
        </v-col>
      </v-row>

      <div class="d-flex align-center justify-end">
        <v-btn
          :disabled="validModel !== true"
          color="secondary"
          width="200px"
          @click="save"
        >
          Save
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useMainStore } from '@/store'
import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import { useRules } from '@/composables/useRules'

import { useUsersCrud } from '@/composables/useUsersCrud'

import ImageWithLoader from '@/components/commons/ImageWithLoader.vue'
import UserAvatar from '@/components/layouts/default/AppHeader/components/UserAvatar.vue'

import { selectFile } from '@/utils'
import type { IDatabaseUser } from '@/types/user'

const rules = useRules()

const mainStore = useMainStore()
const accountStore = useAccountStore()
const popupStore = usePopupStore()

const usersCrud = useUsersCrud()

const currentName = ref(accountStore.userDisplayName ?? null)

const validModel = ref<boolean | null>(null)

const currentPhotoFile = ref<File | null>(null)
const currentBackgroundFile = ref<File | null>(null)

const currentPhotoUrl = ref(accountStore.userProfilePhotoUrl ?? null)
const currentBackgroundUrl = ref(accountStore.userBackgroundImageUrl ?? null)

function updatePhotoFile () {
  selectFile((file) => {
    currentPhotoFile.value = file
    currentPhotoUrl.value = URL.createObjectURL(file)
  })
}

function updateBackgroundFile () {
  selectFile((file) => {
    currentBackgroundFile.value = file
    currentBackgroundUrl.value = URL.createObjectURL(file)
  })
}

async function save () {
  try {
    mainStore.setOverlay(true)

    if (!accountStore.userId || !accountStore.databaseUser) {
      throw new Error('The user is not authenticated')
    }

    if (!currentName.value) {
      throw new Error('Invalid name')
    }

    const payload: IDatabaseUser = {
      ...accountStore.databaseUser,
      name: currentName.value,
    }

    await usersCrud.update(accountStore.userId, payload)

    if (currentPhotoFile.value) {
      await usersCrud.updateProfilePhoto(accountStore.userId, currentPhotoFile.value)
    }

    if (currentBackgroundFile.value) {
      await usersCrud.updateBackgroundImage(accountStore.userId, currentBackgroundFile.value)
    }

    accountStore.setDatabaseUser({
      ...payload,
      profilePhotoUrl: currentPhotoUrl.value,
      backgroundImageUrl: currentBackgroundUrl.value,
    })

    popupStore.showSuccessPopup('Data updated successfully')
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    mainStore.setOverlay(false)
  }
}
</script>
