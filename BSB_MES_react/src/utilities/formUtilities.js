export const getInputClass = (hasError) => {
  const baseClass =
    "w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring transition-colors duration-200 text-sm placeholder:text-slate-400";

  if (hasError) {
    return `${baseClass} border-primary focus:border-primary focus:ring-primary/20 bg-red-50/10`;
  }

  return `${baseClass} border-slate-300 focus:outline-primary focus:border-primary focus:ring-primary/20`;
};

export const getErrorMsg = (errors, fieldName) => {
  if (!errors || !errors[fieldName]) return null;
  return Array.isArray(errors[fieldName])
    ? errors[fieldName][0]
    : errors[fieldName];
};
