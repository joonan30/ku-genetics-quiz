import { useAuth } from '../contexts/AuthContext'
import JourneyMap from '../components/map/JourneyMap'

export default function MapPage() {
  const { userProfile } = useAuth()

  if (!userProfile) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <JourneyMap userData={userProfile} />
    </div>
  )
}
