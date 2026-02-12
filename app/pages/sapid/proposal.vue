<script setup lang="ts">
definePageMeta({
  title: 'Sapid - The Vision'
})

useSeoMeta({
  title: 'Sapid: Turning Saved Recipes into Real Meals',
  description: 'The philosophy behind Sapid: Moving from infinite inspiration to intentional execution.',
})
</script>

<template>
  <div class="proposal-page">
    <div class="container content-container">
      <header class="proposal-header">
        <p class="brand-link"><NuxtLink to="/sapid">Sapid</NuxtLink>: Turning Saved Recipes into Real Meals</p>
        <h1 class="main-title">The Problem</h1>
      </header>

      <div class="prose">
        <p>We are surrounded by recipes.</p>
        <p>Every day we see beautiful meals on social media, cooking blogs, and creator websites. We save links. We take screenshots. We bookmark ideas. Our phones are full of inspiration.</p>
        <p>And yet, when dinner comes, we still ask the same question:</p>
        <p class="highlight-text">What are we eating tonight?</p>
        <p>As a family, we experienced this constantly. We had hundreds of saved recipes but no system to actually cook them. The issue was not discovery. It was execution.</p>
        <p>We tried meal kits to reduce decision fatigue. They helped temporarily, but we did not love the food quality and we did not like giving up control over what we wanted to cook. We realized we did not need someone else to decide for us. We needed a way to bring the recipes we already loved onto the table.</p>
        <p>That gap between inspiration and action became the foundation for Sapid.</p>

        <h2>The Insight</h2>
        <p>Recipe overload is not a content problem. It is a follow-through problem.</p>
        <p>Saving is easy. Cooking is hard.</p>
        <p>The friction happens in small moments:</p>
        <ul>
            <li>Deciding what to cook</li>
            <li>Remembering what we saved</li>
            <li>Checking what we already have</li>
            <li>Building a grocery list</li>
            <li>Adjusting when plans change</li>
            <li>Managing steps while cooking</li>
        </ul>
        <p>Most tools solve one part of this. None connect the full loop in a way that feels calm and practical.</p>
        <p>Sapid was built to close that loop.</p>

        <h2>The Solution</h2>
        <p>Sapid is an execution layer for saved recipes.</p>
        <p>It allows users to import recipes from anywhere:</p>
        <ul>
            <li>Photos of cookbooks</li>
            <li>Screenshots from social media</li>
            <li>Blog URLs</li>
            <li>Plain text</li>
            <li>Manual entry</li>
        </ul>
        <p>The app structures ingredients and steps automatically. Ingredients are mapped and normalized into usable items for planning and shopping.</p>
        <p>From there, recipes become part of a weekly plan. Users can mark what they already have at home and generate shopping lists grouped by store. The Smart Trip feature minimizes unnecessary stops and organizes items efficiently.</p>
        <p>When it is time to cook, Sapid switches into a focused cooking mode with step by step instructions and built in timers. The goal is not just organization. The goal is completion.</p>
        <p>Inspiration becomes dinner.</p>

        <h2>Built for Real Use</h2>
        <p>From the beginning, the focus was on real world reliability.</p>
        <p>Importing recipes from arbitrary websites required handling inconsistent HTML structures and missing metadata. Ingredient normalization meant transforming messy text into structured components. The challenge was making this feel simple while hiding complexity.</p>
        <p>AI is used carefully to reduce friction, not create noise. It helps structure input, suggest meal plans, and generate variations while keeping the user in control.</p>
        <p>The product is multilingual from day one and supports cross device synchronization. It is designed for real families managing real schedules.</p>

        <h2>Supporting Creators, Not Replacing Them</h2>
        <p>Sapid does not compete with creators. It amplifies them.</p>
        <p>Every imported recipe preserves full source attribution. The original link remains visible and connected to the structured recipe.</p>
        <p>When meals are planned and revisited over time, creators benefit from recurring exposure instead of one-time discovery. Instead of being lost in bookmarks, their recipes become part of repeat cooking routines.</p>
        <p>If people actually cook what they save, creator content gains longevity.</p>
        <p>This strengthens the ecosystem rather than fragmenting it.</p>

        <h2>Why This Matters</h2>
        <p>Food should not feel like a daily decision crisis.</p>
        <p>The mental load of planning meals is underestimated. For families especially, it consumes time and attention that could be spent elsewhere.</p>
        <p>Sapid reduces that load without removing creativity. It does not decide what you should eat. It helps you follow through on what you already chose.</p>
        <p>The long term vision is simple:</p>
        <p class="vision-statement">
            Move from infinite inspiration to intentional execution.<br>
            Help people cook more of what they already love.<br>
            Turn saved recipes into shared meals.
        </p>
        <p class="final-statement">Less scrolling. More cooking. More dinners that actually happen.</p>
      </div>
      
      <div class="footer-actions">
         <NuxtLink to="/sapid" class="btn btn-primary btn-xl">Explore Sapid</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.proposal-page {
  /* Using global Sapid variables */
  background-color: var(--color-background-light);
  color: var(--color-neutral-900);
  min-height: 100vh;
  padding: 6rem 0;
  font-family: var(--font-sans);
}

.content-container {
  max-width: 800px;
}

.proposal-header {
  margin-bottom: 4rem;
}

.brand-link {
    font-weight: 600;
    color: var(--color-primary-600);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
}

.brand-link a {
    text-decoration: underline;
    text-decoration-color: rgba(59, 128, 72, 0.3);
    text-underline-offset: 4px;
}

.brand-link a:hover {
    text-decoration-color: var(--color-primary-600);
}

.main-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  line-height: 1.1;
}

.prose {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--color-neutral-700);
}

.prose p {
    margin-bottom: 1.5rem;
}

.prose h2 {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-neutral-900);
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
}

.prose ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
}

.prose li {
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
}

.prose li::marker {
    color: var(--color-primary-600);
}

.highlight-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary-600);
    margin: 2rem 0;
    font-family: var(--font-display);
}

.vision-statement {
    font-size: 1.25rem;
    font-weight: 500;
    border-left: 4px solid var(--color-primary-600);
    padding-left: 1.5rem;
    margin: 2rem 0;
    color: var(--color-neutral-900);
    line-height: 1.8;
}

.final-statement {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--color-primary-600);
    margin-top: 2rem;
}

.footer-actions {
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding-top: 3rem;
}

/* Button Override for this page */
.btn-primary {
    background-color: var(--color-primary-600);
    color: white;
}
.btn-primary:hover {
    background-color: var(--color-primary-700);
}

/* Responsive */
@media (max-width: 768px) {
    .main-title {
        font-size: 2.5rem;
    }
}

/* Dark Mode Support handled by global variables usually, but specific overrides if needed */

</style>
