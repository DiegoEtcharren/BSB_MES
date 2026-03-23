import FormField from '../../../../components/forms/FormField';
import { getInputClass } from "../../../../utilities/formUtilities";
import { useMasterData } from '../../../../context/MasterDataContext';

export default function Step33OrderTol({
  formData,
  handleChange,
  errors,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 p-2">
      <div>
        <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
          Pressure Ranges
        </h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            label="Manufacturing Range"
            name="manufacturing_range_id"
            errors={errors}
          >
            <select
              value={formData.manufacturing_range_id}
              onChange={handleChange}
              className={`${getInputClass(!!errors?.manufacturing_range_id)} appearance-none bg-white pr-10`}
              name="manufacturing_range_id"
              id="manufacturing_range_id"
            >
              <option disabled hidden className="text-slate-400" value="">
                -- Select Range --
              </option>

            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </FormField>

        </div>
      </div>
    </div>
  );
}
