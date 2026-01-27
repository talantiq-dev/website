<script setup lang="ts">
definePageMeta({
  title: 'Services'
})

useSeoMeta({
  title: 'Services - Talantiq Solutions',
  description: 'Expert App Development and IT Consulting services. Native iOS/Android, Cross-platform, and Digital Transformation strategies.',
})

const services = [
  {
    title: 'App Development',
    description: 'We build robust, scalable, and user-friendly mobile and web applications.',
    features: [
      'iOS & Android native development',
      'Cross-platform solutions (Flutter, React Native)',
      'Progressive Web Apps (PWA)',
      'UI/UX Design & Prototyping'
    ],
    icon: 'lucide:smartphone'
  },
  {
    title: 'IT Consulting',
    description: 'Expert advice to navigate the complex digital landscape and drive business growth.',
    features: [
      'Digital Transformation Strategy',
      'Cloud Infrastructure & DevOps',
      'Legacy System Modernization',
      'Technical Architecture Review'
    ],
    icon: 'lucide:briefcase'
  }
]
</script>

<template>
  <div class="services-page section-py">
    <div class="container">
      <div class="page-header">
        <h2 class="page-title">Our Expertise</h2>
        <p class="page-subtitle">
          We combine technical excellence with business acumen to deliver superior results.
        </p>
      </div>

      <div class="services-list">
        <div v-for="service in services" :key="service.title" class="service-detail-card">
          <div class="card-header">
             <div class="icon-box">
              <Icon :name="service.icon" class="card-icon" />
            </div>
            <h3 class="card-title">{{ service.title }}</h3>
          </div>
          <p class="card-description">{{ service.description }}</p>
          <ul class="feature-list">
            <li v-for="feature in service.features" :key="feature" class="feature-item">
              <Icon name="lucide:check" class="check-icon" />
              {{ feature }}
            </li>
          </ul>
           <div class="card-action">
            <NuxtLink to="/contact" class="btn btn-primary btn-block">Request Consultation</NuxtLink>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  text-align: center;
  max-width: 42rem;
  margin: 0 auto 4rem;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--color-neutral-900);
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--color-neutral-600);
}

.services-list {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .services-list {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.service-detail-card {
  background-color: var(--color-neutral-50);
  border: 1px solid var(--color-neutral-200);
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.icon-box {
  background-color: var(--color-primary-50);
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-primary-600);
}

.card-title {
  font-size: 1.5rem;
  color: var(--color-neutral-900);
}

.card-description {
  color: var(--color-neutral-600);
  margin-bottom: 2rem;
}

.feature-list {
  list-style: none;
  margin-bottom: 2rem;
  flex: 1;
}

.feature-item {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: var(--color-neutral-600);
  font-size: 0.875rem;
}

.check-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary-600);
  flex-shrink: 0;
}

.btn-block {
  width: 100%;
}

@media (prefers-color-scheme: dark) {
  .page-title {
    color: var(--color-white);
  }
  .page-subtitle {
    color: var(--color-neutral-300);
  }
  
  .service-detail-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .card-title {
    color: var(--color-white);
  }
  
  .card-description, .feature-item {
    color: var(--color-neutral-300);
  }
  
  .icon-box {
    background-color: rgba(49, 46, 129, 0.2);
  }
  .card-icon, .check-icon {
    color: var(--color-primary-400);
  }
}
</style>
