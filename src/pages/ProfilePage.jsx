import { useAuth } from '../contexts/AuthContext'
import { getCurrentCharacter, getEvolutionLineage, getSeedById, CATEGORIES, RARITY } from '../data/characters'
import { getXpProgress, getTotalXp } from '../utils/xpCalculator'
import { getJourneyProgress } from '../utils/stageUnlock'
import { achievements, checkAchievement } from '../data/achievements'
import StatsRadar from '../components/profile/StatsRadar'
import Equipment from '../components/profile/Equipment'
import Inventory from '../components/profile/Inventory'
import SpriteImg from '../components/common/SpriteImg'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const { userProfile, updateProfile } = useAuth()
  if (!userProfile) return null

  const char = getCurrentCharacter(userProfile)
  const seed = getSeedById(userProfile.character)
  const lineage = seed ? getEvolutionLineage(seed.id) : []
  const totalXp = getTotalXp(userProfile)
  const progress = getXpProgress(totalXp)
  const journey = getJourneyProgress(userProfile)

  const earned = achievements.filter((a) => checkAchievement(a, userProfile))
  const locked = achievements.filter((a) => !checkAchievement(a, userProfile))

  async function handleEquip(slot, companionId) {
    const newEquipped = { ...userProfile.equippedCompanions, [slot]: companionId }
    await updateProfile({ equippedCompanions: newEquipped })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Character Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-4 mb-4">
              <SpriteImg id={char?.id} size="2xl" />
              <div>
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <p className="text-gray-500">{char?.name} — {char?.korean}</p>
                <p className="text-sm text-gray-400">Student ID: {userProfile.studentId}</p>
                <p className="text-xs mt-1">
                  <span className="bg-crimson-100 text-crimson-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    {CATEGORIES[char?.category]?.name}
                  </span>
                </p>
              </div>
            </div>

            {/* Level */}
            <div className="bg-gradient-to-r from-crimson-800 to-crimson-950 rounded-xl p-4 text-white mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm opacity-80">Level</span>
                <span className="text-4xl font-extrabold">{progress.level}</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 mb-1">
                <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
              </div>
              <div className="flex justify-between text-xs opacity-80">
                <span>{progress.currentXp} / {progress.requiredXp} XP</span>
                <span>Total: {totalXp} XP</span>
              </div>
            </div>

            {/* Journey */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Journey: Anam → Dokdo</span>
                <span className="font-bold text-crimson-800">{journey.completed}/{journey.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-crimson-700 h-2 rounded-full" style={{ width: `${journey.percentage}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Distance traveled: {journey.maxDistance}km from Anam</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-blue-50 rounded-lg p-2">
                <p className="font-bold text-blue-600">{userProfile.correctAnswers || 0}</p>
                <p className="text-xs text-gray-500">Correct</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-2">
                <p className="font-bold text-purple-600">{userProfile.bestStreak || 0}</p>
                <p className="text-xs text-gray-500">Best Streak</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-2">
                <p className="font-bold text-orange-600">{(userProfile.companions || []).length}</p>
                <p className="text-xs text-gray-500">Companions</p>
              </div>
            </div>

            {/* Evolution Timeline */}
            {lineage.length > 0 && (
              <div className="mt-4 bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Evolution Timeline</h3>
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {/* Seed */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 overflow-hidden ${
                      progress.level < 3 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-white'
                    }`}>
                      <SpriteImg id={seed.id} size={32} />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-0.5">Seed</span>
                  </div>
                  {lineage.map((evo, i) => {
                    const unlocked = progress.level >= evo.level
                    const isCurrent = char?.id === evo.character.id
                    return (
                      <div key={i} className="flex items-center gap-1 shrink-0">
                        <span className="text-gray-300 text-xs">&rarr;</span>
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 overflow-hidden ${
                            isCurrent ? 'border-yellow-400 bg-yellow-50' : unlocked ? 'border-crimson-300 bg-crimson-50' : 'border-gray-200 bg-gray-100 opacity-50'
                          }`}>
                            {unlocked ? <SpriteImg id={evo.character.id} size={32} /> : '?'}
                          </div>
                          <span className="text-[10px] text-gray-400 mt-0.5">Lv.{evo.level}</span>
                          {unlocked && (
                            <span className={`text-[10px] ${RARITY[evo.character.rarity]?.color}`}>
                              {'★'.repeat(evo.character.rarity)}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Stats Radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-gray-800 mb-4">Specialization Stats</h3>
            <StatsRadar userData={userProfile} />
            <div className="mt-4">
              <Equipment equipped={userProfile.equippedCompanions} inventory={userProfile.companions} onEquip={handleEquip} />
            </div>
          </motion.div>
        </div>

        {/* Inventory */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow p-6 mt-6">
          <h3 className="font-bold text-gray-800 mb-4">Companion Collection</h3>
          <Inventory items={userProfile.companions} />
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow p-6 mt-6">
          <h3 className="font-bold text-gray-800 mb-4">Achievements ({earned.length}/{achievements.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {earned.map((a) => (
              <div key={a.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
                <span className="text-2xl">{a.icon}</span>
                <p className="text-xs font-medium text-gray-800 mt-1">{a.name}</p>
                <p className="text-xs text-gray-500">{a.reward}</p>
              </div>
            ))}
            {locked.map((a) => (
              <div key={a.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center opacity-50">
                <span className="text-2xl">🔒</span>
                <p className="text-xs font-medium text-gray-500 mt-1">{a.name}</p>
                <p className="text-xs text-gray-400">{a.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
