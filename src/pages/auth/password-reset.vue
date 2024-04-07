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
          :disabled="!validModel"
          color="secondary"
          type="submit"
          block
        >
          Submit
        </v-btn>
      </v-form>
    </div>

    <nuxt-link
      to="/auth/login"
      class="showUnderlineOnHover my-6"
    >
      Return to login page
    </nuxt-link>
  </auth-page-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { definePageMeta } from '#imports'

import { useRules } from '@/composables/useRules'

import AuthPageContainer from '@/components/pages/auth/AuthPageContainer.vue'

definePageMeta({
  layout: 'contained',

  requiresAuth: false,
  redirectIfAuthenticated: true,
})

const rules = useRules()

const emailModel = ref('')
const validModel = ref(false)

async function handleSubmit () {

}
</script>

<style lang="scss">
.passwordResetPage {
  .passwordResetForm {
    width: 400px;
  }
}
</style>
