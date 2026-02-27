<script setup lang="ts">
definePageMeta({
  title: 'Sapid - AI Meal Planner'
})

useSeoMeta({
  title: 'Sapid - AI Meal Planner | Reclaim your mental space',
  description: 'Your meals taken care of – Always. Sapid helps you plan meals without overthinking, organizes shopping trips by store, and lets you stay in control.',
})
</script>

<template>
  <div class="product-page">
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
            <div class="hero-text">
              <p class="subtitle">Your Meals taken care of – Always</p>
              <h1 class="title">Sapid: Reclaim your mental space</h1>
              <p class="description">
                Plan meals without overthinking; you stay in control. Sapid is designed to work with how you already shop, organizing your week without forcing choices or complex optimizations.
              </p>
              
              <div class="actions">
                 <NuxtLink to="https://play.google.com/store/apps/details?id=com.talantiq.sapid" target="_blank" class="btn btn-primary btn-xl">
                    <Icon name="lucide:play-circle" class="w-5 h-5 mr-2" />
                    Google Play
                 </NuxtLink>
                 <button class="btn btn-outline btn-xl" disabled>
                    <Icon name="lucide:smartphone" class="w-5 h-5 mr-2" />
                    App Store
                 </button>
              </div>
              <div class="sub-actions">
                 <NuxtLink to="/sapid/next" class="link highlight-link">✨ Meet the AI Sous-Chef</NuxtLink>
                 <NuxtLink to="/sapid/proposal" class="link">Read the Vision</NuxtLink>
                 <NuxtLink to="/sapid/technical" class="link">Technical Docs</NuxtLink>
              </div>
            </div>
        </div>
        
        <div class="hero-image">
          <div class="mockup-frame">
              <img src="/onboarding-1.png" alt="Sapid Planner" class="mockup-image" />
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <div class="feature-grid">
          <div class="feature-row">
            <div class="feature-info">
              <div class="feature-icon-wrapper">
                <Icon name="lucide:calendar-check" class="feature-icon" />
              </div>
              <h2 class="feature-title">Plan Your Week</h2>
              <p class="feature-text">
                Add recipes to your planner for the coming days. Use the AI Master Planner to autogenerate a balanced weekly plan in seconds based on your effort goals and preferences.
              </p>
            </div>
            <div class="feature-visual">
               <div class="mockup-frame-small">
                  <img src="/sapid-screenshot-plan1.png" alt="Sapid Planning" class="mockup-image" />
               </div>
            </div>
          </div>

          <div class="feature-row reverse">
            <div class="feature-visual">
               <div class="mockup-frame-small">
                  <img src="/shoppinglist-feature.png" alt="Sapid Shopping" class="mockup-image" />
               </div>
            </div>
            <div class="feature-info">
              <div class="feature-icon-wrapper">
                <Icon name="lucide:shopping-bag" class="feature-icon" />
              </div>
              <h2 class="feature-title">Smart Shopping Trips</h2>
              <p class="feature-text">
                Ingredients are automatically grouped for your trip. Sapid organizes your list by your favorite stores, making your shopping experience efficient and stress-free.
              </p>
            </div>
          </div>

           <div class="feature-row">
            <div class="feature-info">
              <div class="feature-icon-wrapper">
                <Icon name="lucide:import" class="feature-icon" />
              </div>
              <h2 class="feature-title">Import Your Recipes</h2>
              <p class="feature-text">
                Quickly add recipes from any website, plain text, or even a photo of a cookbook! Sapid's AI automatically extracts ingredients, steps, and nutrition so you can start planning immediately.
              </p>
            </div>
            <div class="feature-visual">
               <div class="mockup-frame-small">
                  <img src="/import-recipe.png" alt="Sapid Recipe Import" class="mockup-image" />
               </div>
            </div>
          </div>

          <div class="feature-row reverse">
            <div class="feature-visual">
               <div class="mockup-frame-small">
                  <img src="/handsfree-cooking.png" alt="Hands-free Cooking" class="mockup-image" />
               </div>
            </div>
            <div class="feature-info">
              <div class="feature-icon-wrapper">
                <Icon name="lucide:chef-hat" class="feature-icon" />
              </div>
              <h2 class="feature-title">Hands-free Cooking</h2>
              <p class="feature-text">
                Cook without the mess. Sapid's hands-free mode lets you step through recipes with simple gestures or voice commands, keeping your screen clean and your focus on the food.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  background-color: var(--color-background-light);
  padding: 6rem 0;
}

.hero-container {
  display: grid;
  gap: 4rem;
  grid-template-columns: 1fr;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr 1fr;
  }
}

.subtitle {
  font-weight: 600;
  color: var(--color-primary-600);
  margin-bottom: 0.5rem;
}

.title {
  font-size: 2.25rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.25rem;
  color: var(--color-neutral-700);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.sub-actions {
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
}

.link {
  color: var(--color-neutral-600);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.link:hover {
  color: var(--color-primary-600);
}

.highlight-link {
  color: var(--color-primary-600);
  font-weight: 600;
  text-decoration-color: rgba(59, 128, 72, 0.4);
}

.highlight-link:hover {
  text-decoration-color: var(--color-primary-600);
}

.hero-image {
  display: flex;
  justify-content: center;
}

.mockup-frame {
  position: relative;
  background-color: var(--color-neutral-900);
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1rem;
  width: 100%;
  max-width: 30rem;
}

.mockup-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  display: block;
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  background-color: var(--color-neutral-50);
}

.feature-grid {
  display: flex;
  flex-direction: column;
  gap: 8rem;
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .feature-row {
    grid-template-columns: 1fr 1fr;
  }
  .feature-row.reverse .feature-visual {
    order: -1;
  }
}

.feature-info {
  max-width: 32rem;
}

.feature-icon-wrapper {
  background-color: var(--color-primary-50);
  padding: 0.75rem;
  border-radius: 0.75rem;
  display: inline-flex;
  margin-bottom: 1.5rem;
}

.feature-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-primary-600);
}

.feature-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 1.25rem;
}

.feature-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-neutral-600);
}

.mockup-frame-small {
  background-color: var(--color-neutral-900);
  border-radius: 1rem;
  padding: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.abstract-visual {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-900));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
}

.placeholder-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.placeholder-icon {
  width: 4rem;
  height: 4rem;
  opacity: 0.8;
}


</style>
