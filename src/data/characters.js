// Inline level/XP math to avoid circular dependency with xpCalculator
function _getTotalXpForLevel(level) {
  if (level <= 1) return 0
  return Math.floor(100 * Math.pow(level, 1.5))
}

function _getLevelFromXp(totalXp) {
  let level = 1
  while (_getTotalXpForLevel(level + 1) <= totalXp) level++
  return level
}

function _getTotalXp(u) {
  return (u.dnaXp || 0) + (u.mendelianXp || 0) + (u.molecularXp || 0) + (u.evolutionXp || 0)
}

export const CATEGORIES = {
  dna: { id: 'dna', name: 'DNA Specialist', color: 'emerald', bonus: 0.3 },
  mendelian: { id: 'mendelian', name: 'Mendelian Genetics Expert', color: 'violet', bonus: 0.3 },
  molecular: { id: 'molecular', name: 'Molecular Biology Master', color: 'sky', bonus: 0.3 },
  evolution: { id: 'evolution', name: 'Evolution Scientist', color: 'amber', bonus: 0.3 },
}

export const RARITY = {
  3: { label: 'Uncommon', stars: 3, color: 'text-green-500' },
  4: { label: 'Rare', stars: 4, color: 'text-purple-500' },
  5: { label: 'Legendary', stars: 5, color: 'text-yellow-500' },
}

// ── Seeds (ATGC theme) ──
export const SEEDS = [
  { id: 'red-seed', base: 'Thymine', emoji: '🔴', name: 'Seed T', korean: '붉은 씨앗', concept: 'DNA의 비밀을 품은 씨앗', category: 'dna', color: '#EF4444' },
  { id: 'yellow-seed', base: 'Guanine', emoji: '🟡', name: 'Seed G', korean: '노란 씨앗', concept: '유전의 법칙을 품은 씨앗', category: 'mendelian', color: '#EAB308' },
  { id: 'blue-seed', base: 'Cytosine', emoji: '🔵', name: 'Seed C', korean: '파란 씨앗', concept: '분자의 신비를 품은 씨앗', category: 'molecular', color: '#3B82F6' },
  { id: 'green-seed', base: 'Adenine', emoji: '🟢', name: 'Seed A', korean: '녹색 씨앗', concept: '진화의 꿈을 품은 씨앗', category: 'evolution', color: '#22C55E' },
]

export const SEED_IDS = SEEDS.map((s) => s.id)

export const EVOLUTION_LEVELS = [3, 7, 12, 18, 25]

// Each seed evolves through 5 plant forms (ordered herb → flower → tree)
export const EVOLUTION_LINEAGES = {
  dna: [
    { level: 3, characterId: 'hallan' },
    { level: 7, characterId: 'gwangneung-yogangkkot' },
    { level: 12, characterId: 'bokjumeoni-ran' },
    { level: 18, characterId: 'miseon-namu' },
    { level: 25, characterId: 'gusang-namu' },
  ],
  mendelian: [
    { level: 3, characterId: 'halla-songipul' },
    { level: 7, characterId: 'jeju-gosari-sam' },
    { level: 12, characterId: 'ulleung-gukhwa' },
    { level: 18, characterId: 'seom-gaeyagwang-namu' },
    { level: 25, characterId: 'ulleung-solsong-namu' },
  ],
  molecular: [
    { level: 3, characterId: 'seom-siho' },
    { level: 7, characterId: 'ganeun-doljjeogwi' },
    { level: 12, characterId: 'geumgang-bommaji' },
    { level: 18, characterId: 'halla-somdari' },
    { level: 25, characterId: 'jeju-baekseohyang' },
  ],
  evolution: [
    { level: 3, characterId: 'hangyeryeong-pul' },
    { level: 7, characterId: 'seom-malnari' },
    { level: 12, characterId: 'wang-eunbangulkkot' },
    { level: 18, characterId: 'seppul-tugukkkot' },
    { level: 25, characterId: 'nado-pungnan' },
  ],
}

export const characters = [
  // ── DNA Specialists ──
  {
    id: 'gusang-namu',
    name: 'Gusang-namu',
    korean: '구상나무',
    english: 'Korean Fir',
    category: 'dna',
    trait: 'Ancient Genome Guardian',
    startingBonus: 15,
    uniqueItem: 'Fir Cone Sequencer',
    rarity: 5,
    colors: ['#1B5E20', '#B0BEC5'],
    emoji: '🌲',
    description: 'An endemic species found only on high Korean mountains like Hallasan and Jirisan. Threatened by climate change, it guards ancient genetic knowledge.',
  },
  {
    id: 'miseon-namu',
    name: 'Miseon-namu',
    korean: '미선나무',
    english: 'Korean Abeliophyllum',
    category: 'dna',
    trait: 'DNA Repair Specialist',
    startingBonus: 12,
    uniqueItem: 'Petal Replicator',
    rarity: 4,
    colors: ['#FFFFFF', '#FDD835'],
    emoji: '🌸',
    description: 'Korea\'s only monotypic genus. This living fossil blooms white flowers in early spring and is a natural monument.',
  },
  {
    id: 'bokjumeoni-ran',
    name: 'Bokjumeoni-ran',
    korean: '복주머니란',
    english: 'Korean Lady\'s Slipper',
    category: 'dna',
    trait: 'Chromatin Architect',
    startingBonus: 18,
    uniqueItem: 'Slipper Chromosome',
    rarity: 4,
    colors: ['#9C27B0', '#E91E63'],
    emoji: '👛',
    description: 'A critically endangered orchid with a unique slipper-shaped labellum. Its complex genome holds secrets of chromatin organization.',
  },
  {
    id: 'gwangneung-yogangkkot',
    name: 'Gwangneung-yogangkkot',
    korean: '광릉요강꽃',
    english: 'Cypripedium japonicum',
    category: 'dna',
    trait: 'Nucleotide Master',
    startingBonus: 14,
    uniqueItem: 'Royal DNA Scroll',
    rarity: 3,
    colors: ['#F9A825', '#795548'],
    emoji: '🏺',
    description: 'Found in Gwangneung Forest near Seoul, this orchid is protected as Natural Monument No. 224. A master of nucleotide sequences.',
  },
  {
    id: 'hallan',
    name: 'Hallan',
    korean: '한란',
    english: 'Korean Cymbidium',
    category: 'dna',
    trait: 'Base Pair Perfectionist',
    startingBonus: 16,
    uniqueItem: 'Orchid Helix',
    rarity: 3,
    colors: ['#2E7D32', '#FFFFFF'],
    emoji: '🌿',
    description: 'A graceful orchid native to Jeju Island. Natural Monument No. 432, known for its perfect symmetry mirroring base pair precision.',
  },

  // ── Mendelian Genetics Experts ──
  {
    id: 'jeju-gosari-sam',
    name: 'Jeju-gosari-sam',
    korean: '제주고사리삼',
    english: 'Jeju Mankyua',
    category: 'mendelian',
    trait: 'Inheritance Pattern Decoder',
    startingBonus: 15,
    uniqueItem: 'Fern Punnett Square',
    rarity: 3,
    colors: ['#1B5E20', '#1B5E20'],
    emoji: '🌱',
    description: 'An extremely rare fern genus endemic to Jeju Island. With only a few hundred individuals, it decodes inheritance patterns from its ancient lineage.',
  },
  {
    id: 'seom-gaeyagwang-namu',
    name: 'Seom-gaeyagwang-namu',
    korean: '섬개야광나무',
    english: 'Island Mallotus',
    category: 'mendelian',
    trait: 'Dominant Trait Amplifier',
    startingBonus: 13,
    uniqueItem: 'Glowing Allele Gem',
    rarity: 4,
    colors: ['#7CB342', '#FDD835'],
    emoji: '✨',
    description: 'A small tree found on Korean islands. Its bioluminescent-like berries symbolize the way dominant traits express themselves clearly.',
  },
  {
    id: 'halla-songipul',
    name: 'Halla-songipul',
    korean: '한라송이풀',
    english: 'Halla Pedicularis',
    category: 'mendelian',
    trait: 'Pedigree Analyst',
    startingBonus: 17,
    uniqueItem: 'Mountain Lineage Map',
    rarity: 3,
    colors: ['#E91E63', '#9C27B0'],
    emoji: '🏔️',
    description: 'Found only on the peaks of Hallasan, this alpine flower traces its lineage through generations of mountain adaptation.',
  },
  {
    id: 'ulleung-solsong-namu',
    name: 'Ulleung-solsong-namu',
    korean: '울릉솔송나무',
    english: 'Ulleung Island Yew',
    category: 'mendelian',
    trait: 'Recombination Specialist',
    startingBonus: 14,
    uniqueItem: 'Island Crossover Chart',
    rarity: 5,
    colors: ['#C62828', '#2E7D32'],
    emoji: '🌲',
    description: 'Endemic to Ulleung Island, this conifer evolved in isolation. Its unique genetic recombination patterns are studied by researchers.',
  },
  {
    id: 'ulleung-gukhwa',
    name: 'Ulleung-gukhwa',
    korean: '울릉국화',
    english: 'Ulleung Chrysanthemum',
    category: 'mendelian',
    trait: 'Segregation Calculator',
    startingBonus: 16,
    uniqueItem: 'Petal Ratio Compass',
    rarity: 4,
    colors: ['#FDD835', '#FFFFFF'],
    emoji: '🌼',
    description: 'An island chrysanthemum whose petal patterns demonstrate Mendel\'s segregation ratios in nature.',
  },

  // ── Molecular Biology Masters ──
  {
    id: 'seom-siho',
    name: 'Seom-siho',
    korean: '섬시호',
    english: 'Island Bupleurum',
    category: 'molecular',
    trait: 'Transcription Enhancer',
    startingBonus: 15,
    uniqueItem: 'mRNA Synthesizer',
    rarity: 3,
    colors: ['#FDD835', '#2E7D32'],
    emoji: '🧪',
    description: 'A medicinal herb from Korean islands. Its compounds enhance cellular transcription processes.',
  },
  {
    id: 'jeju-baekseohyang',
    name: 'Jeju-baekseohyang',
    korean: '제주백서향',
    english: 'Jeju Daphne',
    category: 'molecular',
    trait: 'Translation Optimizer',
    startingBonus: 18,
    uniqueItem: 'Ribosome Crown',
    rarity: 5,
    colors: ['#FFFFFF', '#E91E63'],
    emoji: '👑',
    description: 'A fragrant shrub native to Jeju. Its legendary sweet scent symbolizes optimized protein synthesis.',
  },
  {
    id: 'halla-somdari',
    name: 'Halla-somdari',
    korean: '한라솜다리',
    english: 'Halla Leontopodium',
    category: 'molecular',
    trait: 'Gene Expression Regulator',
    startingBonus: 16,
    uniqueItem: 'Alpine Promoter',
    rarity: 4,
    colors: ['#B0BEC5', '#FFFFFF'],
    emoji: '⛰️',
    description: 'Korea\'s edelweiss, found only on Hallasan summit. Its woolly surface regulates UV response through gene expression.',
  },
  {
    id: 'geumgang-bommaji',
    name: 'Geumgang-bommaji',
    korean: '금강봄맞이',
    english: 'Geumgang Primrose',
    category: 'molecular',
    trait: 'Protein Synthesis Expert',
    startingBonus: 14,
    uniqueItem: 'Spring Codon Wheel',
    rarity: 4,
    colors: ['#FDD835', '#E91E63'],
    emoji: '🌺',
    description: 'A delicate primrose from Geumgangsan. Its spring blooms symbolize the renewal of protein synthesis each season.',
  },
  {
    id: 'ganeun-doljjeogwi',
    name: 'Ganeun-doljjeogwi',
    korean: '가는돌쩌귀',
    english: 'Slender Mukdenia',
    category: 'molecular',
    trait: 'Epigenetic Modifier',
    startingBonus: 13,
    uniqueItem: 'Methylation Marker',
    rarity: 3,
    colors: ['#2E7D32', '#795548'],
    emoji: '🍃',
    description: 'A rock-dwelling herb that modifies its gene expression based on environmental conditions through epigenetic mechanisms.',
  },

  // ── Evolution Scientists ──
  {
    id: 'hangyeryeong-pul',
    name: 'Hangyeryeong-pul',
    korean: '한계령풀',
    english: 'Hangyeryeong Thistle',
    category: 'evolution',
    trait: 'Adaptive Radiation Specialist',
    startingBonus: 15,
    uniqueItem: 'Mountain Pass Compass',
    rarity: 3,
    colors: ['#9C27B0', '#2E7D32'],
    emoji: '🧭',
    description: 'Found at Hangyeryeong Pass in the Taebaek Mountains. Adapted to harsh alpine conditions through rapid radiation.',
  },
  {
    id: 'wang-eunbangulkkot',
    name: 'Wang-eunbangulkkot',
    korean: '왕은방울꽃',
    english: 'King Lily of the Valley',
    category: 'evolution',
    trait: 'Natural Selection Champion',
    startingBonus: 17,
    uniqueItem: 'Royal Evolution Ring',
    rarity: 4,
    colors: ['#FFFFFF', '#2E7D32'],
    emoji: '🔔',
    description: 'A large-flowered variant shaped by natural selection. Its bell-shaped flowers attract specific pollinators.',
  },
  {
    id: 'seppul-tugukkkot',
    name: 'Seppul-tugukkkot',
    korean: '세뿔투구꽃',
    english: 'Three-horned Monkshood',
    category: 'evolution',
    trait: 'Speciation Expert',
    startingBonus: 16,
    uniqueItem: 'Trident Phylogeny',
    rarity: 4,
    colors: ['#1565C0', '#9C27B0'],
    emoji: '🔱',
    description: 'A toxic alpine plant with three distinctive horn-like petals. Its speciation history reveals evolution in action.',
  },
  {
    id: 'seom-malnari',
    name: 'Seom-malnari',
    korean: '섬말나리',
    english: 'Island Trumpet Lily',
    category: 'evolution',
    trait: 'Genetic Drift Navigator',
    startingBonus: 14,
    uniqueItem: 'Isolation Flower',
    rarity: 3,
    colors: ['#E65100', '#FDD835'],
    emoji: '🎺',
    description: 'A trumpet-shaped lily from Ulleung Island. Its small island population is a textbook case of genetic drift.',
  },
  {
    id: 'nado-pungnan',
    name: 'Nado-pungnan',
    korean: '나도풍란',
    english: 'Korean Wind Orchid',
    category: 'evolution',
    trait: 'Population Genetics Sage',
    startingBonus: 18,
    uniqueItem: 'Wind-Carried Alleles',
    rarity: 5,
    colors: ['#FFFFFF', '#2E7D32'],
    emoji: '🌬️',
    description: 'An epiphytic orchid that disperses via wind. Natural Monument No. 239, it embodies the flow of alleles through populations.',
  },
]

export function getCharacterById(id) {
  return characters.find((c) => c.id === id)
}

export function getCharactersByCategory(category) {
  return characters.filter((c) => c.category === category)
}

export function getSeedById(id) {
  return SEEDS.find((s) => s.id === id)
}

// Compute the current evolved form from seed + level
export function getCurrentCharacter(userProfile) {
  if (!userProfile?.character) return null

  const seed = getSeedById(userProfile.character)
  if (!seed) {
    // Legacy user: character is a direct character ID
    return getCharacterById(userProfile.character)
  }

  const level = _getLevelFromXp(_getTotalXp(userProfile))
  const lineage = EVOLUTION_LINEAGES[seed.category]

  // Find highest unlocked evolution
  let current = null
  for (const evo of lineage) {
    if (level >= evo.level) {
      current = evo
    }
  }

  if (!current) {
    // Level < 3: still a seed
    return { id: seed.id, emoji: seed.emoji, name: seed.name, korean: seed.korean, category: seed.category, rarity: 1 }
  }

  return getCharacterById(current.characterId)
}

// Get the next evolution info (or null if maxed)
export function getNextEvolution(userProfile) {
  if (!userProfile?.character) return null

  const seed = getSeedById(userProfile.character)
  if (!seed) return null

  const level = _getLevelFromXp(_getTotalXp(userProfile))
  const lineage = EVOLUTION_LINEAGES[seed.category]

  for (const evo of lineage) {
    if (level < evo.level) {
      return { level: evo.level, character: getCharacterById(evo.characterId) }
    }
  }
  return null
}

// Get full evolution lineage for a seed
export function getEvolutionLineage(seedId) {
  const seed = getSeedById(seedId)
  if (!seed) return []
  return EVOLUTION_LINEAGES[seed.category].map((evo) => ({
    level: evo.level,
    character: getCharacterById(evo.characterId),
  }))
}

// Check if a level crosses an evolution threshold, return old→new character info
export function checkEvolution(seedId, oldLevel, newLevel) {
  const seed = getSeedById(seedId)
  if (!seed) return null

  const lineage = EVOLUTION_LINEAGES[seed.category]

  for (const evo of lineage) {
    if (oldLevel < evo.level && newLevel >= evo.level) {
      // Find the previous form
      const evoIdx = lineage.indexOf(evo)
      const oldForm = evoIdx > 0
        ? getCharacterById(lineage[evoIdx - 1].characterId)
        : { id: seed.id, emoji: seed.emoji, name: seed.name, korean: seed.korean }
      const newForm = getCharacterById(evo.characterId)
      return { oldForm, newForm, stage: evoIdx + 1 }
    }
  }
  return null
}
