export default function OrderFormFooter({currentStep, closeModal, prevStep, nextStep, initialData}) {
  return (
    <div className="p-4 md:p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
      <div>
        {currentStep === 0 ? (
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-2.5 rounded-lg text-sm text-charcoal text-slate-500 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2.5 rounded-lg text-sm text-charcoal text-slate-500 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>{" "}
            Back
          </button>
        )}
      </div>

      <div>
        {currentStep < 6 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2.5 rounded-lg font-bold text-sm text-white bg-primary hover:bg-primary-hover shadow-lg shadow-red-500/20 transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
          >
            Next Step{" "}
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        ) : (
          <button
            type="submit"
            form="order_form"
            className="px-6 py-2.5 rounded-lg font-bold text-sm text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            {initialData ? "Save Changes" : "Create Order"}
          </button>
        )}
      </div>
    </div>
  );
}
