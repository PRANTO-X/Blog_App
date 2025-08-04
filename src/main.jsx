import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './hooks/Router'
import { BlogProvider } from './hooks/BlogProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BlogProvider>
    <RouterProvider router={router} />
   </BlogProvider>
  </StrictMode>,
)
