import LeaderboardTabs from '../components/leaderboard/LeaderboardTabs'

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h1>
        <LeaderboardTabs />
      </div>
    </div>
  )
}
