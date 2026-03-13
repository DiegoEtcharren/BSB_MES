import FormField from '../../../../components/forms/FormField';
import { getInputClass } from "../../../../utilities/formUtilities";
export default function Step2ProductDetails({
  formData,
  handleChange,
  errors,
}) {
  return (
    <>
      <header>
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
          Order Size
        </h3>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FormField label="Product Type" name="product_type_id" errors={errors}>
          <select
            value={formData.product_type_id}
            onChange={handleChange}
            className={`${getInputClass(!!errors?.product_type_id)} appearance-none bg-white pr-10`}
            name="product_type_id"
            id="product_type_id"
          >
            <option className="text-slate-400" value="">
              Select a Product...
            </option>
            <option value="1">JRS</option>
            <option value="2">AV</option>
            <option value="3">AVV</option>
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
            <option className="text-slate-400" value="">
              Select Units...
            </option>
            <option value="1">inches</option>
            <option value="2">mm</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>
        </FormField>

        <FormField label="Product Size" name="product_size_id" errors={errors}>
          <select
            value={formData.product_size_id}
            onChange={handleChange}
            className={`${getInputClass(!!errors?.product_size_id)} appearance-none bg-white pr-10`}
            name="product_size_id"
            id="product_size_id"
          >
            <option className="text-slate-400" value="">
              Select a Size...
            </option>
            <option value="1">1"</option>
            <option value="2">2"</option>
            <option value="3">3"</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>
        </FormField>

        <FormField label="Custom Size" name="custom_size_uom" errors={errors}>
          <input
            type="text"
            name="custom_size_uom"
            id="custom_size_uom"
            value={formData.custom_size_uom}
            onChange={handleChange}
            placeholder="300in"
            className={getInputClass(!!errors?.custom_size_uom)}
          />
        </FormField>
      </div>
      <div>
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
          Order Pressure
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <FormField label="Burst Pressure" name="burst_pressure" errors={errors}>
          <input
            type="text"
            name="burst_pressure"
            id="burst_pressure"
            value={formData.burst_pressure}
            onChange={handleChange}
            placeholder="300in"
            className={getInputClass(!!errors?.burst_pressure)}
          />
        </FormField>

        <FormField label="Product Size" name="product_size_id" errors={errors}>
          <select
            value={formData.product_size_id}
            onChange={handleChange}
            className={`${getInputClass(!!errors?.product_size_id)} appearance-none bg-white pr-10`}
            name="product_size_id"
            id="product_size_id"
          >
            <option className="text-slate-400" value="">
              Select Units...
            </option>
            <option value="1">PSI</option>
            <option value="2">kg/cm2</option>
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
            placeholder="300in"
            className={getInputClass(!!errors?.temperature)}
          />
        </FormField>

        <FormField label="Temperature Units" name="temperature_units" errors={errors}>
          <select
            value={formData.temperature_units}
            onChange={handleChange}
            className={`${getInputClass(!!errors?.temperature_units)} appearance-none bg-white pr-10`}
            name="temperature_units"
            id="temperature_units"
          >
            <option className="text-slate-400" value="">
              Select Units...
            </option>
            <option value="1">PSI</option>
            <option value="2">kg/cm2</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>
        </FormField>
      </div>
    </>
  );
}
