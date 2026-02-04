import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MesProvider } from './context/MesProvider'
import router from './router'
import './index.css'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <MesProvider>
      <RouterProvider router={router} />
    </MesProvider>
  // </StrictMode>,
)
