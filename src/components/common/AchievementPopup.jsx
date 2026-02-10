import { motion, AnimatePresence } from 'framer-motion'

export default function AchievementPopup({ achievement, onClose }) {
  if (!achievement) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className="fixed top-20 right-4 z-50 bg-white rounded-xl shadow-xl border border-yellow-200 p-4 max-w-xs"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{achievement.icon}</span>
          <div>
            <p className="text-xs text-yellow-600 font-medium">Achievement Unlocked!</p>
            <p className="font-bold text-gray-800">{achievement.name}</p>
            <p className="text-xs text-gray-500">{achievement.description}</p>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm">
          &#10005;
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
