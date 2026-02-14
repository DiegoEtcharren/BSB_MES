import { useRef, createRef, useContext } from "react";
import MesContext from "../../context/MesProvider";
import { useAuth } from "../../hooks/useAuth";

export default function OperatorForm() {
  const { closeModal } = useContext(MesContext);
  const { userRegister } = useAuth({middleware: 'engineering', url: '/'});

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

    userRegister(data);
  }
  return (
    <>
      <div className="p-6">
        <form id="operator-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="firstName"
              >
                Name
              </label>
              <input
                ref={nameRef}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary/20  transition-colors duration-200  text-sm placeholder:text-slate-400"
                id="firstName"
                placeholder="e.g. Juan"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-charcoal" htmlFor="lastName">
                Last Name
              </label>
              <input
                ref={lastnameRef}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary/20  transition-colors duration-200  text-sm placeholder:text-slate-400"
                id="lastName"
                placeholder="e.g. Jenkins"
                type="text"
              />
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary/20  transition-colors duration-200  text-sm placeholder:text-slate-400"
                  id="employeeId"
                  placeholder="XXXX"
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="department"
              >
                Department
              </label>
              <input
                ref={departmentRef}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary/20  transition-colors duration-200  text-sm placeholder:text-slate-400"
                id="department"
                placeholder="e.g. Manufacturing"
                type="text"
              />
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary/20  transition-colors duration-200  text-sm placeholder:text-slate-400"
                id="email"
                placeholder="name@bsbsystems.com"
                type="email"
              />
            </div>
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
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary/20  transition-colors duration-200  text-sm placeholder:text-slate-400 text-charcoal appearance-none bg-white"
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
          </div>
        </form>
      </div>
      <div className="px-8 py-5 bg-slate-50 border-t border-border-subtle flex items-center justify-end gap-3">
        <button
          className="px-6 py-2.5 rounded-lg font-bold text-sm text-charcoal bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm cursor-pointer"
          onClick={closeModal}>
          Cancel
        </button>
        <button
          type="submit"
          form="operator-form"
          className="px-6 py-2.5 rounded-lg font-bold text-sm text-white bg-primary hover:bg-primary-hover shadow-lg shadow-red-500/20 transition-all active:scale-[0.98] cursor-pointer">
          Create Account
        </button>
      </div>
    </>
  );
}
