<script setup lang="ts">
const sheetOpen = defineModel<boolean>()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <p>Task content</p>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
