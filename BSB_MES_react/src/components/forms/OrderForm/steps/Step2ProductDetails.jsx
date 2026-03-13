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
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="product_type_id">
            Product Type
          </label>
          <div className="relative">
            <select
              value={formData.product_type_id}
              onChange={handleChange}
              className={`${getInputClass(!!errors?.product_type_id)} appearance-none bg-white`}
              name="product_type_id"
              id="product_type_id"
            >
              <option value="">Select a Product...</option>
              <option value="1">JRS</option>
              <option value="2">AV</option>
              <option value="3">AVV</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>

          {errors?.product_type_id && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.product_type_id && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("product_type_id")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="size_units">
            Size Units
          </label>
          <div className="relative">
            <select
              value={formData.size_units}
              onChange={handleChange}
              className={`${getInputClass(!!errors?.size_units)} appearance-none bg-white`}
              name="size_units"
              id="size_units"
            >
              <option value="">Select a Product...</option>
              <option value="1">Standard</option>
              <option value="2">Milimetric</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          {errors?.size_units && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.size_units && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("size_units")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="product_size_id">
            Product Size
          </label>
          <div className="relative">
            <select
              value={formData.product_size_id}
              onChange={handleChange}
              className={`${getInputClass(!!errors?.product_size_id)} appearance-none bg-white`}
              name="product_size_id"
              id="product_size_id"
            >
              <option value="">Select a Size...</option>
              <option value="1">1"</option>
              <option value="2">2"</option>
              <option value="3">3"</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          {errors?.product_size_id && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.product_size_id && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("product_size_id")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="custom_size_uom">
            Custom Size
          </label>
          <input
            type="text"
            name="custom_size_uom"
            id="custom_size_uom"
            value={formData.custom_size_uom}
            onChange={handleChange}
            placeholder="XXXXXXX-X"
            className={`${getInputClass(!!errors?.custom_size_uom)} appearance-none bg-white`}
          />
          {errors?.custom_size_uom && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.custom_size_uom && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("custom_size_uom")}
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
          Order Pressure
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="burst_pressure">
            Burst Pressure
          </label>
          <input
            type="number"
            name="burst_pressure"
            value={formData.burst_pressure}
            onChange={handleChange}
            id="burst_pressure"
            placeholder="20"
            className={getInputClass(!!errors?.burst_pressure)}
          />
          {errors?.burst_pressure && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.burst_pressure && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("burst_pressure")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="pressure_unit_id">
            Pressure Units
          </label>
          <div className="relative">
            <select
              value={formData.pressure_unit_id}
              onChange={handleChange}
              className={`${getInputClass(!!errors?.burst_pressure)} appearance-none bg-white`}
              name="pressure_unit_id"
              id="pressure_unit_id"
            >
              <option value="">Select a Product...</option>
              <option value="1">PSI</option>
              <option value="2">kg/cm2</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          {errors?.pressure_unit_id && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.pressure_unit_id && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("pressure_unit_id")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="temperature">
            Temperature
          </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              id="temperature"
              placeholder="72"
              className={getInputClass(!!errors?.temperature)}
            />
          {errors?.temperature && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.temperature && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("temperature")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="temperature_units">
            Temperature Units
          </label>
          <div className="relative">
            <select
              value={formData.temperature_units}
              onChange={handleChange}
              className={`${getInputClass(!!errors?.temperature_units)} appearance-none bg-white`}
              name="temperature_units"
              id="temperature_units"
            >
              <option value="">Select a Product...</option>
              <option value="celsius">Celsius</option>
              <option value="fahreinheit">Fahreinheit</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          {errors?.temperature_units && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.temperature_units && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("temperature_units")}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
