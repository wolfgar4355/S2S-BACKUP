export async function enterWorld(prompt: string) {
  const r = await fetch('/api/world', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ action: 'enter', prompt }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j?.data?.error || 'World API failed');
  return j.data;
}
