import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './Pages/Login/Login'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Client from './Pages/Client/Client'
import Distributor from './Pages/Distributor/Distributor'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Client/*" element={<Client />} />
          <Route path="/Distributor" element={<Distributor />} />
      </Routes>
    </Router>
  )
}

export default App
