import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Notices from './pages/Notices'
import SubmitQuery from './pages/SubmitQuery'
import TrackQuery from './pages/TrackQuery'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-paper">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Notices />} />
              <Route path="/submit" element={<SubmitQuery />} />
              <Route path="/track" element={<TrackQuery />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
