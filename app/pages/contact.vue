<script setup lang="ts">
definePageMeta({
  title: 'Contact Us'
})
</script>

<template>
  <div class="contact-page section-py">
    <div class="container">
      <div class="contact-header">
        <h2 class="section-title">Contact Sales</h2>
        <p class="section-subtitle">
          Ready to transform your business? Let's talk.
        </p>
      </div>
      
      <form class="contact-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="first-name">First name</label>
            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="form-input" />
          </div>
          <div class="form-group">
            <label for="last-name">Last name</label>
            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="form-input" />
          </div>
          <div class="form-group full-width">
            <label for="company">Company</label>
            <input type="text" name="company" id="company" autocomplete="organization" class="form-input" />
          </div>
          <div class="form-group full-width">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" autocomplete="email" class="form-input" />
          </div>
          <div class="form-group full-width">
            <label for="message">Message</label>
            <textarea name="message" id="message" rows="4" class="form-input"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-xl btn-block">Let's talk</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.contact-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.25rem;
  color: var(--color-neutral-900);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-neutral-700);
}

.contact-form {
  max-width: 36rem;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
  .full-width {
    grid-column: span 2;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-neutral-900);
}

.form-input {
  display: block;
  width: 100%;
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-neutral-900);
  background-color: var(--color-white);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.form-input:focus {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
  border-color: var(--color-primary-600);
}

.btn-block {
  width: 100%;
}


</style>
