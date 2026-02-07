import { useAuth } from "../hooks/useAuth";
import MesContext from "../context/MesProvider";
import { useContext } from "react";
import ActionButton from "./ActionButton";

export default function EngHeader() {
  const { user } = useAuth({middleware : 'auth'});
  const { title, actionButton } = useContext(MesContext);

  return (
      <header className="h-20 bg-white border-b border-border-subtle flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center">
          <h2 className="text-xl font-extrabold text-charcoal">{title}</h2>
        </div>
        <div className="flex items-center gap-6">
          <ActionButton
             title={actionButton?.label}
             onClick={actionButton?.onClick}
             icon={actionButton?.icon}
          />
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Logged in as
              </p>
              <p className="text-sm font-extrabold text-charcoal">
                Welcome, {user.name}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
          </div>
        </div>
      </header>
  );
}

