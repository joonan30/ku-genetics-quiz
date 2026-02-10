import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Dashboard from './pages/Dashboard'
import MapPage from './pages/MapPage'
import ProfilePage from './pages/ProfilePage'
import LeaderboardPage from './pages/LeaderboardPage'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import CharacterSelection from './components/auth/CharacterSelection'

function P({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/select-character" element={<P><CharacterSelection /></P>} />
        <Route path="/dashboard" element={<P><Dashboard /></P>} />
        <Route path="/quiz/:stageId" element={<P><Quiz /></P>} />
        <Route path="/quiz" element={<P><MapPage /></P>} />
        <Route path="/map" element={<P><MapPage /></P>} />
        <Route path="/profile" element={<P><ProfilePage /></P>} />
        <Route path="/leaderboard" element={<P><LeaderboardPage /></P>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
