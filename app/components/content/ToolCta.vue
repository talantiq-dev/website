<script setup lang="ts">
// Used inside blog posts as `::tool-cta` + `::` on its own lines (see seo/PLAYBOOK.md)
const route = useRoute()
const de = route.path.startsWith('/blog/de/')

const copy = de
  ? { title: 'Probier es direkt aus', text: 'Füge einen Link von TikTok, Instagram, YouTube oder einem Foodblog ein und erhalte die Zutaten als Einkaufsliste. Kostenlos, ohne Anmeldung.', button: 'Zum Rezept-Extraktor' }
  : { title: 'Try it right now', text: 'Paste a TikTok, Instagram, YouTube or blog link and get the ingredients as a shopping list. Free, no sign-up.', button: 'Open the recipe extractor' }

const slug = route.path.split('/').pop()
</script>

<template>
  <aside class="tool-cta">
    <Icon name="lucide:sparkles" class="tool-cta-icon" />
    <div>
      <p class="tool-cta-title">
        {{ copy.title }}
      </p>
      <p class="tool-cta-text">
        {{ copy.text }}
      </p>
      <NuxtLink :to="`/sapid/recipe-extractor?ref=blog_${slug}`" class="btn btn-primary">
        {{ copy.button }}
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.tool-cta {
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  margin: 2rem 0;
  border-radius: 1.25rem;
  background: var(--color-primary-50);
  border: 1px solid var(--color-primary-200);
  font-size: 1rem;
  line-height: 1.6;
}

.tool-cta-icon {
  font-size: 1.5rem;
  color: var(--color-primary-600);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.tool-cta-title {
  font-weight: 700;
  margin: 0 0 0.25rem !important;
}

.tool-cta-text {
  color: var(--color-neutral-600);
  margin: 0 0 1rem !important;
}

.tool-cta .btn {
  text-decoration: none !important;
  color: var(--color-white) !important;
}
</style>
