import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}
