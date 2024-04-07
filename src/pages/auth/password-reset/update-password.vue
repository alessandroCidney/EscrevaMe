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
      <v-form
        v-model="validModel"
        @submit.prevent="handleSubmit"
      >
        

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
    </div>

    <nuxt-link
      to="/auth/login"
      class="showUnderlineOnHover"
    >
      Return to login page
    </nuxt-link>
  </auth-page-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { verifyPasswordResetCode } from 'firebase/auth'

import { definePageMeta, useRoute, useRouter, useNuxtApp } from '#imports'

import { useMainStore } from '@/store'

import { useRules } from '@/composables/useRules'

import AuthPageContainer from '@/components/pages/auth/AuthPageContainer.vue'

import { defaultErrorHandling } from '@/utils/error'

definePageMeta({
  layout: 'contained',

  requiresAuth: false,
  redirectIfAuthenticated: true,
})

const nuxtApp = useNuxtApp()

const mainStore = useMainStore()

const route = useRoute()
const router = useRouter()

const rules = useRules()

const validModel = ref(false)

const loadingSubmit = ref(false)

const userEmail = ref('')

const passwordModel = ref('')
const passwordConfirmationModel = ref('')

async function validateParams () {
  try {
    mainStore.setOverlay(true)

    if ([route.params.mode, route.params.oobCode].some(param => typeof param !== 'string')) {
      throw new Error('The link used is invalid.')
    }

    if (route.params.mode !== 'resetPassword') {
      throw new Error('The link used is invalid.')
    }

    userEmail.value = await verifyPasswordResetCode(nuxtApp.$auth, route.params.oobCode as string)
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
