import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
