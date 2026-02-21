import { motion } from 'framer-motion'
import { CATEGORIES } from '../../data/characters'

const TIER_BADGE = {
  beginner: { label: 'Easy', cls: 'bg-green-100 text-green-700' },
  intermediate: { label: 'Medium', cls: 'bg-blue-100 text-blue-700' },
  advanced: { label: 'Hard', cls: 'bg-purple-100 text-purple-700' },
  master: { label: 'Expert', cls: 'bg-red-100 text-red-700' },
}

export default function QuizCard({ question, index, total, selectedAnswer, answered, comboStreak, onSelect, onNext }) {
  const badge = TIER_BADGE[question.difficulty] || TIER_BADGE.beginner
  const cat = CATEGORIES[question.category]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">Q{index + 1} / {total}</span>
        <div className="flex items-center gap-2">
          {comboStreak >= 3 && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
              {comboStreak}x Streak {comboStreak >= 10 ? '⚡' : comboStreak >= 5 ? '🔥' : '✨'}
            </span>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.cls}`}>{badge.label}</span>
          {cat && <span className="text-xs text-gray-400">{cat.name}</span>}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
        <div className="bg-crimson-700 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">{question.question}</h2>

      <div className="space-y-3">
        {question.choices.map((choice, i) => {
          let style = 'border-gray-200 hover:border-crimson-300 hover:bg-crimson-50'
          if (answered) {
            if (i === question.correctAnswer) style = 'border-green-400 bg-green-50 text-green-800'
            else if (i === selectedAnswer) style = 'border-red-400 bg-red-50 text-red-800'
            else style = 'border-gray-200 opacity-50'
          } else if (selectedAnswer === i) {
            style = 'border-crimson-600 bg-crimson-50'
          }
          return (
            <motion.button key={i} whileTap={!answered ? { scale: 0.98 } : {}}
              onClick={() => !answered && onSelect(i)} disabled={answered}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style} disabled:cursor-default`}>
              <span className="font-medium mr-2 text-gray-400">{String.fromCharCode(65 + i)}.</span>
              {choice}
              {answered && i === question.correctAnswer && <span className="float-right text-green-600">&#10003;</span>}
              {answered && i === selectedAnswer && i !== question.correctAnswer && <span className="float-right text-red-600">&#10007;</span>}
            </motion.button>
          )
        })}
      </div>

      {answered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-xl ${selectedAnswer === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
          <p className="font-medium mb-1">{selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{question.explanation}</p>
        </motion.div>
      )}

      {answered && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onNext}
          className="mt-6 w-full bg-crimson-800 text-white py-3 rounded-xl font-medium hover:bg-crimson-900 transition">
          {index + 1 < total ? 'Next Question' : 'View Results'}
        </motion.button>
      )}
    </div>
  )
}
