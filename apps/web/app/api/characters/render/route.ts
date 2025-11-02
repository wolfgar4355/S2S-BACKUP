import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const sheet = await req.json();
    const url = `${process.env.S2S_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:4001"}/render-character`;
    const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(sheet) });
    if (!r.ok) return NextResponse.json({ ok:false, error: await r.text() }, { status: r.status });
    const data = await r.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message || "error" }, { status: 500 });
  }
}
