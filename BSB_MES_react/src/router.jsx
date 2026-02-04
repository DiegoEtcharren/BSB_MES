import {createBrowserRouter} from 'react-router-dom'
import EngLayout from './layouts/EngLayout';
import AuthLayout from './layouts/AuthLayout';
import OpsLayout from './layouts/OpsLayout';
import Login from './views/Login';

import EngDashboard from './views/Eng/EngDashboard';
import EngOrders from './views/Eng/EngOrders';
import EngOperators from './views/Eng/EngOperators';
import EngProducts from './views/Eng/EngProducts';

import OpsDashboard from './views/Ops/OpsDashboard';

const router = createBrowserRouter([
  {
    path: "/eng",
    element: <EngLayout />,
    children: [
      {
        path: "dashboard",
        element: <EngDashboard />,
      },
      {
        path: "orders",
        element: <EngOrders />,
      },
      {
        path: "operators",
        element: <EngOperators />,
      },
      {
        path: "products",
        element: <EngProducts />,
      },
    ],
  },
  {
    path: "/ops",
    element: <OpsLayout />,
    children: [
      {
        path: "dashboard",
        element: <OpsDashboard />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;