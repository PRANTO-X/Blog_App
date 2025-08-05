import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App.jsx'
import { lazy } from 'react'

// Lazy-loaded components
const Home = lazy(() => import('../pages/Home.jsx'))
const CreateBlog = lazy(() => import('../pages/CreateBlog.jsx'))
const ShowBlog = lazy(() => import('../pages/ShowBlog.jsx'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'create', element: <CreateBlog /> },
      { path: 'blog/:id', element: <ShowBlog /> }
    ]
  }
])
