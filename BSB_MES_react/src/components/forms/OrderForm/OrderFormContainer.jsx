import { useContext, useState } from "react";
import { getStepIndicatorClass, getStepTextClass } from '../../../utilities/stepperUtilities';
import MesContext from "../../../context/MesProvider";
import OrderFormHeader from "./OrderFormHeader";
import OrderFormFooter from "./OrderFormFooter";
import Step1OrderDetails from "./steps/Step1OrderDetails";
import Step2ProductDetails from "./steps/Step2ProductDetails";
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

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1OrderDetails
            formData={formData}
            handleChange={handleChange}
            initialData={initialData}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2ProductDetails
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3OrderInstructions
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 4:
        return <Step4Review formData={formData} />;
      default:
        return (
          <Step1OrderDetails
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
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

        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Stepper: */}
          <div className="bg-slate-100 shrink-0 px-8 py-2 border-b border-slate-200">
            <div className="flex items-center justify-between w-full relative max-w-2xl mx-auto">
              {[
                { num: 1, label: "Order Information" },
                { num: 2, label: "Product Details" },
                { num: 3, label: "Order Insturctions"},
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
          <div className="px-8 py-4 flex-1 overflow-y-auto">
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
          <OrderFormFooter
            currentStep= {currentStep}
            closeModal={closeModal}
            prevStep={prevStep}
            nextStep={nextStep}
            initialData={initialData}
          />
          {/* EndFooter */}
        </div>
      </div>
    </>
  );
}

