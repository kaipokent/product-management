import {
  projectsQuery,
  projectQuery,
  updateProjectQuery,
  updateTaskQuery,
  taskQuery
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import type { Projects, Project, Task } from '@/utils/supaQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)
  const task = ref<Task | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))
  const loadTask = useMemoize(async (id: string) => await taskQuery(id))

  interface ValidateCacheParams {
    ref: typeof projects | typeof project | typeof task
    query: typeof projectsQuery | typeof projectQuery | typeof taskQuery
    key: string
    loaderFn: typeof loadProjects | typeof loadProject | typeof loadTask
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }
  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) projects.value = data

    validateCache({ ref: projects, query: projectsQuery, key: 'projects', loaderFn: loadProjects })
  }

  const getProject = async (slug: string) => {
    const { data, error, status } = await loadProject(slug)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) project.value = data

    validateCache({ ref: project, query: projectQuery, key: slug, loaderFn: loadProject })
  }

  const updateProject = async () => {
    if (!project.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tasks, id, ...projectProperties } = project.value

    await updateProjectQuery(projectProperties, id)
  }

  const getTask = async (id: string) => {
    const { data, error, status } = await loadTask(id)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) task.value = data

    validateCache({ ref: task, query: taskQuery, key: id, loaderFn: loadTask })
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value

    await updateTaskQuery(taskProperties, id)
  }

  return {
    projects,
    project,
    task,
    getProjects,
    getProject,
    updateProject,
    getTask,
    updateTask
  }
})
