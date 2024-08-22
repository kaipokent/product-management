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
export type ProjectsQuery = QueryData<typeof projectsQuery>
