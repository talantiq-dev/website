<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Sapid Meal Planner & App Development',
  description: 'Talentiq Solutions builds Sapid, the meal planner that imports recipes from TikTok, Instagram and blogs, plans your week and writes one shopping list. We also build apps for clients.',
  ogTitle: 'Sapid by Talentiq: cook the recipes you save',
  ogDescription: 'Import recipes from anywhere, plan your week, shop with one list and cook hands-free.',
  ogImage: `${config.public.siteUrl}/og-sapid.png`,
  ogUrl: config.public.siteUrl,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Talentiq Solutions',
        'url': config.public.siteUrl,
        'logo': `${config.public.siteUrl}/sapid-icon.png`,
      }),
    },
  ],
})

const pillars = [
  { icon: 'lucide:bookmark-plus', title: 'Save', text: 'Recipes from TikTok, Instagram, YouTube, blogs and cookbook photos, all in one place.' },
  { icon: 'lucide:calendar-days', title: 'Plan', text: 'A realistic week with quick meals and leftover nights, or let the AI suggest one.' },
  { icon: 'lucide:shopping-cart', title: 'Shop', text: 'One list for the whole week, sorted by the stores you actually use.' },
  { icon: 'lucide:mic', title: 'Cook', text: 'Step-by-step guidance and timers you control by voice, hands-free.' },
]

const services = [
  { icon: 'lucide:smartphone', title: 'App development', text: 'Native and cross-platform iOS and Android apps, from prototype to App Store.' },
  { icon: 'lucide:brain-circuit', title: 'AI features', text: 'Voice agents, multimodal assistants and AI workflows that work in production, like the ones inside Sapid.' },
  { icon: 'lucide:briefcase', title: 'IT consulting', text: 'Architecture reviews, cloud infrastructure and modernizing legacy systems.' },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">Meet Sapid, from Talentiq</span>
          <h1 class="hero-title">
            Cook the recipes <span class="highlight">you save</span>
          </h1>
          <p class="hero-text">
            Sapid imports recipes from TikTok, Instagram, YouTube and any blog, plans your week, writes one shopping list sorted by store, and guides you through cooking hands-free.
          </p>
          <StoreButtons campaign="home_hero" />
          <div class="hero-links">
            <NuxtLink to="/sapid" class="text-link">
              How Sapid works <Icon name="lucide:arrow-right" />
            </NuxtLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="phone-frame">
            <img src="/shoppinglist-feature.png" alt="A Sapid shopping list grouped by store">
          </div>
        </div>
      </div>
    </section>

    <section class="tool-section section-py">
      <div class="container tool-inner">
        <div class="section-header">
          <span class="eyebrow">Free tool</span>
          <h2 class="section-title">
            Got a recipe video? Get the shopping list.
          </h2>
          <p class="section-subtitle">
            Paste any TikTok, Instagram, YouTube or blog link and see what Sapid pulls out. No sign-up needed.
          </p>
        </div>
        <RecipeExtractor campaign="home_tool" />
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            One app from inspiration to dinner
          </h2>
        </div>
        <div class="pillars">
          <NuxtLink v-for="pillar in pillars" :key="pillar.title" to="/sapid" class="pillar card">
            <span class="pillar-icon"><Icon :name="pillar.icon" /></span>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.text }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="studio section-py">
      <div class="container">
        <div class="studio-header">
          <div>
            <span class="eyebrow light">Talentiq Solutions</span>
            <h2 class="section-title">
              We build apps like Sapid for you, too
            </h2>
            <p class="section-subtitle">
              The team behind Sapid designs and builds mobile apps and AI features for clients, and advises on the technology underneath.
            </p>
          </div>
          <div class="studio-actions">
            <NuxtLink to="/contact" class="btn btn-primary btn-xl">
              Start a project
            </NuxtLink>
            <NuxtLink to="/services" class="btn btn-ghost-light btn-xl">
              Our services <Icon name="lucide:arrow-right" />
            </NuxtLink>
          </div>
        </div>
        <div class="services">
          <div v-for="service in services" :key="service.title" class="service">
            <Icon :name="service.icon" class="service-icon" />
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 4.5rem 0 5rem;
  background:
    radial-gradient(50rem 30rem at 85% 10%, var(--color-primary-100), transparent 70%),
    var(--color-background-light);
}

.hero-grid {
  display: grid;
  gap: 3.5rem;
  align-items: center;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.highlight {
  color: var(--color-primary-600);
}

.hero-text {
  font-size: 1.1875rem;
  color: var(--color-neutral-700);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 34rem;
}

.hero-links {
  margin-top: 1.25rem;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 600;
  color: var(--color-primary-700);
}

.hero-visual {
  display: flex;
  justify-content: center;
}

@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: 1.25fr 1fr;
  }
}

.tool-section {
  background: var(--color-primary-50);
  border-top: 1px solid var(--color-primary-100);
  border-bottom: 1px solid var(--color-primary-100);
}

.tool-inner {
  max-width: 760px;
}

.tool-inner .section-header {
  margin-bottom: 2rem;
}

.pillars {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.pillar {
  padding: 1.75rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.pillar:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -12px rgba(17, 24, 39, 0.2);
}

.pillar-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.875rem;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  font-size: 1.375rem;
  margin-bottom: 1rem;
}

.pillar h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.pillar p {
  color: var(--color-neutral-600);
}

.studio {
  background: var(--color-neutral-900);
  color: var(--color-white);
}

.studio .section-title {
  color: var(--color-white);
}

.studio .section-subtitle {
  color: var(--color-neutral-400);
}

.eyebrow.light {
  color: var(--color-primary-300);
}

.studio-header {
  display: grid;
  gap: 2rem;
  align-items: end;
  margin-bottom: 3.5rem;
}

.studio-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn-ghost-light {
  color: var(--color-neutral-200);
  background: transparent;
}

.btn-ghost-light:hover {
  background: var(--color-neutral-800);
}

@media (min-width: 960px) {
  .studio-header {
    grid-template-columns: 1.5fr 1fr;
  }

  .studio-actions {
    justify-content: flex-end;
  }
}

.services {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.service {
  border-top: 1px solid var(--color-neutral-700);
  padding-top: 1.5rem;
}

.service-icon {
  font-size: 1.5rem;
  color: var(--color-primary-400);
  margin-bottom: 0.875rem;
}

.service h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.service p {
  color: var(--color-neutral-400);
}
</style>
