<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { adjustGridForAuthPages, resetGrid } from '@/utils/grid'

import AuthForm from '@/components/AuthForm.vue'

onMounted(() => {
  adjustGridForAuthPages()
  window.addEventListener('resize', adjustGridForAuthPages)
})

onBeforeUnmount(() => {
  resetGrid()
  window.removeEventListener('resize', adjustGridForAuthPages)
})
</script>

<template>
  <AuthForm />
</template>
