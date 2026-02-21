import { getCompanionById, COMPANION_TYPES } from '../../data/companions'
import SpriteImg from '../common/SpriteImg'

export default function Inventory({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-3xl mb-2">🐾</p>
        <p className="text-sm">No companions yet. Complete stages to meet new friends!</p>
      </div>
    )
  }

  const grouped = { animal: [], aquatic: [], insect: [] }
  items.forEach((id) => {
    const comp = getCompanionById(id)
    if (comp && grouped[comp.type]) {
      grouped[comp.type].push(comp)
    }
  })

  return (
    <div className="space-y-4">
      {Object.entries(COMPANION_TYPES).map(([type, info]) => {
        const list = grouped[type]
        if (list.length === 0) return null
        return (
          <div key={type}>
            <h4 className="text-xs font-medium text-gray-500 mb-2">
              {info.icon} {info.name} ({info.korean})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {list.map((comp) => (
                <div key={comp.id} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="flex justify-center">
                    <SpriteImg id={comp.id} size="lg" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 mt-1 truncate">{comp.korean}</p>
                  <p className="text-[10px] text-gray-500 truncate">{comp.name}</p>
                  <p className="text-xs text-crimson-700 mt-0.5">{comp.trait}</p>
                  <div className="flex justify-center mt-1">
                    {Array.from({ length: comp.rarity }).map((_, i) => (
                      <span key={i} className="text-[10px] text-yellow-400">&#9733;</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
