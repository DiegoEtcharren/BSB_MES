import useMES from "../../hooks/useMES"
import BrandLogo from "../../components/BrandLogo";

export default function EngSidebar() {
  const {activeTab, handleActiveTab} = useMES();
  return (
    <div className="w-64 bg-white border-r border-border-subtle flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <BrandLogo />
        <p className="font-black text-xl tracking-tight text-charcoal">ADMIN</p>
      </div>
      <nav className="flex-1 px-3 mt-4 space-y-1">
        <button
          className={`nav-link active flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 cursor-pointer w-full ${activeTab === "dashboard" ? "active" : ""}`}
          type="button"
          onClick={() => handleActiveTab("dashboard")}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <p className="text-sm">Dashboard</p>
        </button>
        <button
          className="nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 cursor-pointer w-full"
          type="button"
          onClick={() => handleActiveTab("orders")}
        >
          <span className="material-symbols-outlined">assignment</span>
          <p className="text-sm">Orders</p>
        </button>
        <button
          className="nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 cursor-pointer w-full"
          type="button"
          onClick={() => handleActiveTab("orders")}
        >
          <span className="material-symbols-outlined">person</span>
          <p className="text-sm">Operators</p>
        </button>
        <button
          className="nav-link flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 cursor-pointer w-full"
          type="button"
          onClick={() => handleActiveTab("operators")}
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <p className="text-sm">Products</p>
        </button>
      </nav>
    </div>
  );
}
