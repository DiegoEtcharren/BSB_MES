import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Layout() {
  const {user, error } = useAuth({middleware: 'auth'});
  return (
    <main className="w-full flex flex-col my-0 md:my-5">
      <Outlet />
      <footer className="mt-8 text-center opacity-60">
        <p className="text-slate-600 text-xs">
          © 2026 BS&B Safety Systems. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
