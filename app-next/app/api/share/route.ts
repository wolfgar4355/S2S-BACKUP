import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabaseAdmin'
import { getUserIdFromRequestHeaders } from '@/lib/getUserId'

function nanoid(size=12){
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let id = ''
  for (let i=0;i<size;i++) id += chars[Math.floor(Math.random()*chars.length)]
  return id
}

export async function POST(req: Request) {
  try{
    const userId = getUserIdFromRequestHeaders(new Headers(req.headers))
    const { characterId, expiresAt } = await req.json()
    const slug = nanoid(12)
    const { data, error } = await sbAdmin.from('shares').insert({
      user_id: userId, character_id: characterId, slug, expires_at: expiresAt || null
    }).select().single()
    if (error) throw error
    return NextResponse.json({ ok:true, share:data })
  }catch(e:any){ return NextResponse.json({ ok:false, error:e.message }, { status:400 }) }
}
