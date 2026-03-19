import { useEffect } from 'react';
import FormField from '../../../../components/forms/FormField';
import { getInputClass } from "../../../../utilities/formUtilities";
import { useMasterData } from '../../../../context/MasterDataContext';

export default function Step2ProductDetails({
  formData,
  handleChange,
  errors,
}) {

  const { pressureUnits, productTypes, productStandardSizes } = useMasterData();

  // Function to filter sizes based on units:
  const filteredSizes = (productStandardSizes || []).filter(size => size.units === formData.size_units);

  // Helper variables for mutual exclusion
  const hasStandardSize = formData.product_size_id !== "";
  const hasCustomSize = formData.custom_size_uom && formData.custom_size_uom.trim() !== "";

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-2">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
            Order Size
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Product Type"
              name="product_type_id"
              errors={errors}
            >
              <select
                value={formData.product_type_id}
                onChange={handleChange}
                className={`${getInputClass(!!errors?.product_type_id)} appearance-none bg-white pr-10`}
                name="product_type_id"
                id="product_type_id"
              >
                <option disabled hidden className="text-slate-400" value="">
                  -- Select Product --
                </option>
                {productTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </div>
            </FormField>

            <FormField label="Size Units" name="size_units" errors={errors}>
              <select
                value={formData.size_units}
                onChange={handleChange}
                className={`${getInputClass(!!errors?.size_units)} appearance-none bg-white pr-10`}
                name="size_units"
                id="size_units"
              >
                <option disabled hidden className="text-slate-400" value="">
                  -- Select Units --
                </option>
                <option value="in">inches</option>
                <option value="mm">mm</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </div>
            </FormField>

            <FormField
              label="Product Size"
              name="product_size_id"
              errors={errors}
            >
              <select
                value={formData.product_size_id}
                onChange={handleChange}
                name="product_size_id"
                id="product_size_id"
                disabled={hasCustomSize || !formData.size_units}
                className={`${getInputClass(!!errors?.product_size_id)} appearance-none bg-white pr-10 ${
                  hasCustomSize
                    ? "bg-slate-100 opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <option disabled hidden className="text-slate-400" value="">
                  -- Select Size --
                </option>
                {filteredSizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.display_name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </div>
            </FormField>

            <FormField
              label="Custom Size"
              name="custom_size_uom"
              errors={errors}
            >
              <input
                type="text"
                name="custom_size_uom"
                id="custom_size_uom"
                value={formData.custom_size_uom}
                onChange={handleChange}
                disabled={hasStandardSize}
                placeholder="300in"
                className={`${getInputClass(!!errors?.custom_size_uom)} ${
                  hasStandardSize
                    ? "bg-slate-100 opacity-50 cursor-not-allowed"
                    : ""
                }`}
              />
            </FormField>
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
            Order Pressure
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <FormField
              label="Burst Pressure"
              name="burst_pressure"
              errors={errors}
            >
              <input
                type="text"
                name="burst_pressure"
                id="burst_pressure"
                value={formData.burst_pressure}
                onChange={handleChange}
                placeholder="Nominal BP"
                className={getInputClass(!!errors?.burst_pressure)}
              />
            </FormField>

            <FormField
              label="Pressure Units"
              name="pressure_unit_id"
              errors={errors}
            >
              <select
                value={formData.pressure_unit_id}
                onChange={handleChange}
                className={`${getInputClass(!!errors?.pressure_unit_id)} appearance-none bg-white pr-10`}
                name="pressure_unit_id"
                id="pressure_unit_id"
              >
                <option value="" disabled hidden className="text-slate-400">
                  -- Select Units --
                </option>
                {pressureUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.symbol.toUpperCase()}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </div>
            </FormField>

            <FormField label="Temperature" name="temperature" errors={errors}>
              <input
                type="text"
                name="temperature"
                id="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="Rated Temperature"
                className={getInputClass(!!errors?.temperature)}
              />
            </FormField>

            <FormField
              label="Temperature Units"
              name="temperature_units"
              errors={errors}
            >
              <select
                value={formData.temperature_units}
                onChange={handleChange}
                className={`${getInputClass(!!errors?.temperature_units)} appearance-none bg-white pr-10`}
                name="temperature_units"
                id="temperature_units"
              >
                <option disabled hidden className="text-slate-400" value="">
                  -- Select Units --
                </option>
                <option value="fahrenheit">°F</option>
                <option value="celsius">°C</option>
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
    </>
  );
}
