import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action = 'enter', prompt = 'enter the fantasy world' } = body || {};
    const api = process.env.S2S_API_URL || 'http://127.0.0.1:4001';

    const r = await fetch(`${api}/world`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action, prompt }),
    });

    const ct = r.headers.get('content-type') || '';
    const isJSON = ct.includes('application/json');
    const data = isJSON ? await r.json() : { ok: r.ok, text: await r.text() };

    return NextResponse.json({ ok: r.ok, status: r.status, data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'unknown error' },
      { status: 500 },
    );
  }
}
