export type StatBlock = {
  level?: number;
  str?: number; dex?: number; con?: number;
  int?: number; wis?: number; cha?: number;
};

export type Appearance = {
  gender?: string; age?: string; species?: string;
  height?: string; build?: string; hair?: string; eyes?: string; skin?: string;
  outfit?: string; colors?: string; notableMarks?: string;
};

export type Equipment = {
  weaponMain?: string; weaponOff?: string;
  armor?: string; accessories?: string;
  pack?: string; other?: string;
};

export type Personality = {
  traits?: string; ideals?: string; bonds?: string; flaws?: string;
};

export type CharacterSheet = {
  world: string;
  name: string;
  concept?: string;
  class?: string;
  origin?: string;
  stats?: StatBlock;
  appearance?: Appearance;
  equipment?: Equipment;
  personality?: Personality;
};

export const DEFAULT_STATS: StatBlock = {
  level: 1, str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10,
};

export const COMMON_FIELDS = {
  stats: [
    { id: "level", label: "Niveau", min: 1, max: 20 },
    { id: "str", label: "FOR" }, { id: "dex", label: "DEX" }, { id: "con", label: "CON" },
    { id: "int", label: "INT" }, { id: "wis", label: "SAG" }, { id: "cha", label: "CHA" },
  ],
  appearance: [
    { id: "gender", label: "Genre" }, { id: "age", label: "Âge" }, { id: "species", label: "Espèce / Race" },
    { id: "height", label: "Taille" }, { id: "build", label: "Carrure" },
    { id: "hair", label: "Cheveux" }, { id: "eyes", label: "Yeux" }, { id: "skin", label: "Peau" },
    { id: "outfit", label: "Tenue" }, { id: "colors", label: "Couleurs dominantes" },
    { id: "notableMarks", label: "Marques / cicatrices / tatouages" },
  ],
  equipment: [
    { id: "weaponMain", label: "Arme principale" },
    { id: "weaponOff", label: "Arme secondaire / bouclier" },
    { id: "armor", label: "Armure" },
    { id: "accessories", label: "Accessoires" },
    { id: "pack", label: "Sac / paquetage" },
    { id: "other", label: "Autre" },
  ],
  personality: [
    { id: "traits", label: "Traits" },
    { id: "ideals", label: "Idéaux" },
    { id: "bonds", label: "Liens" },
    { id: "flaws", label: "Faiblesses" },
  ],
};
