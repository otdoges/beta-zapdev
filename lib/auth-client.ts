import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const signIn = {
  social: async (provider: 'github') => {
    return supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  },
  email: async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    })
  },
}

export const signUp = {
  email: async (email: string, password: string) => {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
  },
}

export const signOut = async () => {
  return supabase.auth.signOut()
}

export const getSession = async () => {
  return supabase.auth.getSession()
}

export const getUser = async () => {
  return supabase.auth.getUser()
} 