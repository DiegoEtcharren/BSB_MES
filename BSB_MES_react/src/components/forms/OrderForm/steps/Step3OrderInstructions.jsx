import { getInputClass } from "../../../../utilities/formUtilities";

export default function Step3OrderInstructions({
  formData,
  handleChange,
  errors,
}) {
  return (
    <>
      <div>
        <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
          Order Instructions
        </h3>
      </div>
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
