import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabaseAdmin'
import { getUserIdFromRequestHeaders } from '@/lib/getUserId'
export async function GET(req: Request) {
  try {
    const userId = getUserIdFromRequestHeaders(new Headers(req.headers))
    const { data, error } = await sbAdmin.from('characters').select('*').eq('user_id', userId).order('updated_at', { ascending:false })
    if (error) throw error
    return NextResponse.json(data||[])
  } catch(e:any){ return NextResponse.json({ ok:false, error:e.message }, { status:400 }) }
}
export async function POST(req: Request) {
  try {
    const userId = getUserIdFromRequestHeaders(new Headers(req.headers))
    const body = await req.json()
    const row = { user_id:userId, system:body.system, name:body.name, data: body.data||{} }
    const { data, error } = await sbAdmin.from('characters').insert(row).select().single()
    if (error) throw error
    return NextResponse.json({ ok:true, character:data })
  } catch(e:any){ return NextResponse.json({ ok:false, error:e.message }, { status:400 }) }
}
