"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export type Token = { id:string; name:string; x:number; y:number; img?:string; owner?:string; hp?:number|null };
export type RoomState = {
  scene: { id:string; name:string; bgUrl?:string; grid?:{size:number; visible:boolean} };
  tokens: Record<string, Token>;
  fog?: { enabled:boolean; revealed: Array<{x:number;y:number;r:number}> };
  turn?: { order:string[]; index:number };
};

type PatchOp = { path:string; value:any };

export function useVtt(roomId: string, name: string, role: "gm"|"player"="player") {
  const [state, setState] = useState<RoomState | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const url = (process.env.NEXT_PUBLIC_VTT_WS_URL || `ws://127.0.0.1:4001/vtt`) + `?room=${roomId}&name=${encodeURIComponent(name)}&role=${role}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onmessage = (ev) => {
      try{
        const msg = JSON.parse(ev.data);
        if (msg.t === "state") setState(msg.state);
        if (msg.t === "patch" && Array.isArray(msg.ops)) {
          setState(prev => {
            if (!prev) return prev;
            const next = structuredClone(prev);
            for (const op of msg.ops) {
              const path = String(op.path||"").split(".");
              let ref:any = next;
              for (let i=0;i<path.length-1;i++){ const k=path[i]; if(!(k in ref)) ref[k] = {}; ref = ref[k]; }
              ref[path[path.length-1]] = op.value;
            }
            return next;
          });
        }
        if (msg.t === "chat") {
          setMessages(prev=>[...prev, { t:"chat", at: Date.now(), from: msg.from, text: msg.text }]);
        }
        if (msg.t === "roll") {
          setMessages(prev=>[...prev, { t:"roll", at: Date.now(), from: msg.from, expr: msg.expr, result: msg.result }]);
        }
      }catch{}
    };
    ws.onclose = () => { wsRef.current = null; };
    return () => { try{ ws.close(); }catch{} };
  }, [roomId, name, role]);

  function send(msg:any){ try{ wsRef.current?.send(JSON.stringify(msg)); }catch{} }

  function patch(ops: PatchOp[]){ send({ t:"patch", ops }); }
  function chat(text:string){ send({ t:"chat", text }); }
  function roll(expr:string){ send({ t:"roll", expr }); }
  function addToken(t:Partial<Token>){ send({ t:"token", action:"add", ...t }); }

  return { state, messages, patch, chat, roll, addToken };
}
