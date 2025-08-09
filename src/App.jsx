import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/footer'
import Loader from './loader/Loader'

export const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader/>}>
        <Outlet />
      </Suspense>
      <Footer/>
    </>
  )
}
