import { createClient } from '@supabase/supabase-js'
import { logger } from '@utils/logger'
import { supabaseConfig } from '@config/supabase.config'

const supabaseUrl = supabaseConfig.url
const supabaseAnonKey = supabaseConfig.anonKey

if (!supabaseUrl || !supabaseAnonKey) {
  logger.error('Missing Supabase configuration', new Error('Environment variables not set'))
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

logger.info('Supabase client initialized', { url: supabaseUrl })


