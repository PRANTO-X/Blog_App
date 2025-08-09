import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Loader from './loader/Loader'
import ScrollToTop from './components/common/ScrollToTop'

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<Loader/>}>
        <Outlet />
      </Suspense>
      <Footer/>
    </>
  )
}
