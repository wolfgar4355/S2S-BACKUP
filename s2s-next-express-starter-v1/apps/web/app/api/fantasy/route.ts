import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const base = process.env.S2S_API_URL!;
  const url = new URL(req.url);
  const path = url.searchParams.get('path') ?? '';
  const target = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const r = await fetch(target, { headers: { 'accept': 'application/json' } });
  const body = await r.text();
  return new NextResponse(body, {
    status: r.status,
    headers: { 'content-type': r.headers.get('content-type') ?? 'application/json' }
  });
}

export const dynamic = 'force-dynamic';
