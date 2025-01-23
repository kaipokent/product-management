<script setup lang="ts">
import type { Enums } from '../../../database/types'

const status = defineModel<Enums<'current_status'>>()
const { readonly = false, ariaId } = defineProps<{ readonly?: boolean; ariaId: string }>()
const emit = defineEmits(['commit'])

const toggleStatus = () => {
  if (readonly) return

  status.value = status.value === 'completed' ? 'in-progress' : 'completed'
  emit('commit')
}
</script>

<template>
  <button
    :class="['text-2xl', { 'cursor-pointer': !readonly, 'pointer-events-none': readonly }]"
    @click="toggleStatus"
    :aria-labelledby="ariaId"
  >
    <Transition name="scale" mode="out-in">
      <iconify-icon
        v-if="status === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
        aria-label="completed"
      />
      <iconify-icon
        v-else
        icon="lucide:circle-dot"
        class="text-gray-500"
        aria-label="in progress"
      />
    </Transition>
  </button>
</template>
