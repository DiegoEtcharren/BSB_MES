import { useContext, useState } from "react";
import { getStepIndicatorClass, getStepTextClass } from '../../utilities/stepperUtils';
import MesContext from "../../context/MesProvider";
import { useEmployees } from "../../hooks/useEmployees";
import { toast } from 'react-toastify';

export default function OrderForm({ initialData = null, onSuccess }) {
  const { closeModal } = useContext(MesContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    order_number: initialData?.order_number || '',
    previous_order: initialData?.previous_order || '',
    customer: initialData?.customer || '',
    customer_po: initialData?.customer_po || '',
    unit_price: initialData?.unit_price || '',
    quantity: initialData?.quantity || '',
    date_entered: initialData?.date_entered || '',
    required_date: initialData?.required_date || '',
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

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
      <div className="flex flex-col flex-1 h-full overflow-hidden">
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

        <div class="flex flex-col flex-1 h-full overflow-hidden">
          {/* Stepper: */}
          <div className="bg-slate-100 shrink-0 px-8 py-2 border-b border-slate-200">
            <div className="flex items-center justify-between w-full relative max-w-2xl mx-auto">
              {[
                { num: 1, label: "Order Information" },
                { num: 2, label: "Items" },
                { num: 3, label: "Shipping" },
                { num: 4, label: "Review" },
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex flex-col items-center gap-2 z-10"
                >
                  <div className={getStepIndicatorClass(step.num, currentStep)}>
                    {currentStep > step.num ? (
                      <span className="material-symbols-outlined text-[16px]">
                        check
                      </span>
                    ) : (
                      step.num
                    )}
                  </div>
                  <span className={getStepTextClass(step.num, currentStep)}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* EndStepper */}
          {/* Form */}
          <div class="px-8 py-4 flex-1 overflow-y-auto">
            <form
              id="order_form"
              onSubmit={handleSubmit}
              className="my-5 space-y-6 pr-2 pb-4 flex-1"
            >
              {/* Order Details: */}
              <div>
                <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
                  Order Details
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="text-sm  text-charcoal"
                    htmlFor="order_number"
                  >
                    Order Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="order_number"
                      value={formData.order_number}
                      onChange={handleChange}
                      id="order_number"
                      placeholder="XXXXXXX-X"
                      className={`${getInputClass("order_number")}`}
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
                    className="text-sm text-charcoal"
                    htmlFor="previous_order"
                  >
                    Previous Order Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">
                        search
                      </span>
                    </span>
                    <input
                      type="text"
                      name="previous_order"
                      id="previous_order"
                      value={formData.previous_order}
                      onChange={handleChange}
                      placeholder="XXXXXXX-X"
                      className={`${getInputClass("previous_order")} pl-10`}
                    />
                    {errors?.previous_order && (
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                        <span className="material-symbols-outlined text-[18px]">
                          error
                        </span>
                      </span>
                    )}
                  </div>
                  {errors?.previous_order && (
                    <p className="text-xs text-primary font-medium mt-1">
                      {getErrorMsg("previous_order")}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-charcoal" htmlFor="customer">
                    Customer
                  </label>
                  <input
                    type="text"
                    name="customer"
                    id="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    placeholder="XXXX"
                    className={`${getInputClass("customer")}`}
                  />
                  {errors?.customer && (
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                      <span className="material-symbols-outlined text-[18px]">
                        error
                      </span>
                    </span>
                  )}
                  {errors?.customer && (
                    <p className="text-xs text-primary font-medium mt-1">
                      {getErrorMsg("customer")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm text-charcoal"
                    htmlFor="customer_po"
                  >
                    Customer PO
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="customer_po"
                      id="customer_po"
                      value={formData.customer_po}
                      onChange={handleChange}
                      placeholder="e.g. Manufacturing"
                      className={getInputClass("customer_po")}
                    />
                    {errors?.customer_po && (
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                        <span className="material-symbols-outlined text-[18px]">
                          error
                        </span>
                      </span>
                    )}
                  </div>
                  {errors?.customer_po && (
                    <p className="text-xs text-primary font-medium mt-1">
                      {getErrorMsg("customer_po")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-charcoal" htmlFor="unit_price">
                    Unit Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      name="unit_price"
                      id="unit_price"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.unit_price}
                      onChange={handleChange}
                      className={`${getInputClass("unit_price")} pl-7`}
                    />
                  </div>
                  {errors?.unit_price && (
                    <p className="text-xs text-primary font-medium mt-1">
                      {getErrorMsg("unit_price")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-charcoal" htmlFor="quantity">
                    Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      step="1"
                      min="0"
                      className={getInputClass("quantity")}
                    />
                    {errors?.quantity && (
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                        <span className="material-symbols-outlined text-[18px]">
                          error
                        </span>
                      </span>
                    )}
                  </div>
                  {errors?.quantity && (
                    <p className="text-xs text-primary font-medium mt-1">
                      {getErrorMsg("quantity")}
                    </p>
                  )}
                </div>
              </div>
              <div class="pt-2 border-t border-slate-100">
                <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
                  Timeline
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      class="block text-sm font-semibold text-charcoal mb-1.5"
                      for="date_entered"
                    >
                      Date Entered
                    </label>
                    <input
                      class="w-full rounded-md border-slate-300  shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5"
                      id="date_entered"
                      type="date"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-semibold text-charcoal mb-1.5"
                      for="required_date"
                    >
                      Required Date <span class="text-primary">*</span>
                    </label>
                    <input
                      class="w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5"
                      id="required_date"
                      type="date"
                    />
                  </div>
                </div>
              </div>
              {initialData && (
                <div className="space-y-2">
                  <label
                    className="text-sm font-bold text-charcoal"
                    htmlFor="status"
                  >
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
          {/* EndForm */}
          {/* Footer: */}
          <div className="shrink-0 px-8 py-5 bg-slate-50 border-t border-border-subtle flex items-center justify-between gap-3">
            <div>
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-lg font-bold text-sm text-slate-500 hover:text-charcoal hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2.5 rounded-lg font-bold text-sm text-charcoal bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>{" "}
                  Back
                </button>
              )}
            </div>

            <div>
              {currentStep < 4 ? (
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
          {/* EndFooter */}
        </div>
      </div>
    </>
  );
}

