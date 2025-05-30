import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import {ClerkProvider} from "@clerk/clerk-react"
import Homepage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import Write from './routes/Write.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import PostListItem from './components/PostListItem.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient=new QueryClient()

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/test",
        element: <SinglePostPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/:slug",
        element: <PostListPage />
      }
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
  
)
