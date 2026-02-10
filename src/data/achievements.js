import { stages } from './stages'

export const achievements = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Get your first correct answer',
    icon: '🌱',
    reward: 'Sprout Badge',
    condition: { type: 'correctAnswers', value: 1 },
  },
  {
    id: 'seoul-suburbs',
    name: 'Seoul Suburbs Master',
    description: 'Complete the first 4 beginner stages',
    icon: '🏅',
    reward: 'Gyeonggi Medal',
    condition: { type: 'stagesCompleted', stages: ['yangpyeong', 'yeoju', 'icheon', 'gimpo'] },
  },
  {
    id: 'mountain-explorer',
    name: 'Mountain Explorer',
    description: 'Complete Yeongju and Bonghwa stages',
    icon: '🥾',
    reward: 'Hiking Boots',
    condition: { type: 'stagesCompleted', stages: ['yeongju', 'bonghwa'] },
  },
  {
    id: 'southern-pioneer',
    name: 'Southern Pioneer',
    description: 'Complete Naju and Goheung stages',
    icon: '🧭',
    reward: 'Compass of the South',
    condition: { type: 'stagesCompleted', stages: ['naju', 'goheung'] },
  },
  {
    id: 'island-conqueror',
    name: 'Island Conqueror',
    description: 'Complete the final stage at Jeju Gangjeong',
    icon: '🗿',
    reward: 'Legendary Dol Hareubang',
    condition: { type: 'stagesCompleted', stages: ['jeju'] },
  },
  {
    id: 'national-champion',
    name: 'National Champion',
    description: 'Complete all 20 stages',
    icon: '🏆',
    reward: 'Grand Journey Trophy',
    condition: { type: 'allStagesCompleted' },
  },
  {
    id: 'legendary-explorer',
    name: 'Legendary Explorer',
    description: 'Complete all 4 legendary stages',
    icon: '🌟',
    reward: 'Legendary Star',
    condition: { type: 'stagesCompleted', stages: ['samjiyon', 'goseong', 'eunryul', 'dokdo'] },
  },
  {
    id: 'dokdo-guardian',
    name: 'Dokdo Guardian',
    description: 'Reach Dokdo — the easternmost island',
    icon: '🏝️',
    reward: 'Dokdo Flag',
    condition: { type: 'stagesCompleted', stages: ['dokdo'] },
  },
  {
    id: 'dna-doctor',
    name: 'DNA Doctor',
    description: 'Earn 1000 DNA-XP',
    icon: '🧬',
    reward: 'Double Helix Medal',
    condition: { type: 'categoryXp', category: 'dna', value: 1000 },
  },
  {
    id: 'mendel-master',
    name: "Mendel's Disciple",
    description: 'Earn 1000 Mendelian-XP',
    icon: '🫛',
    reward: 'Golden Pea Pod',
    condition: { type: 'categoryXp', category: 'mendelian', value: 1000 },
  },
  {
    id: 'molecular-maven',
    name: 'Molecular Maven',
    description: 'Earn 1000 Molecular-XP',
    icon: '🔬',
    reward: 'Crystal Ribosome',
    condition: { type: 'categoryXp', category: 'molecular', value: 1000 },
  },
  {
    id: 'evolution-elder',
    name: 'Evolution Elder',
    description: 'Earn 1000 Evolution-XP',
    icon: '🌳',
    reward: 'Tree of Life Pendant',
    condition: { type: 'categoryXp', category: 'evolution', value: 1000 },
  },
  {
    id: 'streak-5',
    name: 'On Fire',
    description: 'Get 5 correct answers in a row',
    icon: '🔥',
    reward: 'Flame Streak Badge',
    condition: { type: 'streak', value: 5 },
  },
  {
    id: 'streak-10',
    name: 'Unstoppable',
    description: 'Get 10 correct answers in a row',
    icon: '⚡',
    reward: 'Lightning Streak Badge',
    condition: { type: 'streak', value: 10 },
  },
  {
    id: 'distance-100',
    name: 'First 100km',
    description: 'Travel 100km from Anam',
    icon: '🚶',
    reward: 'Walking Shoes',
    condition: { type: 'distance', value: 100 },
  },
  {
    id: 'distance-300',
    name: 'Cross-Country Traveler',
    description: 'Travel 300km from Anam',
    icon: '🚂',
    reward: 'KTX Pass',
    condition: { type: 'distance', value: 300 },
  },
  {
    id: 'distance-450',
    name: 'Jeju Arrived',
    description: 'Reach Jeju Island (450km from Anam)',
    icon: '✈️',
    reward: 'Boarding Pass to Jeju',
    condition: { type: 'distance', value: 450 },
  },
  {
    id: 'distance-700',
    name: 'Edge of the East',
    description: 'Reach Dokdo (700km from Anam)',
    icon: '🚢',
    reward: 'Dokdo Voyage Medal',
    condition: { type: 'distance', value: 700 },
  },
]

export function checkAchievement(achievement, userData) {
  const { condition } = achievement
  switch (condition.type) {
    case 'correctAnswers':
      return (userData.correctAnswers || 0) >= condition.value
    case 'stagesCompleted':
      return condition.stages.every((s) => (userData.completedStages || []).includes(s))
    case 'allStagesCompleted':
      return (userData.completedStages || []).length >= stages.length
    case 'categoryXp':
      return (userData[`${condition.category}Xp`] || 0) >= condition.value
    case 'streak':
      return (userData.bestStreak || 0) >= condition.value
    case 'distance':
      return (userData.totalDistance || 0) >= condition.value
    default:
      return false
  }
}
