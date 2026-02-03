import useMES from "../../hooks/useMES"
import BrandLogo from "../../components/BrandLogo";

export default function EngSidebar() {
  const {handleClickSidebarOption, currentSidebarOption} = useMES();
  return (
    <div classNameName="w-64 bg-white border-r border-border-subtle flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <BrandLogo />
        <p className="font-black text-xl tracking-tight text-charcoal">ADMIN</p>
      </div>
      <nav className="flex-1 px-3 mt-4 space-y-1">
        <button
          className="nav-link active flex items-center gap-3 px-4 py-3 rounded transition-all duration-200"
          type="button"
          onClick={() => handleClickSidebarOption('dahboard')}
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm">Main</span>
        </button>
      </nav>
    </div>
  );
}
