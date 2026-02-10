import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../../contexts/AuthContext'
import { getCurrentCharacter } from '../../data/characters'
import { getLevelFromXp, getTotalXp } from '../../utils/xpCalculator'
import { stages } from '../../data/stages'
import SpriteImg from '../common/SpriteImg'

const TABS = [
  { id: 'overall', label: 'Overall', field: null },
  { id: 'dna', label: 'DNA', field: 'dnaXp' },
  { id: 'mendelian', label: 'Mendelian', field: 'mendelianXp' },
  { id: 'molecular', label: 'Molecular', field: 'molecularXp' },
  { id: 'evolution', label: 'Evolution', field: 'evolutionXp' },
]

const MEDALS = ['🥇', '🥈', '🥉']

export default function LeaderboardTabs() {
  const [tab, setTab] = useState('overall')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      // We fetch all users and sort client-side for flexibility
      const snap = await getDocs(query(collection(db, 'users'), limit(100)))
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setUsers(data)
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const activeTab = TABS.find((t) => t.id === tab)
  const sorted = [...users].sort((a, b) => {
    if (activeTab.field) return (b[activeTab.field] || 0) - (a[activeTab.field] || 0)
    return getTotalXp(b) - getTotalXp(a)
  })

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 min-w-[80px] py-3 text-sm font-medium transition whitespace-nowrap px-2 ${
              tab === t.id ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-14 bg-gray-100 rounded-xl" />)}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No players yet.</p>
        ) : (
          <div className="space-y-2">
            {sorted.map((user, i) => {
              const isMe = user.id === currentUser?.uid
              const char = user.character ? getCurrentCharacter(user) : null
              const total = getTotalXp(user)
              const level = getLevelFromXp(total)
              const displayXp = activeTab.field ? (user[activeTab.field] || 0) : total
              const stageCount = (user.completedStages || []).length

              return (
                <div key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition ${
                    isMe ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-gray-50'
                  }`}>
                  <span className="w-8 text-center font-bold text-gray-400 shrink-0">
                    {i < 3 ? MEDALS[i] : i + 1}
                  </span>
                  <span className="shrink-0">{char ? <SpriteImg id={char.id} size="sm" /> : '🌱'}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isMe ? 'text-emerald-700' : 'text-gray-800'}`}>
                      {user.name} {isMe && '(You)'}
                    </p>
                    <p className="text-xs text-gray-400">{user.studentId} · {stageCount}/{stages.length} stages</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-emerald-600 text-sm">{displayXp} XP</p>
                    <p className="text-xs text-gray-400">Lv.{level}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
