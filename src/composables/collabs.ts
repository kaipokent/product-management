import { groupedProfilesQuery } from '@/utils/supaQueries'
import type { Projects, TasksWithProjects } from '@/utils/supaQueries'
import type { GroupedCollabs } from '@/types/GroupedCollabs'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)

    if (error || !data) return []

    return data
  }

  const groupCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter((item) => item.collaborators.length)

    const promises = filteredItems.map((item) => getProfilesByIds(item.collaborators))

    const results = await Promise.all(promises)

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index]
    })
  }

  return { groupedCollabs, getProfilesByIds, groupCollabs }
}
