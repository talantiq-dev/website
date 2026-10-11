<script setup lang="ts">
interface SharedMeal { kind: 'recipe' | 'quick' | 'flexible', title: string, sourceUrl?: string, creator?: string }
interface SharedShare {
  kind: 'plan' | 'shopping'
  lang: 'en' | 'de' | 'fr' | 'es'
  days?: { date: string, meals: SharedMeal[] }[]
  stores?: { name: string, items: { name: string, amount: string, checked: boolean }[] }[]
}

// Shares are private snapshots: keep them out of search engines
useSeoMeta({
  title: 'Shared from Sapid',
  description: 'A meal plan or shopping list shared from the Sapid app.',
  robots: 'noindex, nofollow',
  ogTitle: 'Shared from Sapid',
  ogDescription: 'Open to see the meal plan or shopping list.',
  ogImage: 'https://talantiq.com/og-sapid.png',
})

const config = useRuntimeConfig()
const route = useRoute()

const share = ref<SharedShare | null>(null)
const status = ref<'loading' | 'ready' | 'missing' | 'error'>('loading')
const checked = ref<Set<string>>(new Set())
const copied = ref(false)

const COPY = {
  en: {
    plan: 'Meal plan', shopping: 'Shopping list', from: 'by', original: 'Original recipe', copy: 'Copy list', copiedLabel: 'Copied!', made: 'Made with Sapid',
    ctaPlan: 'Plan your own week in minutes', ctaShopping: 'One shopping list for the whole week',
    ctaText: 'Sapid imports recipes from TikTok, Instagram and any blog, plans your week and sorts your shopping list by store.',
  },
  de: {
    plan: 'Essensplan', shopping: 'Einkaufsliste', from: 'von', original: 'Originalrezept', copy: 'Liste kopieren', copiedLabel: 'Kopiert!', made: 'Erstellt mit Sapid',
    ctaPlan: 'Plane deine eigene Woche in Minuten', ctaShopping: 'Eine Einkaufsliste für die ganze Woche',
    ctaText: 'Sapid importiert Rezepte von TikTok, Instagram und jedem Blog, plant deine Woche und sortiert deine Einkaufsliste nach Laden.',
  },
  fr: {
    plan: 'Menu de la semaine', shopping: 'Liste de courses', from: 'par', original: 'Recette originale', copy: 'Copier la liste', copiedLabel: 'Copié !', made: 'Créé avec Sapid',
    ctaPlan: 'Planifiez votre semaine en quelques minutes', ctaShopping: 'Une seule liste de courses pour toute la semaine',
    ctaText: 'Sapid importe des recettes depuis TikTok, Instagram et n’importe quel blog, planifie votre semaine et trie votre liste de courses par magasin.',
  },
  es: {
    plan: 'Plan de comidas', shopping: 'Lista de la compra', from: 'de', original: 'Receta original', copy: 'Copiar lista', copiedLabel: '¡Copiado!', made: 'Hecho con Sapid',
    ctaPlan: 'Planifica tu semana en minutos', ctaShopping: 'Una sola lista de la compra para toda la semana',
    ctaText: 'Sapid importa recetas de TikTok, Instagram y cualquier blog, planifica tu semana y ordena tu lista de la compra por tienda.',
  },
}
const copy = computed(() => COPY[share.value?.lang || 'en'])

onMounted(async () => {
  const id = typeof route.query.id === 'string' ? route.query.id : ''
  if (!/^[A-Za-z0-9]{12}$/.test(id)) {
    status.value = 'missing'
    return
  }
  try {
    const res = await fetch(`${config.public.apiBase}/shares/${id}`)
    if (res.status === 404) {
      status.value = 'missing'
      return
    }
    if (!res.ok) throw new Error(String(res.status))
    share.value = await res.json()
    checked.value = new Set(share.value?.stores?.flatMap((s, si) => s.items.flatMap((item, ii) => (item.checked ? [`${si}-${ii}`] : []))))
    status.value = 'ready'
  } catch {
    status.value = 'error'
  }
})

const formatDay = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString(share.value?.lang || 'en', { weekday: 'long', day: 'numeric', month: 'long' })

function toggle(key: string) {
  const next = new Set(checked.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  checked.value = next
}

async function copyList() {
  if (!share.value?.stores) return
  const lines = share.value.stores.flatMap((store, si) => [
    `${store.name}:`,
    ...store.items.filter((_, ii) => !checked.value.has(`${si}-${ii}`)).map(item => `☐ ${[item.amount, item.name].filter(Boolean).join(' ')}`),
    '',
  ])
  await navigator.clipboard.writeText(`${lines.join('\n')}${copy.value.made} · ${config.public.siteUrl}/sapid`)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="share-page section-py">
    <div class="container narrow">
      <p v-if="status === 'loading'" class="state">
        Loading…
      </p>

      <div v-else-if="status === 'missing'" class="state card">
        <h1>This link has expired</h1>
        <p>Shared plans and lists are available for 30 days. Ask for a new link, or plan your own week with Sapid.</p>
        <StoreButtons campaign="share_expired" size="md" />
      </div>

      <div v-else-if="status === 'error'" class="state card">
        <h1>Something went wrong</h1>
        <p>We couldn’t load this shared list. Please try again in a moment.</p>
      </div>

      <template v-else-if="share">
        <span class="eyebrow">Shared from Sapid</span>
        <h1 class="share-title">
          {{ share.kind === 'plan' ? copy.plan : copy.shopping }}
        </h1>

        <!-- Meal plan -->
        <div v-if="share.kind === 'plan'" class="days">
          <section v-for="day in share.days" :key="day.date" class="day card">
            <h2>{{ formatDay(day.date) }}</h2>
            <ul>
              <li v-for="(meal, index) in day.meals" :key="index" class="meal" :class="meal.kind">
                <Icon :name="meal.kind === 'recipe' ? 'lucide:utensils' : meal.kind === 'quick' ? 'lucide:zap' : 'lucide:calendar-off'" class="meal-icon" />
                <div>
                  <span class="meal-title">{{ meal.title }}</span>
                  <a v-if="meal.sourceUrl" :href="meal.sourceUrl" target="_blank" rel="nofollow noopener" class="source">
                    {{ meal.creator ? `${copy.original} ${copy.from} ${meal.creator}` : copy.original }}
                    <Icon name="lucide:external-link" />
                  </a>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <!-- Shopping list -->
        <div v-else class="stores">
          <section v-for="(store, si) in share.stores" :key="si" class="store card">
            <h2>{{ store.name }}</h2>
            <ul>
              <li v-for="(item, ii) in store.items" :key="ii">
                <label :class="{ done: checked.has(`${si}-${ii}`) }">
                  <input type="checkbox" :checked="checked.has(`${si}-${ii}`)" @change="toggle(`${si}-${ii}`)">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-amount">{{ item.amount }}</span>
                </label>
              </li>
            </ul>
          </section>
          <button class="btn btn-neutral" @click="copyList">
            <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" />
            {{ copied ? copy.copiedLabel : copy.copy }}
          </button>
        </div>

        <aside class="cta card">
          <img src="/sapid-icon.png" alt="" width="56" height="56" class="cta-icon">
          <div>
            <p class="cta-title">
              {{ share.kind === 'plan' ? copy.ctaPlan : copy.ctaShopping }}
            </p>
            <p class="cta-text">
              {{ copy.ctaText }}
            </p>
            <StoreButtons :campaign="`share_${share.kind}`" size="md" />
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

.share-title {
  font-size: clamp(2rem, 5vw, 2.75rem);
  margin-bottom: 1.5rem;
}

.days,
.stores {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.day,
.store {
  padding: 1.25rem 1.5rem;
}

.day h2,
.store h2 {
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
}

.day ul,
.store ul {
  list-style: none;
}

.meal {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.meal-icon {
  color: var(--color-primary-600);
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.meal.flexible .meal-title {
  color: var(--color-neutral-500);
  font-style: italic;
}

.meal-title {
  display: block;
  font-weight: 600;
}

.source {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-primary-700);
}

.store li {
  border-top: 1px solid var(--color-neutral-200);
}

.store label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  cursor: pointer;
}

.store input {
  width: 1.125rem;
  height: 1.125rem;
  accent-color: var(--color-primary-600);
  flex-shrink: 0;
}

.item-name {
  flex: 1;
}

.item-amount {
  color: var(--color-neutral-500);
  font-size: 0.9375rem;
}

.store label.done .item-name,
.store label.done .item-amount {
  text-decoration: line-through;
  color: var(--color-neutral-400);
}

.stores .btn {
  align-self: flex-start;
}

.cta {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  margin-top: 2.5rem;
  background: var(--color-primary-50);
  border-color: var(--color-primary-200);
}

.cta-icon {
  border-radius: 1rem;
  flex-shrink: 0;
}

.cta-title {
  font-weight: 700;
  font-size: 1.125rem;
}

.cta-text {
  color: var(--color-neutral-600);
  margin: 0.25rem 0 1rem;
}
</style>
