<script setup lang="ts">
definePageMeta({
  title: 'Sapid - AI Meal Planner'
})

useSeoMeta({
  title: 'Sapid - AI Meal Planner by Talantiq',
  description: 'Your personal AI nutritionist. Sapid creates personalized meal plans, grocery lists, and tracks your nutrition automatically.',
})
</script>

<template>
  <div class="product-page">
    <!-- Product Hero -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
            <div class="hero-text">
              <p class="subtitle">Powered by AI</p>
              <h1 class="title">Sapid: Eat Smarter, Live Better</h1>
              <p class="description">
                Sapid is your personal AI nutritionist. It learns your tastes, dietary restrictions, and health goals to generate the perfect meal plan for you, every single week.
              </p>
              
              <ul class="feature-list">
                <li class="feature-item">
                  <Icon name="lucide:brain-circuit" class="feature-icon" />
                  <span>
                    <strong>Smart Adaptation.</strong> Sapid learns from your feedback. Didn't like the quinoa salad? You won't see it again.
                  </span>
                </li>
                <li class="feature-item">
                  <Icon name="lucide:shopping-cart" class="feature-icon" />
                   <span>
                    <strong>Automated Grocery Lists.</strong> Generates a sorted shopping list based on your weekly plan, saving you hours at the store.
                  </span>
                </li>
                 <li class="feature-item">
                  <Icon name="lucide:leaf" class="feature-icon" />
                  <span>
                    <strong>Nutrition Tracking.</strong> Automatically tracks macros and calories so you stay on top of your health goals without the manual entry.
                  </span>
                </li>
              </ul>
              
              <div class="actions">
                 <button class="btn btn-neutral btn-xl">Download Beta</button>
              </div>
            </div>
        </div>
        
        <div class="hero-image">
          <div class="mockup-frame">
             <!-- Abstract Screen Mockup -->
             <div class="mockup-screen">
                <div class="mockup-content">
                    <Icon name="lucide:utensils" class="mockup-icon" />
                    <h3 class="mockup-title">Sapid Interface</h3>
                    <p class="mockup-subtitle">AI generating meal plan...</p>
                </div>
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
  background-color: var(--color-white);
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

.feature-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.feature-item {
  display: flex;
  gap: 1rem;
  color: var(--color-neutral-600);
}

.feature-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-primary-600);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

strong {
  font-weight: 600;
  color: var(--color-neutral-900);
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

.mockup-screen {
  background-color: var(--color-neutral-800);
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}

.mockup-content {
  text-align: center;
  color: var(--color-white);
}

.mockup-icon {
  width: 4rem;
  height: 4rem;
  color: var(--color-primary-500);
  margin-bottom: 1rem;
}

.mockup-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.mockup-subtitle {
  color: var(--color-neutral-400);
}

@media (prefers-color-scheme: dark) {
  .hero-section {
    background-color: var(--color-neutral-950);
  }
  .title {
    color: var(--color-white);
  }
  .description {
    color: var(--color-neutral-300);
  }
  .subtitle {
    color: var(--color-primary-400);
  }
  strong {
    color: var(--color-white);
  }
  .feature-item {
     color: var(--color-neutral-400);
  }
  .feature-icon {
    color: var(--color-primary-400);
  }
}
</style>
