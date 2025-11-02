import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabaseAdmin'
import { getUserIdFromRequestHeaders } from '@/lib/getUserId'
export async function GET(req: Request, { params }:{ params:{ id:string } }) {
  try{
    const userId = getUserIdFromRequestHeaders(new Headers(req.headers))
    const { data, error } = await sbAdmin.from('characters').select('*').eq('id', params.id).eq('user_id', userId).single()
    if (error) throw error
    return NextResponse.json(data)
  }catch(e:any){ return NextResponse.json({ ok:false, error:e.message }, { status:400 }) }
}
export async function PUT(req: Request, { params }:{ params:{ id:string } }) {
  try{
    const userId = getUserIdFromRequestHeaders(new Headers(req.headers))
    const body = await req.json()
    const { data, error } = await sbAdmin.from('characters').update({
      system: body.system, name: body.name, data: body.data, updated_at: new Date().toISOString()
    }).eq('id', params.id).eq('user_id', userId).select().single()
    if (error) throw error
    return NextResponse.json({ ok:true, character:data })
  }catch(e:any){ return NextResponse.json({ ok:false, error:e.message }, { status:400 }) }
}
export async function DELETE(req: Request, { params }:{ params:{ id:string } }) {
  try{
    const userId = getUserIdFromRequestHeaders(new Headers(req.headers))
    const { error } = await sbAdmin.from('characters').delete().eq('id', params.id).eq('user_id', userId)
    if (error) throw error
    return NextResponse.json({ ok:true })
  }catch(e:any){ return NextResponse.json({ ok:false, error:e.message }, { status:400 }) }
}
