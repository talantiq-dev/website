<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const path = `/blog/${([] as string[]).concat(route.params.slug).join('/')}`
const { data: post } = await useAsyncData(`blog-${path}`, () => queryCollection('blog').path(path).first())

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const COPY = {
  en: { back: 'All articles', backTo: '/blog', locale: 'en-GB', ctaTitle: 'Plan, shop and cook with Sapid', ctaText: 'Import recipes from any link, plan your week and get one shopping list sorted by store.', other: 'Auf Deutsch lesen' },
  de: { back: 'Alle Artikel', backTo: '/blog/de', locale: 'de-DE', ctaTitle: 'Planen, einkaufen und kochen mit Sapid', ctaText: 'Importiere Rezepte von jedem Link, plane deine Woche und erhalte eine Einkaufsliste, sortiert nach Laden.', other: 'Read in English' },
}
const lang = post.value.lang || 'en'
const copy = COPY[lang]

const pageUrl = `${config.public.siteUrl}${post.value.path}`
const image = post.value.image ? `${config.public.siteUrl}${post.value.image}` : `${config.public.siteUrl}/og-sapid.png`

useSeoMeta({
  // The title template leaves titles that name Sapid untouched
  title: `${post.value.title} · Sapid`,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogImage: image,
  ogUrl: pageUrl,
  ogType: 'article',
  ogLocale: lang === 'de' ? 'de_DE' : 'en_GB',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: { lang },
  link: [
    { rel: 'canonical', href: pageUrl },
    // hreflang pairs must point at each other; scripts/check-blog.mjs verifies both sides exist
    ...(post.value.translation
      ? [
          { rel: 'alternate', hreflang: lang, href: pageUrl },
          { rel: 'alternate', hreflang: lang === 'de' ? 'en' : 'de', href: `${config.public.siteUrl}${post.value.translation}` },
        ]
      : []),
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.value.title,
      'description': post.value.description,
      'datePublished': post.value.date,
      'inLanguage': lang,
      'image': image,
      'url': pageUrl,
      'author': { '@type': 'Organization', 'name': 'Sapid by Talentiq' },
      'publisher': { '@type': 'Organization', 'name': 'Talentiq Solutions', 'logo': { '@type': 'ImageObject', 'url': `${config.public.siteUrl}/sapid-icon.png` } },
    }),
  }],
})

const formattedDate = new Date(`${post.value.date}T12:00:00`).toLocaleDateString(copy.locale, { day: 'numeric', month: 'long', year: 'numeric' })
const slugForCampaign = path.replace(/^\/blog\//, '').replace(/\//g, '_')
</script>

<template>
  <article v-if="post" class="section-py">
    <div class="container narrow">
      <div class="top">
        <NuxtLink :to="copy.backTo" class="back">
          <Icon name="lucide:arrow-left" /> {{ copy.back }}
        </NuxtLink>
        <NuxtLink v-if="post.translation" :to="post.translation" class="other-lang" :hreflang="lang === 'de' ? 'en' : 'de'">
          {{ copy.other }}
        </NuxtLink>
      </div>
      <time :datetime="post.date" class="date">{{ formattedDate }}</time>
      <h1 class="title">
        {{ post.title }}
      </h1>
      <p class="lead">
        {{ post.description }}
      </p>

      <ContentRenderer :value="post" class="prose" />

      <aside class="cta card">
        <img src="/sapid-icon.png" alt="" width="56" height="56" class="cta-icon">
        <div>
          <p class="cta-title">
            {{ copy.ctaTitle }}
          </p>
          <p class="cta-text">
            {{ copy.ctaText }}
          </p>
          <StoreButtons :campaign="`blog_${slugForCampaign}`" size="md" />
        </div>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.narrow {
  max-width: 720px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 2rem;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 600;
  color: var(--color-neutral-600);
}

.other-lang {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-neutral-600);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.date {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.title {
  font-size: clamp(2rem, 5vw, 2.75rem);
  letter-spacing: -0.02em;
  margin: 0.5rem 0 1rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--color-neutral-600);
  margin-bottom: 2.5rem;
}

.prose {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-neutral-800);
}

.prose :deep(h1) {
  display: none;
}

.prose :deep(h2) {
  font-size: 1.625rem;
  margin: 2.5rem 0 1rem;
}

.prose :deep(h3) {
  font-size: 1.25rem;
  margin: 2rem 0 0.75rem;
}

.prose :deep(p),
.prose :deep(ul),
.prose :deep(ol) {
  margin-bottom: 1.25rem;
}

.prose :deep(ul),
.prose :deep(ol) {
  padding-left: 1.5rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(a) {
  color: var(--color-primary-700);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose :deep(img) {
  max-width: 100%;
  border-radius: 1rem;
}

.prose :deep(blockquote) {
  border-left: 4px solid var(--color-primary-300);
  padding-left: 1.25rem;
  color: var(--color-neutral-600);
  margin-bottom: 1.25rem;
}

.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.25rem;
  font-size: 1rem;
}

.prose :deep(th),
.prose :deep(td) {
  border-bottom: 1px solid var(--color-neutral-200);
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.cta {
  display: flex;
  gap: 1.25rem;
  padding: 1.75rem;
  margin-top: 3.5rem;
}

.cta-icon {
  border-radius: 1rem;
  flex-shrink: 0;
}

.cta-title {
  font-weight: 700;
  font-size: 1.125rem;
}

.cta-text {
  color: var(--color-neutral-600);
  margin: 0.25rem 0 1rem;
}
</style>
