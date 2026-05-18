import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { MesProvider } from './context/MesProvider';
import { MasterDataProvider } from './context/MasterDataContext';
import { toast, ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import router from './router';
import './index.css';
import { GlobalAntdProvider } from './GlobalAntdProvider';

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GlobalAntdProvider>
  <MasterDataProvider>
    <MesProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </MesProvider>
  </MasterDataProvider>
  </GlobalAntdProvider>
  // </StrictMode>,
);
