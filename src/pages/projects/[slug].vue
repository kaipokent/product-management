<script setup lang="ts">
const route = useRoute('/projects/[slug]')
</script>

<template>
  <h1>Project {{ route.params?.slug }}</h1>
</template>
