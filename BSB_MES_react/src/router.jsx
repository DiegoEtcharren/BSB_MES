import {createBrowserRouter} from 'react-router-dom'
import EngLayout from './layouts/EngLayout';
import AuthLayout from './layouts/AuthLayout';
import OpsLayout from './layouts/OpsLayout';
import Login from './views/Login';
import EngDashboard from './views/Eng/EngDashboard';
import OpsDashboard from './views/Ops/OpsDashboard';

const router = createBrowserRouter([
  {
    path: "/eng",
    element: <EngLayout />,
    children: [
      {
        index: true,
        element: <EngDashboard />,
      },
    ],
  },
  {
    path: "/ops",
    element: <OpsLayout />,
    children: [
      {
        index: true,
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