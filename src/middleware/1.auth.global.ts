import { useAccountStore } from '@/store/account'

import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const accountStore = useAccountStore()

  if (accountStore.isAuthenticated && to.meta.redirectIfAuthenticated) {
    return navigateTo('/home')
  }

  if (!accountStore.isAuthenticated && to.meta.requiresAuth) {
    return navigateTo('/login')
  }
})
