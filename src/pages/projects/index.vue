<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projectsQuery } from '@/utils/supaQueries'
import type { ProjectsQuery } from '@/utils/supaQueries'
import type { ColumnDef } from '@tanstack/vue-table'

usePageStore().pageData.title = 'Projects'

const projects = ref<ProjectsQuery | null>(null)
const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) console.log(error)

  projects.value = data
}

await getProjects()

const columns: ColumnDef<ProjectsQuery[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.getValue('name')
      )
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators'))
      )
    }
  }
]
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
