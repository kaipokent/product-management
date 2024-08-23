import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// @ts-ignore
export const tasksWithProjectsQuery = supabase.from('tasks').select(`
  *,
  projects(
    id,
    name,
    slug
  )
`)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

// @ts-ignore
export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

// @ts-ignore
export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
      *,
      tasks(
        id,
        name,
        status,
        due_date
      )
    `
    )
    .eq('slug', slug)
    .single()
export type Project = QueryData<ReturnType<typeof projectQuery>>

// @ts-ignore
export const taskQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `
        *,
        projects(
            id,
            name
        )
    `
    )
    .eq('id', id)
    .single()
export type Task = QueryData<ReturnType<typeof taskQuery>>
