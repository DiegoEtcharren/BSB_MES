import { getInputClass } from "../../../../utilities/formUtilities";
import { Tabs, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function Step3OrderInstructions({
  formData,
  handleChange,
  setFormData,
  errors,
}) {

  // Nametag status:
  const handleStampingModeChange = (newMode) => {
    setFormData((prev) => {
      const nextState = {
        ...prev,
        stamping_mode: newMode,
      };

      if (newMode === "none") {
        nextState.stamping_data = [];
      } else if (newMode === "bulk" && formData.quantity !== 0) {
        nextState.stamping_data = [{ label_1: "" }];
      } else if (newMode === "individual" && formData.quantity !== 0) {
        nextState.stamping_data = Array.from(
          { length: formData.quantity },
          (_, index) => ({
            [`label_${index + 1}`]: "",
          }),
        );
      }
      return nextState;
    });
  };

// Handle form data of nametag:
const handleNametagDataChange = (e, index, keyName) => {
  const newValue = e.target.value;

  setFormData((prev) => {
    const updatedStampingData = [...prev.stamping_data];

    updatedStampingData[index] = {
      ...updatedStampingData[index],
      [keyName]: newValue,
    };
    return {
      ...prev,
      stamping_data: updatedStampingData,
    };
  });
};


  return (
    <>
      <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
        Nametag(s)
      </h3>
      <div className="flex items-center space-x-4 mb-6">
        <label className="text-sm font-medium text-slate-600 w-32 shrink-0">
          Stamping Info:
        </label>
        <div className="flex-1">
          <Tabs
            value={formData.stamping_mode || "none"}
            onValueChange={handleStampingModeChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 bg-slate-100 p-1 rounded-lg">
              <TabsTrigger
                value="none"
                className="cursor-pointer data-[state=active]:bg-background data-[state=active]:text-[var(--color-primary)] text-slate-600 rounded-md"
              >
                None
              </TabsTrigger>
              <TabsTrigger
                value="bulk"
                className="cursor-pointer data-[state=active]:bg-background data-[state=active]:text-[var(--color-primary)] text-slate-600 rounded-md"
              >
                Bulk
              </TabsTrigger>
              <TabsTrigger
                value="individual"
                className="cursor-pointer data-[state=active]:bg-background data-[state=active]:text-[var(--color-primary)] text-slate-600 rounded-md"
              >
                Individual
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="mt-4">
        {/* Condition 1: Zero labels (Empty State) */}
        {formData.stamping_data.length === 0 ? (
          <div className="text-slate-400 italic text-sm p-4 rounded-md">
            No stamping data required.
          </div>
        ) : /* Condition 2: Exactly 1 label (Bulk/Single Mode) */
        formData.stamping_data.length === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Label
              </label>
              <input
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-primary focus:border-primary focus:ring-primary/20"
                type="text"
                placeholder="Enter text..."
                value={formData.stamping_data[0].label_1 || ""}
                onChange={(e) => handleNametagDataChange(e, 0, "label_1")}
              />
            </div>
          </div>
        ) : (
          /* Condition 3: More than 1 label (Individual Mode) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {formData.stamping_data.map((item, index) => {
              const keyName = Object.keys(item)[0];
              return (
              <div key={index} className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  {keyName.replace("_", " ")}
                </label>
                <input
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-primary focus:border-primary focus:ring-primary/20"
                  type="text"
                  placeholder="Enter text..."
                  value={item[keyName] || ""}
                  onChange={(e) => handleNametagDataChange(e, index, keyName)}
                />
              </div>
              );
            })}
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
        Order Instructions
      </h3>
      <div className="grid grid-cols-1 gap-2">
        <div className="space-y-2">
          <label
            className="text-sm  text-charcoal"
            htmlFor="special_instructions"
          >
            Special Instructions
          </label>
          <div className="relative">
            <textarea
              name="special_instructions"
              value={formData.special_instructions}
              onChange={handleChange}
              rows="4"
              id="special_instructions"
              placeholder="Enter special manufacturing instructions here..."
              className={getInputClass(!!errors?.special_instructions)}
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
      </div>
      <div className="grid grid-cols-1 gap-2">
        <div className="space-y-2">
          <label
            className="text-sm  text-charcoal"
            htmlFor="shipping_instructions"
          >
            Shipping Instructions
          </label>
          <div className="relative">
            <textarea
              name="shipping_instructions"
              value={formData.shipping_instructions}
              onChange={handleChange}
              rows="4"
              id="shipping_instructions"
              placeholder="Enter special manufacturing instructions here..."
              className={getInputClass(!!errors?.shipping_instructions)}
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
      </div>
    </>
  );
}
