import Image from 'next/image';
import Link from 'next/link';

export default function Home(){
  return (
    <main style={{minHeight:'100vh', display:'grid', placeItems:'center', background:'#0b0b0b'}}>
      <div style={{position:'relative', width:900, maxWidth:'95vw', aspectRatio:'16/9', borderRadius:16, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.6)'}}>
        <Image src="/landing.png" alt="Sheet2Scene grimoire" fill style={{objectFit:'cover'}} priority />
        <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center'}}>
          <div style={{background:'rgba(0,0,0,.55)', padding:16, borderRadius:12}}>
            <Link href="/login" style={{color:'#fff', fontSize:20, textDecoration:'none', padding:'10px 16px', border:'1px solid #fff', borderRadius:8}}>Login</Link>
          </div>
        </div>
      </div>
      <div style={{position:'fixed', bottom:16, display:'flex', gap:16}}>
        <Link href="/toc" style={{color:'#bbb'}}>Table of Contents</Link>
        <Link href="/account/privacy" style={{color:'#bbb'}}>Privacy Center</Link>
      </div>
    </main>
  );
}
