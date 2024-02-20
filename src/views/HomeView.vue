<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
import MovieCategoryIcon from '@/components/icons/MovieCategoryIcon.vue'
import EmptyBookmarkIcon from '@/components/icons/EmptyBookmarkIcon.vue'
</script>

<template>
  <SearchInput />
  <div class="trending">
    <h2 class="section-title">Trending</h2>

    <div class="media-scroller l-grid snaps-inline">
      <div class="media-element">
        <img
          class="media-img"
          src="../assets/img/thumbnails/beyond-earth/trending/large.jpg"
          alt="Beyond Earth"
        />

        <div class="gradient-overlay"></div>

        <div class="bookmark l-flex"><EmptyBookmarkIcon /></div>

        <div class="media-info">
          <div class="tags l-flex">
            <small>2019</small>
            <small class="dot"></small>
            <small class="category-icon"><MovieCategoryIcon /></small>
            <small>Movie</small>
            <small class="dot"></small>
            <small>PG</small>
          </div>
          <h3 class="media-title">Beyond Earth</h3>
        </div>
      </div>
      <div class="media-element">
        <img
          class="media-img"
          src="../assets/img/thumbnails/beyond-earth/trending/large.jpg"
          alt="Beyond Earth"
        />

        <div class="gradient-overlay"></div>

        <div class="bookmark l-flex"><EmptyBookmarkIcon /></div>

        <div class="media-info">
          <div class="tags l-flex">
            <small>2019</small>
            <small class="dot"></small>
            <small class="category-icon"><MovieCategoryIcon /></small>
            <small>Movie</small>
            <small class="dot"></small>
            <small>PG</small>
          </div>
          <h3 class="media-title">Beyond Earth</h3>
        </div>
      </div>
      <div class="media-element">
        <img
          class="media-img"
          src="../assets/img/thumbnails/beyond-earth/trending/large.jpg"
          alt="Beyond Earth"
        />

        <div class="gradient-overlay"></div>

        <div class="bookmark l-flex"><EmptyBookmarkIcon /></div>

        <div class="media-info">
          <div class="tags l-flex">
            <small>2019</small>
            <small class="dot"></small>
            <small class="category-icon"><MovieCategoryIcon /></small>
            <small>Movie</small>
            <small class="dot"></small>
            <small>PG</small>
          </div>
          <h3 class="media-title">Beyond Earth</h3>
        </div>
      </div>
      <div class="media-element">
        <img
          class="media-img"
          src="../assets/img/thumbnails/beyond-earth/trending/large.jpg"
          alt="Beyond Earth"
        />

        <div class="gradient-overlay"></div>

        <div class="bookmark l-flex"><EmptyBookmarkIcon /></div>

        <div class="media-info">
          <div class="tags l-flex">
            <small>2019</small>
            <small class="dot"></small>
            <small class="category-icon"><MovieCategoryIcon /></small>
            <small>Movie</small>
            <small class="dot"></small>
            <small>PG</small>
          </div>
          <h3 class="media-title">Beyond Earth</h3>
        </div>
      </div>
      <div class="media-element">
        <img
          class="media-img"
          src="../assets/img/thumbnails/beyond-earth/trending/large.jpg"
          alt="Beyond Earth"
        />

        <div class="gradient-overlay"></div>

        <div class="bookmark l-flex"><EmptyBookmarkIcon /></div>

        <div class="media-info">
          <div class="tags l-flex">
            <small>2019</small>
            <small class="dot"></small>
            <small class="category-icon"><MovieCategoryIcon /></small>
            <small>Movie</small>
            <small class="dot"></small>
            <small>PG</small>
          </div>
          <h3 class="media-title">Beyond Earth</h3>
        </div>
      </div>
      <div class="media-element">
        <img
          class="media-img"
          src="../assets/img/thumbnails/beyond-earth/trending/large.jpg"
          alt="Beyond Earth"
        />

        <div class="gradient-overlay"></div>

        <div class="bookmark l-flex"><EmptyBookmarkIcon /></div>

        <div class="media-info">
          <div class="tags l-flex">
            <small>2019</small>
            <small class="dot"></small>
            <small class="category-icon"><MovieCategoryIcon /></small>
            <small>Movie</small>
            <small class="dot"></small>
            <small>PG</small>
          </div>
          <h3 class="media-title">Beyond Earth</h3>
        </div>
      </div>
      <div class="media-element">
        <img
          class="media-img"
          src="../assets/img/thumbnails/beyond-earth/trending/large.jpg"
          alt="Beyond Earth"
        />

        <div class="gradient-overlay"></div>

        <div class="bookmark l-flex"><EmptyBookmarkIcon /></div>

        <div class="media-info">
          <div class="tags l-flex">
            <small>2019</small>
            <small class="dot"></small>
            <small class="category-icon"><MovieCategoryIcon /></small>
            <small>Movie</small>
            <small class="dot"></small>
            <small>PG</small>
          </div>
          <h3 class="media-title">Beyond Earth</h3>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h2 class="section-title">Recommended for you</h2>
  </div>
</template>

<style lang="scss">
.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: 1rem;
}

.snaps-inline > * {
  scroll-snap-align: start;
}

.section-title {
  font-size: var(--font-size-xl);
  line-height: revert;
  letter-spacing: -0.31px;
  margin: 0 0 1rem 1rem;
}

.media-scroller {
  scrollbar-width: none;
  padding: 0 1rem;
  grid-auto-flow: column;
  gap: 1rem;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  width: 100vw;
}

.media-element {
  overflow: hidden;
  border-radius: var(--border-radius-xs);
  position: relative;
  width: 240px;
  height: 140px;
}

.media-info {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 1;
  overflow: hidden !important;
}

.media-img {
  object-fit: cover;
  height: 100%;
}

.tags {
  gap: var(--space-media-info-gap);
  align-items: center;
}

.category-icon {
  height: 12px;
}

.dot {
  width: 3px;
  height: 3px;
  background-color: white;
  border-radius: 50%;
}

.media-title {
  font-size: var(--font-size-s);
  line-height: revert;
}

.gradient-overlay {
  position: absolute;
  background: linear-gradient(to bottom, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0.5));
  width: 100%;
  height: 50%;
  bottom: 0;
  overflow: hidden;
}

.bookmark {
  background-color: hsla(223, 30%, 9%, 0.5);
  border-radius: var(--border-radius-round);
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>
