import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getCurrentCharacter, getNextEvolution, CATEGORIES } from '../data/characters'
import { getXpProgress, getTotalXp } from '../utils/xpCalculator'
import { getJourneyProgress, getNextAvailableStage } from '../utils/stageUnlock'
import StatsRadar from '../components/profile/StatsRadar'
import Equipment from '../components/profile/Equipment'
import SpriteImg from '../components/common/SpriteImg'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { userProfile, updateProfile } = useAuth()
  const navigate = useNavigate()

  if (!userProfile) return null
  if (!userProfile.character) {
    navigate('/select-character')
    return null
  }

  const char = getCurrentCharacter(userProfile)
  const nextEvo = getNextEvolution(userProfile)
  const totalXp = getTotalXp(userProfile)
  const progress = getXpProgress(totalXp)
  const journey = getJourneyProgress(userProfile)
  const nextStage = getNextAvailableStage(userProfile)

  async function handleEquip(slot, companionId) {
    const newEquipped = { ...userProfile.equippedCompanions, [slot]: companionId }
    await updateProfile({ equippedCompanions: newEquipped })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          {nextStage && (
            <Link to={`/quiz/${nextStage.id}`}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition">
              Continue: {nextStage.name}
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Character + Level */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-4 mb-4">
              <SpriteImg id={char?.id} size="xl" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{userProfile.name}</h2>
                <p className="text-sm text-gray-500">{char?.name} — {char?.korean}</p>
                <p className="text-xs text-gray-400">{CATEGORIES[char?.category]?.name}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 text-white mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm opacity-80">Level</span>
                <span className="text-3xl font-bold">{progress.level}</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2.5 mb-1">
                <div className="bg-white h-2.5 rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
              </div>
              <div className="flex justify-between text-xs opacity-80">
                <span>{progress.currentXp} XP</span>
                <span>{progress.requiredXp} XP to next</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-emerald-600">{totalXp}</p>
                <p className="text-xs text-gray-500">Total XP</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-blue-600">{journey.completed}/{journey.total}</p>
                <p className="text-xs text-gray-500">Stages</p>
              </div>
            </div>

            {/* Evolution progress */}
            {nextEvo && (
              <div className="mt-3 bg-purple-50 rounded-lg p-3 flex items-center gap-3">
                <SpriteImg id={char?.id} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-purple-600 font-medium">Next Evolution</p>
                  <div className="flex items-center gap-1.5">
                    <SpriteImg id={nextEvo.character.id} size="xs" />
                    <span className="text-sm text-gray-700 truncate">{nextEvo.character.korean} at Lv.{nextEvo.level}</span>
                  </div>
                </div>
                <span className="text-xs text-purple-500 font-bold shrink-0">Lv.{nextEvo.level}</span>
              </div>
            )}
          </motion.div>

          {/* Stats Radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-gray-800 mb-4">Specialization Stats</h3>
            <StatsRadar userData={userProfile} />
          </motion.div>

          {/* Equipment */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow p-6">
            <Equipment
              equipped={userProfile.equippedCompanions}
              inventory={userProfile.companions}
              onEquip={handleEquip}
            />
          </motion.div>
        </div>

        {/* Journey Progress Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow p-6 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Journey Progress</h3>
            <Link to="/map" className="text-sm text-emerald-600 hover:underline">View Full Map</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Anam</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
              <motion.div initial={{ width: 0 }} animate={{ width: `${journey.percentage}%` }}
                transition={{ duration: 1.5 }}
                className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full" />
            </div>
            <span className="text-sm text-gray-500">Dokdo</span>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {journey.maxDistance > 0
              ? `You've traveled ${journey.maxDistance}km from Anam!`
              : 'Begin your journey!'}
          </p>
        </motion.div>

        {/* Achievements preview */}
        {userProfile.achievements?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow p-6 mt-6">
            <h3 className="font-bold text-gray-800 mb-3">Recent Achievements</h3>
            <div className="flex gap-3 flex-wrap">
              {userProfile.achievements.slice(-5).map((id) => (
                <span key={id} className="bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full text-sm">
                  {id}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
