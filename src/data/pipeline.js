// Demo content for the <granvaya-pipeline> animation. Stories mirror the sample copy used in
// the hero clipping. Swap for real seeded nodes when the graph API exists — the layout
// re-solves itself from this data.

export const TREE = [
  { paper: 'GS 1', heads: [
    { name: 'Geography · Resources', leaves: [
      { id: 'crit',  label: 'Critical Minerals Supply Chain', adden: 2 }]},
    { name: 'History · Indian Culture', leaves: [
      { id: 'indus', label: 'Indus Script – Decipherment',    adden: 1 },
      { id: 'gi',    label: 'GI Tags – Handicrafts',          adden: 0, preset: false }], more: 4 }
  ]},
  { paper: 'GS 2', heads: [
    { name: 'Polity · Constitution', leaves: [
      { id: 'priv',   label: 'Right to Privacy – Evolution',  adden: 3 }]},
    { name: 'Polity · Elections', leaves: [
      { id: 'caste',  label: 'Caste Census',                  adden: 2 }]},
    { name: 'Intl. Relations', leaves: [
      { id: 'ijp',    label: 'India – Japan',                 adden: 1 },
      { id: 'ieu',    label: 'India – EU Trade Talks',        adden: 0, preset: false }], more: 9 }
  ]},
  { paper: 'GS 3', heads: [
    { name: 'Economy · Macroeconomics', leaves: [
      { id: 'loan',   label: 'Loan Pricing – Ext. Benchmark', adden: 0, preset: false },
      { id: 'fiscal', label: 'Fiscal Deficit Target',         adden: 1 }]},
    { name: 'Environment · Coasts', leaves: [
      { id: 'ramsar', label: 'Ramsar Sites – 2026',           adden: 2 },
      { id: 'crz',    label: 'Coastal Regulation Zone',       adden: 0, preset: false }]},
    { name: 'Science & Technology', leaves: [
      { id: 'aisec',  label: 'AI in Internal Security',       adden: 0, preset: false },
      { id: 'rlv',    label: 'RLV Programme',                 adden: 0, preset: false }], more: 12 }
  ]},
  { paper: 'GS 4', heads: [
    { name: 'Ethics · Applied', leaves: [
      { id: 'algo',   label: 'Algorithmic Governance',        adden: 1 }], more: 3 }
  ]}
];

export const KEEP = [
  { src:'THE INDIAN EXPRESS · p.13', hl:'RBI proposes new loan interest-rate framework',
    kind:'fresh',    note:'Loan Pricing – Ext. Benchmark', gs:'GS 3 · ECONOMY',      node:'loan',   links:['fiscal'] },
  { src:'THE HINDU · p.1', hl:'Coastal Regulation Zone rules revised',
    kind:'fresh',    note:'Coastal Regulation Zone',       gs:'GS 3 · ENVIRONMENT',  node:'crz',    links:['ramsar'] },
  { src:'PIB', hl:'Two new wetlands added to the Ramsar list',
    kind:'addendum', note:'Ramsar Sites – 2026',           gs:'GS 3 · ENVIRONMENT',  node:'ramsar', links:['crit','crz'] },
  { src:'THE HINDU · p.9', hl:'Supreme Court reads Article 21 into new privacy rules',
    kind:'merge',    note:'Right to Privacy – Evolution',  gs:'GS 2 · POLITY',       node:'priv',   links:['algo','caste'] },
  { src:'PIB', hl:'New round of India–EU trade talks',
    kind:'addendum', note:'India – EU Trade Talks',        gs:'GS 2 · INTL. RELATIONS', node:'ieu', links:['loan','ijp'] },
  { src:'THE HINDU · p.6', hl:'GI tag sought for a Kutch handicraft',
    kind:'fresh',    note:'GI Tags – Handicrafts',         gs:'GS 1 · CULTURE',      node:'gi',     links:['indus'] },
  { src:'EDITORIAL', hl:'Should algorithms decide welfare eligibility?',
    kind:'addendum', note:'Algorithmic Governance',        gs:'GS 4 · ETHICS',       node:'algo',   links:['priv'] }
];

export const JUNK = [
  { src:'SPORT · p.14', hl:'India win the third one-day by six wickets' },
  { src:'CITY · p.5',   hl:'Actor spotted at airport, fans gather' },
  { src:'MARKETS',      hl:'Sensex closes 212 points higher' },
  { src:'NATION · p.7', hl:'Leader calls rival remark "unfortunate"' }
];

// t:'k' = a story worth noting, t:'j' = junk that gets dropped
export const ORDER = [ {t:'k',i:0},{t:'j',i:0},{t:'k',i:1},{t:'k',i:2},{t:'j',i:1},{t:'k',i:3},
                       {t:'k',i:4},{t:'j',i:2},{t:'k',i:5},{t:'k',i:6},{t:'j',i:3} ];
