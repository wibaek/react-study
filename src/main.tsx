import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import RootPage, { action as rootAction, loader as rootLoader } from './pages/RootPage';
import ErrorPage from './pages/ErrorPage';
import ContactPage, { loader as contactLoader, action as contactAction } from './pages/ContactPage';
import EditContact, { action as editAction } from './pages/ContactEditPage';
import { action as destroyAction } from './pages/ContactRemovePage';
import IndexPage from './pages/IndexPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <IndexPage /> },
      {
        path: 'contacts/:contactId',
        element: <ContactPage />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
