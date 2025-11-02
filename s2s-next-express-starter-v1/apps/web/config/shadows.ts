// config/shadows.ts
import type { World, Field, SelectOption } from "./worlds";

// Champs communs (on réutilise la même convention que ton pack Fantasy/Galactic)
const BASE_FIELDS: Field[] = [
  { kind: "text", id: "name", label: "Nom", required: true, placeholder: "Ex.: Seraphine Noir" },
  { kind: "textarea", id: "concept", label: "Concept", rows: 3, placeholder: "Bref concept de perso…" },
];

// ------ Night of Blood (Vampires) ------
const NOB_CLANS: SelectOption[] = [
  { id: "ancilla", label: "Ancilla" },
  { id: "doyen", label: "Doyen" },
  { id: "neonate", label: "Néonate" },
  { id: "dracul", label: "Lignée Dracul" },
  { id: "noctis", label: "Lignée Noctis" },
];

const NOB_ROLES: SelectOption[] = [
  { id: "duelist", label: "Duelliste" },
  { id: "schemer", label: "Manœuvrier" },
  { id: "stalker", label: "Traqueur" },
  { id: "raconteur", label: "Raconteur" },
];

const worldNightOfBlood: World = {
  id: "night-of-blood",
  name: "Night of Blood",
  color: "#7b1e1e",
  emoji: "🩸",
  summary: "Gothique urbain : lignée, soif, mascarade du sang.",
  tags: ["vampires", "gothique", "urbain"],
  addons: ["characters", "factions", "quests"],
  sheet: {
    label: "Fiche — Night of Blood",
    fields: BASE_FIELDS,
    races: NOB_CLANS,
    classes: NOB_ROLES,
    origins: [
      { id: "camarilla", label: "Cité de Cour" },
      { id: "anarch", label: "Zone Anarch" },
      { id: "rogue", label: "Indépendant" },
    ],
  },
  template: {
    basePrompt: "moody gothic urban vampire portrait, neon reflections, rain, alley",
    styleHints: ["noir", "neon", "rain", "city night", "pale skin", "fangs subtle"],
    negative: "cartoonish, medieval armor, lowres, extra fingers",
    portrait: "portrait, bust, chiaroscuro lighting, eye highlight",
  },
};

// ------ Moonborn (Loups-garous) ------
const MB_TRIBES: SelectOption[] = [
  { id: "stormfang", label: "Crocs d’Orage" },
  { id: "wildheart", label: "Cœur-Sauvage" },
  { id: "ironpack", label: "Meute de Fer" },
];

const MB_ROLES: SelectOption[] = [
  { id: "alpha", label: "Alpha" },
  { id: "tracker", label: "Pistard" },
  { id: "spirit-talker", label: "Parleur aux esprits" },
];

const worldMoonborn: World = {
  id: "moonborn",
  name: "Moonborn",
  color: "#445566",
  emoji: "🌕",
  summary: "Rage, meutes et esprits sous la lune froide.",
  tags: ["loups-garous", "esprits", "meutes"],
  addons: ["characters", "monsters", "quests", "factions"],
  sheet: {
    label: "Fiche — Moonborn",
    fields: BASE_FIELDS,
    races: MB_TRIBES,
    classes: MB_ROLES,
    origins: [
      { id: "wilderness", label: "Étendues sauvages" },
      { id: "mountain", label: "Montagnes" },
      { id: "urban-fringe", label: "Frange urbaine" },
    ],
  },
  template: {
    basePrompt: "feral werewolf portrait, forest at night, mist, silver moon, primal gaze",
    styleHints: ["fur detail", "mist", "moonlight", "claw scars"],
    negative: "sci-fi, glossy armor",
    portrait: "waist-up, dynamic pose, rim light",
  },
};

// ------ The Awakened (Mages) ------
const AW_PATHS: SelectOption[] = [
  { id: "arcanist", label: "Arcaniste" },
  { id: "technomancer", label: "Technomancien" },
  { id: "seer", label: "Voyant" },
];

const AW_ROLES: SelectOption[] = [
  { id: "ritualist", label: "Ritualiste" },
  { id: "dualist", label: "Dueliste arcanique" },
  { id: "scribe", label: "Scribe du Voile" },
];

const worldAwakened: World = {
  id: "the-awakened",
  name: "The Awakened",
  color: "#5b2da3",
  emoji: "🔮",
  summary: "Traditions occultes, paradigmes et voiles de réalité.",
  tags: ["mages", "occultisme", "paradigmes"],
  addons: ["characters", "quests", "factions"],
  sheet: {
    label: "Fiche — The Awakened",
    fields: BASE_FIELDS,
    races: AW_PATHS,
    classes: AW_ROLES,
    origins: [
      { id: "conclave", label: "Conclave" },
      { id: "lodge", label: "Loge secrète" },
      { id: "solo", label: "Solitaire éveillé" },
    ],
  },
  template: {
    basePrompt: "mystic mage portrait, floating sigils, arcane light, ancient tomes, runes",
    styleHints: ["sigils", "glow", "runes", "aether dust"],
    negative: "grim gore, lowres",
    portrait: "portrait, hands casting, runic overlay",
  },
};

// ------ The Veilbound (Fantômes) ------
const VB_BINDINGS: SelectOption[] = [
  { id: "anchor-ward", label: "Ancre — Gardien" },
  { id: "anchor-mourn", label: "Ancre — Deuil" },
  { id: "anchor-revenge", label: "Ancre — Vengeance" },
];

const VB_ROLES: SelectOption[] = [
  { id: "psycho-pomp", label: "Psychopompe" },
  { id: "haunter", label: "Hanteur" },
  { id: "whisperer", label: "Murmure" },
];

const worldVeilbound: World = {
  id: "the-veilbound",
  name: "The Veilbound",
  color: "#52606d",
  emoji: "🪦",
  summary: "Passions et chaînes de l’oubli — royaumes d’ombres.",
  tags: ["fantômes", "au-delà", "oblivion"],
  addons: ["characters", "quests", "factions"],
  sheet: {
    label: "Fiche — The Veilbound",
    fields: BASE_FIELDS,
    races: VB_BINDINGS,
    classes: VB_ROLES,
    origins: [
      { id: "sepulcher", label: "Sépulcre" },
      { id: "forgotten-hall", label: "Salle Oubliée" },
      { id: "threshold", label: "Seuil" },
    ],
  },
  template: {
    basePrompt: "ethereal ghostly portrait, soft translucence, candle smoke, old mausoleum",
    styleHints: ["translucent", "pale glow", "dust motes"],
    negative: "cartoon, heavy saturation",
    portrait: "portrait, soft edges, shallow depth of field",
  },
};

// ------ Dreamshapers (Fées) ------
const DS_KINDS: SelectOption[] = [
  { id: "sidhe", label: "Sidhe" },
  { id: "satyr", label: "Satyre" },
  { id: "troll", label: "Troll" },
  { id: "redcap", label: "Redcap" },
];

const DS_ROLES: SelectOption[] = [
  { id: "courtly", label: "Corteur" },
  { id: "wildling", label: "Sauvageon" },
  { id: "weaver", label: "Tisseur de rêves" },
];

const worldDreamshapers: World = {
  id: "dreamshapers",
  name: "Dreamshapers",
  color: "#0ea5e9",
  emoji: "🪄",
  summary: "Royaumes oniriques, cours féeriques et chimères.",
  tags: ["fées", "rêves", "onirique"],
  addons: ["characters", "quests", "factions", "maps"],
  sheet: {
    label: "Fiche — Dreamshapers",
    fields: BASE_FIELDS,
    races: DS_KINDS,
    classes: DS_ROLES,
    origins: [
      { id: "seelie", label: "Cour Seelie" },
      { id: "unseelie", label: "Cour Unseelie" },
      { id: "mortal", label: "Né mortel" },
    ],
  },
  template: {
    basePrompt: "whimsical fae portrait, bioluminescent forest, delicate leaves, ethereal light",
    styleHints: ["bokeh", "bioluminescence", "delicate", "soft glow"],
    negative: "grimdark, hard sci-fi",
    portrait: "portrait, wreath, soft smile",
  },
};

// ------ The Vigilants (Chasseurs) ------
const VG_CELLS: SelectOption[] = [
  { id: "lone", label: "Vigile solitaire" },
  { id: "cell", label: "Cellule locale" },
  { id: "order", label: "Ordre clandestin" },
];

const VG_ROLES: SelectOption[] = [
  { id: "investigator", label: "Enquêteur" },
  { id: "cleaner", label: "Nettoyeur" },
  { id: "operator", label: "Opérateur" },
];

const worldVigilants: World = {
  id: "the-vigilants",
  name: "The Vigilants",
  color: "#1d7fbf",
  emoji: "🕵️‍♂️",
  summary: "Chasseurs de l’occulte, cellules et conspirations.",
  tags: ["chasseurs", "conspirations", "urbain"],
  addons: ["characters", "quests", "factions", "weapons"],
  sheet: {
    label: "Fiche — The Vigilants",
    fields: BASE_FIELDS,
    races: VG_CELLS,
    classes: VG_ROLES,
    origins: [
      { id: "metro", label: "Zone métropolitaine" },
      { id: "industrial", label: "Zone industrielle" },
      { id: "rural", label: "Campagne" },
    ],
  },
  template: {
    basePrompt: "neo-noir hunter portrait, rain-slick streets, trench coat, tungsten streetlights",
    styleHints: ["noir", "grain", "street lamps", "shadowed eyes"],
    negative: "fantasy armor, high saturation",
    portrait: "portrait, coat collar up, rain droplets",
  },
};

export const SHADOWS_WORLDS: World[] = [
  worldNightOfBlood,
  worldMoonborn,
  worldAwakened,
  worldVeilbound,
  worldDreamshapers,
  worldVigilants,
];
