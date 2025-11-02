function Stub({ title }: { title: string }) {
  return (
    <main style={{padding: 24, fontFamily: "system-ui"}}>
      <h1 style={{fontSize: 28, marginBottom: 8}}>🌌 {title}</h1>
      <p style={{opacity: 0.8}}>WIP – branchement imminent aux générateurs & à l’API.</p>
    </main>
  );
}
export default function Page(){ return <Stub title="Personnages / Aliens" /> }
