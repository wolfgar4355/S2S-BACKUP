import presets from './portrait-presets.json'
export function buildPortraitPrompt(world:string, quality:'low'|'medium'|'high', name?:string) {
  if (quality==='low') return `Simple clean portrait, neutral background, no text logo watermark`
  const base = (presets as any)[world]?.[quality] || (presets as any)["Classic Fantasy"][quality]
  return name ? `${base}. Subject: ${name}` : base
}
