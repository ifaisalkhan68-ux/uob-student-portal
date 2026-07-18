import { Link, useLocation } from 'react-router-dom'
import { university } from '../lib/config'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Notices' },
    { to: '/submit', label: 'Submit Query' },
    { to: '/track', label: 'Track Query' }
  ]

  return (
    <header className="bg-green border-b-4 border-brass">
      <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full seal-ring overflow-hidden bg-white">
            <img src="/icon-512.png" alt="University of Buner seal" className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <p className="text-paper font-serif font-semibold text-base">{university.name}</p>
            <p className="text-brass-light text-xs tracking-wide">Student Services Portal</p>
          </div>
        </Link>

        <nav className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py
