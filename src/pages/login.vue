<template>
  <v-row
    class="loginPage filWidth fillHeight"
  >
    <v-col
      class="d-md-flex d-none bg-primary px-0 imageSection align-center justify-center"
      cols="6"
    >
      <div class="imageArea d-flex align-center justify-center">
        <v-img
          src="@/assets/images/illustrations/wireframe.svg"
        />
      </div>
    </v-col>

    <v-col
      class="px-0 loginSection d-flex align-center justify-center"
      cols="12"
      md="6"
    >
      <v-form
        class="loginForm"
      >
        <v-img
          src="@/assets/images/logos/black_logo.svg"
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

        <v-text-field
          v-model="password"
          :readonly="loadingEmailLogin || loadingGoogleLogin"
          label="Password"
          variant="outlined"
          type="password"
        />

        <v-btn
          :loading="loadingEmailLogin"
          :disabled="loadingGoogleLogin"
          prepend-icon="mdi-email"
          color="primary"
          block
          @click="handleLoginWithEmail"
        >
          Sign in with Email
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { FirebaseError } from 'firebase/app'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'

import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import { getFirebaseErrorMessage } from '@/utils/error'

import { useUsersCrud } from '@/composables/useUsersCrud'

import { useNuxtApp, definePageMeta } from '#imports'

definePageMeta({
  layout: 'clear',
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

    accountStore.setAuthUser(userCredential.user)
    accountStore.setDatabaseUser(databaseUser)
    await nuxtApp.$router.push('home')
  } catch (err) {
    if (err instanceof FirebaseError) {
      popupStore.showErrorPopup(getFirebaseErrorMessage(err.code))
    } else if (err instanceof Error) {
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

    await signInWithEmailAndPassword(nuxtApp.$auth, email.value, password.value)

    await nuxtApp.$router.push('home')
  } catch (err) {
    if (err instanceof FirebaseError) {
      popupStore.showErrorPopup(getFirebaseErrorMessage(err.code))
    } else if (err instanceof Error) {
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
  margin: 0;

  .imageSection {
    .imageArea {
      width: 600px;
      height: 600px;

      border-radius: 16px;

      background-color: #251a7e;
    }
  }

  .loginSection {
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
}
</style>
