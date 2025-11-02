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
  { id:"nightblood", name:"Night of Blood", color:"crimson", emoji:"🩸", summary:"Horreur urbaine : lignées vampiriques, intrigues nocturnes, pactes de sang.", tags:["vampires","nuit","lignées"], sheet:{ fields: BASE_FIELDS,
    races:[{id:"human",label:"Humain"},{id:"dhampir",label:"Dhampir"}], classes:[{id:"predator",label:"Prédateur·rice"},{id:"ancilla",label:"Ancillaire"},{id:"fixer",label:"Entremetteur·se"}],
    origins:{id:"lineage",label:"Lignée",options:[{id:"sireless",label:"Sans-Sire"},{id:"noble-blood",label:"Sang noble"},{id:"street-born",label:"Enfant de la rue"}]} } },
  { id:"moonborn", name:"Moonborn", color:"slate", emoji:"🌕", summary:"Clans shapeshifters, cycles lunaires, rites tribaux et territoires.", tags:["loups-garous","tribus","lune"], sheet:{ fields: BASE_FIELDS,
    races:[{id:"human",label:"Humain"},{id:"wolfkin",label:"Lupin"}], classes:[{id:"warden",label:"Gardien·ne"},{id:"howler",label:"Hurleur·se"},{id:"stalker",label:"Traqueur·se"}],
    origins:{id:"totem",label:"Totem",options:[{id:"fang",label:"Croc"},{id:"shadow",label:"Ombre"},{id:"storm",label:"Tempête"}]} } },
  { id:"awakened", name:"The Awakened", color:"indigo", emoji:"✨", summary:"Occultistes éveillés, paradoxes, traditions rivales et cabales.", tags:["magie","occultisme","cabal"], sheet:{ fields: BASE_FIELDS,
    races:[{id:"sleeper",label:"Dormeur·se"},{id:"mage",label:"Mage éveillé·e"}], classes:[{id:"thaumaturge",label:"Thaumaturge"},{id:"arcanist",label:"Arcaniste"},{id:"ritualist",label:"Ritualiste"}],
    origins:{id:"path",label:"Voie",options:[{id:"seer",label:"Voyant·e"},{id:"maker",label:"Façonneur·se"},{id:"warden",label:"Veilleur·se"}]} } },
  { id:"veilbound", name:"The Veilbound", color:"violet", emoji:"🕯️", summary:"Esprits, pactes avec l’Au-delà, hantises modernes.", tags:["fantômes","pactes","au-delà"], sheet:{ fields: BASE_FIELDS,
    races:[{id:"mortal",label:"Mortel·le"},{id:"medium",label:"Médium"}], classes:[{id:"binder",label:"Lieuse/Lieur"},{id:"exorcist",label:"Exorciste"},{id:"whisper",label:"Chuchoteur·se"}],
    origins:{id:"bond",label:"Lien voilé",options:[{id:"ancestral",label:"Ancestral"},{id:"mercantile",label:"Mercantile"},{id:"tragic",label:"Tragique"}]} } },
  { id:"dreamshapers", name:"Dreamshapers", color:"pink", emoji:"💤", summary:"Onirisme sombre, architectures de rêve, cauchemars incarnés.", tags:["rêves","cauchemars","onirique"], sheet:{ fields: BASE_FIELDS,
    races:[{id:"sleeper",label:"Dormeur·se"},{id:"oneiric",label:"Onirien·ne"}], classes:[{id:"weaver",label:"Tisseur·se"},{id:"warden",label:"Garde-Rêves"},{id:"harrow",label:"Hanteur·se"}],
    origins:{id:"source",label:"Source",options:[{id:"lucid",label:"Lucide"},{id:"infected",label:"Infecté·e"},{id:"artist",label:"Artiste"}]} } },
  { id:"vigilants", name:"The Vigilants", color:"steel", emoji:"🔦", summary:"Cellules de chasseurs, gadgets artisanaux, conspirations.", tags:["chasseurs","cellules","conspiration"], sheet:{ fields: BASE_FIELDS,
    races:[{id:"human",label:"Humain"}], classes:[{id:"sleuth",label:"Limier·e"},{id:"engineer",label:"Ingénieur·e"},{id:"medic",label:"Soigneur·se"}],
    origins:{id:"cell",label:"Cellule",options:[{id:"church",label:"Chapelle"},{id:"agency",label:"Agence"},{id:"indie",label:"Indépendant·e"}]} } },
];
