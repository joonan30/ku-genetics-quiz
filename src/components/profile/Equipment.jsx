import { getCompanionById, COMPANION_TYPES } from '../../data/companions'
import SpriteImg from '../common/SpriteImg'

const SLOTS = [
  { key: 'animal', label: 'Animal', icon: '🐾' },
  { key: 'aquatic', label: 'Aquatic', icon: '🐟' },
  { key: 'insect', label: 'Insect', icon: '🦋' },
]

export default function Equipment({ equipped, inventory, onEquip }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-3">Companions</h3>
      <div className="space-y-2">
        {SLOTS.map((slot) => {
          const compId = equipped?.[slot.key]
          const comp = compId ? getCompanionById(compId) : null
          return (
            <div key={slot.key} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <span className="w-8 flex justify-center shrink-0">
                {comp ? <SpriteImg id={comp.id} size="sm" /> : <span className="text-2xl">{slot.icon}</span>}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {comp ? `${comp.name} (${comp.korean})` : `No ${slot.label} Companion`}
                </p>
                {comp && (
                  <p className="text-xs text-emerald-600">{comp.trait} · {comp.effectLabel}</p>
                )}
              </div>
              {inventory && inventory.length > 0 && (
                <select
                  value={compId || ''}
                  onChange={(e) => onEquip(slot.key, e.target.value || null)}
                  className="text-xs border rounded-lg px-2 py-1 bg-white"
                >
                  <option value="">None</option>
                  {inventory
                    .map((id) => getCompanionById(id))
                    .filter((c) => c && c.type === slot.key)
                    .map((c) => (
                      <option key={c.id} value={c.id}>{c.korean} ({c.name})</option>
                    ))}
                </select>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
