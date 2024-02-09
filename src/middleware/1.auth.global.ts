import { useAccountStore } from '@/store/account'

import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const accountStore = useAccountStore()

  if (accountStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }

  if (!accountStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
})
