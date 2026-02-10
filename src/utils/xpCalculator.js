import { getCurrentCharacter, CATEGORIES } from '../data/characters'
import { getCompanionById } from '../data/companions'

// Level formula: Level n requires 100 * n^1.5 total XP
export function getTotalXpForLevel(level) {
  if (level <= 1) return 0
  return Math.floor(100 * Math.pow(level, 1.5))
}

export function getLevelFromXp(totalXp) {
  let level = 1
  while (getTotalXpForLevel(level + 1) <= totalXp) {
    level++
  }
  return level
}

export function getXpProgress(totalXp) {
  const level = getLevelFromXp(totalXp)
  const currentLevelXp = getTotalXpForLevel(level)
  const nextLevelXp = getTotalXpForLevel(level + 1)
  const xpInLevel = totalXp - currentLevelXp
  const xpNeeded = nextLevelXp - currentLevelXp
  return {
    level,
    currentXp: xpInLevel,
    requiredXp: xpNeeded,
    percentage: Math.min((xpInLevel / xpNeeded) * 100, 100),
    totalXp,
  }
}

// Calculate XP earned for a correct answer with bonuses
export function calculateXpEarned(baseXp, category, userData) {
  let multiplier = 1.0

  // Character specialization bonus (+30%)
  if (userData.character) {
    const char = getCurrentCharacter(userData)
    if (char && char.category === category) {
      multiplier += CATEGORIES[category].bonus
    }
  }

  // Companion bonuses
  const equipped = userData.equippedCompanions || {}
  for (const slot of ['animal', 'aquatic', 'insect']) {
    if (equipped[slot]) {
      const comp = getCompanionById(equipped[slot])
      if (!comp) continue
      const eff = comp.effect
      if (eff.type === 'categoryXpBonus' && eff.category === category) {
        multiplier += eff.value
      }
      if (eff.type === 'allXpBonus') {
        multiplier += eff.value
      }
      if (eff.type === 'allStatsBonus') {
        multiplier += eff.value
      }
      if (eff.type === 'xpAndStageBonus') {
        multiplier += eff.xpBonus
      }
      if (eff.type === 'allXpAndPenalty') {
        multiplier += eff.xpBonus
      }
      if (eff.type === 'allXpAndDaily') {
        multiplier += eff.xpBonus
      }
    }
  }

  return Math.floor(baseXp * multiplier)
}

// Combo bonus XP
export function getComboBonus(streak) {
  if (streak >= 10) return 50
  if (streak >= 5) return 25
  if (streak >= 3) return 10
  return 0
}

// Get total XP across all categories
export function getTotalXp(userData) {
  return (
    (userData.dnaXp || 0) +
    (userData.mendelianXp || 0) +
    (userData.molecularXp || 0) +
    (userData.evolutionXp || 0)
  )
}

// Category XP field name
export function getCategoryXpField(category) {
  return `${category}Xp`
}
