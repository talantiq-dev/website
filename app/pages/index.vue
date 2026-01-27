<script setup lang="ts">
definePageMeta({
  title: 'Home'
})

useSeoMeta({
  title: 'Talantiq Solutions - Premium App Development & IT Consulting',
  description: 'Talentiq Solutions delivers cutting-edge mobile apps and strategic IT consulting. Discover our AI-powered meal planner, Sapid.',
  ogTitle: 'Talantiq Solutions - Innovating for the Future',
  ogDescription: 'Premium App Development & IT Consulting services. Creators of Sapid.',
})
const services = [
  {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications built with cutting-edge technology.',
    icon: 'lucide:smartphone'
  },
  {
    title: 'IT Consulting',
    description: 'Strategic technology guidance to optimize your business operations and digital transformation.',
    icon: 'lucide:briefcase'
  }
]
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background" />
      
      <div class="container hero-content">
        <h1 class="hero-title">
          Innovating for the <span class="highlight">Future</span>
        </h1>
        <p class="hero-subtitle">
          Talentiq Solutions delivers premium app development and IT consulting services. We turn complex problems into elegant digital solutions.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/contact" class="btn btn-primary btn-xl">
            Start a Project
          </NuxtLink>
          <NuxtLink to="/services" class="btn btn-ghost btn-xl">
            Our Services <Icon name="lucide:arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Services Teaser -->
    <section class="services-section section-py">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">What We Do</h2>
          <p class="section-subtitle">
            Comprehensive digital solutions tailored to your unique business needs.
          </p>
        </div>
        <div class="services-grid">
          <div v-for="service in services" :key="service.title" class="service-card">
            <div class="service-icon-wrapper">
              <Icon :name="service.icon" class="service-icon" />
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            <div class="service-link">
              <NuxtLink to="/services" class="btn btn-ghost link-btn">Learn more <span aria-hidden="true">&rarr;</span></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Teaser: Sapid -->
    <section class="product-section section-py">
       <div class="product-background" />
      <div class="container product-container">
        <div class="product-content">
            <div class="badge">Featured Product</div>
            <h2 class="product-title">Sapid: AI Meal Planning</h2>
            <p class="product-description">
              Discover the future of nutrition with Sapid. Our AI-powered meal planner creates personalized eating plans that adapt to your lifestyle, preferences, and goals.
            </p>
            <div class="product-actions">
              <NuxtLink to="/sapid" class="btn btn-neutral btn-xl">Explore Sapid</NuxtLink>
            </div>
        </div>
        
          <!-- Placeholder for Sapid UI/Image -->
          <div class="product-image-wrapper">
             <div class="product-mockup">
                <div class="mockup-screen">
                    <span class="mockup-text">Sapid App Screenshot</span>
                </div>
             </div>
          </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  overflow: hidden;
  padding: 8rem 0;
  text-align: center;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: -10;
  background: radial-gradient(circle at top, var(--color-primary-100), var(--color-white));
  opacity: 0.5;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--color-neutral-900);
}

.highlight {
  color: var(--color-primary-600);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-neutral-600);
  max-width: 42rem;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

/* Services */
.services-section {
  background-color: var(--color-neutral-50);
}

.section-header {
  text-align: center;
  max-width: 42rem;
  margin: 0 auto 4rem;
}

.section-title {
  font-size: 2.25rem;
  color: var(--color-neutral-900);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-neutral-600);
}

.services-grid {
  display: grid;
  gap: 4rem;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.service-icon-wrapper {
  background-color: var(--color-primary-50);
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: inline-flex;
}

.service-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-primary-600);
}

.service-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-neutral-900);
}

.service-description {
  color: var(--color-neutral-600);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.link-btn {
  padding: 0;
  font-weight: 600;
  color: var(--color-primary-600);
}
.link-btn:hover {
  background: none;
  color: var(--color-primary-700);
}

/* Product Section */
.product-section {
  position: relative;
  background-color: var(--color-primary-900);
  color: var(--color-white);
  overflow: hidden;
}

.product-background {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: radial-gradient(circle at top, var(--color-primary-500), var(--color-primary-900));
    opacity: 0.4;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .product-container {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}

.badge {
  display: inline-block;
  background-color: rgba(99, 102, 241, 0.2); /* primary-500 / 20% */
  color: var(--color-primary-200);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border: 1px solid rgba(99, 102, 241, 0.4);
}

.product-title {
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  color: var(--color-white);
}

.product-description {
  font-size: 1.125rem;
  color: var(--color-primary-100);
  margin-bottom: 2.5rem;
}

.product-image-wrapper {
  display: flex;
  justify-content: center;
}

.product-mockup {
    width: 100%;
    max-width: 32rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1rem;
}

.mockup-screen {
    background-color: rgba(31, 41, 55, 0.5); /* gray-800 */
    aspect-ratio: 4/3;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mockup-text {
    color: var(--color-neutral-400);
}

/* Dark Mode Overrides */
@media (prefers-color-scheme: dark) {
  .hero-background {
    background: radial-gradient(circle at top, var(--color-primary-900), var(--color-neutral-950));
    opacity: 0.3;
  }
  .hero-title {
    color: var(--color-white);
  }
  .hero-subtitle {
    color: var(--color-neutral-300);
  }
  .highlight {
    color: var(--color-primary-400);
  }
  
  .services-section {
    background-color: rgba(17, 24, 39, 0.5); /* neutral-900/50 */
  }
  .section-title {
    color: var(--color-white);
  }
  .section-subtitle {
     color: var(--color-neutral-300);
  }
  
  .service-icon-wrapper {
    background-color: rgba(49, 46, 129, 0.2); /* primary-900/20 */
  }
  .service-icon {
     color: var(--color-primary-400);
  }
  .service-title {
     color: var(--color-white);
  }
  .service-description {
     color: var(--color-neutral-300);
  }
}
</style>
