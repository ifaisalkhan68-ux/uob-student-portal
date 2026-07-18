import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-5 py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full seal-ring overflow-hidden bg-white mx-auto mb-4">
          <img src="/icon-512.png" alt="University of Buner seal" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-green-dark">Staff Login</h1>
        <p className="text-slate/60 text-sm mt-1">Administrative access only</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate/20 rounded-lg px-4 py-2.5 bg-white focus:border-brass"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate/20 rounded-lg px-4 py-2.5 bg-white focus:border-brass"
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green text-paper font-medium py-3 rounded-lg hover:bg-green-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
