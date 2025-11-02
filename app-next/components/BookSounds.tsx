'use client'
import { useEffect, useRef } from 'react'
export default function BookSounds({open}:{open:boolean}){
  const aOpen = useRef<HTMLAudioElement|null>(null)
  const aFlip = useRef<HTMLAudioElement|null>(null)
  useEffect(()=>{ if(open) aOpen.current?.play().catch(()=>{}) }, [open])
  return (
    <>
      <audio ref={aOpen} src="/sounds/book_open.mp3" preload="auto" />
      <audio ref={aFlip} src="/sounds/page_flip.mp3" preload="auto" />
      <button className="hidden" onClick={()=>aFlip.current?.play().catch(()=>{})} id="s2s-flip-trigger" />
    </>
  )
}
