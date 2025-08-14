// src/routes/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App.jsx';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home.jsx'));
const News = lazy(() => import('../pages/News.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'news', element: <News /> },
      { path: 'news/:slug', element: <News /> }, 
    ],
  },
]);
