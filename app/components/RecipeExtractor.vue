<script setup lang="ts">
type Lang = 'en' | 'de' | 'fr' | 'es'

interface PublicRecipe {
  name: string
  description: string
  durationMinutes: number | null
  ingredients: { name: string, amount: string, unit: string }[]
  stepCount: number
  creator: { name: string, handle: string } | null
  sourceUrl: string
}

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'result', recipe: PublicRecipe }
  | { kind: 'error', code: string }
  | { kind: 'closed' }

const props = withDefaults(defineProps<{ campaign?: string }>(), { campaign: 'recipe_tool' })

const config = useRuntimeConfig()
const route = useRoute()

const url = ref(typeof route.query.url === 'string' ? route.query.url : '')
const lang = ref<Lang>('en')
const state = ref<State>({ kind: 'idle' })
const remainingToday = ref<number | null>(null)
const checked = ref<Set<number>>(new Set())
const copied = ref(false)
const loadingStep = ref(0)

const languages: { value: Lang, label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
]

const loadingMessages = [
  'Opening the link…',
  'Looking for the recipe…',
  'Reading the ingredients…',
  'Sorting your shopping list…',
  'Almost there…',
]

const errorMessages: Record<string, { title: string, body: string, upsell?: boolean }> = {
  IP_LIMIT: { title: 'You’ve used today’s free extractions', body: 'Come back tomorrow, or import as many recipes as you like in the Sapid app.', upsell: true },
  NO_RECIPE: { title: 'We couldn’t find a recipe there', body: 'Check that the link points to a single recipe or a recipe video with the ingredients in the caption or spoken aloud.' },
  INVALID_URL: { title: 'That doesn’t look like a link', body: 'Paste the full link, starting with https://' },
  BUSY: { title: 'Lots of cooks in the kitchen', body: 'The tool is busy right now. Please try again in a minute.' },
  RATE_LIMITED: { title: 'Slow down a little', body: 'Too many requests in a short time. Please wait a minute and try again.' },
  CAPTCHA_FAILED: { title: 'Quick check failed', body: 'Please complete the verification and try again.' },
  EXTRACTION_FAILED: { title: 'Something went wrong', body: 'We couldn’t read that recipe this time. Please try again or use a different link.' },
  NETWORK: { title: 'Connection problem', body: 'We couldn’t reach the server. Check your connection and try again.' },
}

// --- Optional Cloudflare Turnstile bot check ---
const turnstileEl = ref<HTMLElement | null>(null)
let turnstileWidgetId: string | null = null
const turnstileToken = ref('')

function renderTurnstile() {
  const turnstile = (window as any).turnstile
  if (!turnstile || !turnstileEl.value || turnstileWidgetId) return
  turnstileWidgetId = turnstile.render(turnstileEl.value, {
    sitekey: config.public.turnstileSiteKey,
    callback: (token: string) => { turnstileToken.value = token },
    'expired-callback': () => { turnstileToken.value = '' },
  })
}

function resetTurnstile() {
  const turnstile = (window as any).turnstile
  if (turnstile && turnstileWidgetId) turnstile.reset(turnstileWidgetId)
  turnstileToken.value = ''
}

if (config.public.turnstileSiteKey) {
  useHead({
    script: [{ src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', async: true, defer: true, onload: () => renderTurnstile() }],
  })
}

onMounted(async () => {
  const browserLang = navigator.language.slice(0, 2) as Lang
  if (languages.some(l => l.value === browserLang)) lang.value = browserLang
  if (config.public.turnstileSiteKey) renderTurnstile()

  // Fail closed: if the API can't confirm the tool is open, show the app download prompt instead
  try {
    const res = await fetch(`${config.public.apiBase}/tools/recipe-extract/status`)
    if (!res.ok || (await res.json()).open !== true) state.value = { kind: 'closed' }
  } catch {
    state.value = { kind: 'closed' }
  }
})

let loadingTimer: ReturnType<typeof setInterval> | undefined

async function extract() {
  if (state.value.kind === 'loading' || !url.value.trim()) return
  state.value = { kind: 'loading' }
  loadingStep.value = 0
  loadingTimer = setInterval(() => {
    loadingStep.value = Math.min(loadingStep.value + 1, loadingMessages.length - 1)
  }, 5000)

  try {
    const res = await fetch(`${config.public.apiBase}/tools/recipe-extract`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url.value.trim(), lang: lang.value, turnstileToken: turnstileToken.value || undefined }),
    })
    const body = await res.json().catch(() => ({}))
    if (typeof body.remainingToday === 'number') remainingToday.value = body.remainingToday

    if (res.ok && body.recipe) {
      checked.value = new Set()
      state.value = { kind: 'result', recipe: body.recipe }
    } else if (['TOTAL_LIMIT', 'DAILY_LIMIT', 'DISABLED'].includes(body.code)) {
      state.value = { kind: 'closed' }
    } else if (body.code === 'IP_LIMIT') {
      remainingToday.value = 0
      state.value = { kind: 'error', code: 'IP_LIMIT' }
    } else if (res.status === 429) {
      state.value = { kind: 'error', code: 'RATE_LIMITED' }
    } else if (res.status === 400 && !body.code) {
      state.value = { kind: 'error', code: 'INVALID_URL' }
    } else {
      state.value = { kind: 'error', code: errorMessages[body.code] ? body.code : 'EXTRACTION_FAILED' }
    }
  } catch {
    state.value = { kind: 'error', code: 'NETWORK' }
  } finally {
    clearInterval(loadingTimer)
    resetTurnstile()
  }
}

onBeforeUnmount(() => clearInterval(loadingTimer))

function startOver() {
  url.value = ''
  state.value = { kind: 'idle' }
}

function toggle(index: number) {
  const next = new Set(checked.value)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  checked.value = next
}

function sourceLabel(recipe: PublicRecipe) {
  if (recipe.creator?.name) return recipe.creator.name
  try {
    return new URL(recipe.sourceUrl).hostname.replace(/^www\./, '')
  } catch {
    return 'the original creator'
  }
}

// Count-only units read better without the unit ("2 eggs", not "2 piece eggs")
const COUNT_UNITS = new Set(['piece', 'pieces', 'pc', 'pcs', 'unit', 'units', 'whole', 'stück', 'pièce', 'pièces', 'pieza', 'piezas'])

const formatIngredient = (i: PublicRecipe['ingredients'][number]) =>
  [i.amount, COUNT_UNITS.has(i.unit.toLowerCase()) ? '' : i.unit, i.name].filter(Boolean).join(' ')

async function copyList() {
  if (state.value.kind !== 'result') return
  const { recipe } = state.value
  const items = recipe.ingredients.filter((_, index) => !checked.value.has(index)).map(i => `☐ ${formatIngredient(i)}`)
  const text = `${recipe.name}\n\n${items.join('\n')}\n\nMade with Sapid · ${config.public.siteUrl}/sapid`
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const canPaste = ref(false)
onMounted(() => { canPaste.value = !!navigator.clipboard?.readText })

async function paste() {
  try {
    const text = await navigator.clipboard.readText()
    const match = text.match(/https?:\/\/\S+/)
    if (match) url.value = match[0]
  } catch {
    // Clipboard permission denied: the user can paste manually
  }
}
</script>

<template>
  <div class="extractor card">
    <!-- Closed: the free quota is used up or the tool is switched off -->
    <div v-if="state.kind === 'closed'" class="closed">
      <Icon name="lucide:coffee" class="closed-icon" />
      <h3>The free tool is taking a break</h3>
      <p>All of today’s free recipe extractions have been used. Sapid imports recipes from any link, right on your phone.</p>
      <StoreButtons :campaign="`${props.campaign}_closed`" size="md" />
    </div>

    <!-- Result -->
    <div v-else-if="state.kind === 'result'" class="result">
      <div class="result-header">
        <div>
          <h3 class="recipe-name">
            {{ state.recipe.name }}
          </h3>
          <p v-if="state.recipe.description" class="recipe-description">
            {{ state.recipe.description }}
          </p>
          <p class="recipe-meta">
            <span v-if="state.recipe.durationMinutes"><Icon name="lucide:clock" /> {{ state.recipe.durationMinutes }} min</span>
            <span><Icon name="lucide:users" /> For 2 servings</span>
            <span><Icon name="lucide:list" /> {{ state.recipe.ingredients.length }} ingredients</span>
          </p>
        </div>
      </div>

      <p class="attribution">
        Recipe by
        <strong>{{ sourceLabel(state.recipe) }}</strong>
        ·
        <a :href="state.recipe.sourceUrl" target="_blank" rel="nofollow noopener">View the original <Icon name="lucide:external-link" /></a>
      </p>

      <div class="list-header">
        <h4>Shopping list</h4>
        <span class="hint">Tick off what you already have</span>
      </div>
      <ul class="ingredients">
        <li v-for="(ingredient, index) in state.recipe.ingredients" :key="index">
          <label :class="{ done: checked.has(index) }">
            <input type="checkbox" :checked="checked.has(index)" @change="toggle(index)">
            <span>{{ formatIngredient(ingredient) }}</span>
          </label>
        </li>
      </ul>

      <div class="result-actions">
        <button class="btn btn-neutral" @click="copyList">
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" />
          {{ copied ? 'Copied!' : 'Copy shopping list' }}
        </button>
        <button class="btn btn-ghost" @click="startOver">
          <Icon name="lucide:rotate-ccw" />
          Try another link
        </button>
      </div>

      <div class="upsell">
        <Icon name="lucide:chef-hat" class="upsell-icon" />
        <div>
          <p class="upsell-title">
            {{ state.recipe.stepCount }} steps to go. Cook them hands-free in Sapid.
          </p>
          <p class="upsell-body">
            Save this recipe, add it to your week, and get one shopping list for all your meals, sorted by store. Sapid reads each step aloud while you cook.
          </p>
          <StoreButtons :campaign="`${props.campaign}_result`" size="md" />
        </div>
      </div>
    </div>

    <!-- Form (idle, loading, error) -->
    <form v-else class="form" @submit.prevent="extract">
      <label for="recipe-url" class="form-label">Recipe link</label>
      <div class="input-row">
        <input
          id="recipe-url"
          v-model="url"
          type="url"
          inputmode="url"
          required
          placeholder="Paste a TikTok, Instagram, YouTube or blog link"
          :disabled="state.kind === 'loading'"
          class="url-input"
        >
        <button
          v-if="canPaste && !url"
          type="button"
          class="btn btn-ghost paste-btn"
          @click="paste"
        >
          <Icon name="lucide:clipboard" /> Paste
        </button>
      </div>

      <div class="form-row">
        <label class="lang">
          <span>Language</span>
          <select v-model="lang" :disabled="state.kind === 'loading'">
            <option v-for="l in languages" :key="l.value" :value="l.value">{{ l.label }}</option>
          </select>
        </label>
        <button type="submit" class="btn btn-primary btn-xl submit" :disabled="state.kind === 'loading' || !url">
          <Icon :name="state.kind === 'loading' ? 'lucide:loader-circle' : 'lucide:sparkles'" :class="{ spin: state.kind === 'loading' }" />
          {{ state.kind === 'loading' ? 'Working…' : 'Get the ingredients' }}
        </button>
      </div>

      <div v-if="config.public.turnstileSiteKey" ref="turnstileEl" class="turnstile" />

      <div aria-live="polite">
        <p v-if="state.kind === 'loading'" class="status">
          {{ loadingMessages[loadingStep] }} <span class="status-sub">This usually takes 10–30 seconds.</span>
        </p>

        <div v-else-if="state.kind === 'error'" class="error" role="alert">
          <p class="error-title">
            {{ errorMessages[state.code]?.title }}
          </p>
          <p>{{ errorMessages[state.code]?.body }}</p>
          <StoreButtons v-if="errorMessages[state.code]?.upsell" :campaign="`${props.campaign}_limit`" size="md" />
        </div>
      </div>

      <p v-if="remainingToday !== null && remainingToday > 0" class="remaining">
        {{ remainingToday }} free {{ remainingToday === 1 ? 'extraction' : 'extractions' }} left today
      </p>
    </form>
  </div>
</template>

<style scoped>
.extractor {
  padding: clamp(1.25rem, 4vw, 2rem);
  text-align: left;
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.input-row {
  position: relative;
}

.url-input {
  width: 100%;
  font: inherit;
  font-size: 1rem;
  padding: 1rem 6.5rem 1rem 1.25rem;
  border: 1.5px solid var(--color-neutral-300);
  border-radius: 1rem;
  background: var(--color-neutral-50);
}

.url-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  background: var(--color-white);
  box-shadow: 0 0 0 4px var(--color-primary-100);
}

.paste-btn {
  position: absolute;
  right: 0.375rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 1rem;
}

.lang {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.lang select {
  font: inherit;
  font-size: 1rem;
  color: var(--color-neutral-900);
  padding: 0.625rem 0.875rem;
  border: 1.5px solid var(--color-neutral-300);
  border-radius: 0.75rem;
  background: var(--color-white);
}

.submit {
  flex: 1;
  min-width: 14rem;
}

.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.turnstile {
  margin-top: 1rem;
}

.status {
  margin-top: 1.25rem;
  font-weight: 600;
  color: var(--color-primary-700);
}

.status-sub {
  display: block;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.error {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: #fef3f2;
  border: 1px solid #fecdca;
  color: var(--color-neutral-700);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.error-title {
  font-weight: 700;
  color: #b42318;
}

.remaining {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

/* Result */
.recipe-name {
  font-size: 1.625rem;
  margin-bottom: 0.375rem;
}

.recipe-description {
  color: var(--color-neutral-600);
  margin-bottom: 0.75rem;
}

.recipe-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.recipe-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.attribution {
  margin: 1rem 0 1.5rem;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.attribution a {
  color: var(--color-primary-700);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.list-header h4 {
  font-size: 1.125rem;
}

.hint {
  font-size: 0.8125rem;
  color: var(--color-neutral-500);
}

.ingredients {
  list-style: none;
  border-top: 1px solid var(--color-neutral-200);
}

.ingredients li {
  border-bottom: 1px solid var(--color-neutral-200);
}

.ingredients label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.25rem;
  cursor: pointer;
}

.ingredients input {
  width: 1.125rem;
  height: 1.125rem;
  accent-color: var(--color-primary-600);
  flex-shrink: 0;
}

.ingredients label.done span {
  text-decoration: line-through;
  color: var(--color-neutral-400);
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.25rem 0 1.75rem;
}

.upsell {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1.25rem;
  background: var(--color-primary-50);
  border: 1px solid var(--color-primary-200);
}

.upsell-icon {
  font-size: 1.75rem;
  color: var(--color-primary-600);
  flex-shrink: 0;
}

.upsell-title {
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.upsell-body {
  color: var(--color-neutral-600);
  font-size: 0.9375rem;
  margin-bottom: 1rem;
}

/* Closed */
.closed {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
}

.closed-icon {
  font-size: 2.25rem;
  color: var(--color-primary-600);
}

.closed p {
  color: var(--color-neutral-600);
  max-width: 28rem;
  margin-bottom: 0.5rem;
}
</style>
