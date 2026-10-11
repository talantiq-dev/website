<script setup lang="ts">
const props = defineProps<{ lang: 'en' | 'de' }>()
const config = useRuntimeConfig()

const COPY = {
  en: {
    title: 'Sapid Blog: Meal Planning, Recipes & Smarter Grocery Shopping',
    description: 'Practical guides to saving recipes from TikTok and Instagram, planning a realistic week of meals and shopping faster.',
    heading: 'Cook more of what you save',
    intro: 'Guides to saving recipes, planning a realistic week and shopping without the stress.',
    read: 'Read',
    empty: 'The first articles are on their way. In the meantime, try turning a recipe video into a shopping list.',
    tool: 'Try the recipe extractor',
    other: { label: 'Auf Deutsch lesen', to: '/blog/de' },
  },
  de: {
    title: 'Sapid Blog: Essensplanung, Rezepte & entspannter einkaufen',
    description: 'Praktische Anleitungen: Rezepte von TikTok und Instagram speichern, eine realistische Woche planen und schneller einkaufen.',
    heading: 'Koch mehr von dem, was du speicherst',
    intro: 'Anleitungen zum Rezepte-Speichern, zur Wochenplanung und zum stressfreien Einkaufen.',
    read: 'Lesen',
    empty: 'Die ersten Artikel sind unterwegs. Probier in der Zwischenzeit aus, wie aus einem Rezeptvideo eine Einkaufsliste wird.',
    tool: 'Rezept-Extraktor ausprobieren',
    other: { label: 'Read in English', to: '/blog' },
  },
}
const copy = COPY[props.lang]
const path = props.lang === 'de' ? '/blog/de' : '/blog'

const { data: posts } = await useAsyncData(`blog-index-${props.lang}`, () =>
  queryCollection('blog').where('lang', '=', props.lang).order('date', 'DESC').all()
)

useSeoMeta({
  title: copy.title,
  description: copy.description,
  ogImage: `${config.public.siteUrl}/og-sapid.png`,
})

useHead({
  htmlAttrs: { lang: props.lang },
  link: [
    { rel: 'canonical', href: `${config.public.siteUrl}${path}` },
    { rel: 'alternate', hreflang: 'en', href: `${config.public.siteUrl}/blog` },
    { rel: 'alternate', hreflang: 'de', href: `${config.public.siteUrl}/blog/de` },
  ],
})

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString(props.lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <div class="section-py">
    <div class="container narrow">
      <div class="top">
        <span class="eyebrow">Sapid Blog</span>
        <NuxtLink :to="copy.other.to" class="other-lang">
          {{ copy.other.label }}
        </NuxtLink>
      </div>
      <h1 class="section-title">
        {{ copy.heading }}
      </h1>
      <p class="section-subtitle intro">
        {{ copy.intro }}
      </p>

      <div v-if="posts?.length" class="posts">
        <NuxtLink v-for="post in posts" :key="post.path" :to="post.path" class="post card">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <h2>{{ post.title }}</h2>
          <p>{{ post.description }}</p>
          <span class="read-more">{{ copy.read }} <Icon name="lucide:arrow-right" /></span>
        </NuxtLink>
      </div>

      <div v-else class="empty card">
        <p>{{ copy.empty }}</p>
        <NuxtLink to="/sapid/recipe-extractor" class="btn btn-primary">
          <Icon name="lucide:sparkles" /> {{ copy.tool }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.narrow {
  max-width: 760px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.other-lang {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-neutral-600);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.intro {
  margin-bottom: 3rem;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.post {
  display: block;
  padding: 1.75rem;
  transition: box-shadow 0.2s;
}

.post:hover {
  box-shadow: 0 12px 32px -12px rgba(17, 24, 39, 0.2);
}

.post time {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.post h2 {
  font-size: 1.5rem;
  margin: 0.375rem 0 0.5rem;
}

.post p {
  color: var(--color-neutral-600);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1rem;
  font-weight: 600;
  color: var(--color-primary-700);
}

.empty {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  color: var(--color-neutral-700);
}
</style>
