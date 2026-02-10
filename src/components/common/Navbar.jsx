import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getXpProgress, getTotalXp } from '../../utils/xpCalculator'
import { getCurrentCharacter } from '../../data/characters'
import SpriteImg from './SpriteImg'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/map', label: 'Map' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/leaderboard', label: 'Ranks' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const { currentUser, userProfile, logout } = useAuth()
  const location = useLocation()

  if (['/login', '/signup', '/select-character'].includes(location.pathname)) return null

  const totalXp = userProfile ? getTotalXp(userProfile) : 0
  const progress = getXpProgress(totalXp)
  const char = userProfile ? getCurrentCharacter(userProfile) : null

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-gray-800 flex items-center gap-1.5 shrink-0">
          {char ? <SpriteImg id={char.id} size="xs" /> : '🧬'} <span className="hidden sm:inline">Genetics Journey</span>
        </Link>

        {currentUser && userProfile ? (
          <div className="flex items-center gap-1 sm:gap-3 overflow-x-auto">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to}
                className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  location.pathname === link.to ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:text-gray-800'
                }`}>
                {link.label}
              </Link>
            ))}
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg shrink-0">
              <span className="text-xs font-bold text-emerald-700">Lv.{progress.level}</span>
              <div className="w-12 bg-emerald-200 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
              </div>
            </div>
            <button onClick={logout} className="text-xs text-gray-400 hover:text-gray-600 transition shrink-0 ml-1">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800">Login</Link>
            <Link to="/signup" className="text-sm bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-700 transition">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
