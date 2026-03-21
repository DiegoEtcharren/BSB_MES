import { useContext } from "react";
import MesContext from "../../context/MesProvider";

export default function ModalOperator() {
  const { modalConfig, closeModal } = useContext(MesContext);
  if (!modalConfig.isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="shrink-0 px-8 py-6 border-b border-border-subtle flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-charcoal">
              {modalConfig.title}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {modalConfig.description}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-charcoal hover:text-primary-hover transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          {modalConfig.show}
        </div>
      </div>
    </div>
  );
}
