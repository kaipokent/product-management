<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

console.log('hi', supabase)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
