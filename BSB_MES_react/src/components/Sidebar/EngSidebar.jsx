import BrandLogo from "../../components/BrandLogo";

export default function EngSidebar() {
  return (
    <div classNameName="w-64 bg-white border-r border-border-subtle flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <BrandLogo />
        <p className="font-black text-xl tracking-tight text-charcoal">ADMIN</p>
      </div>
      <nav className="flex-1 px-3 mt-4 space-y-1">
        <a
          className="nav-link active flex items-center gap-3 px-4 py-3 rounded transition-all duration-200"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm">Dashboard</span>
        </a>
        <a
          className="nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200"
          href="#"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-sm">Orders</span>
        </a>
        <a
          className="nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200"
          href="#"
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-sm">Inventory</span>
        </a>
        <a
          className="nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200"
          href="#"
        >
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-sm">Reports</span>
        </a>
        <a
          className="nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm">Settings</span>
        </a>
      </nav>
    </div>
  );
}
