<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Talantiq` : 'Talantiq Solutions';
  },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;700&display=swap' }
  ],
  bodyAttrs: {
    class: 'antialiased'
  }
})
</script>

<template>
  <div class="site-wrapper">
    <NuxtRouteAnnouncer />
    <Header />
    <main class="site-main">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.site-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: var(--color-white);
  color: var(--color-neutral-900);
}

.site-main {
  flex: 1;
}

@media (prefers-color-scheme: dark) {
  .site-wrapper {
    background-color: var(--color-neutral-950);
    color: var(--color-neutral-100);
  }
}
</style>