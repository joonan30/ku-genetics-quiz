import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupForm() {
  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '', name: '', studentId: '' })
  const [quiz, setQuiz] = useState({ q1: null, q2: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const ALLOWED_DOMAINS = ['korea.ac.kr']

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (quiz.q1 !== 'yes') return setError('첫 번째 질문의 답이 올바르지 않습니다.')
    if (quiz.q2.trim() !== '1905') return setError('두 번째 질문의 답이 올바르지 않습니다.')
    const domain = form.email.split('@')[1]
    if (!domain || !ALLOWED_DOMAINS.includes(domain.toLowerCase())) {
      return setError('korea.ac.kr 이메일만 가입할 수 있습니다.')
    }
    if (form.password !== form.passwordConfirm) return setError('Passwords do not match.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    try {
      await signup(form.email, form.password, form.name, form.studentId)
      navigate('/login', { state: { message: '인증 이메일을 발송했습니다. 이메일을 확인한 후 로그인하세요.' } })
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use' ? 'Email already in use.' : 'Sign up failed. Please try again.')
    }
    setLoading(false)
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your Name' },
    { name: 'studentId', label: 'Student ID', type: 'text', placeholder: '2024001' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'yourname@korea.ac.kr' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '6+ characters' },
    { name: 'passwordConfirm', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Join the Quest</h1>
          <p className="text-gray-500 mt-2">Create your account to start exploring genetics</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Verification Quiz */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-4">
            <p className="text-sm font-bold text-amber-800">본인 확인 퀴즈</p>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">2025년 고연전은 당연히 위대한 고려대의 승리인가?</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setQuiz({ ...quiz, q1: 'yes' })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition border ${
                    quiz.q1 === 'yes'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-400'
                  }`}>
                  Yes
                </button>
                <button type="button" onClick={() => setQuiz({ ...quiz, q1: 'no' })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition border ${
                    quiz.q1 === 'no'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-red-400'
                  }`}>
                  No
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">우리가 말한 숫자는?</label>
              <input type="text" value={quiz.q2} onChange={(e) => setQuiz({ ...quiz, q2: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                placeholder="숫자를 입력하세요" />
            </div>
          </div>

          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input type={f.type} name={f.name} required value={form[f.name]} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder={f.placeholder} />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
