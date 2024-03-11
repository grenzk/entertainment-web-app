<script setup lang="ts">
import { ref } from 'vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'

defineProps<{
  placeholder: string
}>()

const ph = ref('')
</script>

<template>
  <div class="input-group l-flex l-container">
    <SearchIcon class="search-icon" />
    <QInput v-model="ph" :placeholder="placeholder" />
  </div>
</template>

<style lang="scss">
.input-group {
  align-self: start;
  align-items: center;
  gap: 1rem;
}

.search-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.q-field {
  width: 100%;

  &--with-bottom {
    padding-bottom: 0 !important;
  }

  &__control {
    position: unset !important;
    color: var(--color-neutral-greyish-blue) !important;
    height: 2.313rem !important;
  }

  &--standard &__control::before {
    border-bottom: none !important;
  }

  &--standard &__control::after {
    height: 1px !important;
    transform: scale3d(0, 1, 1) !important;
  }

  &__native {
    padding: 0 !important;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-light) !important;
    color: var(--color-neutral-white) !important;
    caret-color: var(--color-primary-red);
    cursor: pointer;
  }

  &__append {
    display: none !important;
  }

  &__bottom {
    font-size: var(--font-size-m) !important;
    align-items: center !important;
    min-height: 100% !important;
    left: unset !important;
    transform: unset !important;
    padding: 0 !important;
  }
}

.q-placeholder::placeholder {
  color: var(--color-neutral-white) !important;
  opacity: 0.4979 !important;
}
</style>
