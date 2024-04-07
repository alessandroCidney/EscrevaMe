<template>
  <auth-page-container
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
      <template v-if="submitSuccess">
        <v-img
          src="@/assets/images/illustrations/check.svg"
          width="250px"
          class="horizontalMarginAuto"
        />

        <h1 class="mb-2 text-center">
          The email has been sent
        </h1>

        <p class="mb-5 text-center">
          Please check your inbox and look for the password reset email with next steps.
        </p>
      </template>

      <template v-else>
        <h1 class="mb-2 text-center">
          Password reset
        </h1>

        <p class="mb-5 text-center">
          Please enter your email in the field below. When you submit the form, we'll send you a password reset email with the next steps.
        </p>

        <v-form
          v-model="validModel"
          @submit.prevent="handleSubmit"
        >
          <v-text-field
            v-model="emailModel"
            :rules="[rules.required, rules.email]"
            placeholder="example@email.com"
            variant="underlined"
            label="Email"
            class="mb-5"
          />

          <v-btn
            :loading="loadingSubmit"
            :disabled="!validModel"
            color="secondary"
            type="submit"
            block
          >
            Submit
          </v-btn>
        </v-form>
      </template>
    </div>

    <nuxt-link
      to="/auth/login"
      :class="{
        'showUnderlineOnHover': true,
        'my-6': !submitSuccess
      }"
    >
      Return to login page
    </nuxt-link>
  </auth-page-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { sendPasswordResetEmail } from 'firebase/auth'

import { definePageMeta, useNuxtApp } from '#imports'

import { useRules } from '@/composables/useRules'

import AuthPageContainer from '@/components/pages/auth/AuthPageContainer.vue'

import { defaultErrorHandling } from '@/utils/error'

definePageMeta({
  layout: 'contained',

  requiresAuth: false,
  redirectIfAuthenticated: true,
})

const nuxtApp = useNuxtApp()

const rules = useRules()

const emailModel = ref('')
const validModel = ref(false)

const loadingSubmit = ref(false)
const submitSuccess = ref(false)

async function handleSubmit () {
  try {
    loadingSubmit.value = true

    await sendPasswordResetEmail(nuxtApp.$auth, emailModel.value)

    submitSuccess.value = true
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
