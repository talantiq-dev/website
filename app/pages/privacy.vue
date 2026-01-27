<script setup lang="ts">
definePageMeta({
  title: 'Privacy Policy'
})
</script>

<template>
  <div class="privacy-page section-py">
    <div class="container">
      <div class="prose">
        <ContentDoc />
      </div>
    </div>
  </div>
</template>

<style>
/* Prose Typography - Global or Scoped with deep selector */
.prose {
  max-width: 65ch;
  margin: 0 auto;
  color: var(--color-neutral-700);
  line-height: 1.75;
}

.prose h1 {
  font-size: 2.25rem;
  margin-top: 0;
  margin-bottom: 2rem;
  color: var(--color-neutral-900);
}

.prose h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--color-neutral-900);
}

.prose p {
  margin-bottom: 1.25rem;
}

.prose ul {
  margin-bottom: 1.25rem;
  padding-left: 1.625rem;
  list-style-type: disc;
}

.prose li {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  .prose {
    color: var(--color-neutral-300);
  }
  .prose h1, .prose h2 {
    color: var(--color-white);
  }
}
</style>
