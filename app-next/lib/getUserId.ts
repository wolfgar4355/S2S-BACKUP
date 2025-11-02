export function getUserIdFromRequestHeaders(headers: Headers): string {
  const uid = headers.get('x-user-id') || ''
  if (!uid) throw new Error('Missing x-user-id header (demo). Wire real auth.)')
  return uid
}
