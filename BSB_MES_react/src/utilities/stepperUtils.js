export const getStepIndicatorClass = (stepNumber, currentStep) => {
  if (currentStep >= stepNumber) {
    // Active Step:
    return "w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-red-500/20 ring-4 ring-[#f0f4f8] transition-all duration-300";
  }
  // Pending Step
  return "w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-sm ring-4 ring-[#f0f4f8] transition-all duration-300";
};

export const getStepTextClass = (stepNumber, currentStep) => {
  return currentStep >= stepNumber
    ? "text-xs font-bold text-primary transition-colors duration-300"
    : "text-xs font-medium text-slate-400 transition-colors duration-300";
};