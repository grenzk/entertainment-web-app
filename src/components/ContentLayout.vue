<script setup lang="ts">
import { adjustGridForContentPages, useGrid } from '@/utils/grid'

useGrid(adjustGridForContentPages)
</script>

<template>
  <RouterView />
</template>
