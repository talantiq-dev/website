<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    if (!titleChunk) return 'Talentiq Solutions'
    // Titles that already name the brand or product stay as written
    return /sapid|talentiq|talantiq/i.test(titleChunk) ? titleChunk : `${titleChunk} · Talentiq`
  },
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/sapid-icon.png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;700&display=swap' }
  ],
  meta: [
    { name: 'theme-color', content: '#fef9f0' }
  ],
  bodyAttrs: {
    class: 'antialiased'
  }
})

useSeoMeta({
  ogSiteName: 'Talentiq Solutions',
  ogType: 'website',
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
  background-color: var(--color-background-light);
  color: var(--color-neutral-900);
}

.site-main {
  flex: 1;
}
</style>
