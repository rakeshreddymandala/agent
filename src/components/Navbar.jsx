import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800/50 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white">AI Agent</Link>
          <div className="flex gap-4">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/ai" className="text-gray-300 hover:text-white transition-colors">AI Interface</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
