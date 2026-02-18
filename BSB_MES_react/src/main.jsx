import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { sileo, Toaster } from "sileo";
import { RouterProvider } from 'react-router-dom';
import { MesProvider } from './context/MesProvider';
import router from './router';
import './index.css';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <MesProvider>
      <Toaster/>
      <RouterProvider router={router} />
    </MesProvider>
  // </StrictMode>,
)
