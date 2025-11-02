"use client";
import { useEffect, useMemo, useRef, useState } from "react";
const DEFAULT_CADENCE = 110;
type BookEvent = { mode:"openFlip"|"close"; flips?:number; cadenceMs?:number };
export function triggerBookAnimation(flips:number, cadenceMs=DEFAULT_CADENCE){ window.dispatchEvent(new CustomEvent("book:animate",{detail:{mode:"openFlip",flips,cadenceMs} as BookEvent})); }
export function triggerBookClose(){ window.dispatchEvent(new CustomEvent("book:animate",{detail:{mode:"close"} as BookEvent})); }
export default function BookAnimation(){
  const [active,setActive]=useState(false); const [mode,setMode]=useState<BookEvent["mode"]>("openFlip");
  const [flips,setFlips]=useState(0); const [cadence,setCadence]=useState(DEFAULT_CADENCE); const [dust,setDust]=useState(false); const tRef=useRef<number|null>(null);
  useEffect(()=>{ const onAnim=(e:any)=>{ const {mode="openFlip",flips=6,cadenceMs=DEFAULT_CADENCE}=(e.detail||{}) as BookEvent; setMode(mode);setDust(false);setFlips(flips);setCadence(cadenceMs);setActive(true);
    let total = mode==="openFlip" ? 700 + flips*cadenceMs + 600 : 620 + 450; if(tRef.current) window.clearTimeout(tRef.current); tRef.current = window.setTimeout(()=>setActive(false), total); };
    window.addEventListener("book:animate" as any, onAnim); return ()=>window.removeEventListener("book:animate" as any, onAnim); },[]);
  useEffect(()=>{ if(!active||mode!=="close")return; const t=window.setTimeout(()=>setDust(true),540); return ()=>window.clearTimeout(t); },[active,mode]);
  const pages=useMemo(()=>Array.from({length:flips}),[flips]);
  return (<>
    <style jsx global>{`
      @keyframes bookOpen{0%{transform:scale(.85) rotate(-3deg);opacity:0}60%{transform:scale(1.02) rotate(0);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
      @keyframes pageFlip{0%{transform:rotateY(0);opacity:0}10%{opacity:1}50%{transform:rotateY(-160deg);opacity:1}100%{transform:rotateY(-180deg);opacity:0}}
      @keyframes bookClose{0%{transform:scale(1) rotate(0);opacity:1}45%{transform:scale(1.02) rotate(.8deg);opacity:1}100%{transform:scale(.88) rotate(2.4deg);opacity:0}}
      .book-overlay{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;pointer-events:none;background:radial-gradient(transparent,rgba(0,0,0,.35))}
      .book{width:min(560px,86vw);height:min(360px,56vw);position:relative;perspective:2000px;filter:drop-shadow(0 18px 40px rgba(0,0,0,.45));animation:var(--book-anim)}
      .cover,.pages,.page{position:absolute;inset:0;border-radius:14px}
      .cover{background:linear-gradient(135deg,#6b4e2e,#4c321a);border:2px solid rgba(255,255,255,.08)}
      .pages{left:10%;right:6%;top:6%;bottom:6%;background:#fdf8ef;border-radius:10px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
      .page{left:10%;right:6%;top:6%;bottom:6%;background:#fff;transform-origin:left center;border-radius:10px;box-shadow:0 1px 6px rgba(0,0,0,.15);backface-visibility:hidden}
      .dust{position:absolute;left:50%;bottom:18%;width:0;height:0;pointer-events:none;filter:drop-shadow(0 1px 3px rgba(0,0,0,.18))}
      .speck{position:absolute;width:3px;height:3px;border-radius:50%;background:radial-gradient(#e9ddb3,#cdb47e);opacity:0;transform:translate(-50%,0) scale(.8);animation:dustRise 420ms ease-out forwards}
      @keyframes dustRise{0%{opacity:0;transform:translate(-50%,4px) scale(.8)}20%{opacity:.35}100%{opacity:0;transform:translate(-50%,-18px) scale(1)}}
    `}</style>
    {active && (<div className="book-overlay"><div className="book" style={{["--book-anim" as any]: mode==="close" ? "bookClose .62s cubic-bezier(.3,.01,.2,1) both" : "bookOpen .7s ease-out both"}}>
      <div className="cover"/><div className="pages"/><div style={{position:"absolute",left:"calc(10% - 6px)",top:"6%",bottom:"6%",width:"6px",background:"linear-gradient(#d9c9a3,#bcae86)",borderRadius:"4px 0 0 4px",boxShadow:"inset -2px 0 2px rgba(0,0,0,.15)"}}/>
      {mode==="openFlip" && pages.map((_,i)=>(<div key={i} className="page" style={{animation:`pageFlip ${Math.max(.32,110/1000)}s cubic-bezier(.3,.01,.2,1) ${i*(110/1000)}s both`,opacity:.001}}/>))}
      {mode==="close" && (<div className="dust">{Array.from({length:4}).map((_,i)=>{const spread=(i-1.5)*6;const delay=30+i*22;const size=2+(i%2);return(<span key={i} className="speck" style={{left:`${spread}%`,width:size,height:size,animationDelay:`${delay}ms`}}/>);})}</div>)}
    </div></div>)}
  </>); }