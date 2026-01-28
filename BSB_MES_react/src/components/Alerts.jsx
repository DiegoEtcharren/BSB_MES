export default function Alerts({children}) {
  return (
    <div className="mb-3 flex items-center gap-3 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] p-4">
      <span className="material-symbols-outlined text-[#991B1B] text-[20px] shrink-0">
        error
      </span>
      <p className="text-[#991B1B] text-sm font-semibold leading-tight">
        {children}
      </p>
    </div>
  );
}
