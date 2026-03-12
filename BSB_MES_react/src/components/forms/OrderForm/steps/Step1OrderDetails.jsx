import { getInputClass } from '../../../../utilities/formUtilities';
export default function Step1OrderDetails({ formData, handleChange, errors }) {
  return (
    <>
      <div>
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
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
              className={getInputClass(!!errors?.order_number)}
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
              className={`${getInputClass(!!errors?.previous_order)} pl-10`}
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
            className={`${getInputClass(!!errors?.customer)}`}
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
              className={`${getInputClass(!!errors?.customer_po)}`}
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
              className={`${getInputClass(!!errors?.unit_price)} pl-7`}
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
              className={`${getInputClass(!!errors?.quantity)}`}
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
      <div className="pt-2 border-t border-slate-100">
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
          Timeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm text-charcoal mb-1.5"
              htmlFor="date_entered"
            >
              Date Entered
            </label>
            <input
              className="w-full rounded-md border-slate-300  shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5"
              id="date_entered"
              type="date"
              className={`${getInputClass(!!errors?.date_entered)}`}
            />
          </div>
          <div>
            <label
              className="block text-sm text-charcoal mb-1.5"
              htmlFor="required_date"
            >
              Required Date
            </label>
            <input
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5"
              id="required_date"
              type="date"
              className={`${getInputClass(!!errors?.required_date)}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
