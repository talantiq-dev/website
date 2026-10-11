<script setup lang="ts">
const columns = [
  {
    title: 'Sapid',
    links: [
      { label: 'Features', to: '/sapid' },
      { label: 'Free recipe tool', to: '/sapid/recipe-extractor' },
      { label: 'Blog', to: '/blog' },
      { label: 'Delete account', to: '/delete' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Services', to: '/services' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
  },
]
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <Logo class="footer-logo" />
        <p class="tagline">
          Makers of Sapid, the meal planner that turns saved recipes into dinner.
        </p>
        <p class="copyright">
          © {{ new Date().getFullYear() }} Talentiq Solutions. All rights reserved.
        </p>
      </div>

      <nav
        v-for="column in columns"
        :key="column.title"
        class="footer-column"
        :aria-label="column.title"
      >
        <p class="column-title">
          {{ column.title }}
        </p>
        <NuxtLink
          v-for="link in column.links"
          :key="link.to"
          :to="link.to"
          class="footer-link"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-neutral-200);
  background-color: var(--color-background-light);
  padding: 3.5rem 0;
}

.footer-content {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 22rem;
}

.tagline {
  color: var(--color-neutral-600);
  font-size: 0.9375rem;
}

.copyright {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.column-title {
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--color-neutral-900);
  margin-bottom: 0.25rem;
}

.footer-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-neutral-600);
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--color-neutral-900);
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 2fr 1fr 1fr;
  }
}
</style>
