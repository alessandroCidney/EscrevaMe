<template>
  <div>
    Esqueceu sua senha?
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'contained',

  requiresAuth: false,
  redirectIfAuthenticated: true,
})
</script>
