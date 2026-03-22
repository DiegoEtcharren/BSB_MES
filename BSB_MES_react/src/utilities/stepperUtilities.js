// Utilities for new order form:

export const getStepperContainerClasses = (isActive) => {
  const baseClasses = "relative flex items-start p-4 rounded-lg transition-colors duration-200";
  const stateClasses = isActive
    ? "bg-red-50 border border-red-200 shadow-sm"
    : "hover:bg-slate-100 cursor-pointer";

  return `${baseClasses} ${stateClasses}`;
};

export const getStepperLineClasses = (isCompleted) => {
  const baseClasses = "absolute left-9 top-14 bottom-[-1rem] w-px";
  const stateClasses = isCompleted ? "bg-[var(--color-industrial-red)]" : "bg-slate-300";

  return `${baseClasses} ${stateClasses}`;
};

export const getStepperIconClasses = (isActive, isCompleted) => {
  const baseClasses = "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2";

  if (isActive) {
    return `${baseClasses} border-[var(--color-industrial-red)] bg-white text-[var(--color-industrial-red)]`;
  }

  if (isCompleted) {
    return `${baseClasses} border-[var(--color-industrial-red)] bg-[var(--color-industrial-red)] text-white`;
  }

  return `${baseClasses} border-slate-300 bg-slate-50 text-slate-400`;
};

export const getStepperTextClasses = (isActive, isCompleted) => {
  return {
    title: `text-sm font-semibold ${isActive || isCompleted ? 'text-slate-900' : 'text-slate-500'}`,
    description: `text-xs mt-1 ${isActive ? 'text-[var(--color-industrial-red-hover)]' : 'text-slate-500'}`
  };
};