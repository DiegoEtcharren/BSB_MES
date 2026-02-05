import { useAuth } from "../hooks/useAuth";
import MesContext from "../context/MesProvider";
import { useContext } from "react";

export default function EngHeader() {
  const { user } = useAuth({middleware : 'auth'});
  const { title } = useContext(MesContext);

  return (
      <header class="h-20 bg-white border-b border-border-subtle flex items-center justify-between px-8 shrink-0">
        <div class="flex items-center">
          <h2 class="text-xl font-extrabold text-charcoal">{title}</h2>
        </div>
        <div class="flex items-center gap-6">
          <button class="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-md font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]">
            <span class="material-symbols-outlined text-[20px]">add</span>
            ADD NEW ORDER
          </button>
          <div class="h-8 w-px bg-slate-200"></div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Logged in as
              </p>
              <p class="text-sm font-extrabold text-charcoal">
                Welcome, {user.name}
              </p>
            </div>
            <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <span class="material-symbols-outlined">account_circle</span>
            </div>
          </div>
        </div>
      </header>
  );
}

