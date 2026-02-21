import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEEDS, getEvolutionLineage, RARITY } from '../../data/characters'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SpriteImg from '../common/SpriteImg'

export default function CharacterSelection() {
  const [selected, setSelected] = useState(null)
  const { updateProfile } = useAuth()
  const navigate = useNavigate()

  const lineage = selected ? getEvolutionLineage(selected.id) : []

  async function handleSelect() {
    if (!selected) return
    await updateProfile({ character: selected.id })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-crimson-400 text-sm font-medium mb-2 tracking-wider"
          >
            GENETICS JOURNEY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold mb-3"
          >
            Choose Your Seed
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            모든 위대한 여정은 하나의 씨앗에서 시작됩니다
          </motion.p>
        </div>

        {/* Seed Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {SEEDS.map((seed, i) => (
            <motion.div
              key={seed.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelected(seed)}
              className={`relative cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                selected?.id === seed.id
                  ? 'border-yellow-400 bg-gray-700/80 shadow-lg shadow-yellow-400/20'
                  : 'border-gray-700 bg-gray-800/80 hover:border-gray-500'
              }`}
            >
              <div className="flex justify-center mb-3">
                <SpriteImg id={seed.id} size="xl" />
              </div>
              <h3 className="font-bold text-center text-lg">{seed.name}</h3>
              <p className="text-sm text-gray-400 text-center mb-1">{seed.korean}</p>
              <p className="text-xs text-gray-500 text-center italic">{seed.concept}</p>

              {/* Evolution preview dots */}
              <div className="flex justify-center gap-1.5 mt-3">
                {getEvolutionLineage(seed.id).map((evo, j) => (
                  <div
                    key={j}
                    className="w-7 h-7 rounded-full bg-gray-600/60 flex items-center justify-center overflow-hidden"
                    title={`Lv.${evo.level}: ${evo.character.korean}`}
                  >
                    <SpriteImg id={evo.character.id} size="xs" />
                  </div>
                ))}
              </div>

              <div
                className="absolute top-3 right-3 w-3 h-3 rounded-full"
                style={{ backgroundColor: seed.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Selected Seed Detail */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
            >
              <div className="flex items-center gap-4 mb-5">
                <SpriteImg id={selected.id} size="xl" />
                <div>
                  <h2 className="text-2xl font-bold">{selected.name}</h2>
                  <p className="text-gray-400">{selected.korean} &middot; {selected.base}</p>
                  <p className="text-sm text-gray-500">{selected.concept}</p>
                </div>
              </div>

              {/* Evolution Timeline */}
              <div className="mb-5">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Evolution Path</h3>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {/* Seed */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center border-2 border-yellow-400 overflow-hidden">
                      <SpriteImg id={selected.id} size={40} />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Seed</span>
                  </div>

                  {lineage.map((evo, i) => (
                    <div key={i} className="flex items-center gap-2 shrink-0">
                      <div className="text-gray-600 text-xs">&rarr;</div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center border border-gray-600 overflow-hidden">
                          <SpriteImg id={evo.character.id} size={40} />
                        </div>
                        <span className="text-xs text-gray-500 mt-1">Lv.{evo.level}</span>
                        <span className="text-xs text-gray-600 truncate max-w-[60px]">{evo.character.korean}</span>
                        <span className={`text-xs ${RARITY[evo.character.rarity]?.color}`}>
                          {'★'.repeat(evo.character.rarity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleSelect}
                className="w-full bg-yellow-500 text-gray-900 py-3 rounded-xl font-bold hover:bg-yellow-400 transition text-lg">
                {selected.korean} 선택하기
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
