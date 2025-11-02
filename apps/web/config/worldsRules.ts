export type WorldRules = {
  id: string; name: string;
  grid?: { size: number; metersPerCell?: number; diagonal?: "euclid"|"5105" };
  dice?: { presets?: Record<string,string> };
  bars?: Array<{ key:string; label:string; color:string }>;
  conditions?: Array<{ id:string; label:string; tint?:string }>;
  vision?: { defaultRange?: number; mode?: "dim"|"bright"|"dark" };
};

export const WORLDS_RULES: Record<string, WorldRules> = {
  classic:  { id:"classic",  name:"Fantasy",
              grid:{ size:50, metersPerCell:1.5, diagonal:"5105" },
              dice:{ presets:{ atk:"1d20+5", save:"1d20+2" } },
              bars:[{key:"hp", label:"PV", color:"#e74c3c"}] },
  galactic: { id:"galactic", name:"Galactic Fight",
              grid:{ size:50, metersPerCell:1, diagonal:"euclid" },
              dice:{ presets:{ atk:"1d20+6" } },
              bars:[{key:"hp", label:"Coque", color:"#e67e22"}] },
  nightblood:{ id:"nightblood", name:"Night of Blood",
              grid:{ size:50, metersPerCell:1.5, diagonal:"euclid" },
              dice:{ presets:{ fear:"1d20+2" } },
              bars:[{key:"hp", label:"Santé", color:"#c0392b"}] },
  moonborn: { id:"moonborn", name:"Moonborn",
              grid:{ size:50 }, bars:[{key:"hp", label:"Vigueur", color:"#27ae60"}] },
  awakened: { id:"awakened", name:"The Awakened",
              grid:{ size:50 }, bars:[{key:"hp", label:"Volonté", color:"#8e44ad"}] },
  veilbound:{ id:"veilbound", name:"The Veilbound",
              grid:{ size:50 }, bars:[{key:"hp", label:"Santé", color:"#16a085"}] },
  dreamshapers:{ id:"dreamshapers", name:"Dreamshapers",
              grid:{ size:50 }, bars:[{key:"hp", label:"Clarté", color:"#2980b9"}] },
  vigilants: { id:"vigilants", name:"The Vigilants",
              grid:{ size:50 }, bars:[{key:"hp", label:"PV", color:"#e74c3c"}] },
};
