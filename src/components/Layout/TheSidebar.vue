<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { menuKey } from '@/utils/injectionKeys'
import type { MenuInjectionKeys } from '@/utils/injectionKeys'

const router = useRouter()

defineEmits(['taskClicked'])

const { menuOpen, toggleMenu } = inject(menuKey) as MenuInjectionKeys
const windowWidth = useWindowSize().width
const { profile } = storeToRefs(useAuthStore())

const links = [
  { title: 'Dashboard', to: '/', icon: 'lucide:house' },
  { title: 'Projects', to: '/projects', icon: 'lucide:building-2' },
  { title: 'My Tasks', to: '/tasks', icon: 'lucide:badge-check' }
]

const accountLinks = [
  { title: 'Profile', to: `/users/${profile.value?.username}`, icon: 'lucide:user' },
  { title: 'Sign out', icon: 'lucide:log-out' }
]

const executeAction = async (linkTitle: string) => {
  if (linkTitle === 'Sign out') {
    const { logOut } = await import('@/utils/supaAuth')
    const isLoggedOut = await logOut()

    if (isLoggedOut) router.push('/login')
  }
}

watchEffect(() => {
  menuOpen.value = windowWidth.value > 1024
})
</script>

<template>
  <aside
    :class="[
      'flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]',
      { 'w-52': menuOpen, 'w-24': !menuOpen }
    ]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button
        @click="toggleMenu"
        variant="outline"
        size="icon"
        class="w-8 h-8"
        aria-label="Toggle navigation"
      >
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <DropdownMenu class="w-8 h-8">
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8" aria-label="Plus?">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')">Task</DropdownMenuItem>
          <DropdownMenuItem>Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" @actionClicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>
