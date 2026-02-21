import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, logout, resendVerification } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Show message from signup redirect
  const signupMessage = location.state?.message || ''

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)
    try {
      const result = await login(email, password)
      if (!result.user.emailVerified) {
        setError('Email verification is required. Please check your inbox.')
        await logout()
        setLoading(false)
        return
      }
      navigate('/dashboard')
    } catch {
      setError('Login failed. Please check your email and password.')
    }
    setLoading(false)
  }

  async function handleResend() {
    setError('')
    setInfo('')
    setLoading(true)
    try {
      // Login temporarily to resend
      const result = await login(email, password)
      if (result.user.emailVerified) {
        navigate('/dashboard')
        return
      }
      await resendVerification()
      await logout()
      setInfo('Verification email has been resent. Please check your inbox.')
    } catch {
      setError('Please enter your email and password first.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-crimson-50/60 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Genetics Journey</h1>
          <p className="text-gray-500 mt-2">Login to continue your journey</p>
        </div>
        {signupMessage && (
          <div className="bg-crimson-50 text-crimson-800 p-3 rounded-lg mb-4 text-sm">{signupMessage}</div>
        )}
        {info && <div className="bg-blue-50 text-blue-700 p-3 rounded-lg mb-4 text-sm">{info}</div>}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
            {error.includes('Email verification') && (
              <button onClick={handleResend} disabled={loading}
                className="block mt-2 text-crimson-700 font-medium hover:underline text-xs">
                Resend verification email
              </button>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson-600 focus:border-transparent outline-none transition"
              placeholder="yourname@korea.ac.kr" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson-600 focus:border-transparent outline-none transition"
              placeholder="********" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-crimson-800 text-white py-2.5 rounded-lg font-medium hover:bg-crimson-900 transition disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-crimson-700 font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
