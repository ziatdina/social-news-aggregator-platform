import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthPage } from './pages/AuthPage/AuthPage'
import { HomePage } from './pages/HomePage/HomePage'
import { AuthProvider, SearchProvider } from './utils/contexts'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  )
}

export default App