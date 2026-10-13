<script setup lang="ts">
const config = useRuntimeConfig()
const pageUrl = `${config.public.siteUrl}/recipes/garlic-butter-seafood-pasta`
const imageUrl = `${config.public.siteUrl}/shrimp_pasta.png`

const recipe = {
  title: 'Garlic Butter Seafood Pasta',
  description: 'A rich and comforting seafood pasta tossed in a creamy garlic butter and white wine sauce, featuring tender shrimp and mussels.',
  prepTime: '10 min',
  cookTime: '15 min',
  totalTime: '25 min',
  servings: 4,
  calories: 520,
  protein: '32g',
  carbs: '55g',
  fat: '22g',
  tags: ['Italian', 'Dinner', 'Comfort Food', 'High Protein'],
  ingredients: [
    { name: 'Pasta (linguine or spaghetti)', amount: '400', unit: 'g' },
    { name: 'Shrimp (peeled & deveined)', amount: '300', unit: 'g' },
    { name: 'Mussels (cleaned)', amount: '300', unit: 'g' },
    { name: 'Garlic cloves (minced)', amount: '3', unit: 'pcs' },
    { name: 'Unsalted butter', amount: '3', unit: 'tbsp' },
    { name: 'Heavy cream', amount: '½', unit: 'cup' },
    { name: 'Dry white wine', amount: '⅓', unit: 'cup' },
    { name: 'Dried oregano', amount: '1', unit: 'tsp' },
    { name: 'Red pepper flakes', amount: '½', unit: 'tsp' },
    { name: 'Fresh lemon juice', amount: '1', unit: 'tbsp' },
    { name: 'Sea salt & black pepper', amount: 'to taste', unit: '' },
  ],
  steps: [
    {
      num: 1,
      title: 'Cook the pasta',
      instruction: 'Bring a large pot of salted water to a rolling boil. Cook pasta until al dente according to package instructions. Reserve ½ cup of pasta water, then drain and set aside.',
    },
    {
      num: 2,
      title: 'Prep the seafood',
      instruction: 'Rinse and inspect the mussels (discard any cracked or unclosed shells). Pat the shrimp and mussels completely dry with paper towels to ensure optimal searing.',
    },
    {
      num: 3,
      title: 'Sauté garlic & aromatics',
      instruction: 'Melt unsalted butter in a wide skillet or Dutch oven over medium heat. Add the minced garlic and sauté for 1–2 minutes until golden and intensely fragrant.',
    },
    {
      num: 4,
      title: 'Sear seafood with spices',
      instruction: 'Add the shrimp and mussels into the pan. Season with oregano, red pepper flakes, salt, and black pepper. Sauté for 3–4 minutes until shrimp turn pink and mussels open.',
    },
    {
      num: 5,
      title: 'Simmer wine & cream sauce',
      instruction: 'Pour in the dry white wine and heavy cream. Simmer over medium-low heat for 2–3 minutes until the sauce reduces and coats the back of a spoon.',
    },
    {
      num: 6,
      title: 'Toss & serve',
      instruction: 'Transfer cooked pasta into the skillet. Toss thoroughly with the sauce, adding a splash of reserved pasta water if needed. Finish with fresh lemon juice and serve immediately.',
    },
  ],
}

// Interactive checklist state
const checkedIngredients = ref<Record<number, boolean>>({})
const toggleIngredient = (idx: number) => {
  checkedIngredients.value[idx] = !checkedIngredients.value[idx]
}

const copied = ref(false)
const copyUrl = async () => {
  if (process.client) {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: recipe.title,
          url: pageUrl,
        })
        return
      } catch {
        // user dismissed or share aborted
      }
    }
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(pageUrl)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2500)
    }
  }
}

useSeoMeta({
  title: 'Garlic Butter Seafood Pasta Recipe · Sapid',
  description: 'Rich, comforting garlic butter seafood pasta with tender shrimp and mussels in a white wine cream sauce. Ready in 25 minutes with Sapid.',
  ogTitle: 'Garlic Butter Seafood Pasta Recipe',
  ogDescription: 'Rich, comforting garlic butter seafood pasta with tender shrimp and mussels in a silky white wine cream sauce.',
  ogImage: imageUrl,
  ogUrl: pageUrl,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: recipe.title,
        image: [imageUrl],
        description: recipe.description,
        author: {
          '@type': 'Organization',
          name: 'Sapid by Talentiq',
          url: config.public.siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Talentiq Solutions',
          url: config.public.siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${config.public.siteUrl}/sapid-icon.png`,
          },
        },
        datePublished: '2026-10-13',
        prepTime: 'PT10M',
        cookTime: 'PT15M',
        totalTime: 'PT25M',
        recipeYield: '4 servings',
        recipeCategory: 'Dinner',
        recipeCuisine: 'Italian',
        nutrition: {
          '@type': 'NutritionInformation',
          calories: '520 calories',
          proteinContent: '32 g',
          carbohydrateContent: '55 g',
          fatContent: '22 g',
        },
        recipeIngredient: [
          '400 g pasta',
          '3 tbsp unsalted butter',
          '0.5 cup heavy cream',
          '3 garlic cloves, minced',
          '0.33 cup dry white wine',
          '300 g shrimp, peeled and deveined',
          '300 g mussels, cleaned',
          '1 tsp dried oregano',
          'Salt to taste',
          '0.5 tsp red pepper flakes',
          '1 tbsp lemon juice',
        ],
        recipeInstructions: recipe.steps.map(s => ({
          '@type': 'HowToStep',
          name: s.title,
          text: s.instruction,
        })),
      }),
    },
  ],
})
</script>

<template>
  <main class="recipe-page">
    <div class="container narrow">
      <!-- Breadcrumb / Back Navigation -->
      <nav class="recipe-top" aria-label="Breadcrumb">
        <NuxtLink to="/sapid" class="back-link">
          <Icon name="lucide:arrow-left" class="back-icon" /> All recipes
        </NuxtLink>
        <button class="share-btn" @click="copyUrl">
          <Icon :name="copied ? 'lucide:check' : 'lucide:share-2'" />
          <span>{{ copied ? 'Link copied!' : 'Share recipe' }}</span>
        </button>
      </nav>

      <!-- Hero Header -->
      <header class="recipe-header">
        <div class="tags-row">
          <span v-for="tag in recipe.tags" :key="tag" class="tag-pill">{{ tag }}</span>
        </div>
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        <p class="recipe-desc">{{ recipe.description }}</p>

        <!-- Stats Bar -->
        <div class="meta-strip">
          <div class="meta-item">
            <Icon name="lucide:clock" class="meta-icon" />
            <div>
              <span class="meta-label">Total time</span>
              <strong class="meta-val">{{ recipe.totalTime }}</strong>
            </div>
          </div>
          <div class="meta-item">
            <Icon name="lucide:flame" class="meta-icon" />
            <div>
              <span class="meta-label">Calories</span>
              <strong class="meta-val">{{ recipe.calories }} kcal</strong>
            </div>
          </div>
          <div class="meta-item">
            <Icon name="lucide:dumbbell" class="meta-icon" />
            <div>
              <span class="meta-label">Protein</span>
              <strong class="meta-val">{{ recipe.protein }}</strong>
            </div>
          </div>
          <div class="meta-item">
            <Icon name="lucide:users" class="meta-icon" />
            <div>
              <span class="meta-label">Servings</span>
              <strong class="meta-val">{{ recipe.servings }} people</strong>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Image -->
      <div class="recipe-image-wrap">
        <img
          src="/shrimp_pasta.png"
          :alt="recipe.title"
          class="recipe-hero-image"
          width="1024"
          height="680"
        />
        <div class="image-badge">
          <Icon name="lucide:sparkles" /> Sapid Featured Recipe
        </div>
      </div>

      <!-- In-app Promo Banner -->
      <aside class="app-banner card">
        <img src="/sapid-icon.png" alt="Sapid App" width="56" height="56" class="app-banner-icon" />
        <div class="app-banner-body">
          <h2 class="app-banner-title">Cook this week with Sapid</h2>
          <p class="app-banner-text">
            Add this recipe to your weekly plan with one tap. Sapid automatically adds the ingredients to your shopping list sorted by store aisle, and guides you through cooking hands-free with voice control.
          </p>
          <div class="app-banner-actions">
            <StoreButtons campaign="recipe_seafood_pasta" size="md" />
          </div>
        </div>
      </aside>

      <!-- Recipe Content Grid -->
      <div class="recipe-content-grid">
        <!-- Ingredients Section -->
        <section class="recipe-section ingredients-card card" aria-labelledby="ingredients-heading">
          <div class="section-header">
            <h2 id="ingredients-heading" class="section-title">
              <Icon name="lucide:shopping-basket" class="section-icon" /> Ingredients
            </h2>
            <span class="section-count">{{ recipe.ingredients.length }} items</span>
          </div>

          <p class="checklist-tip">Tip: Tap items to check them off as you prepare your kitchen.</p>

          <ul class="ingredients-list">
            <li
              v-for="(item, idx) in recipe.ingredients"
              :key="idx"
              class="ingredient-item"
              :class="{ 'is-checked': checkedIngredients[idx] }"
              @click="toggleIngredient(idx)"
            >
              <div class="checkbox-circle" :class="{ 'is-active': checkedIngredients[idx] }">
                <Icon v-if="checkedIngredients[idx]" name="lucide:check" class="check-mark" />
              </div>
              <span class="ingredient-name">{{ item.name }}</span>
              <span class="ingredient-amount">
                {{ item.amount }} {{ item.unit }}
              </span>
            </li>
          </ul>

          <div class="nutrition-card">
            <h3 class="nutrition-title">Estimated Nutrition (per serving)</h3>
            <div class="nutrition-grid">
              <div class="nutrition-box">
                <span class="nutr-val">{{ recipe.calories }}</span>
                <span class="nutr-lbl">Calories</span>
              </div>
              <div class="nutrition-box">
                <span class="nutr-val">{{ recipe.protein }}</span>
                <span class="nutr-lbl">Protein</span>
              </div>
              <div class="nutrition-box">
                <span class="nutr-val">{{ recipe.carbs }}</span>
                <span class="nutr-lbl">Carbs</span>
              </div>
              <div class="nutrition-box">
                <span class="nutr-val">{{ recipe.fat }}</span>
                <span class="nutr-lbl">Fat</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Instructions Section -->
        <section class="recipe-section instructions-card card" aria-labelledby="instructions-heading">
          <div class="section-header">
            <h2 id="instructions-heading" class="section-title">
              <Icon name="lucide:chef-hat" class="section-icon" /> Step-by-Step Instructions
            </h2>
            <span class="section-count">{{ recipe.steps.length }} steps</span>
          </div>

          <ol class="steps-list">
            <li v-for="step in recipe.steps" :key="step.num" class="step-card">
              <div class="step-number">{{ step.num }}</div>
              <div class="step-body">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-instruction">{{ step.instruction }}</p>
              </div>
            </li>
          </ol>
        </section>
      </div>

      <!-- Bottom Call to Action -->
      <section class="cta-bottom card">
        <h2 class="cta-bottom-title">Never lose a recipe again</h2>
        <p class="cta-bottom-text">
          Sapid imports recipes from TikTok, Instagram, YouTube and any website in seconds, turns them into a single organized shopping list, and keeps your meal plan effortlessly on track.
        </p>
        <StoreButtons campaign="recipe_seafood_pasta_footer" size="lg" />
      </section>
    </div>
  </main>
</template>

<style scoped>
.recipe-page {
  padding: 40px 0 80px;
}

.narrow {
  max-width: 860px;
}

.recipe-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary-600);
  transition: color 0.15s;
}

.back-link:hover {
  color: var(--color-primary-700);
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid var(--color-neutral-200);
  padding: 8px 14px;
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-neutral-700);
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:hover {
  background: var(--color-neutral-50);
  border-color: var(--color-neutral-300);
}

.recipe-header {
  margin-bottom: 28px;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag-pill {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 9999px;
  background-color: var(--color-primary-100);
  color: var(--color-primary-800);
}

.recipe-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-neutral-900);
  margin-bottom: 12px;
}

.recipe-desc {
  font-size: 1.15rem;
  color: var(--color-neutral-600);
  line-height: 1.6;
  margin-bottom: 24px;
}

.meta-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 16px;
  padding: 16px 20px;
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-icon {
  font-size: 1.4rem;
  color: var(--color-primary-600);
}

.meta-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-neutral-400);
}

.meta-val {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-neutral-800);
}

.recipe-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.recipe-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(17, 36, 22, 0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.app-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, white 100%);
  border: 1.5px solid var(--color-primary-200);
  padding: 24px;
  margin-bottom: 36px;
  border-radius: 20px;
}

.app-banner-icon {
  flex-shrink: 0;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(59, 128, 72, 0.2);
}

.app-banner-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 6px;
}

.app-banner-text {
  font-size: 0.95rem;
  color: var(--color-neutral-600);
  line-height: 1.5;
  margin-bottom: 14px;
}

.recipe-content-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-neutral-100);
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  color: var(--color-primary-600);
}

.section-count {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-neutral-400);
}

.checklist-tip {
  font-size: 0.85rem;
  color: var(--color-neutral-400);
  margin-bottom: 16px;
  font-style: italic;
}

.ingredients-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--color-neutral-50);
  border: 1px solid var(--color-neutral-100);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.ingredient-item:hover {
  background: white;
  border-color: var(--color-primary-300);
}

.ingredient-item.is-checked {
  opacity: 0.55;
  background: var(--color-neutral-100);
}

.ingredient-item.is-checked .ingredient-name {
  text-decoration: line-through;
}

.checkbox-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--color-neutral-300);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox-circle.is-active {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.check-mark {
  color: white;
  font-size: 14px;
}

.ingredient-name {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-neutral-800);
}

.ingredient-amount {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary-700);
}

.nutrition-card {
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: 14px;
  padding: 16px 20px;
}

.nutrition-title {
  font-size: 0.88rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-neutral-500);
  margin-bottom: 12px;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.nutrition-box {
  text-align: center;
  padding: 10px 4px;
  background: var(--color-neutral-50);
  border-radius: 10px;
}

.nutr-val {
  display: block;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-neutral-900);
}

.nutr-lbl {
  display: block;
  font-size: 0.72rem;
  text-transform: uppercase;
  color: var(--color-neutral-500);
}

.steps-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.step-card {
  display: flex;
  gap: 18px;
  padding: 18px 20px;
  background: var(--color-neutral-50);
  border: 1px solid var(--color-neutral-100);
  border-radius: 16px;
  transition: transform 0.15s ease;
}

.step-card:hover {
  background: white;
  border-color: var(--color-neutral-200);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary-600);
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(59, 128, 72, 0.25);
}

.step-body {
  flex: 1;
}

.step-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 6px;
}

.step-instruction {
  font-size: 1rem;
  color: var(--color-neutral-700);
  line-height: 1.6;
}

.cta-bottom {
  text-align: center;
  padding: 48px 32px;
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: 24px;
}

.cta-bottom-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-neutral-900);
  margin-bottom: 12px;
}

.cta-bottom-text {
  font-size: 1.05rem;
  color: var(--color-neutral-600);
  max-width: 580px;
  margin: 0 auto 24px;
  line-height: 1.55;
}

@media (max-width: 640px) {
  .app-banner {
    flex-direction: column;
    text-align: center;
  }
  .app-banner-actions {
    display: flex;
    justify-content: center;
  }
  .step-card {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
