// apps/web/config/worlds.ts

// === Types ===
export type SelectOption = { id: string; label: string };

export type Field =
  | { kind: "text";     id: string; label: string; placeholder?: string; required?: boolean }
  | { kind: "select";   id: string; label: string; options: SelectOption[]; required?: boolean }
  | { kind: "textarea"; id: string; label: string; rows?: number };

export type ImageTemplate = {
  basePrompt: string;   // trame de base du monde
  styleHints: string[]; // 3-6 mots-clés visuels
  negative?: string;    // ce qu’on veut éviter
  portrait?: string;    // cadrage conseillé
};

export type World = {
  id: string;
  name: string;
  color: string;
  emoji: string;
  summary: string;
  tags: string[];
  sheet: {
    fields: Field[];
    races: SelectOption[];
    classes: SelectOption[];
    origins: { id: string; label: string; options: SelectOption[] };
-  };
  template?: ImageTemplate;
};

// === Champs communs pour les fiches ===
export const BASE_FIELDS: Field[] = [
  { kind: "text", id: "name", label: "Nom du personnage", required: true, placeholder: "Elora, Korgan…" },
  { kind: "text", id: "concept", label: "Concept", placeholder: "Rôdeur elfique taciturne…" },
  { kind: "select", id: "race", label: "Race", required: true, options: [] },
  { kind: "select", id: "class", label: "Classe", required: true, options: [] },
  { kind: "textarea", id: "bio", label: "Biographie", rows: 4 },
];

// === Mondes Fantasy reliés (style D&D) ===
export const WORLDS: World[] = [
  {
    id: "classic",
    name: "Royaumes & Donjons",
    color: "gold",
    emoji: "🛡️",
    summary: "Héroic fantasy classique : donjons, guildes, royaumes en guerre.",
    tags: ["dungeons", "guilds", "dragons"],
    sheet: {
      fields: BASE_FIELDS,
      races: [
        { id: "human", label: "Humain" },
        { id: "elf", label: "Elfe" },
        { id: "dwarf", label: "Nain" },
        { id: "halfling", label: "Halfelin" },
      ],
      classes: [
        { id: "fighter", label: "Guerrier" },
        { id: "wizard", label: "Magicien" },
        { id: "rogue", label: "Roublard" },
        { id: "cleric", label: "Clerc" },
      ],
      origins: { id: "origin", label: "Origine", options: [
        { id: "noble", label: "Noblesse" },
        { id: "outlander", label: "Hors-la-loi" },
        { id: "acolyte", label: "Acolyte" },
      ] }
    }
  };
  {
    id: "mistlands",
    name: "Terres des Brumes",
    color: "purple",
    emoji: "🕯️",
    summary: "Gothique horrifique à la Ravenloft : brumes, manoirs, seigneurs sombres.",
    tags: ["gothic", "horror", "vampires"],
    sheet: {
      fields: BASE_FIELDS,
      races: [
        { id: "human", label: "Humain" },
        { id: "dhampir", label: "Dhampir" },
        { id: "shadar-kai", label: "Shadar-Kai" },
      ],
      classes: [
        { id: "paladin", label: "Paladin" },
        { id: "warlock", label: "Occultiste" },
        { id: "bard", label: "Barde" },
      ],
      origins: { id: "origin", label: "Origine", options: [
        { id: "survivor", label: "Survivant·e des brumes" },
        { id: "noble-ruin", label: "Noblesse déchue" },
      ], }
    }
  };
  {
    id: "skyforge",
    name: "Cités-Forgerons d’Acier & Vapeur",
    color: "teal",
    emoji: "⚙️",
    summary: "Magitech
},
,{
    id: "nightblood",
    name: "Night of Blood",
    color: "crimson",
    emoji: "🩸",
    summary: "Horreur urbaine : lignées vampiriques, intrigues nocturnes, chasseurs et pactes de sang.",
    tags: ["vampires","nuit","lignées"],
    sheet: {
      fields: BASE_FIELDS,
      races: [
        { id: "human",   label: "Humain" },
        { id: "dhampir", label: "Dhampir" }
      ],
      classes: [
        { id: "predator",  label: "Prédateur" },
        { id: "ancilla",   label: "Ancillaire" },
        { id: "fixer",     label: "Entremetteur·se" }
      ],
      origins: {
        id: "lineage", label: "Lignée", options: [
          { id: "sireless", label: "Sans-Sire" },
          { id: "noble-blood", label: "Sang Noble" },
          { id: "street-born", label: "Enfant de la Rue" }
        ]
      }
    }
  },
{
  id: "moonborn",
  name: "Moonborn",
  color: "slate",
  emoji: "🌕",
  summary: "Clans shapeshifters, cycles lunaires, rites tribaux et guerres de territoire.",
  tags: ["loups-garous","tribus","lune"],
  sheet: {
    fields: BASE_FIELDS,
    races: [
      { id: "human",  label: "Humain" },
      { id: "wolfkin",label: "Lupin" }
    ],
    classes: [
      { id: "warden",  label: "Gardien·ne" },
      { id: "howler",  label: "Hurleur·se" },
      { id: "stalker", label: "Traqueur·se" }
    ],
    origins: {
      id: "totem", label: "Totem", options: [
        { id: "fang",   label: "Croc" },
        { id: "shadow", label: "Ombre" },
        { id: "storm",  label: "Tempête" }
      ]
    }
  }
},

// --- The Awakened ---
{
  id: "awakened",
  name: "The Awakened",
  color: "indigo",
  emoji: "✨",
  summary: "Occultistes éveillés, paradoxes de la réalité, traditions rivales et cabales secrètes.",
  tags: ["magie","occultisme","cabal"],
  sheet: {
    fields: BASE_FIELDS,
    races: [
      { id: "sleeper", label: "Dormeur·se" },
      { id: "mage",    label: "Mage éveillé·e" }
    ],
    classes: [
      { id: "thaumaturge", label: "Thaumaturge" },
      { id: "arcanist",    label: "Arcaniste" },
      { id: "ritualist",   label: "Ritualiste" }
    ],
    origins: {
      id: "path", label: "Voie", options: [
        { id: "seer",   label: "Voyant·e" },
        { id: "maker",  label: "Façonneur·se" },
        { id: "warden", label: "Veilleur·se" }
      ]
    }
  }
},

// --- The Veilbound ---
{
  id: "veilbound",
  name: "The Veilbound",
  color: "violet",
  emoji: "🕯️",
  summary: "Esprits, pactes avec l’Au-delà, hantises modernes et occultes corporatistes.",
  tags: ["fantômes","pactes","au-delà"],
  sheet: {
    fields: BASE_FIELDS,
    races: [
      { id: "mortal",  label: "Mortel·le" },
      { id: "medium",  label: "Médium" }
    ],
    classes: [
      { id: "binder",   label: "Lieuse/Lieur" },
      { id: "exorcist", label: "Exorciste" },
      { id: "whisper",  label: "Chuchoteur·se" }
    ],
    origins: {
      id: "bond", label: "Lien voilé", options: [
        { id: "ancestral", label: "Ancestral" },
        { id: "mercantile",label: "Mercantile" },
        { id: "tragic",    label: "Tragique" }
      ]
    }
  }
},

// --- Dreamshapers ---
{
  id: "dreamshapers",
  name: "Dreamshapers",
  color: "pink",
  emoji: "💤",
  summary: "Onirisme sombre, architectures de rêve, cauchemars incarnés et frayeurs surréalistes.",
  tags: ["rêves","cauchemars","onirique"],
  sheet: {
    fields: BASE_FIELDS,
    races: [
      { id: "sleeper", label: "Dormeur·se" },
      { id: "oneiric", label: "Onirien·ne" }
    ],
    classes: [
      { id: "weaver",  label: "Tisseur·se" },
      { id: "warden",  label: "Garde-Rêves" },
      { id: "harrow",  label: "Hanteur·se" }
    ],
    origins: {
      id: "source", label: "Source", options: [
        { id: "lucid",   label: "Lucide" },
        { id: "infected",label: "Infecté·e" },
        { id: "artist",  label: "Artiste" }
      ]
    }
  }
},

// --- The Vigilants ---
{
  id: "vigilants",
  name: "The Vigilants",
  color: "steel",
  emoji: "🔦",
  summary: "Cellules de chasseurs, gadgets artisanaux, conspirations et traques nocturnes.",
  tags: ["chasseurs","cellules","conspiration"],
  sheet: {
    fields: BASE_FIELDS,
    races: [
      { id: "human", label: "Humain" }
    ],
    classes: [
      { id: "sleuth",   label: "Limier·e" },
      { id: "engineer", label: "Ingénieur·e" },
      { id: "medic",    label: "Soigneur·se" }
    ],
    origins: {
      id: "cell", label: "Cellule", options: [
        { id: "church", label: "Chapelle" },
        { id: "agency", label: "Agence" },
        { id: "indie",  label: "Indépendant·e" }
      ]
    }
  }
}
];
