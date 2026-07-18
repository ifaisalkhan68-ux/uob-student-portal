import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { formatDate } from '../lib/utils'

const statusStyles = {
  pending: 'bg-amber-100 text-amber-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700'
}

const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  resolved: 'Resolved'
}

export default function TrackQuery() {
  const [id, setId] = useState('')
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!id.trim()) return
    setLoading(true)
    setSearched(true)

    try {
      const q = query(collection(db, 'queries'), where('trackingId', '==', id.trim().toUpperCase()))
      const snap = await getDocs(q)
      if (!snap.empty) {
        setResult(snap.docs[0].data())
      } else {
        setResult(null)
      }
    } catch (err) {
      console.error(err)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-10">
      <p className="text-brass text-xs font-semibold tracking-widest uppercase mb-2">Status Check</p>
      <h1 className="font-serif text-3xl font-bold text-green-dark mb-2">Track Your Query</h1>
      <p className="text-slate/60 text-sm mb-8">Enter the reference number you received when you submitted your query.</p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="UOB-QRY-4821"
          className="flex-1 border border-slate/20 rounded-lg px-4 py-2.5 bg-white focus:border-brass uppercase"
        />
        <button
          type="submit"
          className="bg-green text-paper font-medium px-5 rounded-lg hover:bg-green-dark transition-colors"
        >
          Check
        </button>
      </form>

      {loading && <p className="text-sm text-slate/50">Searching…</p>}

      {!loading && searched && !result && (
        <div className="border border-dashed border-slate/20 rounded-lg p-6 text-center">
          <p className="text-sm text-slate/50">No query found with that reference number.</p>
        </div>
      )}

      {!loading && result && (
        <div className="bg-white border border-slate/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-serif font-semibold text-green-dark">{result.trackingId}</p>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[result.status] || statusStyles.pending}`}>
              {statusLabels[result.status] || 'Pending'}
            </span>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate/50">Department</dt>
              <dd className="text-slate">{result.departmentLabel}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate/50">Submitted</dt>
              <dd className="text-slate">{formatDate(result.createdAt)}</dd>
            </div>
          </dl>
          <p className="text-sm text-slate/70 mt-4 border-t border-slate/10 pt-4">{result.message}</p>
        </div>
      )}
    </div>
  )
}
