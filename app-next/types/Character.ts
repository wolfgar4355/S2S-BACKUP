export type System = 'PF2'|'CoC7e'|'SR6'
export type Character = {
  id: string; userId: string; system: System; name: string;
  meta?: { world?: string; portraitUrl?: string };
  identity: { ancestry?: string; class?: string; level?: number; background?: string };
  stats: Record<string, number>;
  skills: Record<string, number>;
  spells?: { known: Array<{name:string; rank:number; notes?:string}> };
  inventory?: { coins: {cp:number; sp:number; gp:number; pp:number}; items: Array<{name:string; qty:number; note?:string}> };
  history?: Array<{ ts:number; note:string }>;
}
