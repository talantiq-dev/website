<template>
  <NuxtLink to="/" class="logo">
    <span class="logo-part">Tal</span>
    <span class="logo-trick">a</span>
    <span class="logo-part logo-offset">ntiq</span>
  </NuxtLink>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: var(--font-display);
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-neutral-900);
}

.logo-trick {
  display: inline-block;
  transform: rotate(180deg) translateY(-4px); /* Adjusted for visual alignment */
  transform-origin: center;
  font-family: var(--font-sans);
}

.logo-offset {
  transform: translateX(-2px);
}

@media (prefers-color-scheme: dark) {
  .logo {
    color: var(--color-white);
  }
}
</style>
