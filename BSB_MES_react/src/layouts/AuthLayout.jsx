import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return (
    <>
      <div className="flex flex-col">
        <main className="w-full flex flex-col my-0 md:my-5">
          <Outlet />
        </main>
        <footer className="mt-8 text-center opacity-60">
          <p className="text-slate-600 text-xs">
            © 2026 BS&B Safety Systems. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
