import { useContext, useState } from "react";
import { getStepIndicatorClass, getStepTextClass } from '../../../utilities/stepperUtils';
import MesContext from "../../../context/MesProvider";
import OrderFormHeader from "./OrderFormHeader";
import OrderFormFooter from "./OrderFormFooter";
import Step1OrderDetails from "./steps/Step1OrderDetails";
import Step2Items from "./steps/Step2OrderItems";
import Step3OrderInstructions from "./steps/Step3OrderInstructions";
import { useEmployees } from "../../../hooks/useEmployees";
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

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1OrderDetails formData={formData} handleChange={handleChange} getInputClass={getInputClass} initialData={initialData} errors={errors} />;
      case 2:
        return <Step2Items formData={formData} setFormData={setFormData} getInputClass={getInputClass} errors={errors} />;
      case 3:
        return <Step3Shipping formData={formData} handleChange={handleChange} errors={errors} />;
      case 4:
        return <Step4Review formData={formData} />;
      default:
        return <Step1OrderDetails formData={formData} handleChange={handleChange} errors={errors} />;
    }
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
              {renderActiveStep()}
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

