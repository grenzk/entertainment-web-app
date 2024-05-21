<template>
  <div class="media-library l-container">
    <QSkeleton class="section-title custom-skeleton" width="150px" animation="fade" />

    <div class="media-library-group l-grid">
      <div class="media" v-for="num in 8" :key="num">
        <QSkeleton class="media-skeleton custom-skeleton" animation="fade" />

        <div class="media-info">
          <QSkeleton class="media-skeleton-tags custom-skeleton" animation="fade" />
          <QSkeleton class="custom-skeleton" width="100px" animation="fade" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.custom-skeleton {
  background: var(--color-primary-semi-dark-blue) !important;
  border-radius: var(--border-radius-s) !important;
}

.media-skeleton {
  height: 6.875rem !important;
  margin-bottom: 0.5rem;
}

.media-skeleton-tags {
  margin-bottom: 0.5rem;
}
</style>
