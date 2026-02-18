import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { MesProvider } from './context/MesProvider';
import { toast, ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import router from './router';
import './index.css';

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <MesProvider>
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      />
    <RouterProvider router={router} />
  </MesProvider>,
  // </StrictMode>,
);
