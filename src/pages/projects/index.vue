<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'
import { useProjectsStore } from '@/stores/loaders/projects'
import { useCollabs } from '@/composables/collabs'
import { useHead } from '@unhead/vue'

usePageStore().pageData.title = 'Projects'
useHead({
  title: 'Projects | Pulse'
})

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { groupCollabs, groupedCollabs } = useCollabs()
groupCollabs(projects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>
