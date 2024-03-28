import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const accountStore = useAccountStore()
  const popupStore = usePopupStore()

  if (accountStore.isAuthenticated && to.meta.redirectIfAuthenticated) {
    return navigateTo('/home')
  }

  if (!accountStore.isAuthenticated && to.meta.requiresAuth) {
    return navigateTo('/login')
  }

  if (accountStore.userRole && to.meta.allowedUserRoles && !to.meta.allowedUserRoles.includes(accountStore.userRole)) {
    popupStore.showErrorPopup('Acesso negado')
    return navigateTo('/home')
  }
})
