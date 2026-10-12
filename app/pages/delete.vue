<script setup lang="ts">
definePageMeta({
  title: 'Delete Account'
})
</script>

<template>
  <div class="delete-page section-py">
    <div class="container">
      <div class="delete-header">
        <h2 class="section-title">Delete Account</h2>
        <p class="section-subtitle">
          You can delete your Sapid account and all associated data at any time. This action cannot be undone.
        </p>
      </div>

      <div class="delete-form">
        <h3>In the app (fastest)</h3>
        <p>
          Open Sapid, go to <strong>Settings</strong> and tap <strong>Delete Account</strong>.
          Your account is deleted immediately.
        </p>

        <h3>By email</h3>
        <p>
          If you no longer have the app installed, email
          <a href="mailto:info@talantiq.com?subject=Account%20deletion%20request">info@talantiq.com</a>
          from the email address of your Sapid account with the subject "Account deletion request".
          We will delete your account and confirm within 30 days.
        </p>

        <h3>What is deleted</h3>
        <p>
          Your account, recipes, meal plans, shopping lists, pantry and store settings, and uploaded images.
          Subscriptions are billed by Apple or Google and must be cancelled separately in the App Store or Google Play.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete-header {
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
  color: var(--color-neutral-600);
  max-width: 48rem;
  margin: 0 auto;
}

.delete-form, .success-message {
  max-width: 32rem;
  margin: 0 auto;
}

.success-message {
  text-align: center;
  padding: 3rem 2rem;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.success-icon {
  width: 4rem;
  height: 4rem;
  background-color: #10B981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

.success-message h3 {
  font-size: 1.5rem;
  color: var(--color-neutral-900);
  margin-bottom: 1rem;
}

.success-message p {
  color: var(--color-neutral-600);
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
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
  transition: all 0.2s;
}

.form-input:focus {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
  border-color: var(--color-primary-600);
}

.error-message {
  color: #DC2626;
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.btn-block {
  width: 100%;
}

</style>
