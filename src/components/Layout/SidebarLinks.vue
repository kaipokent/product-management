<script setup lang="ts">
import { useMenu } from '@/composables/menu'

interface LinkProp {
  title: string
  to?: string
  icon: string
}
defineProps<{ links: LinkProp[] }>()
const emits = defineEmits<{
  actionClicked: [string]
}>()

const emitAction = (linkTitle: string) => {
  emits('actionClicked', linkTitle)
}

const { menuOpen } = useMenu()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      exact-active-class="text-primary bg-muted"
      :to="link.to"
      :class="['nav-link', { 'justify-normal': menuOpen, 'justify-center': !menuOpen }]"
      :aria-label="link.title"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span :class="['text-nowrap', { block: menuOpen, hidden: !menuOpen }]">{{ link.title }}</span>
    </RouterLink>

    <button
      v-else
      :class="[
        'nav-link cursor-pointer',
        { 'justify-normal': menuOpen, 'justify-center justify-self-center': !menuOpen }
      ]"
      @click="emitAction(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span :class="['text-nowrap', { block: menuOpen, hidden: !menuOpen }]">{{ link.title }}</span>
    </button>
  </template>
</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg
  hover:text-primary text-muted-foreground;
}
</style>
