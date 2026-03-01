import { useContext } from "react";
import MesContext from "../../context/MesProvider";

export default function ModalOperator() {
  const { modalConfig, closeModal } = useContext(MesContext);
  if (!modalConfig.isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-border-subtle flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-charcoal">
              {modalConfig.title}
            </h3>
            <p className="text-slate-500 text-sm mt-1">{modalConfig.description}</p>
          </div>
          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-charcoal hover:text-primary-hover transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {modalConfig.show}
      </div>
    </div>
  );
}
