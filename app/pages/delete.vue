<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  title: 'Delete Account'
})

const email = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)
const error = ref('')

const handleSubmit = async () => {
  if (!email.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    // TODO: Replace with actual API call to delete user data
    // await $fetch('/api/delete-user', {
    //   method: 'POST',
    //   body: { email: email.value }
    // })
    
    // Simulating API request for now
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    isSuccess.value = true
    email.value = ''
  } catch (e) {
    error.value = 'An error occurred while processing your request. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="delete-page section-py">
    <div class="container">
      <div class="delete-header">
        <h2 class="section-title">Delete Account</h2>
        <p class="section-subtitle">
          We're sorry to see you go. If you wish to delete your account and all associated data, please enter your email address below.
          This action cannot be undone.
        </p>
      </div>
      
      <div v-if="isSuccess" class="success-message">
        <div class="success-icon">✓</div>
        <h3>Request Received</h3>
        <p>We have received your request to delete your data. You will receive a confirmation email shortly.</p>
        <button @click="isSuccess = false" class="btn btn-outline">Back</button>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="delete-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            v-model="email"
            type="email" 
            name="email" 
            id="email" 
            autocomplete="email" 
            required
            placeholder="you@example.com"
            class="form-input" 
          />
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            class="btn btn-danger btn-xl btn-block"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Processing...</span>
            <span v-else>Delete My Data</span>
          </button>
        </div>
      </form>
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

@media (prefers-color-scheme: dark) {
  .section-title {
    color: var(--color-white);
  }
  .section-subtitle {
    color: var(--color-neutral-300);
  }
  label {
    color: var(--color-white);
  }
  .form-input {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: var(--color-neutral-700);
    color: var(--color-white);
  }
  .form-input:focus {
    outline-color: var(--color-primary-500);
    border-color: var(--color-primary-500);
  }
  .success-message {
    background-color: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.2);
  }
  .success-message h3 {
    color: var(--color-white);
  }
  .success-message p {
    color: var(--color-neutral-300);
  }
  .error-message {
    background-color: rgba(220, 38, 38, 0.1);
    border-color: rgba(220, 38, 38, 0.2);
    color: #F87171;
  }
}
</style>
