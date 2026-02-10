import { stages } from '../data/stages'
import { getTotalXp } from './xpCalculator'

export function isStageUnlocked(stage, userData) {
  const completed = userData.completedStages || []
  const totalXp = getTotalXp(userData)

  switch (stage.unlock.type) {
    case 'start':
      return true

    case 'stage':
      return completed.includes(stage.unlock.stageId)

    case 'stage+xp':
      return completed.includes(stage.unlock.stageId) && totalXp >= stage.unlock.totalXp

    case 'final':
      return completed.includes(stage.unlock.stageId) && totalXp >= stage.unlock.totalXp

    default:
      return false
  }
}

export function getStageStatus(stage, userData) {
  const completed = userData.completedStages || []
  if (completed.includes(stage.id)) return 'completed'
  if (isStageUnlocked(stage, userData)) return 'available'
  return 'locked'
}

export function getNextAvailableStage(userData) {
  return stages.find((s) => getStageStatus(s, userData) === 'available')
}

export function getJourneyProgress(userData) {
  const completed = (userData.completedStages || []).length
  const total = stages.length
  const maxDistance = Math.max(
    0,
    ...stages
      .filter((s) => (userData.completedStages || []).includes(s.id))
      .map((s) => s.distance)
  )
  return { completed, total, percentage: (completed / total) * 100, maxDistance }
}
