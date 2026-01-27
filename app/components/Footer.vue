<script setup lang="ts">
const links = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <Logo class="footer-logo" />
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} Talentiq Solutions. All rights reserved.
        </p>
      </div>
      
      <div class="footer-links">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="footer-link"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-neutral-200);
  background-color: var(--color-white);
  padding: 3rem 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center; /* Center on mobile */
}

.copyright {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
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
    flex-direction: row;
  }
  .footer-brand {
    align-items: flex-start;
  }
}

@media (prefers-color-scheme: dark) {
  .site-footer {
    border-color: var(--color-neutral-800);
    background-color: var(--color-neutral-900);
  }
  .copyright {
    color: var(--color-neutral-400);
  }
  .footer-link {
    color: var(--color-neutral-400);
  }
  .footer-link:hover {
    color: var(--color-white);
  }
}
</style>
