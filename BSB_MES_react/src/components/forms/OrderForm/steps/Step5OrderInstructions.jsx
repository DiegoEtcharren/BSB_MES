import { getInputClass } from "../../../../utilities/formUtilities";
import FormField from '../../FormField';

export default function Step3OrderInstructions({
  formData,
  handleChange,
  errors
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-2">
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
            Order Instructions
          </h3>
          <div className="grid grid-cols-1 gap-5 mt-4">
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
                className={`${getInputClass(!!errors?.special_instructions)}`}
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
                className={`${getInputClass(!!errors?.special_instructions)}`}
              />
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
}
