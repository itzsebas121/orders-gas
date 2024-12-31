import React, { lazy, Suspense } from 'react'
import './Client.css'
import NavigatorBar from './components/Navigator-Bar'
import { Routes, Route } from 'react-router-dom'
import Loading from '../../components/Loading'

const Home = lazy (()=> import('./components/Home'))
const Record = lazy(() => import('./components/Record'))
const Client = () => {
  return (
    <div className='container'>
      <NavigatorBar />
      <Suspense fallback={<Loading />}>
        <div className='container-dashboard'>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Record' element={<Record />} />
          </Routes>

        </div>
      </Suspense>
    </div>
  )
}
export default Client