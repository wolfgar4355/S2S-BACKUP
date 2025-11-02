import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_URL as string
const service = process.env.SUPABASE_SERVICE_ROLE as string
if (!url) throw new Error('Missing SUPABASE_URL')
if (!service) throw new Error('Missing SUPABASE_SERVICE_ROLE')
export const sbAdmin = createClient(url, service, { auth: { persistSession: false } })
