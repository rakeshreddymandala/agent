import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center py-4">
      <h1 className="text-5xl font-bold mb-8 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        Welcome to AI Agent
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Your intelligent assistant for automated tasks and queries
      </p>
      <Link
        to="/ai"
        className="inline-block bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 px-8 rounded-xl 
          hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium text-lg shadow-lg"
      >
        Get Started
      </Link>
    </div>
  )
}

export default Home
