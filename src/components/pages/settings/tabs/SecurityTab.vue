<template>
  <div>
    <div class="d-flex align-center justify-space-between mt-3">
      <div>
        <h1 class="text-h5 font-weight-bold">
          Security
        </h1>

        <p class="text-subtitle-1 mb-10">
          Update your sensitive account data.
        </p>
      </div>
    </div>

    <div>
      <div class="text-h5 font-weight-medium">
        Update password
      </div>

      <v-form
        v-model="updatePasswordFormIsValid"
        class="mb-10"
        @submit.prevent="handleUpdatePassword"
      >
        <v-text-field
          v-model="previousPassword"
          :rules="[rules.required]"
          label="Previous password"
          variant="underlined"
          type="password"
        />

        <v-text-field
          v-model="newPassword"
          :rules="[rules.required,rules.password]"
          label="New password"
          variant="underlined"
          type="password"
        />

        <v-text-field
          v-model="newPasswordConfirmation"
          :rules="[
            rules.required,
            rules.password,
            (value: string) => rules.passwordConfirmation(value, newPassword),
          ]"
          label="Confirm your new password"
          variant="underlined"
          type="password"
        />

        <div class="d-flex align-center justify-end mt-5">
          <v-btn
            :disabled="updatePasswordFormIsValid !== true"
            color="secondary"
            block
            type="submit"
          >
            Update password
          </v-btn>
        </div>
      </v-form>

      <div class="text-h6 font-weight-medium my-5">
        Or, if you prefer
      </div>

      <v-btn
        color="secondary"
        prepend-icon="mdi-email"
        block
        @click="handleSendPasswordResetEmail"
      >
        Send a password reset email
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { FirebaseError } from 'firebase/app'
import { reauthenticateWithCredential, sendPasswordResetEmail, EmailAuthProvider, updatePassword } from 'firebase/auth'

import { useMainStore } from '@/store'
import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import { useRules } from '@/composables/useRules'

import { getFirebaseErrorMessage } from '@/utils/error'

import { useNuxtApp } from '#imports'

const nuxtApp = useNuxtApp()

const mainStore = useMainStore()
const accountStore = useAccountStore()
const popupStore = usePopupStore()

const rules = useRules()

const updatePasswordFormIsValid = ref(false)

const previousPassword = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')

async function handleUpdatePassword () {
  try {
    mainStore.setOverlay(true)

    if (!accountStore.authUser?.email) {
      throw new Error('The user is not authenticated')
    }

    const credential = EmailAuthProvider.credential(accountStore.authUser.email, previousPassword.value)

    await reauthenticateWithCredential(accountStore.authUser, credential)

    await updatePassword(accountStore.authUser, newPassword.value)

    popupStore.showSuccessPopup('Password has been updated successfully')
  } catch (err) {
    if (err instanceof FirebaseError) {
      popupStore.showErrorPopup(getFirebaseErrorMessage(err.code))
    } else if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    mainStore.setOverlay(false)
  }
}

async function handleSendPasswordResetEmail () {
  try {
    mainStore.setOverlay(true)

    if (!accountStore.authUser?.email) {
      throw new Error('The user is not authenticated')
    }

    await sendPasswordResetEmail(nuxtApp.$auth, accountStore.authUser.email)

    popupStore.showSuccessPopup('The email has been sent successfully')
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
