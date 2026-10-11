<script setup lang="ts">
const items = [
  { label: 'Sapid', to: '/sapid' },
  { label: 'Free recipe tool', to: '/sapid/recipe-extractor' },
  { label: 'Blog', to: '/blog' },
  { label: 'Services', to: '/services' },
]

const menuOpen = ref(false)
const route = useRoute()
watch(() => route.path, () => { menuOpen.value = false })
</script>

<template>
  <header class="site-header">
    <div class="container header-container">
      <Logo />

      <nav class="main-nav" aria-label="Main">
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
        <NuxtLink to="/contact" class="btn btn-neutral">
          Contact
        </NuxtLink>
      </div>

      <button
        class="menu-toggle btn btn-ghost"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        @click="menuOpen = !menuOpen"
      >
        <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" />
        <span class="visually-hidden">Menu</span>
      </button>
    </div>

    <nav
      v-show="menuOpen"
      id="mobile-nav"
      class="mobile-nav container"
      aria-label="Main"
    >
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="mobile-link"
      >
        {{ item.label }}
      </NuxtLink>
      <NuxtLink to="/contact" class="mobile-link">
        Contact
      </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid var(--color-neutral-200);
  background-color: rgba(254, 249, 240, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-container {
  display: flex;
  height: var(--header-height);
  align-items: center;
  justify-content: space-between;
}

.main-nav,
.header-actions {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

.menu-toggle {
  font-size: 1.5rem;
  padding: 0.5rem;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}

.mobile-link {
  padding: 0.875rem 0;
  font-weight: 600;
  border-top: 1px solid var(--color-neutral-200);
}

@media (min-width: 900px) {
  .main-nav,
  .header-actions {
    display: flex;
  }

  .menu-toggle,
  .mobile-nav {
    display: none !important;
  }
}
</style>
