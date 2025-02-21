<script setup lang="ts">
import { watchEffect } from 'vue'
import { useCollabs } from '@/composables/collabs'
import { useTasksStore } from '@/stores/loaders/tasks'

const { id } = useRoute('/tasks/[id]').params
const router = useRouter()

const tasksLoader = useTasksStore()
const { task } = storeToRefs(tasksLoader)
const { getTask, updateTask, deleteTask } = tasksLoader

const deleting = ref<boolean>(false)

watchEffect(() => {
  usePageStore().pageData.title = `Task: ${task.value?.name || ''}`
})

await getTask(id)

const { getProfilesByIds } = useCollabs()
const collabs = task.value?.collaborators ? await getProfilesByIds(task.value?.collaborators) : []

const handleDelete = async () => {
  if (deleting.value) return

  deleting.value = true
  await deleteTask()
  router.push({ name: '/tasks/' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <Table v-if="task">
      <TableRow>
        <TableHead> Name</TableHead>
        <TableCell>
          <AppInPlaceEditText v-model="task.name" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description</TableHead>
        <TableCell>
          <AppInPlaceEditTextarea v-model="task.description" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Assignee</TableHead>
        <TableCell>Lorem ipsum</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project</TableHead>
        <TableCell> {{ task.projects?.name }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead id="status"> Status</TableHead>
        <TableCell>
          <AppInPlaceEditStatus v-model="task.status" @commit="updateTask" ariaId="status" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators</TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collaborator in collabs"
              :key="collaborator.id"
            >
              <RouterLink
                class="w-full h-full flex items-center justify-center"
                :to="{ name: '/users/[username]', params: { username: collaborator.username } }"
              >
                <AvatarImage :src="collaborator.avatar_url || ''" alt="" />
                <AvatarFallback></AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments</TableHead>

        <TableCell>
          Comments cards goes in here..

          <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment</Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>

                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>

    <Button @click="handleDelete" class="self-end mt-3 w-full max-w-40" variant="destructive">
      <Transition name="scale" mode="out-in">
        <iconify-icon v-if="deleting" icon="lucide:loader-circle" class="mr-1 animate-spin" />
        <iconify-icon v-else icon="lucide:trash-2" class="mr-1" />
      </Transition>
      Delete task
    </Button>
  </div>
</template>
