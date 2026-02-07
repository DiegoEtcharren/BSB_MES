import { useAuth } from "../hooks/useAuth";
import MesContext from "../context/MesProvider";
import { useContext } from "react";
import ActionButton from "./ActionButton";

export default function EngHeader() {
  const { user } = useAuth({middleware : 'auth'});
  const { title, actionButton } = useContext(MesContext);

  return (
      <header class="h-20 bg-white border-b border-border-subtle flex items-center justify-between px-8 shrink-0">
        <div class="flex items-center">
          <h2 class="text-xl font-extrabold text-charcoal">{title}</h2>
        </div>
        <div class="flex items-center gap-6">
          <ActionButton
             title={actionButton?.label}
             onClick={actionButton?.onClick}
             icon={actionButton?.icon}
          />
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

