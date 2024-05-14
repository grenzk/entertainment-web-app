<template>
  <div class="media-library l-container">
    <QSkeleton class="section-title custom-skeleton" width="150px" animation="fade" />

    <div class="media-library-group l-grid">
      <QSkeleton
        class="media-skeleton custom-skeleton"
        v-for="num in 8"
        :key="num"
        animation="fade"
      />
    </div>
  </div>
</template>

<style lang="scss">
.media-skeleton {
  height: 6.875rem !important;
}

.custom-skeleton {
  background: var(--color-primary-semi-dark-blue) !important;
  border-radius: var(--border-radius-s) !important;
}
</style>
