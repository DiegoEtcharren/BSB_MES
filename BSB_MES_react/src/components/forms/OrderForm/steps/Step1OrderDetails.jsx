export default function Step1OrderDetails({ formData, handleChange, errors, getInputClass, initialData }) {
  return (
    <>
      <div>
        <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
          Order Details
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm  text-charcoal" htmlFor="order_number">
            Order Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="order_number"
              value={formData.order_number}
              onChange={handleChange}
              id="order_number"
              placeholder="XXXXXXX-X"
              className={`${getInputClass("order_number")}`}
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
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="previous_order">
            Previous Order Number
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">
                search
              </span>
            </span>
            <input
              type="text"
              name="previous_order"
              id="previous_order"
              value={formData.previous_order}
              onChange={handleChange}
              placeholder="XXXXXXX-X"
              className={`${getInputClass("previous_order")} pl-10`}
            />
            {errors?.previous_order && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
              </span>
            )}
          </div>
          {errors?.previous_order && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("previous_order")}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="customer">
            Customer
          </label>
          <input
            type="text"
            name="customer"
            id="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="XXXX"
            className={`${getInputClass("customer")}`}
          />
          {errors?.customer && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">
                error
              </span>
            </span>
          )}
          {errors?.customer && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("customer")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="customer_po">
            Customer PO
          </label>
          <div className="relative">
            <input
              type="text"
              name="customer_po"
              id="customer_po"
              value={formData.customer_po}
              onChange={handleChange}
              placeholder="e.g. Manufacturing"
              className={getInputClass("customer_po")}
            />
            {errors?.customer_po && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
              </span>
            )}
          </div>
          {errors?.customer_po && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("customer_po")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="unit_price">
            Unit Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
              $
            </span>
            <input
              type="number"
              name="unit_price"
              id="unit_price"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.unit_price}
              onChange={handleChange}
              className={`${getInputClass("unit_price")} pl-7`}
            />
          </div>
          {errors?.unit_price && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("unit_price")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-charcoal" htmlFor="quantity">
            Quantity
          </label>
          <div className="relative">
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              step="1"
              min="0"
              className={getInputClass("quantity")}
            />
            {errors?.quantity && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary pointer-events-none">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
              </span>
            )}
          </div>
          {errors?.quantity && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("quantity")}
            </p>
          )}
        </div>
      </div>
      <div class="pt-2 border-t border-slate-100">
        <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
          Timeline
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              class="block text-sm font-semibold text-charcoal mb-1.5"
              for="date_entered"
            >
              Date Entered
            </label>
            <input
              class="w-full rounded-md border-slate-300  shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5"
              id="date_entered"
              type="date"
            />
          </div>
          <div>
            <label
              class="block text-sm font-semibold text-charcoal mb-1.5"
              for="required_date"
            >
              Required Date <span class="text-primary">*</span>
            </label>
            <input
              class="w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5"
              id="required_date"
              type="date"
            />
          </div>
        </div>
      </div>
      {initialData && (
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal" htmlFor="status">
            Account Status
          </label>
          <div className="relative">
            <select
              value={formData.status}
              onChange={handleChange}
              className={`${getInputClass("status")} appearance-none bg-white`}
              name="status"
              id="status"
            >
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </div>
          </div>
          {errors?.role && (
            <p className="text-xs text-primary font-medium mt-1">
              {getErrorMsg("role")}
            </p>
          )}
        </div>
      )}
    </>
  );
}
