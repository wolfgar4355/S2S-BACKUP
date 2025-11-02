export type GeneratePayload = { name: string; rarity: string; biome: string; };

export async function generateMonsterImage(data: GeneratePayload) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "";
  const res = await fetch(`${base}/api/generate/image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return await res.text(); // SVG string
}
