import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { world, data }
    // Simu sauvegarde (ici on renvoie juste ce qu’on a reçu)
    return NextResponse.json({ ok: true, received: body }, { status: 200 });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message || "bad payload" }, { status: 400 });
  }
}
