import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(()=> ({}));
    const url = `${process.env.S2S_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:4001"}/vtt/room`;
    const r = await fetch(url, { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify(body) });
    const j = await r.json();
    return NextResponse.json(j, { status: r.status });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message || "error" }, { status: 500 });
  }
}
