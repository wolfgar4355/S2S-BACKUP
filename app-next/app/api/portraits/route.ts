import { NextResponse } from 'next/server'
import { sbAdmin } from '@/lib/supabaseAdmin'
import { getUserIdFromRequestHeaders } from '@/lib/getUserId'
export async function GET(req: Request) {
  try{
    const userId = getUserIdFromRequestHeaders(new Headers(req.headers))
    const { data, error } = await sbAdmin.from('portraits').select('*').eq('user_id', userId).order('created_at', { ascending:false })
    if (error) throw error
    return NextResponse.json(data||[])
  }catch(e:any){ return NextResponse.json({ ok:false, error:e.message }, { status:400 }) }
}
