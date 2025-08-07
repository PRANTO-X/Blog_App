import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRouter'
import { BlogProvider } from './contexts/BlogProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BlogProvider>
    <RouterProvider router={router} />
   </BlogProvider>  
  </StrictMode>,
)
