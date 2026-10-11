<script setup lang="ts">
const config = useRuntimeConfig()
const pageUrl = `${config.public.siteUrl}/sapid/recipe-extractor`

const faqs = [
  {
    q: 'Is the recipe extractor free?',
    a: 'Yes. You can extract a few recipes per day for free, with no sign-up. If you want unlimited imports, the Sapid app imports recipes from any link straight into your collection.',
  },
  {
    q: 'Which links work?',
    a: 'TikTok, Instagram Reels and posts, YouTube videos and Shorts, and almost any recipe blog or website. For videos, Sapid reads the caption, follows “recipe in bio” links and, if needed, listens to what is said in the video.',
  },
  {
    q: 'Why do I only see the ingredients, not the steps?',
    a: 'The method is the creator’s work, so we send you to the original post or page for it. In the Sapid app you can save the full recipe to your private collection and cook it step by step, hands-free.',
  },
  {
    q: 'What happens to the link I paste?',
    a: 'We fetch the page, extract the ingredients and keep that ingredient list for up to 7 days so repeat requests for the same link are instant. To limit abuse we count requests per visitor using a one-way hash of your IP address that changes daily and is deleted after two days. We never store the IP address itself.',
  },
  {
    q: 'Can I change the number of servings?',
    a: 'The web tool lists ingredients for 2 servings. In the Sapid app you set your household size once and every imported recipe is scaled automatically.',
  },
]

useSeoMeta({
  title: 'Free Recipe Extractor: TikTok, Instagram & YouTube to Shopping List',
  description: 'Paste a TikTok, Instagram, YouTube or blog recipe link and get a tidy, tickable shopping list of the ingredients in seconds. Free, no sign-up.',
  ogTitle: 'Turn any recipe video into a shopping list',
  ogDescription: 'Paste a TikTok, Instagram, YouTube or blog link. Get the ingredients as a shopping list in seconds. Free.',
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
          '@type': 'WebApplication',
          'name': 'Sapid Recipe Extractor',
          'url': pageUrl,
          'applicationCategory': 'LifestyleApplication',
          'operatingSystem': 'Any',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR' },
          'description': 'Extract the ingredients from TikTok, Instagram, YouTube and blog recipes as a shopping list.',
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

const steps = [
  { icon: 'lucide:link', title: 'Copy the link', text: 'Tap “Share” then “Copy link” on any TikTok, Reel, YouTube video or recipe page.' },
  { icon: 'lucide:sparkles', title: 'Paste it here', text: 'Sapid reads the caption, the linked blog or the video itself to find the recipe.' },
  { icon: 'lucide:shopping-basket', title: 'Shop', text: 'Tick off what you have, copy the rest, or send it to Sapid to plan your week.' },
]
</script>

<template>
  <div>
    <section class="tool-hero">
      <div class="container narrow">
        <span class="eyebrow">Free tool · No sign-up</span>
        <h1 class="tool-title">
          Turn any recipe video into a shopping list
        </h1>
        <p class="tool-subtitle">
          Paste a link from TikTok, Instagram, YouTube or any food blog. Get the ingredients as a tidy, tickable list in seconds.
        </p>
        <RecipeExtractor campaign="recipe_tool_page" />
        <p class="sources">
          <Icon name="lucide:check" /> TikTok
          <Icon name="lucide:check" /> Instagram
          <Icon name="lucide:check" /> YouTube &amp; Shorts
          <Icon name="lucide:check" /> Food blogs
        </p>
      </div>
    </section>

    <section class="section-py">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            How it works
          </h2>
        </div>
        <ol class="steps">
          <li v-for="(step, index) in steps" :key="step.title" class="step card">
            <span class="step-number">{{ index + 1 }}</span>
            <Icon :name="step.icon" class="step-icon" />
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="app-band">
      <div class="container app-band-inner">
        <div>
          <h2 class="section-title">
            Saving recipes is easy. Cooking them is the hard part.
          </h2>
          <p class="section-subtitle">
            Sapid turns the recipes you save into a weekly plan and one shopping list for all your meals, sorted by store. When it’s time to cook, it guides you step by step, hands-free.
          </p>
          <StoreButtons campaign="recipe_tool_band" />
          <NuxtLink to="/sapid" class="more-link">
            See everything Sapid does <Icon name="lucide:arrow-right" />
          </NuxtLink>
        </div>
        <div class="phone-frame app-band-phone">
          <img src="/import-recipe.png" alt="Importing a recipe from a link in the Sapid app" loading="lazy">
        </div>
      </div>
    </section>

    <section class="section-py">
      <div class="container narrow">
        <h2 class="section-title faq-title">
          Questions
        </h2>
        <details v-for="faq in faqs" :key="faq.q" class="faq">
          <summary>{{ faq.q }}</summary>
          <p>{{ faq.a }}</p>
        </details>
      </div>
    </section>
  </div>
</template>

<style scoped>
.narrow {
  max-width: 760px;
}

.tool-hero {
  padding: 4.5rem 0 3.5rem;
  text-align: center;
  background:
    radial-gradient(60rem 30rem at 50% -10%, var(--color-primary-100), transparent 70%),
    var(--color-background-light);
}

.tool-title {
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.tool-subtitle {
  font-size: 1.1875rem;
  color: var(--color-neutral-600);
  margin: 0 auto 2.25rem;
  max-width: 36rem;
}

.sources {
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.375rem 0.5rem;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.sources :deep(svg) {
  color: var(--color-primary-600);
  margin-left: 0.5rem;
}

.steps {
  list-style: none;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.step {
  position: relative;
  padding: 2rem 1.5rem 1.5rem;
}

.step-number {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary-100);
}

.step-icon {
  font-size: 1.75rem;
  color: var(--color-primary-600);
  margin-bottom: 1rem;
}

.step h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.step p {
  color: var(--color-neutral-600);
}

.app-band {
  background: var(--color-primary-950);
  color: var(--color-white);
  padding: 5rem 0;
  overflow: hidden;
}

.app-band .section-title {
  color: var(--color-white);
}

.app-band .section-subtitle {
  color: var(--color-primary-200);
  margin-bottom: 2rem;
}

.app-band :deep(.btn-outline) {
  color: var(--color-primary-100);
  border-color: var(--color-primary-700);
}

.app-band-inner {
  display: grid;
  gap: 3rem;
  align-items: center;
}

.app-band-phone {
  justify-self: center;
  max-width: 260px;
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-300);
}

@media (min-width: 900px) {
  .app-band-inner {
    grid-template-columns: 3fr 2fr;
  }
}

.faq-title {
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
  list-style-position: outside;
}

.faq p {
  margin-top: 0.75rem;
  color: var(--color-neutral-600);
  line-height: 1.65;
}
</style>
