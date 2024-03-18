import { useAccountStore } from '@/store/account'

import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const accountStore = useAccountStore()

  if (accountStore.isAuthenticated && ['/', '/login'].includes(to.path)) {
    return navigateTo('/home')
  }

  if (!accountStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
})
