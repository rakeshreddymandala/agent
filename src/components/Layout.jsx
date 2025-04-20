import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
