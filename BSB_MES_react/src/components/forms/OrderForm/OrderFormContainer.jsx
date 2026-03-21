import { useContext, useState } from "react";
import {
  ClipboardList,
  Factory,
  Package,
  CheckCircle,
  X,
  ChevronRight,
  AlertCircle,
  Gauge,
  Boxes,
  FileText,
  FileCheck
} from 'lucide-react';
import { getStepperContainerClasses, getStepperLineClasses, getStepperIconClasses, getStepperTextClasses} from '../../../utilities/stepperUtilities';
import MesContext from "../../../context/MesProvider";
import OrderFormFooter from "./OrderFormFooter";
import Step1OrderDetails from "./steps/Step1OrderDetails";
import Step2ProductDetails from "./steps/Step2ProductDetails";
import Step3OrderTol from "./steps/Step3OrderTol";
import Step4OrderBOM from "./steps/Step4OrderBOM";
import Step5OrderCerts from "./steps/Step5OrderCerts";
import Step6OrderInstructions from "./steps/Step6OrderInstructions";
import { toast } from 'react-toastify';

export default function OrderForm({ initialData = null, onSuccess }) {
  const { closeModal } = useContext(MesContext);
  const [currentStep, setCurrentStep] = useState(0);
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

  const steps = [
    {
      id: "order-info",
      title: "Order Information",
      icon: ClipboardList,
      description: "Basic production requirements",
    },
    {
      id: "product-details",
      title: "Product Details",
      icon: Package,
      description: "Specific product configurations",
    },
    {
      id: "pressure-tolerances",
      title: "Pressure Tolerances",
      icon: Gauge,
      description: "Required testing margins",
    },
    {
      id: "bom",
      title: "BOM",
      icon: Boxes,
      description: "Verify bill of materials",
    },
    {
      id: "order-instructions",
      title: "Order Instructions",
      icon: FileText,
      description: "Special operator notes",
    },
    {
      id: "certificates",
      title: "Certificates",
      icon: FileCheck,
      description: "Compliance and QA documents",
    },
  ];

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
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const id = initialData?.id;
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1OrderDetails
            formData={formData}
            handleChange={handleChange}
            initialData={initialData}
            errors={errors}
          />
        );
      case 1:
        return (
          <Step2ProductDetails
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step3OrderTol
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step4OrderBOM
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step5OrderCerts
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <Step6OrderInstructions
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
        {/* Modal Container */}
        <div className="flex flex-col md:flex-row w-full max-w-6xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Left Side Stepper: */}
          <div className="hidden md:flex flex-col w-full md:w-1/3 lg:w-1/4 bg-slate-50 border-r border-slate-200 p-6">
            <div className="flex-1 overflow-y-auto pr-2">
              <nav className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  const textClasses = getStepperTextClasses(
                    isActive,
                    isCompleted,
                  );
                  return (
                    <div
                      key={step.id}
                      className={getStepperContainerClasses(isActive)}
                    >
                      {/* Connecting Line (except last item) */}
                      {index !== steps.length - 1 && (
                        <div className={getStepperLineClasses(isCompleted)} />
                      )}

                      <div
                        className={getStepperIconClasses(isActive, isCompleted)}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>

                      <div className="ml-4">
                        <h3 className={textClasses.title}>{step.title}</h3>
                        <p className={textClasses.description}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
          {/* Right Side Form: */}
          <div className="flex-1 flex flex-col relative h-full">
            <div className="flex-1 p-6 md:p-10 pt-12 md:pt-10 overflow-y-auto">
              <form
                id="order_form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {renderActiveStep()}
              </form>
            </div>

            <OrderFormFooter
              currentStep={currentStep}
              closeModal={closeModal}
              prevStep={prevStep}
              nextStep={nextStep}
              initialData={initialData}
            />
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

