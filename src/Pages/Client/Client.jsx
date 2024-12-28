import React from 'react'
import './Client.css'
import NavigatorBar from './components/Navigator-Bar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Record from './components/Record'
const Client = () => {
  return (
    <div className='container'>
      <NavigatorBar />
      <div className='container-dashboard'>

        <Routes>
          <Route index element={<Home/>} />
          <Route path='/Home' element={<Home/>} />
          <Route path='/Record' element={<Record/>} />
        </Routes>
      </div>
    </div>
  )
}
export default Client