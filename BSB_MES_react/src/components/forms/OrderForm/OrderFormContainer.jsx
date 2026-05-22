import { useContext, useState, useEffect} from "react";
import axiosClient from '../../../config/axios';
import {
  ClipboardList,
  Tag,
  Package,
  CheckCircle,
  Gauge,
  Boxes,
  FileText,
  FileCheck,
  Paperclip
} from 'lucide-react';
import { getStepperContainerClasses, getStepperLineClasses, getStepperIconClasses, getStepperTextClasses} from '../../../utilities/stepperUtilities';
import { getTodayDateString } from '../../../utilities/generalUtilities';
import MesContext from "../../../context/MesProvider";
import OrderFormFooter from "./OrderFormFooter";
import Step1OrderDetails from "./steps/Step1OrderDetails";
import Step2ProductDetails from "./steps/Step2ProductDetails";
import Step3OrderTol from "./steps/Step3OrderTol";
import Step4OrderBOM from "./steps/Step4OrderBOM";
import Step5OrderInstructions from "./steps/Step5OrderInstructions";
import Step6NameTags from "./steps/Step6NameTags";
import Step7OrderCerts from "./steps/Step7OrderCerts";
import Step8Attachments from "./steps/Step8Attachments";
import { useProductionOrders } from "../../../hooks/useProductionOrders";
import { toast } from 'react-toastify';

export default function OrderForm({ initialData = null, onSuccess }) {
  const { closeModal } = useContext(MesContext);
  const [currentStep, setCurrentStep] = useState(0);
  const { saveProductionOrder } = useProductionOrders();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // --- Step 1: Basic Order Information ---
    order_number: initialData?.order_number || "",
    previous_order: (() => {
      if (!initialData) return "";
      if (typeof initialData.previous_order === "string") {
        return initialData.previous_order;
      }
      if (initialData.previous_order && typeof initialData.previous_order === "object") {
        return initialData.previous_order.order_number || "";
      }
      if (initialData.previous_order_legacy) {
        return initialData.previous_order_legacy;
      }
      if (initialData.legacy_previous_order_number) {
        return initialData.legacy_previous_order_number;
      }
      if (initialData.previous_order_id) {
        return initialData.previous_order?.order_number || String(initialData.previous_order_id);
      }
      return "";
    })(),
    customer: initialData?.customer || "",
    customer_po: initialData?.customer_po || "",
    unit_price: initialData?.unit_price || "",
    quantity: initialData?.quantity || 0,
    date_entered: initialData?.date_entered || getTodayDateString(),
    required_date: initialData?.required_date || "",

    // --- Step 2: Product Specifications ---
    product_type_id: initialData?.product_type_id || "",
    size_units: initialData?.size_units || "",
    product_size_id: initialData?.product_size_id || "",
    custom_product_size: initialData?.custom_product_size || "",
    custom_size_uom: initialData?.custom_size_uom || "",

    // --- Step 2: Pressure & Temperature Requirements ---
    burst_pressure: initialData?.specs.burst_pressure || "",
    pressure_unit_id: initialData?.pressure_unit_id || "",
    temperature: initialData?.specs.temperature || "",
    temperature_units: initialData?.temperature_units || "",

    // --- Step 3: Manufacturing Ranges ---
    manufacturing_range_id: initialData?.manufacturing_range_id || "",
    lower_manufacturing_range: initialData?.lower_manufacturing_range || "",
    upper_manufacturing_range: initialData?.upper_manufacturing_range || "",

    // --- Step 3: BOM:
    bom: initialData?.bom || [],

    // --- Step 4: Production Instructions ---
    stamping_mode: initialData?.stamping_mode || "none",
    stamping_data: initialData?.stamping_data || [],
    special_instructions: initialData?.special_instructions || "",
    packaging_notes: initialData?.packaging_notes || "",

    // --- Step 7: Certificates ---
    certificates: initialData?.certificates || [],
    custom_certificates: initialData?.custom_certificates || [],

    // --- Step 8: Attachments ---
    attachments: initialData?.attachments || [],
  });

  const [manufacturingRangesRules, setManufacturingRangesRules] = useState([]);

  console.log(initialData);

  useEffect(() => {
    if (!formData.product_type_id) return;

    const fetchProductData = async () => {

      try {
        const response = await axiosClient.get(
          `/api/v1/rules/product/${formData.product_type_id}`
        );
        setManufacturingRangesRules(response.data.data);
      } catch (err) {
        console.error("Critical MES Error: Could not fetch product rules.", err);
        setManufacturingRangesRules([]);
      }
    };

    fetchProductData();
  }, [formData.product_type_id]);

    useEffect(() => {
      if (!formData.burst_pressure || !formData.manufacturing_range_id) return;

      const fetchProductData = async () => {
        try {
          const response = await axiosClient.get(
            `/api/v1/rules/product/${formData.product_type_id}`,
          );
          setManufacturingRangesRules(response.data.data);
        } catch (err) {
          console.error(
            "Critical MES Error: Could not fetch product rules.",
            err,
          );
          setManufacturingRangesRules([]);
        }
      };

      fetchProductData();
    }, [formData.burst_pressure, formData.manufacturing_range_id]);


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
      description: "Product Configuration",
    },
    {
      id: "pressure-tolerances",
      title: "Pressure Ranges",
      icon: Gauge,
      description: "Manufacturing Range and Design Range",
    },
    {
      id: "bom",
      title: "BOM",
      icon: Boxes,
      description: "Order materials",
    },
    {
      id: "order-instructions",
      title: "Order Instructions",
      icon: FileText,
      description: "Special manufacturing and shipping instructions",
    },
    {
      id: "nametags",
      title: "Nametags",
      icon: Tag,
      description: "Special information on nametags",
    },
    {
      id: "certificates",
      title: "Certificates",
      icon: FileCheck,
      description: "Required Quality Certificates",
    },
    {
      id: "attachments",
      title: "Attachments",
      icon: Paperclip,
      description: "Upload order files",
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
      nextState.custom_product_size = '';
      nextState.custom_size_uom = '';
    }

    // LOGIC: If typing a Custom Size, clear Standard Size
    if (name === 'custom_product_size' && value.trim() !== '') {
      nextState.product_size_id = '';
      nextState.custom_size_uom = nextState.size_units; // ensure uom tracks units
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
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    toast
      .promise(
        saveProductionOrder(formData).catch((error) => {
          if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors);
          }
          throw error;
        }),
        {
          pending: "Registering new MES Order...",
          success: {
            render({ data }) {
              const order_number = data?.data?.order_number;
              console.log(data);
              return `Order ${order_number} created successfully`;
            },
          },
          error: {
            render({ data }) {
              if (data?.response?.status === 422) {
                return "Validation failed. Please correct the highlighted fields.";
              }
              return (
                data?.response?.data?.message ||
                "System error. Could not add order."
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
            manufacturingRangesRules={manufacturingRangesRules}
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
          <Step5OrderInstructions
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <Step6NameTags
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 6:
        return (
          <Step7OrderCerts
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 7:
        return (
          <Step8Attachments
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
                      onClick={() => setCurrentStep(index)}
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
            <div className="flex-1 p-6 md:p-10 pt-8 md:pt-4 overflow-y-auto">
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

