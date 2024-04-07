<template>
  <auth-page-container
    v-if="!mainStore.appOverlay"
    class="passwordResetPage"
  >
    <template #image>
      <v-img
        src="@/assets/images/illustrations/password.svg"
      />
    </template>

    <div
      class="passwordResetForm"
    >
      <h1 class="mb-2 text-center">
        Password reset
      </h1>

      <p class="mb-5 text-center">
        Please enter the new password for the account with email <strong>{{ userEmail }}</strong>.
      </p>

      <v-form
        v-model="validModel"
        @submit.prevent="handleSubmit"
      >
        <password-field
          v-model="newPassword"
          :rules="[rules.required, rules.password]"
          label="New password"
          variant="outlined"
        />

        <password-field
          v-model="newPasswordConfirmation"
          :rules="[
            rules.required,
            rules.password,
            (value: string) => rules.passwordConfirmation(value, newPassword),
          ]"
          label="Confirm your new password"
          variant="outlined"
        />

        <v-btn
          :loading="loadingSubmit"
          :disabled="!validModel"
          color="secondary"
          type="submit"
          class="mt-5"
          block
        >
          Submit
        </v-btn>
      </v-form>
    </div>

    <nuxt-link
      to="/auth/login"
      class="showUnderlineOnHover mt-6"
    >
      Return to login page
    </nuxt-link>
  </auth-page-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'

import { definePageMeta, useRoute, useRouter, useNuxtApp } from '#imports'

import { useMainStore } from '@/store'
import { usePopupStore } from '@/store/popup'

import { useRules } from '@/composables/useRules'

import AuthPageContainer from '@/components/pages/auth/AuthPageContainer.vue'
import PasswordField from '@/components/commons/PasswordField.vue'

import { defaultErrorHandling } from '@/utils/error'

definePageMeta({
  layout: 'contained',

  requiresAuth: false,
  redirectIfAuthenticated: true,
})

const nuxtApp = useNuxtApp()

const mainStore = useMainStore()
const popupStore = usePopupStore()

const route = useRoute()
const router = useRouter()

const rules = useRules()

const validModel = ref(false)

const loadingSubmit = ref(false)

const userEmail = ref('')

const newPassword = ref('')
const newPasswordConfirmation = ref('')

onMounted(async () => {
  await validateParams()
})

async function validateParams () {
  try {
    mainStore.setOverlay(true)

    if ([route.query.mode, route.query.oobCode].some(param => typeof param !== 'string')) {
      throw new Error('The link used is invalid.')
    }

    if (route.query.mode !== 'resetPassword') {
      throw new Error('The link used is invalid.')
    }

    await verifyPasswordResetCode(nuxtApp.$auth, route.query.oobCode as string)
  } catch (err) {
    defaultErrorHandling(err)
    await router.push('/auth/login')
  } finally {
    mainStore.setOverlay(false)
  }
}

async function handleSubmit () {
  try {
    loadingSubmit.value = true

    await confirmPasswordReset(nuxtApp.$auth, route.query.oobCode as string, newPassword.value)

    popupStore.showSuccessPopup('Password has been reset successfully')
    await router.push('/auth/login')
  } catch (err) {
    defaultErrorHandling(err)
  } finally {
    loadingSubmit.value = false
  }
}
</script>

<style lang="scss">
.passwordResetPage {
  .passwordResetForm {
    width: 400px;
  }
}
</style>
