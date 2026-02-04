import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import EngHeader from '../components/EngHeader'
import EngSidebar from '../components/Sidebar/EngSidebar';

export default function Layout() {
  const {user, error, } = useAuth({middleware: 'auth'});
  return (
    <div className="flex h-screen overflow-hidden">
      <EngSidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <EngHeader />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
          <footer className="mt-8 text-center opacity-60">
          <p className="text-slate-600 text-xs">
            © 2026 BS&B Safety Systems. All rights reserved.
          </p>
        </footer>
      </main>
      </div>
    </div>
  );
}
