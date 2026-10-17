<script setup lang="ts">
const config = useRuntimeConfig()
const { sapid } = useAppConfig()
const pageUrl = `${config.public.siteUrl}/sapid`

const features = [
  {
    icon: 'lucide:import',
    title: 'Save recipes from anywhere',
    text: 'Share a TikTok, Reel, YouTube video or blog post to Sapid, or snap a cookbook page. Sapid pulls out the ingredients, steps and nutrition and scales everything to your household.',
    image: '/import-recipe.png',
    alt: 'Importing a recipe from a social media link in Sapid',
  },
  {
    icon: 'lucide:calendar-check',
    title: 'Plan your week in minutes',
    text: 'Drag recipes onto your week, add quick meals and leftover nights, or let the AI planner suggest a balanced week from your own recipes. Plans change? Shift everything by a day with one tap.',
    image: '/onboarding-1.png',
    alt: 'The Sapid weekly meal planner',
  },
  {
    icon: 'lucide:shopping-bag',
    title: 'One list, sorted by store',
    text: 'Sapid combines every ingredient for the week into one shopping list, grouped by the stores you actually use and ordered the way you walk through them.',
    image: '/shoppinglist-feature.png',
    alt: 'A Sapid shopping list grouped by store',
  },
  {
    icon: 'lucide:chef-hat',
    title: 'Cook hands-free',
    text: 'Cooking mode keeps the screen awake, starts timers for you and moves through the steps by voice, so you never touch your phone with floury hands.',
    image: '/handsfree-cooking.png',
    alt: 'Hands-free cooking mode in Sapid',
  },
]

const plans = [
  {
    name: 'Free',
    items: ['Weekly meal planner', 'Shopping list sorted by store', 'Add your own family recipes', 'Hands-free cooking mode', 'English, Deutsch, Français, Español'],
  },
  {
    name: 'Premium',
    items: ['Everything in Free', 'Import from TikTok, Instagram, YouTube & blogs', 'Import from photos and text', 'AI meal planner', 'Nutrition estimates for every recipe'],
  },
]

const faqs = [
  {
    q: 'Is Sapid free?',
    a: 'Yes. Planning, shopping lists, your own recipes and cooking mode are free. Sapid Premium adds AI recipe imports from any link or photo, the AI meal planner and nutrition estimates.',
  },
  {
    q: 'Can Sapid import recipes from TikTok and Instagram?',
    a: 'Yes. Share the post to Sapid or paste the link. Sapid reads the caption, follows “recipe in bio” links and, if needed, listens to the video to find the recipe. You can try it free in your browser with our recipe extractor.',
  },
  {
    q: 'Is Sapid available on iPhone?',
    a: sapid.appStoreUrl
      ? 'Yes. Sapid is available on the App Store and Google Play, and your recipes and plans sync between devices.'
      : 'Sapid is available on Android today and is coming to iPhone soon. Your recipes and plans sync across devices.',
  },
  {
    q: 'Which languages does Sapid support?',
    a: 'English, German, French and Spanish. Imported recipes are translated into your language automatically.',
  },
]

useSeoMeta({
  title: 'Sapid: Meal Planner & Recipe Saver for TikTok, Instagram and Blogs',
  description: 'Sapid turns saved recipes into dinner. Import recipes from TikTok, Instagram, YouTube or any blog, plan your week, get one shopping list sorted by store, and cook hands-free.',
  ogTitle: 'Sapid: from saved recipe to dinner on the table',
  ogDescription: 'Import recipes from anywhere, plan your week, shop with one list and cook hands-free.',
  ogImage: `${config.public.siteUrl}/og-sapid.png`,
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          'name': 'Sapid',
          'operatingSystem': sapid.appStoreUrl ? 'Android, iOS' : 'Android',
          'applicationCategory': 'LifestyleApplication',
          'url': pageUrl,
          'image': `${config.public.siteUrl}/sapid-icon.png`,
          'installUrl': sapid.appStoreUrl ? [sapid.playStoreUrl, sapid.appStoreUrl] : sapid.playStoreUrl,
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR' },
          'publisher': { '@type': 'Organization', 'name': 'Talentiq Solutions', 'url': config.public.siteUrl },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqs.map(f => ({ '@type': 'Question', 'name': f.q, 'acceptedAnswer': { '@type': 'Answer', 'text': f.a } })),
        },
      ]),
    },
  ],
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="eyebrow">The meal planner for recipe savers</span>
          <h1 class="hero-title">
            From saved recipe to <span class="highlight">dinner on the table</span>
          </h1>
          <p class="hero-text">
            You save recipes everywhere, then stand in the kitchen with no plan. Sapid brings every recipe into one place, plans your week, writes one shopping list and talks you through cooking.
          </p>
          <StoreButtons campaign="sapid_hero" />
          <NuxtLink to="/sapid/recipe-extractor" class="try-link">
            <Icon name="lucide:sparkles" /> Try the recipe import free in your browser
          </NuxtLink>
        </div>
        <div class="hero-visual">
          <div class="phone-frame">
            <img src="/onboarding-1.png" alt="Sapid onboarding screen: the mental load of meal planning, solved">
          </div>
        </div>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            Everything between “that looks good” and “dinner’s ready”
          </h2>
        </div>

        <div class="features">
          <article
            v-for="(feature, index) in features"
            :key="feature.title"
            class="feature"
            :class="{ reverse: index % 2 === 1 }"
          >
            <div class="feature-copy">
              <span class="feature-icon"><Icon :name="feature.icon" /></span>
              <h3 class="feature-title">
                {{ feature.title }}
              </h3>
              <p class="feature-text">
                {{ feature.text }}
              </p>
            </div>
            <div class="feature-visual">
              <div class="phone-frame small">
                <img :src="feature.image" :alt="feature.alt" loading="lazy">
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="tool-band">
      <div class="container tool-band-inner">
        <div class="tool-band-copy">
          <span class="eyebrow">Try it now</span>
          <h2 class="section-title">
            Paste a recipe link, get a shopping list
          </h2>
          <p class="section-subtitle">
            See how Sapid reads a TikTok, Reel or blog post. No download, no sign-up.
          </p>
        </div>
        <RecipeExtractor campaign="sapid_page_tool" />
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            Free to start
          </h2>
          <p class="section-subtitle">
            Plan, shop and cook for free. Upgrade when you want Sapid to do the typing for you.
          </p>
        </div>
        <div class="plans">
          <div v-for="plan in plans" :key="plan.name" class="plan card" :class="{ premium: plan.name === 'Premium' }">
            <h3>{{ plan.name }}</h3>
            <ul>
              <li v-for="item in plan.items" :key="item">
                <Icon name="lucide:check" /> {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section-py faq-section">
      <div class="container narrow">
        <h2 class="section-title">
          Questions
        </h2>
        <details v-for="faq in faqs" :key="faq.q" class="faq">
          <summary>{{ faq.q }}</summary>
          <p>{{ faq.a }}</p>
        </details>
      </div>
    </section>

    <section class="final-cta">
      <div class="container final-cta-inner">
        <img src="/sapid-icon.png" alt="" class="app-icon" width="72" height="72">
        <h2 class="section-title">
          Make this the week you cook what you save
        </h2>
        <StoreButtons campaign="sapid_footer" />
        <p class="behind">
          Behind the scenes:
          <NuxtLink to="/sapid/next">The AI sous-chef</NuxtLink> ·
          <NuxtLink to="/sapid/proposal">Our vision</NuxtLink> ·
          <NuxtLink to="/sapid/technical">Technical docs</NuxtLink>
        </p>
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
  font-size: clamp(2.375rem, 5.5vw, 3.75rem);
  letter-spacing: -0.025em;
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

.try-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  font-weight: 600;
  color: var(--color-primary-700);
  text-decoration: underline;
  text-decoration-color: var(--color-primary-300);
  text-underline-offset: 4px;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}

.features {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.feature {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
}

.feature-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 1rem;
}

.feature-text {
  font-size: 1.125rem;
  color: var(--color-neutral-600);
  line-height: 1.65;
  max-width: 32rem;
}

.feature-visual {
  display: flex;
  justify-content: center;
}

.phone-frame.small {
  max-width: 240px;
}

@media (min-width: 900px) {
  .feature {
    grid-template-columns: 1fr 1fr;
  }

  .feature.reverse .feature-copy {
    order: 2;
  }
}

.tool-band {
  padding: 5rem 0;
  background: var(--color-primary-50);
  border-top: 1px solid var(--color-primary-100);
  border-bottom: 1px solid var(--color-primary-100);
}

.tool-band-inner {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 960px) {
  .tool-band-inner {
    grid-template-columns: 1fr 1.3fr;
  }
}

.plans {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  max-width: 820px;
  margin: 0 auto;
}

.plan {
  padding: 2rem;
}

.plan h3 {
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
}

.plan ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.plan li {
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;
  color: var(--color-neutral-700);
}

.plan li :deep(svg) {
  color: var(--color-primary-600);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.plan.premium {
  border: 2px solid var(--color-primary-500);
}

.narrow {
  max-width: 760px;
}

.faq-section .section-title {
  margin-bottom: 1.5rem;
}

.faq {
  border-bottom: 1px solid var(--color-neutral-200);
  padding: 1.25rem 0;
}

.faq summary {
  cursor: pointer;
  font-weight: 600;
  font-size: 1.0625rem;
}

.faq p {
  margin-top: 0.75rem;
  color: var(--color-neutral-600);
  line-height: 1.65;
}

.final-cta {
  padding: 5rem 0 6rem;
  text-align: center;
}

.final-cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.app-icon {
  border-radius: 1.25rem;
  box-shadow: 0 10px 30px -10px rgba(17, 24, 39, 0.3);
}

.final-cta :deep(.store-buttons) {
  justify-content: center;
}

.behind {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.behind a {
  color: var(--color-neutral-700);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
