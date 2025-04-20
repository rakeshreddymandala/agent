import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AIInterface from './pages/AIInterface'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ai" element={<AIInterface />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
