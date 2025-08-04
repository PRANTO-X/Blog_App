import { createBrowserRouter} from 'react-router-dom'
import { App } from '../App.jsx'
import Home from '../components/Home.jsx'
import ShowBlog from '../components/ShowBlog.jsx'
import CreateBlog from '../components/CreateBlog.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },                        
      { path: 'create', element: <CreateBlog /> },               
      { path: 'blog/:id', element: <ShowBlog /> },               
    ]
  }
]);