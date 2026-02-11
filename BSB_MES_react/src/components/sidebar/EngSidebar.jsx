import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import BrandLogo from "../BrandLogo";

export default function EngSidebar() {
  const location = useLocation();
  const {logout, user} = useAuth({middleware : 'auth'});

  return (
    <aside className="w-64 bg-white border-r border-border-subtle flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
          <BrandLogo />
          <p className="font-black text-xl tracking-tight text-charcoal">
            ADMIN
          </p>
        </div>
        <nav className="flex-1 px-3 mt-4 space-y-1">
          <Link
            to="/eng/dashboard"
            className={`nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 cursor-pointer w-full ${location.pathname === "/eng/dashboard" ? "active" : ""}`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <p className="text-sm">Dashboard</p>
          </Link>
          <Link
            to="/eng/orders"
            className={`nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 cursor-pointer w-full ${location.pathname === "/eng/orders" ? "active" : ""}`}
          >
            <span className="material-symbols-outlined">assignment</span>
            <p className="text-sm">Orders</p>
          </Link>
          <Link
            to="/eng/operators"
            className={`nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 cursor-pointer w-full ${location.pathname === "/eng/operators" ? "active" : ""}`}
          >
            <span className="material-symbols-outlined">person</span>
            <p className="text-sm">Operators</p>
          </Link>
          <Link
            to="/eng/products"
            className={`nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 cursor-pointer w-full ${location.pathname === "/eng/products" ? "active" : ""}`}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            <p className="text-sm">Products</p>
          </Link>
        </nav>
        <div className="p-4 border-t border-border-subtle">
          <button
            className="flex items-center gap-3 px-4 py-2 w-full text-slate-500 hover:text-primary transition-colors text-sm font-medium cursor-pointer"
            type="button"
            onClick={logout}
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
    </aside>
  );
}
