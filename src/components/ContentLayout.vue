<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade-up" mode="out-in">
      <main :class="{ home: route.path === '/' }" :key="route.fullPath">
        <component :is="Component" />
      </main>
    </Transition>
  </RouterView>
</template>

<style lang="scss">
.home {
  grid-row: span 2;
  display: grid;
  grid-template-rows: 12.813rem;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: 300ms ease all;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(60px);
}
</style>
