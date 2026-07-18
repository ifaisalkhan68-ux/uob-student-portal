import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../lib/utils'

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('queries')

  const [notices, setNotices] = useState([])
  const [queries, setQueries] = useState([])
  const [noticeForm, setNoticeForm] = useState({ title: '', body: '', category: '' })
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    if (!loading && !user) navigate('/admin/login')
  }, [user, loading, navigate])

  useEffect(() => {
    const nq = query(collection(db, 'notices'), orderBy('createdAt', 'desc'))
    const unsubN = onSnapshot(nq, (snap) => setNotices(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))

    const qq = query(collection(db, 'queries'), orderBy('createdAt', 'desc'))
    const unsubQ = onSnapshot(qq, (snap) => setQueries(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))

    return () => { unsubN(); unsubQ() }
  }, [])

  const handlePostNotice = async (e) => {
    e.preventDefault()
    if (!noticeForm.title.trim() || !noticeForm.body.trim()) return
    setPosting(true)
    try {
      await addDoc(collection(db, 'notices'), {
        title: noticeForm.title.trim(),
        body: noticeForm.body.trim(),
        category: noticeForm.category.trim(),
        createdAt: serverTimestamp()
      })
      setNoticeForm({ title: '', body: '', category: '' })
    } finally {
      setPosting(false)
    }
  }

  const handleDeleteNotice = async (id) => {
    await deleteDoc(doc(db, 'notices', id))
  }

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, 'queries', id), { status })
  }

  if (loading || !user) return null

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-brass text-xs font-semibold tracking-widest uppercase mb-1">Admin Dashboard</p>
          <h1 className="font-serif text-3xl font-bold text-green-dark">Manage Portal</h1>
        </div>
        <button
          onClick={logout}
          className="text-sm text-slate/60 hover:text-red-600 transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="flex gap-1 mb-6 border-b border-slate/10">
        {['queries', 'notices'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
              tab === t ? 'border-brass text-green-dark' : 'border-transparent text-slate/50 hover:text-slate'
            }`}
          >
            {t} {t === 'queries' && `(${queries.length})`}
          </button>
        ))}
      </div>

      {tab === 'queries' && (
        <div className="space-y-3">
          {queries.length === 0 && <p className="text-sm text-slate/50">No queries submitted yet.</p>}
          {queries.map((q) => (
            <div key={q.id} className="bg-white border border-slate/10 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-serif font-semibold text-green-dark">{q.trackingId}</p>
                  <p className="text-xs text-slate/50">{q.name} &middot; {q.departmentLabel} &middot; {formatDate(q.createdAt)}</p>
                </div>
                <select
                  value={q.status}
                  onChange={(e) => handleStatusChange(q.id, e.target.value)}
                  className="text-xs border border-slate/20 rounded px-2 py-1 bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <p className="text-sm text-slate/70">{q.message}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'notices' && (
        <div>
          <form onSubmit={handlePostNotice} className="bg-white border border-slate/10 rounded-lg p-5 mb-6 space-y-3">
            <h3 className="font-serif font-semibold text-green-dark mb-1">Post a Notice</h3>
            <input
              placeholder="Title"
              value={noticeForm.title}
              onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
              className="w-full border border-slate/20 rounded-lg px-3 py-2 text-sm bg-white focus:border-brass"
            />
            <input
              placeholder="Category (optional, e.g. Exams, Fee, Events)"
              value={noticeForm.category}
              onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
              className="w-full border border-slate/20 rounded-lg px-3 py-2 text-sm bg-white focus:border-brass"
            />
            <textarea
              placeholder="Notice content"
              rows={3}
              value={noticeForm.body}
              onChange={(e) => setNoticeForm({ ...noticeForm, body: e.target.value })}
              className="w-full border border-slate/20 rounded-lg px-3 py-2 text-sm bg-white focus:border-brass"
            />
            <button
              type="submit"
              disabled={posting}
              className="bg-green text-paper text-sm font-medium px-5 py-2 rounded-lg hover:bg-green-dark transition-colors disabled:opacity-50"
            >
              {posting ? 'Posting…' : 'Post Notice'}
            </button>
          </form>

          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="bg-white border border-slate/10 rounded-lg p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-serif font-semibold text-green-dark">{n.title}</p>
                  <p className="text-sm text-slate/70 mt-1">{n.body}</p>
                </div>
                <button
                  onClick={() => handleDeleteNotice(n.id)}
                  className="text-xs text-red-600 hover:underline shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
        }
