<script setup lang="ts">
import { columns } from '@/utils/tableColumns/tasksColumns'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'
import { useHead } from '@unhead/vue'

usePageStore().pageData.title = 'My Tasks'
useHead({
  title: 'My Tasks | Pulse'
})

const tasks = ref<TasksWithProjects | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery
  if (error) useErrorStore().setError({ error, customCode: status })

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
