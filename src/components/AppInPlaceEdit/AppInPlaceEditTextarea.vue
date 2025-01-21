<script setup lang="ts">
const inputValue = defineModel<string>({ required: true })

const emit = defineEmits(['commit'])

const oldInputValue = ref(inputValue.value)
watch(inputValue, (newValue, oldValue) => {
  oldInputValue.value = oldValue
})

const emitCommit = () => {
  if (inputValue.value !== oldInputValue.value) {
    emit('commit')
  }
}
</script>

<template>
  <textarea class="w-full p-1 bg-transparent" v-model="inputValue" @blur="emitCommit" />
</template>

<style scoped></style>
