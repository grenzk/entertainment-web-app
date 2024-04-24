<script setup lang="ts">
import { adjustGridForAuthPages, useGrid } from '@/utils/grid'

useGrid(adjustGridForAuthPages)
</script>

<template>
  <RouterView />
</template>
