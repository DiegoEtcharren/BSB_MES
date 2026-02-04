import { Link, useLocation } from 'react-router-dom';
import useMES from "../../hooks/useMES"
import BrandLogo from "../../components/BrandLogo";

export default function EngSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-border-subtle flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <BrandLogo />
        <p className="font-black text-xl tracking-tight text-charcoal">ADMIN</p>
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
    </div>
  );
}
