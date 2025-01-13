import { useState, lazy, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './Pages/Login/Login'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Loading from './components/Loading'
const Client = lazy(() => import('./Pages/Client/Client'))
const Distributor = lazy(() => import('./Pages/Distributor/Distributor'))
function App() {

  return (

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Client/*" element={<Client />} />
          <Route path="/Distributor/*" element={<Distributor />} />
        </Routes>
      </Router>
  )
}

export default App
