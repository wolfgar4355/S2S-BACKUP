export default async function PublicSheet({ params:{ slug } }:{ params:{slug:string} }){
  return (
    <main className="min-h-screen grid place-items-center bg-[#0B0C10] text-white">
      <div className="max-w-3xl w-full rounded-lg border border-white/10 p-6 bg-white/5">
        <h1 className="text-xl font-semibold">Fiche publique</h1>
        <p className="text-sm text-white/70 mt-2">Slug: {slug}</p>
        <p className="mt-4">Branchez l’API `/api/public/s/[slug]` (fourni dans le patch Supabase CRUD) pour afficher la fiche en lecture seule.</p>
      </div>
    </main>
  )
}
