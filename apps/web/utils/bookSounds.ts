type ClipName = "open" | "flip" | "close";
const CLIPS: Record<ClipName, string> = { open:"/sounds/book-open.wav", flip:"/sounds/page-flip.wav", close:"/sounds/book-close.wav" };
class BookAudioManager {
  private buffers = new Map<ClipName, AudioBuffer>(); private ctx?: AudioContext;
  private async ensureCtx(){ if(!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); if(this.ctx.state==="suspended") await this.ctx.resume().catch(()=>{}); }
  async preload(){ await this.ensureCtx(); await Promise.all((Object.keys(CLIPS) as ClipName[]).map(async n=>{ if(this.buffers.has(n)) return; const res=await fetch(CLIPS[n]); const arr=await res.arrayBuffer(); const buf=await this.ctx!.decodeAudioData(arr); this.buffers.set(n,buf);})); }
  private playBuffer(n:ClipName, volume=0.6){ if(!this.ctx||!this.buffers.has(n)) return; const src=this.ctx.createBufferSource(); const gain=this.ctx.createGain(); src.buffer=this.buffers.get(n)!; gain.gain.value=volume; src.connect(gain).connect(this.ctx.destination); src.start(0);}
  async open(){ await this.ensureCtx(); await this.preload(); this.playBuffer("open",0.7);} async flip(){ await this.ensureCtx(); await this.preload(); this.playBuffer("flip",0.6);}
  async fast(count:number, cadenceMs=110){ await this.ensureCtx(); await this.preload(); for(let i=0;i<count;i++){ this.playBuffer("flip",0.55); const jitter=Math.round((Math.random()-.5)*18); await new Promise(r=>setTimeout(r, Math.max(60, cadenceMs + jitter))); } }
  async close(){ await this.ensureCtx(); await this.preload(); this.playBuffer("close",0.7); }
}
export const bookAudio = new BookAudioManager();
export function flipsForJump(worlds:{id:string}[], targetId:string, currentId?:string|null){ const ids=worlds.map(w=>w.id); const t=ids.indexOf(targetId); const c=currentId?ids.indexOf(currentId):0; const dist=t<0?3:Math.abs(t-Math.max(0,c)); const raw=Math.round(3+dist*1.6); return Math.max(4, Math.min(raw,14)); }
