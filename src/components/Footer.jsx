import { Link } from 'react-router-dom'
import { university } from '../lib/config'

export default function Footer() {
  return (
    <footer className="border-t border-slate/10 mt-16 py-6">
      <div className="max-w-4xl mx-auto px-5 flex items-center justify-between text-xs text-slate/60">
        <p>&copy; {new Date().getFullYear()} {university.name} &mdash; {university.city}</p>
        <Link to="/admin/login" className="hover:text-brass transition-colors">
          Staff Login
        </Link>
      </div>
    </footer>
  )
}
