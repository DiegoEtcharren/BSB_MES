import { getInputClass } from "../../../../utilities/formUtilities";
export default function Step2ProductDetails({
  formData,
  handleChange,
  errors,
}) {
  return (
    <>
      <div>
        <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
          Order Size
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="product_type">
            Product Type
          </label>
          <div className="relative">
            <select
              value={formData.product_type}
              onChange={handleChange}
              className={`${getInputClass("product_type")} appearance-none bg-white`}
              name="product_type"
              id="product_type"
            >
              <option value="">Select a Product...</option>
              <option value="operator">JRS</option>
              <option value="engineer">AV</option>
              <option value="engineer">AVV</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>

          {errors?.previous_order && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.previous_order && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("previous_order")}
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
              className={`${getInputClass("size_units")} appearance-none bg-white`}
              name="size_units"
              id="size_units"
            >
              <option value="">Select a Product...</option>
              <option value="operator">Standard</option>
              <option value="engineer">Milimetric</option>
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
          <label className="text-sm text-charcoal" htmlFor="previous_order">
            Standard Size
          </label>
          <div className="relative">
            <select
              value={formData.size_units}
              onChange={handleChange}
              className={`${getInputClass("size_units")} appearance-none bg-white`}
              name="size_units"
              id="size_units"
            >
              <option value="">Select a Size...</option>
              <option value="operator">1"</option>
              <option value="engineer">2"</option>
              <option value="engineer">3"</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          {errors?.previous_order && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.previous_order && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("previous_order")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="previous_order">
            Custom Size
          </label>
          <input
            type="text"
            name="previous_order"
            id="previous_order"
            value={formData.previous_order}
            onChange={handleChange}
            placeholder="XXXXXXX-X"
            className={`${getInputClass(!!errors?.previous_order)}`}
          />
          {errors?.previous_order && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.previous_order && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("previous_order")}
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
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
          {errors?.previous_order && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.previous_order && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("previous_order")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="size_units">
            Pressure Units
          </label>
          <div className="relative">
            <select
              value={formData.size_units}
              onChange={handleChange}
              className={`${getInputClass("size_units")} appearance-none bg-white`}
              name="size_units"
              id="size_units"
            >
              <option value="">Select a Product...</option>
              <option value="operator">PSI</option>
              <option value="engineer">kg/cm2</option>
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
          <label className="text-sm text-charcoal" htmlFor="previous_order">
            Standard Size
          </label>
          <div className="relative">
            <select
              value={formData.size_units}
              onChange={handleChange}
              className={`${getInputClass("size_units")} appearance-none bg-white`}
              name="size_units"
              id="size_units"
            >
              <option value="">Select a Size...</option>
              <option value="operator">1"</option>
              <option value="engineer">2"</option>
              <option value="engineer">3"</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          {errors?.previous_order && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.previous_order && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("previous_order")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="previous_order">
            Custom Size
          </label>
          <input
            type="text"
            name="previous_order"
            id="previous_order"
            value={formData.previous_order}
            onChange={handleChange}
            placeholder="XXXXXXX-X"
            className={`${getInputClass(!!errors?.previous_order)}`}
          />
          {errors?.previous_order && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.previous_order && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("previous_order")}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
