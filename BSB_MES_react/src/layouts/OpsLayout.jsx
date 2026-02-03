import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import OpsSidebar from '../components/Sidebar/EngSidebar';

export default function OperatorLayout() {
  const {user, error } = useAuth({middleware: 'auth'});
  return (
    <div className="md:flex ">
      <OpsSidebar />
      <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
        <h1>Operator Layout</h1>
        <Outlet />
        <footer className="mt-8 text-center opacity-60">
          <p className="text-slate-600 text-xs">
            © 2026 BS&B Safety Systems. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
