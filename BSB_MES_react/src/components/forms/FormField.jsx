import { getErrorMsg } from '../../utilities/formUtilities';

export default function FormField({
  label,
  name,
  errors,
  children,
  className = ''
}) {
  const errorMsg = getErrorMsg(errors, name);
  const hasError = !!errorMsg;
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm text-charcoal" htmlFor={name}>
        {label}
      </label>

      <div className="relative">
        {children}

        {hasError && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
            <span className="material-symbols-outlined text-[18px]">
              error
            </span>
          </span>
        )}
      </div>

      {hasError && (
        <p className="text-xs text-primary font-medium mt-1">
          {errorMsg}
        </p>
      )}
    </div>
  );
}