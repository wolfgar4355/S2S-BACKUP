import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const r = await fetch("http://127.0.0.1:4001/api/generate/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const svg = await r.text();
  return new NextResponse(svg, {
    status: r.status,
    headers: { "Content-Type": "image/svg+xml" },
  });
}
