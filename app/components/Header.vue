<script setup lang="ts">
const items = [
  { label: 'Services', to: '/services' },
  { label: 'Sapid', to: '/sapid' },
  { label: 'Privacy', to: '/privacy' }
]
</script>

<template>
  <header class="site-header">
    <div class="container header-container">
      <Logo />

      <nav class="main-nav">
        <NuxtLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="btn btn-ghost"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
         <NuxtLink
            to="/contact"
            class="btn btn-neutral"
          >
            Contact Us
          </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid var(--color-neutral-200);
  background-color: rgba(254, 249, 240, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-container {
  display: flex;
  height: var(--header-height);
  align-items: center;
  justify-content: space-between;
}

.main-nav {
  display: none;
  gap: 1.5rem;
}

.header-actions {
  display: none;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .main-nav, .header-actions {
    display: flex;
  }
}


</style>
