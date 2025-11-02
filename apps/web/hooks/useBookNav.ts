"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { bookAudio, flipsForJump } from "@/utils/bookSounds";
import { WORLDS } from "@/config/worlds";
import { triggerBookAnimation, triggerBookClose } from "@/components/BookAnimation";
export function useBookNav(currentWorldId?: string | null){
  const router = useRouter();
  const goToWorld = useCallback(async (targetId:string)=>{ const flips=flipsForJump(WORLDS as any, targetId, currentWorldId); triggerBookAnimation(flips,110); if(!currentWorldId) await bookAudio.open(); await bookAudio.fast(flips,110); await bookAudio.flip(); router.push(`/worlds/${targetId}`); },[currentWorldId,router]);
  const goHome = useCallback(async ()=>{ triggerBookClose(); await bookAudio.close(); setTimeout(()=>{ router.push("/"); },500); },[router]);
  return { goToWorld, goHome };
}
