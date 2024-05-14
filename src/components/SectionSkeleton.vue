<template>
  <div class="media-library l-container">
    <QSkeleton class="section-title custom-skeleton" width="150px" animation="fade" />

    <div class="media-library-group l-grid">
      <QSkeleton
        class="custom-skeleton"
        height="150px"
        v-for="num in 8"
        :key="num"
        animation="fade"
      />
    </div>
  </div>
</template>
