import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import BorrowedBooks from './pages/BorrowedBooks';

const router = createBrowserRouter([
  { path: '/', element: (<App><Dashboard /></App>), },
  { path: '/books', element: (<App><Books /></App>), },
  { path: '/borrowed-books', element: (<App><BorrowedBooks /></App>), }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
