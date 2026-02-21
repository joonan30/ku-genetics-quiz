import { motion } from 'framer-motion'
import { stages, TIER_COLORS } from '../../data/stages'
import { CATEGORIES } from '../../data/characters'
import { getStageStatus, getJourneyProgress } from '../../utils/stageUnlock'
import { useNavigate } from 'react-router-dom'

const CAT_EMOJI = { dna: '🧬', mendelian: '🫛', molecular: '🔬', evolution: '🌳' }

export default function JourneyMap({ userData }) {
  const navigate = useNavigate()
  const journey = getJourneyProgress(userData)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Journey Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Journey from Anam, Seoul</h2>
            <p className="text-sm text-gray-500">
              You've traveled {journey.maxDistance}km from Anam!
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-crimson-800">{journey.completed}/{journey.total}</p>
            <p className="text-xs text-gray-500">Stages Complete</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${journey.percentage}%` }}
            transition={{ duration: 1 }}
            className="bg-gradient-to-r from-crimson-700 to-crimson-900 h-3 rounded-full"
          />
        </div>
      </div>

      {/* Stage List */}
      <div className="relative">
        {/* Path line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

        <div className="space-y-4">
          {stages.map((stage, i) => {
            const status = getStageStatus(stage, userData)
            const tier = TIER_COLORS[stage.tier]
            const cat = CATEGORIES[stage.category]

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative md:ml-16 bg-white rounded-xl border-2 p-4 transition-all ${
                  status === 'completed' ? 'border-green-300 bg-green-50/50' :
                  status === 'available' ? 'border-crimson-600 shadow-md shadow-crimson-100' :
                  'border-gray-200 opacity-60'
                }`}
              >
                {/* Node dot */}
                <div className={`hidden md:flex absolute -left-[4.5rem] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full items-center justify-center text-sm font-bold ${
                  status === 'completed' ? 'bg-green-500 text-white' :
                  status === 'available' ? 'bg-crimson-700 text-white animate-pulse' :
                  'bg-gray-300 text-gray-500'
                }`}>
                  {status === 'completed' ? '✓' : status === 'locked' ? '🔒' : i + 1}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${tier.bg} ${tier.text}`}>
                        {stage.tier.charAt(0).toUpperCase() + stage.tier.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400">{CAT_EMOJI[stage.category]} {cat?.name}</span>
                      <span className="text-xs text-gray-400">📍 {stage.distance}km</span>
                    </div>
                    <h3 className="font-bold text-gray-800">{stage.name}</h3>
                    <p className="text-xs text-gray-500">{stage.korean}</p>
                    <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                    <div className="flex gap-3 mt-2 text-xs text-gray-400">
                      <span>{stage.questionCount} questions</span>
                      <span>{stage.xpPerQuestion} XP each</span>
                    </div>
                  </div>

                  {status === 'available' && (
                    <button
                      onClick={() => navigate(`/quiz/${stage.id}`)}
                      className="shrink-0 bg-crimson-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-crimson-900 transition"
                    >
                      Start
                    </button>
                  )}
                  {status === 'completed' && (
                    <div className="shrink-0 flex flex-col items-center">
                      <span className="text-2xl">✅</span>
                      <button onClick={() => navigate(`/quiz/${stage.id}`)}
                        className="text-xs text-crimson-700 hover:underline mt-1">Replay</button>
                    </div>
                  )}
                  {status === 'locked' && (
                    <div className="shrink-0 text-center">
                      <span className="text-2xl">🔒</span>
                      <p className="text-xs text-gray-400 mt-1">{stage.distance}km</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
