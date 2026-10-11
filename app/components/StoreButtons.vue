<script setup lang="ts">
const props = withDefaults(defineProps<{
  // Shows up as utm_campaign in Play Console acquisition reports and as the App Store campaign token
  campaign: string
  size?: 'md' | 'xl'
}>(), { size: 'xl' })

const { sapid } = useAppConfig()

const playUrl = computed(() => {
  const referrer = `utm_source=talantiq.com&utm_medium=website&utm_campaign=${props.campaign}`
  return `${sapid.playStoreUrl}&referrer=${encodeURIComponent(referrer)}`
})

const appStoreUrl = computed(() => {
  if (!sapid.appStoreUrl) return ''
  const separator = sapid.appStoreUrl.includes('?') ? '&' : '?'
  return `${sapid.appStoreUrl}${separator}ct=${encodeURIComponent(props.campaign)}`
})
</script>

<template>
  <div class="store-buttons">
    <a
      :href="playUrl"
      target="_blank"
      rel="noopener"
      class="btn btn-primary"
      :class="size === 'xl' ? 'btn-xl' : ''"
    >
      <Icon name="lucide:play" />
      Get it on Google Play
    </a>
    <a
      v-if="appStoreUrl"
      :href="appStoreUrl"
      target="_blank"
      rel="noopener"
      class="btn btn-outline"
      :class="size === 'xl' ? 'btn-xl' : ''"
    >
      <Icon name="lucide:smartphone" />
      Download on the App Store
    </a>
    <span
      v-else
      class="btn btn-outline btn-disabled"
      :class="size === 'xl' ? 'btn-xl' : ''"
    >
      <Icon name="lucide:smartphone" />
      iOS coming soon
    </span>
  </div>
</template>

<style scoped>
.store-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn-disabled {
  cursor: default;
  color: var(--color-neutral-500);
}

.btn-disabled:hover {
  background-color: transparent;
}
</style>
