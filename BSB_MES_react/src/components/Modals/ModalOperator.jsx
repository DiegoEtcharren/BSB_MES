import { useContext } from "react";
import MesContext from "../context/MesProvider";

export default function ModalOperator() {
  const { modal } = useContext(MesContext);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-charcoal">System Action</h3>
          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-charcoal transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6">{modalConfig.show}</div>
      </div>
    </div>
  );
}
