import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MesProvider } from "../context/MesProvider";
import EngSidebar from '../components/Sidebar/EngSidebar';

export default function Layout() {
  const {user, error } = useAuth({middleware: 'auth'});
  return (
    <div className="md:flex ">
      <EngSidebar />
      <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
        <div class="text-right">
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">Logged in as</p>
          <p class="text-sm font-extrabold text-charcoal">Welcome, Alex Rivera</p>
        </div>
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
