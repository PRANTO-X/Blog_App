// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App.jsx';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home.jsx'));
const CreateBlog = lazy(() => import('../pages/CreateBlog.jsx'));
const News = lazy(() => import('../pages/News.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'create', element: <CreateBlog /> },
      { path: 'news', element: <News /> },
      { path: 'news/:id', element: <News /> }, 
    ],
  },
]);
