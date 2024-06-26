<template>
  <auth-page-container
    class="loginPage"
  >
    <v-form
      class="loginForm"
    >
      <v-img
        src="@/assets/images/logos/blue_logo.svg"
        width="200px"
        class="logo mb-8"
      />

      <v-btn
        :loading="loadingGoogleLogin"
        :disabled="loadingEmailLogin"
        prepend-icon="mdi-google"
        color="error"
        block
        @click="handleLoginWithGoogle"
      >
        Sign in with Google
      </v-btn>

      <div class="d-flex align-center justify-center orArea py-7">
        <v-divider />

        <div class="text-center">
          or
        </div>

        <v-divider />
      </div>

      <v-text-field
        v-model="email"
        :readonly="loadingEmailLogin || loadingGoogleLogin"
        label="Email"
        variant="outlined"
        type="email"
      />

      <password-field
        v-model="password"
        :readonly="loadingEmailLogin || loadingGoogleLogin"
        label="Password"
        variant="outlined"
      />

      <v-btn
        :loading="loadingEmailLogin"
        :disabled="loadingGoogleLogin"
        prepend-icon="mdi-email"
        color="secondary"
        block
        @click="handleLoginWithEmail"
      >
        Sign in with Email
      </v-btn>
    </v-form>

    <nuxt-link
      to="/auth/password-reset"
      class="showUnderlineOnHover my-6"
    >
      Forgot your password?
    </nuxt-link>
  </auth-page-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { FirebaseError } from 'firebase/app'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import { ApplicationError, getFirebaseErrorMessage } from '@/utils/error'

import { useUsersCrud } from '@/composables/useUsersCrud'

import AuthPageContainer from '@/components/pages/auth/AuthPageContainer.vue'
import PasswordField from '@/components/commons/PasswordField.vue'

import { useNuxtApp, definePageMeta } from '#imports'

definePageMeta({
  layout: 'contained',

  requiresAuth: false,
  redirectIfAuthenticated: true,
})

const accountStore = useAccountStore()
const popupStore = usePopupStore()

const usersCrud = useUsersCrud()

const loadingGoogleLogin = ref(false)
const loadingEmailLogin = ref(false)

const email = ref('')
const password = ref('')

const nuxtApp = useNuxtApp()

async function handleLoginWithGoogle () {
  try {
    loadingGoogleLogin.value = true

    const provider = new GoogleAuthProvider()

    const userCredential = await signInWithPopup(nuxtApp.$auth, provider)

    const databaseUser = await usersCrud.get(userCredential.user.uid)

    if (!databaseUser.active) {
      signOut(nuxtApp.$auth)
      throw new ApplicationError('Access denied')
    }

    accountStore.setAuthUser(userCredential.user)
    accountStore.setDatabaseUser(databaseUser)
    await nuxtApp.$router.push('/home')
  } catch (err) {
    if (err instanceof FirebaseError) {
      popupStore.showErrorPopup(getFirebaseErrorMessage(err.code))
    } else if (err instanceof Error || err instanceof ApplicationError) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingGoogleLogin.value = false
  }
}

async function handleLoginWithEmail () {
  try {
    loadingEmailLogin.value = true

    const userCredential = await signInWithEmailAndPassword(nuxtApp.$auth, email.value, password.value)

    const databaseUser = await usersCrud.get(userCredential.user.uid)

    if (!databaseUser.active) {
      signOut(nuxtApp.$auth)
      throw new ApplicationError('Access denied')
    }

    accountStore.setAuthUser(userCredential.user)
    accountStore.setDatabaseUser(databaseUser)
    await nuxtApp.$router.push('/home')
  } catch (err) {
    if (err instanceof FirebaseError) {
      popupStore.showErrorPopup(getFirebaseErrorMessage(err.code))
    } else if (err instanceof Error || err instanceof ApplicationError) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingEmailLogin.value = false
  }
}
</script>

<style lang="scss" scoped>
.loginPage {
  .loginForm {
    width: 400px;

    .orArea {
      > * {
        width: 33%;
      }
    }

    .logo {
      margin: 0 auto;
    }
  }
}
</style>
