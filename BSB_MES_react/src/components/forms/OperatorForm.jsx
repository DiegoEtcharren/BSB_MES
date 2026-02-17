import { useRef, createRef, useContext, useState } from "react";
import MesContext from "../../context/MesProvider";
import { useAuth } from "../../hooks/useAuth";

export default function OperatorForm() {
  const { closeModal } = useContext(MesContext);
  const { userRegister } = useAuth({middleware: 'engineering', url: '/'});
  const [errors, setErrors] = useState({});

  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const employeeIDRef = useRef(null);
  const departmentRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      first_name : nameRef.current.value,
      last_name : lastnameRef.current.value,
      employee_number : employeeIDRef.current.value,
      department : departmentRef.current.value,
      email : emailRef.current.value,
      role : roleRef.current.value,
    }

    await userRegister(data, setErrors);
  }
  const getInputClass = (fieldName) => {
    const baseClass =
      "w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring transition-colors duration-200 text-sm placeholder:text-slate-400";

    if (errors[fieldName]) {
      return `${baseClass} border-primary focus:border-primary focus:ring-primary/20 bg-red-50/10`;
    }
    return `${baseClass} border-slate-300 focus:outline-primary focus:border-primary focus:ring-primary/20`;
  };

  const getErrorMsg = (fieldName) => {
    if (!errors || !errors[fieldName]) return null;
    return Array.isArray(errors[fieldName])
      ? errors[fieldName][0]
      : errors[fieldName];
  };

  return (
    <>
      <div className="p-6">
        {Object.keys(errors).length > 0 ? (
          <div className="bg-red-50 border border-primary/20 text-primary px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
              error
            </span>
            <div>
              <p className="font-bold text-sm">Action Failed</p>
              <p className="text-sm opacity-90">
                Please correct the errors below to continue.
              </p>
            </div>
          </div>
        ) : null}
        <form id="operator-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="firstName"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  ref={nameRef}
                  className={getInputClass('first_name')}
                  id="firstName"
                  placeholder="e.g. Juan"
                  type="text"
                />
                {errors?.first_name && (<span class="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                  <span class="material-symbols-outlined text-[18px]">
                    error
                  </span>
                </span>)}
              </div>
              {errors?.first_name && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg('first_name')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  ref={lastnameRef}
                  className={getInputClass('first_name')}
                  id="lastName"
                  placeholder="e.g. Jenkins"
                  type="text"
                />
                {errors?.last_name && (<span class="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                  <span class="material-symbols-outlined text-[18px]">
                    error
                  </span>
                </span>)}
              </div>
              {errors?.last_name && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg('last_name')}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="employeeId"
              >
                Employee ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">
                    badge
                  </span>
                </span>
                <input
                  ref={employeeIDRef}
                  className={`${getInputClass('employee_number')} pl-10`}
                  id="employeeId"
                  placeholder="XXXX"
                  type="text"
                />
                {errors?.employee_number && (<span class="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                  <span class="material-symbols-outlined text-[18px]">
                    error
                  </span>
                </span>)}
              </div>
              {errors?.employee_number && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg('employee_number')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="department"
              >
                Department
              </label>
              <div className="relative">
                <input
                  ref={departmentRef}
                  className={getInputClass('department')}
                  id="department"
                  placeholder="e.g. Manufacturing"
                  type="text"
                />
                {errors?.department && (<span class="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                  <span class="material-symbols-outlined text-[18px]">
                    error
                  </span>
                </span>)}
              </div>
              {errors?.department && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg('department')}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-charcoal" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
              </span>
              <input
                ref={emailRef}
                className={`${getInputClass('email')} pl-10`}
                id="email"
                placeholder="name@bsbsystems.com"
                type="email"
              />
                {errors?.email && (<span class="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                  <span class="material-symbols-outlined text-[18px]">
                    error
                  </span>
                </span>)}
            </div>
              {errors?.email && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg('email')}
                </p>
              )}
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-bold text-charcoal"
              htmlFor="accessLevel"
            >
              Access Level
            </label>
            <div className="relative">
              <select
                ref={roleRef}
                className={`${getInputClass('role')} appearance-none bg-white`}
                id="accessLevel"
              >
                <option value="">Select a role...</option>
                <option value="operator">Operator (Standard Access)</option>
                <option value="supervisor">Engineering (Full Access)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </div>
            </div>
            {errors?.role && (
              <p className="text-xs text-primary font-medium mt-1">
                {getErrorMsg('role')}
              </p>
            )}
          </div>
        </form>
      </div>
      <div className="px-8 py-5 bg-slate-50 border-t border-border-subtle flex items-center justify-end gap-3">
        <button
          className="px-6 py-2.5 rounded-lg font-bold text-sm text-charcoal bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm cursor-pointer"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          form="operator-form"
          className="px-6 py-2.5 rounded-lg font-bold text-sm text-white bg-primary hover:bg-primary-hover shadow-lg shadow-red-500/20 transition-all active:scale-[0.98] cursor-pointer"
        >
          Create Account
        </button>
      </div>
    </>
  );
}
