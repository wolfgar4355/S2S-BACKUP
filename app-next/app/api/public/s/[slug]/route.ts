import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabaseAdmin'
export async function GET(_:Request, { params }:{ params:{ slug:string } }){
  try{
    const { data: share, error: e1 } = await sbAdmin.from('shares').select('*').eq('slug', params.slug).single()
    if (e1 || !share) throw e1 || new Error('Share not found')
    if (share.expires_at && new Date(share.expires_at) < new Date())
      return NextResponse.json({ ok:false, error:'Share link expired' }, { status:410 })
    const { data: character, error: e2 } = await sbAdmin.from('characters').select('*').eq('id', share.character_id).single()
    if (e2) throw e2
    return NextResponse.json({ ok:true, character })
  }catch(e:any){ return NextResponse.json({ ok:false, error:e.message }, { status:404 }) }
}
