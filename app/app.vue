<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Talentiq` : 'Talentiq Solutions';
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
  <ClientOnly>
    <div class="site-wrapper">
      <NuxtRouteAnnouncer />
      <Header />
      <main class="site-main">
        <NuxtPage />
      </main>
      <Footer />
    </div>
  </ClientOnly>
</template>

<style scoped>
.site-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: var(--color-background-light);
  color: var(--color-neutral-900);
}

.site-main {
  flex: 1;
}


</style>