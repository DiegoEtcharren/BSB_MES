import { Outlet, Navigate} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Modal from '../components/ui/Modal';
import EngHeader from '../components/EngHeader';
import EngSidebar from '../components/Sidebar/EngSidebar';

export default function Layout() {
  const {user, error, isLoading} = useAuth({middleware: 'auth'});

  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                 {/* Simple CSS Spinner */}
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-slate-500 font-medium">Verifying Credentials...</p>
            </div>
        </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

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
      <Modal />
    </div>
  );
}
