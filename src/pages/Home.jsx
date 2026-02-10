import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

const FEATURES = [
  { icon: '🧬', title: '4 Seeds, 20 Evolutions', desc: 'Choose your ATCG seed and evolve through rare Korean plants. Each lineage specializes in a genetics field.' },
  { icon: '🗺️', title: '20-Stage Journey', desc: 'Travel from Anam, Seoul across Korea to Dokdo, mastering genetics along the way.' },
  { icon: '🐾', title: 'Korean Wildlife Companions', desc: 'Befriend native Korean animals, fish, and insects — each with unique powers to aid your journey.' },
  { icon: '📊', title: '4 XP Categories', desc: 'Build your expertise in DNA, Mendelian Genetics, Molecular Biology, and Evolution.' },
  { icon: '🏆', title: 'Leaderboard', desc: 'Compete with classmates across 5 ranking categories.' },
  { icon: '🎖️', title: 'Achievements', desc: 'Unlock badges as you complete stages, reach distances, and master genetics.' },
]

export default function Home() {
  const { currentUser } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-sky-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Genetics Journey
          </h1>
          <p className="text-2xl text-emerald-700 font-semibold mb-2">ATCG to 한반도</p>
          <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
            Journey across all of Korea — Seoul to Jeju, Baekdu to Dokdo — with rare plants as your companions.
          </p>
          <p className="text-lg text-gray-500 mb-2 max-w-2xl mx-auto">
            Master genetics through quizzes, level up, collect companions, and compete!
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Korea University · BSMS205 Genetics ·{' '}
            <a href="https://chaek.org/books/human-genetics" target="_blank" rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline">Textbook</a>
          </p>
          <div className="flex justify-center gap-4">
            {currentUser ? (
              <>
                <Link to="/dashboard"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
                  Continue Journey
                </Link>
                <Link to="/map"
                  className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition border border-emerald-200">
                  View Map
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
                  Start Your Journey
                </Link>
                <Link to="/login"
                  className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition border border-emerald-200">
                  Login
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            Begin your journey in Anam, Seoul and travel across Korea to uncover the secrets of genetics.
          </p>
        </div>
      </div>
    </div>
  )
}
