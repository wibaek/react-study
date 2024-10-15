import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import RootPage, { action as rootAction, loader as rootLoader } from './pages/RootPage';
import ErrorPage from './pages/ErrorPage';
import ContactPage, { loader as contactLoader } from './pages/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: 'contacts/:contactId',
        element: <ContactPage />,
        loader: contactLoader,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
