import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import router from './router/router.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

if (!localStorage.getItem("theme")) {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
}

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider >
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </QueryClientProvider>

)
