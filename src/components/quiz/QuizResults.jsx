import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function QuizResults({ score, total, xpEarned, comboBonus, stageName, onRetry }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const passed = pct >= 80

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center mx-auto">
      <p className="text-5xl mb-4">{passed ? '🏆' : pct >= 50 ? '👍' : '📚'}</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        {passed ? 'Stage Complete!' : 'Keep Practicing!'}
      </h2>
      {stageName && <p className="text-gray-500 text-sm mb-4">{stageName}</p>}

      <div className="grid grid-cols-3 gap-3 my-6">
        <div className="bg-crimson-50 rounded-xl p-3">
          <p className="text-xl font-bold text-crimson-800">{score}/{total}</p>
          <p className="text-xs text-gray-500">Correct</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xl font-bold text-blue-600">+{xpEarned}</p>
          <p className="text-xs text-gray-500">XP Earned</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-3">
          <p className="text-xl font-bold text-orange-600">+{comboBonus}</p>
          <p className="text-xs text-gray-500">Combo XP</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Accuracy</span>
          <span>{pct}% {passed ? '(Passed!)' : '(Need 80%)'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`h-2.5 rounded-full transition-all duration-1000 ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex gap-3">
        <Link to="/map" className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
          Journey Map
        </Link>
        <button onClick={onRetry}
          className="flex-1 bg-crimson-800 text-white py-3 rounded-xl font-medium hover:bg-crimson-900 transition">
          {passed ? 'Play Again' : 'Retry Stage'}
        </button>
      </div>
    </motion.div>
  )
}
