<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm'
import { createNewTaskQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'

type SelectOption = { label: string; value: string | number }

const sheetOpen = defineModel<boolean>()

const projectOptions = ref<SelectOption[]>([])
const profileOptions = ref<SelectOption[]>([])

const getProjectOptions = async () => {
  const { data: projects } = await projectsQuery

  if (!projects) return

  projects.forEach((project) =>
    projectOptions.value.push({ label: project.name, value: project.id })
  )
}

const getProfileOptions = async () => {
  const { data: profiles } = await profilesQuery

  if (!profiles) return

  profiles.forEach((profile) =>
    profileOptions.value.push({ label: profile.full_name, value: profile.id })
  )
}

const getOptions = async () => {
  await Promise.all([getProjectOptions(), getProfileOptions()])
}

const { profile } = storeToRefs(useAuthStore())

const createTask = async (formData: CreateNewTask) => {
  const task = {
    ...formData,
    collaborators: [profile.value!.id]
  }

  const { error } = await createNewTaskQuery(task)

  if (error) console.log(error)

  sheetOpen.value = false
}

getOptions()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader class="pb-4">
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <FormKit
        type="form"
        @submit="createTask"
        submit-label="Create task"
        :config="{ validationVisibility: 'submit' }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Task name"
          validation="required|length:1,255"
        />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="Assigned to"
          placeholder="Select user"
          :options="profileOptions"
          validation="required"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Select project"
          :options="projectOptions"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          validation="length:0,255"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
