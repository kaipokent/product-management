import type { AuthError } from '@supabase/supabase-js'
import type { LoginForm } from '@/types/AuthForm'

export const useFormErrors = () => {
  const serverError = ref<null | string>(null)
  const realtimeErrors = ref()

  const handleServerError = (error: AuthError) => {
    serverError.value = error.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = { email: [], password: [] }

    const { validateEmail, validatePassword } = await import('@/utils/formValidations')

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) realtimeErrors.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors
  }

  return { serverError, realtimeErrors, handleServerError, handleLoginForm }
}
