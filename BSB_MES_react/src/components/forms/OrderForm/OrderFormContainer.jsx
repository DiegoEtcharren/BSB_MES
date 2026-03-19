import { useContext, useState } from "react";
import { getStepIndicatorClass, getStepTextClass } from '../../../utilities/stepperUtilities';
import MesContext from "../../../context/MesProvider";
import OrderFormFooter from "./OrderFormFooter";
import Step1OrderDetails from "./steps/Step1OrderDetails";
import Step2ProductDetails from "./steps/Step2ProductDetails";
import Step3OrderBOM from "./steps/Step3OrderBOM";
import Step4OrderInstructions from "./steps/Step4OrderInstructions";
import { toast } from 'react-toastify';

export default function OrderForm({ initialData = null, onSuccess }) {
  const { closeModal } = useContext(MesContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // --- Step 1: Basic Order Information ---
    order_number: initialData?.order_number || "",
    previous_order: initialData?.previous_order || "",
    customer: initialData?.customer || "",
    customer_po: initialData?.customer_po || "",
    unit_price: initialData?.unit_price || "",
    quantity: initialData?.quantity || "",
    date_entered: initialData?.date_entered || "",
    required_date: initialData?.required_date || "",

    // --- Step 2: Product Specifications ---
    product_type_id: initialData?.product_type_id || "",
    size_units: initialData?.size_units || "",
    product_size_id: initialData?.product_size_id || "",
    custom_size_uom: initialData?.custom_size_uom || "",

    // --- Step 2: Pressure & Temperature Requirements ---
    burst_pressure: initialData?.burst_pressure || "",
    pressure_unit_id: initialData?.pressure_unit_id || "",
    temperature: initialData?.temperature || "",
    temperature_units: initialData?.temperature_units || "",

    // --- Step 3: BOM:

    // --- Step 4: Production Instructions ---
    stamping_mode: initialData?.stamping_mode || "none",
    stamping_data: initialData?.stamping_data || [],
    special_instructions: initialData?.special_instructions || "",
    packaging_notes: initialData?.packaging_notes || "",
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    const nextState = {
      ...prev,
      [name]: value,
    };

    // LOGIC: If selecting a Standard Size, clear Custom Size
    if (name === 'product_size_id' && value !== '') {
      nextState.custom_size_uom = '';
    }

    // LOGIC: If typing a Custom Size, clear Standard Size
    if (name === 'custom_size_uom' && value.trim() !== '') {
      nextState.product_size_id = '';
    }

    // Existing logic for clearing sizes when units change
    if (name === 'size_units') {
      nextState.product_size_id = '';
    }

    return nextState;
  });

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
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3OrderBOM
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step4OrderInstructions
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      default:
        return (
          <Step1OrderDetails
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
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
                { num: 3, label: "BOM"},
                { num: 4, label: "Order Instructions"},
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
              className="my-2 space-y-6 pr-2 pb-4 flex-1"
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

