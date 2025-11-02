export type SelectOption = { id: string; label: string };
export type Field = { kind:"text"| "select" | "textarea"; id:string; label:string; placeholder?:string; required?:boolean; options?: SelectOption[]; rows?:number };
export type World = { id:string; name:string; color:string; emoji:string; summary:string; tags?:string[]; sheet:{ fields: Field[]; races?:SelectOption[]; classes?:SelectOption[]; origins?:{id:string;label:string;options:SelectOption[]} } };
export const BASE_FIELDS: Field[] = [
  { kind:"text", id:"name", label:"Nom", required:true, placeholder:"Ex.: Seraphine Noir" },
  { kind:"textarea", id:"concept", label:"Concept", rows:3, placeholder:"Bref concept de perso…" },
];
export const WORLDS: World[] = [
  { id:"classic", name:"Royaumes & Donjons", color:"gold", emoji:"🏰", summary:"Héroïc fantasy : donjons, guildes, royaumes en guerre.", tags:["dungeons","guilds","dragons"], sheet:{ fields: BASE_FIELDS } },
  { id:"galactic", name:"Galactic Fight", color:"#1e90ff", emoji:"🚀", summary:"Space opera : pilotes, aliens, stations, factions rivales.", tags:["scifi","space","opera"], sheet:{ fields: BASE_FIELDS } },
  { id:"nightblood", name:"Night of Blood", color:"crimson", emoji:"🩸", summary:"Horreur urbaine : lignées vampiriques, intrigues nocturnes, pactes de sang.", tags:["vampires","nuit","lignées"], sheet:{ fields: BASE_FIELDS } },
  { id:"moonborn", name:"Moonborn", color:"slate", emoji:"🌕", summary:"Clans shapeshifters, cycles lunaires, rites tribaux et territoires.", tags:["loups-garous","tribus","lune"], sheet:{ fields: BASE_FIELDS } },
  { id:"awakened", name:"The Awakened", color:"indigo", emoji:"✨", summary:"Occultistes éveillés, paradoxes, traditions rivales et cabales.", tags:["magie","occultisme","cabal"], sheet:{ fields: BASE_FIELDS } },
  { id:"veilbound", name:"The Veilbound", color:"violet", emoji:"🕯️", summary:"Esprits, pactes avec l’Au-delà, hantises modernes.", tags:["fantômes","pactes","au-delà"], sheet:{ fields: BASE_FIELDS } },
  { id:"dreamshapers", name:"Dreamshapers", color:"pink", emoji:"💤", summary:"Onirisme sombre, architectures de rêve, cauchemars incarnés.", tags:["rêves","cauchemars","onirique"], sheet:{ fields: BASE_FIELDS } },
  { id:"vigilants", name:"The Vigilants", color:"steel", emoji:"🔦", summary:"Cellules de chasseurs, gadgets artisanaux, conspirations.", tags:["chasseurs","cellules","conspiration"], sheet:{ fields: BASE_FIELDS } },
];
