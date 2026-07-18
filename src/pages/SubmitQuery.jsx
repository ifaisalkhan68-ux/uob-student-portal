import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { departments } from '../lib/config'
import { generateTrackingId, buildWhatsAppLink } from '../lib/utils'

export default function SubmitQuery() {
  const [form, setForm] = useState({
    name: '',
    rollNumber: '',
    department: departments[0].id,
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.message.trim()) {
      setError('Please fill in your name and your query.')
      return
    }

    setSubmitting(true)
    const trackingId = generateTrackingId()
    const dept = departments.find((d) => d.id === form.department)

    try {
      await addDoc(collection(db, 'queries'), {
        trackingId,
        name: form.name.trim(),
        rollNumber: form.rollNumber.trim(),
        departmentId: dept.id,
        departmentLabel: dept.label,
        message: form.message.trim(),
        status: 'pending',
        createdAt: serverTimestamp()
      })

      const link = buildWhatsAppLink({
        phone: dept.whatsapp,
        trackingId,
        name: form.name,
        rollNumber: form.rollNumber,
        department: dept.label,
        message: form.message
      })

      setResult({ trackingId, link })
    } catch (err) {
      setError('Something went wrong saving your query. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="max-w-lg mx-auto px-5 py-16 text-center">
        <div className="inline-flex flex-col items-center border-2 border-brass rounded-lg px-8 py-6 mb-6 bg-white">
          <p className="text-xs uppercase tracking-widest text-slate/50 mb-1">Reference Number</p>
          <p className="font-serif text-2xl font-bold text-green-dark">{result.trackingId}</p>
        </div>
        <h2 className="font-serif text-xl font-semibold text-green-dark mb-2">Query recorded</h2>
        <p className="text-sm text-slate/70 mb-6">
          Save this reference number to check your query's status later. Now send it to the department on WhatsApp to complete submission.
        </p>
        <a
          href={result.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green text-paper font-medium px-6 py-3 rounded-lg hover:bg-green-dark transition-colors"
        >
          Send via WhatsApp
        </a>
        <div className="mt-6">
          <a href="/track" className="text-sm text-brass underline underline-offset-2">
            Track a query instead
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-10">
      <p className="text-brass text-xs font-semibold tracking-widest uppercase mb-2">Query &amp; Complaint</p>
      <h1 className="font-serif text-3xl font-bold text-green-dark mb-2">Submit a Query</h1>
      <p className="text-slate/60 text-sm mb-8">
        Fill this in and we'll route it to the right department, with a reference number so you can track it.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-slate/20 rounded-lg px-4 py-2.5 bg-white focus:border-brass"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate mb-1">Roll Number (optional)</label>
          <input
            name="rollNumber"
            value={form.rollNumber}
            onChange={handleChange}
            className="w-full border border-slate/20 rounded-lg px-4 py-2.5 bg-white focus:border-brass"
            placeholder="e.g. BSPS-2022-014"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate mb-1">Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border border-slate/20 rounded-lg px-4 py-2.5 bg-white focus:border-brass"
          >
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate mb-1">Your Query / Complaint</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full border border-slate/20 rounded-lg px-4 py-2.5 bg-white focus:border-brass"
            placeholder="Describe your issue clearly..."
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green text-paper font-medium py-3 rounded-lg hover:bg-green-dark transition-colors disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Submit Query'}
        </button>
      </form>
    </div>
  )
}
