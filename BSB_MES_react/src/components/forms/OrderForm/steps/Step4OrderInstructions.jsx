import { getInputClass } from "../../../../utilities/formUtilities";
import FormField from '../../../../components/forms/FormField';
import { Tabs, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function Step3OrderInstructions({
  formData,
  handleChange,
  setFormData,
  errors
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
      <div className="grid grid-cols-2 gap-4">
        <div className="p-2">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
            Nametag(s)
          </h3>
          <div className="flex flex-col items-start space-x-4 mb-6 mt-4">
            <div className="flex flex-col w-full">
              <label 
                htmlFor="stamping_mode_tabs"
                className="text-sm font-medium text-slate-600 w-32 shrink-0 mb-2"
              >
                Stamping Info:
              </label>
              <div className="w-full max-w-md flex flex-col items-center">
                <Tabs
                  id="stamping_mode_tabs"
                  value={formData.stamping_mode || "none"}
                  onValueChange={handleStampingModeChange}
                  className=""
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
            <div className="mt-4 w-full max-h-45 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {/* Condition 1: Zero labels (Empty State) */}
              {formData.stamping_data.length === 0 ? (
                <div className="text-slate-400 italic text-sm p-4 rounded-md">
                  No stamping data required.
                </div>
              ) : /* Condition 2: Exactly 1 label (Bulk/Single Mode) */
              formData.stamping_data.length === 1 ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="bulk_label_input_1"
                      className="text-xs font-semibold text-slate-500 uppercase whitespace-nowrap shrink-0 w-16"
                      >
                      Label
                    </label>
                    <input
                      id="bulk_label_input_1"
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
                <div className="flex flex-col gap-4">
                  {formData.stamping_data.map((item, index) => {
                    const keyName = Object.keys(item)[0];
                    return (
                      <div key={index} className="flex flex-row items-center">
                        <label 
                          htmlFor={uniqueInputId}
                          className="text-xs font-semibold text-slate-500 uppercase whitespace-nowrap shrink-0 w-16"
                        >
                          {keyName.replace("_", " ")}
                        </label>
                        <input
                          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-primary focus:border-primary focus:ring-primary/20"
                          type="text"
                          placeholder="Enter text..."
                          value={item[keyName] || ""}
                          onChange={(e) =>
                            handleNametagDataChange(e, index, keyName)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
            Order Instructions
          </h3>
          <div className="grid grid-cols-1 gap-2 mt-4">
            <FormField
              label="Special Instructions"
              name="special_instructions"
              htmlFor="special_instructions"
              errors={errors}
            >
              <textarea
                name="special_instructions"
                value={formData.special_instructions}
                onChange={handleChange}
                rows="3"
                id="special_instructions"
                placeholder="Enter special manufacturing instructions here..."
                className={getInputClass(!!errors?.special_instructions)}
              />
            </FormField>
            <FormField
              label="Shipping Instructions"
              name="shipping_instructions"
              htmlFor="shipping_instructions"
              errors={errors}
            >
              <textarea
                name="shipping_instructions"
                value={formData.shipping_instructions}
                onChange={handleChange}
                rows="3"
                id="shipping_instructions"
                placeholder="Enter shipping instructions here..."
                className={getInputClass(!!errors?.shipping_instructions)}
              />
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
}
