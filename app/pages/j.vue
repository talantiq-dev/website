<script setup lang="ts">
// Household invites: https://talantiq.com/j?c=CODE. With universal links / app links set up, the app opens
// this link itself; otherwise this page shows the code, opens the app through sapid://join, or points to
// the stores. Codes are 8 characters without look-alikes (no 0, O, 1 or I).

// Invite links are private: keep them out of search engines
useSeoMeta({
  title: 'You’re invited to Sapid',
  description: 'Join a Sapid household to share recipes, the meal plan and the shopping list.',
  robots: 'noindex, nofollow',
  ogTitle: 'You’re invited to Sapid',
  ogDescription: 'Share recipes, the meal plan and the shopping list with one person.',
  ogImage: 'https://talantiq.com/og-sapid.png',
})

const route = useRoute()

const COPY = {
  en: {
    eyebrow: 'Household invite', title: 'You’re invited to share a kitchen',
    intro: 'Join a Sapid household to share recipes, the meal plan and the shopping list with the person who invited you.',
    codeLabel: 'Your invite code', copy: 'Copy code', copied: 'Copied!', open: 'Open in Sapid',
    stepsTitle: 'New to Sapid?', step1: 'Install Sapid.', step2: 'Open it and choose “I was invited”. Already using Sapid? Go to Settings → Household.', step3: 'Enter the code. It works once and is valid for 7 days.',
    forTwo: 'Pro for two: if either of you has Sapid Pro, it covers both of you.',
    missingTitle: 'This invite link is incomplete', missingText: 'Ask the person who invited you for a new link, or for the 8-character code.',
  },
  de: {
    eyebrow: 'Haushalt-Einladung', title: 'Du bist eingeladen, eine Küche zu teilen',
    intro: 'Tritt einem Sapid-Haushalt bei und teile Rezepte, Essensplan und Einkaufsliste mit der Person, die dich eingeladen hat.',
    codeLabel: 'Dein Einladungscode', copy: 'Code kopieren', copied: 'Kopiert!', open: 'In Sapid öffnen',
    stepsTitle: 'Neu bei Sapid?', step1: 'Installiere Sapid.', step2: 'Öffne die App und wähle „Ich wurde eingeladen“. Du nutzt Sapid schon? Geh zu Einstellungen → Haushalt.', step3: 'Gib den Code ein. Er gilt einmal und 7 Tage lang.',
    forTwo: 'Pro für zwei: Wenn einer von euch Sapid Pro hat, gilt es für euch beide.',
    missingTitle: 'Dieser Einladungslink ist unvollständig', missingText: 'Bitte die Person, die dich eingeladen hat, um einen neuen Link oder den 8-stelligen Code.',
  },
  fr: {
    eyebrow: 'Invitation au foyer', title: 'Vous êtes invité à partager une cuisine',
    intro: 'Rejoignez un foyer Sapid pour partager recettes, planning de repas et liste de courses avec la personne qui vous a invité.',
    codeLabel: 'Votre code d’invitation', copy: 'Copier le code', copied: 'Copié !', open: 'Ouvrir dans Sapid',
    stepsTitle: 'Nouveau sur Sapid ?', step1: 'Installez Sapid.', step2: 'Ouvrez l’app et choisissez « J’ai été invité ». Vous utilisez déjà Sapid ? Allez dans Réglages → Foyer.', step3: 'Saisissez le code. Il ne sert qu’une fois et reste valable 7 jours.',
    forTwo: 'Pro à deux : si l’un de vous a Sapid Pro, il couvre les deux.',
    missingTitle: 'Ce lien d’invitation est incomplet', missingText: 'Demandez un nouveau lien ou le code à 8 caractères à la personne qui vous a invité.',
  },
  es: {
    eyebrow: 'Invitación al hogar', title: 'Te han invitado a compartir una cocina',
    intro: 'Únete a un hogar de Sapid para compartir recetas, el plan de comidas y la lista de la compra con la persona que te invitó.',
    codeLabel: 'Tu código de invitación', copy: 'Copiar código', copied: '¡Copiado!', open: 'Abrir en Sapid',
    stepsTitle: '¿Nuevo en Sapid?', step1: 'Instala Sapid.', step2: 'Ábrela y elige «Me han invitado». ¿Ya usas Sapid? Ve a Ajustes → Hogar.', step3: 'Introduce el código. Sirve una vez y es válido durante 7 días.',
    forTwo: 'Pro para dos: si uno de vosotros tiene Sapid Pro, cubre a ambos.',
    missingTitle: 'Este enlace de invitación está incompleto', missingText: 'Pide a la persona que te invitó un enlace nuevo o el código de 8 caracteres.',
  },
}
type Lang = keyof typeof COPY

const lang = ref<Lang>('en')
const code = ref<string | null>(null)
const ready = ref(false)
const copiedCode = ref(false)
const copy = computed(() => COPY[lang.value])
const displayCode = computed(() => (code.value ? `${code.value.slice(0, 4)} ${code.value.slice(4)}` : ''))

onMounted(() => {
  const raw = typeof route.query.c === 'string' ? route.query.c.replace(/[\s-]/g, '').toUpperCase() : ''
  code.value = /^[ABCDEFGHJKLMNPQRSTUVWXYZ2-9]{8}$/.test(raw) ? raw : null
  const browser = (navigator.language || 'en').slice(0, 2) as Lang
  if (browser in COPY) lang.value = browser
  ready.value = true
})

async function copyCode() {
  if (!code.value) return
  await navigator.clipboard.writeText(code.value)
  copiedCode.value = true
  setTimeout(() => { copiedCode.value = false }, 2000)
}
</script>

<template>
  <div class="invite-page section-py">
    <div class="container narrow">
      <div v-if="ready && !code" class="state card">
        <h1>{{ copy.missingTitle }}</h1>
        <p>{{ copy.missingText }}</p>
        <StoreButtons campaign="household_invite_missing" size="md" />
      </div>

      <template v-else-if="ready">
        <span class="eyebrow">{{ copy.eyebrow }}</span>
        <h1 class="invite-title">
          {{ copy.title }}
        </h1>
        <p class="intro">
          {{ copy.intro }}
        </p>

        <section class="code-card card">
          <p class="code-label">
            {{ copy.codeLabel }}
          </p>
          <p class="code" :aria-label="code?.split('').join(' ')">
            {{ displayCode }}
          </p>
          <div class="actions">
            <a :href="`sapid://join?c=${code}`" class="btn btn-primary">
              <Icon name="lucide:smartphone" />
              {{ copy.open }}
            </a>
            <button class="btn btn-neutral" @click="copyCode">
              <Icon :name="copiedCode ? 'lucide:check' : 'lucide:copy'" />
              {{ copiedCode ? copy.copied : copy.copy }}
            </button>
          </div>
        </section>

        <aside class="steps card">
          <img src="/sapid-icon.png" alt="" width="56" height="56" class="steps-icon">
          <div>
            <p class="steps-title">
              {{ copy.stepsTitle }}
            </p>
            <ol>
              <li>{{ copy.step1 }}</li>
              <li>{{ copy.step2 }}</li>
              <li>{{ copy.step3 }}</li>
            </ol>
            <StoreButtons campaign="household_invite" size="md" />
            <p class="for-two">
              {{ copy.forTwo }}
            </p>
          </div>
        </aside>
      </template>
    </div>
  </div>
</template>

<style scoped>
.narrow {
  max-width: 640px;
}

.state {
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-neutral-600);
}

.state h1 {
  color: var(--color-neutral-900);
  font-size: 1.75rem;
}

.invite-title {
  font-size: clamp(2rem, 5vw, 2.75rem);
  margin-bottom: 0.75rem;
}

.intro {
  color: var(--color-neutral-600);
  margin-bottom: 1.5rem;
}

.code-card {
  padding: 1.5rem;
  text-align: center;
}

.code-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-neutral-500);
}

.code {
  font-size: clamp(2rem, 9vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--color-neutral-900);
  margin: 0.5rem 0 1.25rem;
  font-variant-numeric: tabular-nums;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.steps {
  margin-top: 1.5rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.steps-icon {
  border-radius: 14px;
  flex-shrink: 0;
}

.steps-title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-neutral-900);
  margin-bottom: 0.5rem;
}

.steps ol {
  padding-left: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-neutral-700);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.for-two {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--color-neutral-600);
}

@media (max-width: 480px) {
  .steps {
    flex-direction: column;
  }
}
</style>
