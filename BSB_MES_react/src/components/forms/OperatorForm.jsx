import { useRef, createRef, useContext, useState } from "react";
import MesContext from "../../context/MesProvider";
import { useEmployees } from "../../hooks/useEmployees";
import { toast } from 'react-toastify';

export default function OperatorForm({ initialData = null, onSuccess }) {
  const { closeModal } = useContext(MesContext);
  const [errors, setErrors] = useState({});
  const { saveEmployee } = useEmployees();

  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || "",
    last_name: initialData?.last_name || "",
    employee_number: initialData?.employee_number || "",
    department: initialData?.department || "",
    email: initialData?.email || "",
    role: initialData?.role || "",
    status: initialData?.status ?? 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const id = initialData?.id;

    toast
      .promise(
        saveEmployee(formData, id).catch((error) => {
          if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors);
          }
          throw error;
        }),
        {
          pending: id ? "Updating MES user..." : "Registering new MES user...",
          success: {
            render({ data }) {
              const employee_number = data?.data?.employee?.employee_number;
              return id
                ? `User ${employee_number} updated successfully`
                : `User ${employee_number} registered successfully`;
            },
          },
          error: {
            render({ data }) {
              if (data?.response?.status === 422) {
                return "Validation failed. Please correct the highlighted fields.";
              }
              return (
                data?.response?.data?.message ||
                "System error. Could not register user."
              );
            },
          },
        },
      )
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
        closeModal();
      })
      .catch(() => {
      });
  };

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
      <div className="p-6 pb-2">
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
        <form
          id="operator-form"
          onSubmit={handleSubmit}
          className="space-y-6 overflow-y-auto max-h-[50vh] pr-2 pb-4"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="first_name"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  // required
                  id="first_name"
                  placeholder="e.g. Juan"
                  className={`${getInputClass("first_name")}`}
                />
                {errors?.first_name && (
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">
                      error
                    </span>
                  </span>
                )}
              </div>
              {errors?.first_name && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg("first_name")}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="e.g. Jenkins"
                  className={`${getInputClass("last_name")}`}
                />
                {errors?.last_name && (
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">
                      error
                    </span>
                  </span>
                )}
              </div>
              {errors?.last_name && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg("last_name")}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="text-sm font-bold text-charcoal"
                htmlFor="employee_number"
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
                  type="text"
                  name="employee_number"
                  id="employee_number"
                  value={formData.employee_number}
                  onChange={handleChange}
                  placeholder="XXXX"
                  className={`${getInputClass("employee_number")} pl-10`}
                />
                {errors?.employee_number && (
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">
                      error
                    </span>
                  </span>
                )}
              </div>
              {errors?.employee_number && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg("employee_number")}
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
                  type="text"
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Manufacturing"
                  className={getInputClass("department")}
                />
                {errors?.department && (
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">
                      error
                    </span>
                  </span>
                )}
              </div>
              {errors?.department && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg("department")}
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
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@bsbsystems.com"
                className={`${getInputClass("email")} pl-10`}
              />
              {errors?.email && (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                  <span className="material-symbols-outlined text-[18px]">
                    error
                  </span>
                </span>
              )}
            </div>
            {errors?.email && (
              <p className="text-xs text-primary font-medium mt-1">
                {getErrorMsg("email")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-charcoal" htmlFor="role">
              Access Level
            </label>
            <div className="relative">
              <select
                value={formData.role}
                onChange={handleChange}
                className={`${getInputClass("role")} appearance-none bg-white`}
                name="role"
                id="role"
              >
                <option value="">Select a role...</option>
                <option value="operator">Operator (Standard Access)</option>
                <option value="engineer">Engineering (Full Access)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </div>
            </div>
            {errors?.role && (
              <p className="text-xs text-primary font-medium mt-1">
                {getErrorMsg("role")}
              </p>
            )}
          </div>
          {initialData && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-charcoal" htmlFor="status">
                Account Status
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={handleChange}
                  className={`${getInputClass("status")} appearance-none bg-white`}
                  name="status"
                  id="status"
                >
                  <option value="active">Active</option>
                  <option value="on_leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </div>
              </div>
              {errors?.role && (
                <p className="text-xs text-primary font-medium mt-1">
                  {getErrorMsg("role")}
                </p>
              )}
            </div>
          )}
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
          {initialData ? "Save Changes" : "Create Account"}
        </button>
      </div>
    </>
  );
}
