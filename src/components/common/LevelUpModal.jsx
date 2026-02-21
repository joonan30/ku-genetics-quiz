import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpriteImg from './SpriteImg'

const PETALS = Array.from({ length: 12 })

export default function LevelUpModal({ level, evolution, onClose }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const duration = evolution ? 5000 : 3500
    const timer = setTimeout(() => { setShow(false); setTimeout(onClose, 400) }, duration)
    return () => clearTimeout(timer)
  }, [onClose, evolution])

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          {/* Falling petals */}
          {PETALS.map((_, i) => (
            <motion.div key={i}
              initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 0, rotate: 0 }}
              animate={{ y: window.innerHeight + 50, opacity: [0, 1, 1, 0], rotate: 360 * (Math.random() > 0.5 ? 1 : -1) }}
              transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 1.5, ease: 'linear' }}
              className="absolute text-2xl pointer-events-none"
              style={{ left: `${Math.random() * 100}%` }}>
              {evolution
                ? ['✨', '🌟', '⭐', '💫', '🌸'][i % 5]
                : ['🌸', '🍃', '🌿', '🌺', '🍀'][i % 5]
              }
            </motion.div>
          ))}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-8 text-center relative z-10 mx-4 max-w-sm"
          >
            {evolution ? (
              <>
                <p className="text-sm text-purple-500 font-medium mb-2">꿈이 자라고 있습니다...</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <motion.div
                    animate={{ scale: [1, 0.8, 0.6], opacity: [1, 0.5, 0.3] }}
                    transition={{ duration: 1.5 }}
                  >
                    <SpriteImg id={evolution.oldForm.id} size="xl" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [0.5, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="text-3xl text-yellow-400"
                  >
                    →
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <SpriteImg id={evolution.newForm.id} size="2xl" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Evolution!</h2>
                  <p className="text-lg font-bold text-purple-600 mb-1">{evolution.newForm.korean}</p>
                  <p className="text-gray-500 text-sm">{evolution.newForm.name}</p>
                  <p className="text-crimson-800 font-bold mt-2">Level {level}</p>
                  {evolution.stage === 5 && (
                    <p className="text-yellow-500 text-sm mt-1 font-medium">당신의 꿈이 만개했습니다</p>
                  )}
                </motion.div>
              </>
            ) : (
              <>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: 3, duration: 0.6 }}
                  className="text-6xl mb-4">🎉</motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Level Up!</h2>
                <p className="text-5xl font-extrabold text-crimson-800 mb-2">Level {level}</p>
                <p className="text-gray-500">Amazing progress! Keep exploring genetics!</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
