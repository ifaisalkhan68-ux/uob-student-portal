import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import NoticeCard from '../components/NoticeCard'

export default function Notices() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setNotices(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="mb-8">
        <p className="text-brass text-xs font-semibold tracking-widest uppercase mb-2">Notice Board</p>
        <h1 className="font-serif text-3xl font-bold text-green-dark">Latest Announcements</h1>
        <p className="text-slate/60 text-sm mt-2">
          Official notices from university administration. Have a question instead?{' '}
          <a href="/submit" className="text-brass underline underline-offset-2">Submit a query</a>.
        </p>
      </div>

      {loading && <p className="text-slate/50 text-sm">Loading notices…</p>}

      {!loading && notices.length === 0 && (
        <div className="border border-dashed border-slate/20 rounded-lg p-8 text-center">
          <p className="text-slate/50 text-sm">No notices posted yet. Check back soon.</p>
        </div>
      )}

      <div className="space-y-4">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  )
}
