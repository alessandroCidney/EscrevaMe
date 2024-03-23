<template>
  <div>
    Landing page
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'clear',

  requiresAuth: false,
  redirectIfAuthenticated: true,
})
</script>
