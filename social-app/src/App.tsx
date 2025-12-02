import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthPage } from './pages/AuthPages/AuthPage'
import { HomePage } from './pages/HomePage/HomePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App