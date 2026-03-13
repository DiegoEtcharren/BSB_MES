import FormField from '../../../../components/forms/FormField';
import { getInputClass } from '../../../../utilities/formUtilities';
export default function Step1OrderDetails({ formData, handleChange, errors }) {
  return (
    <>
      <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
        Order Details
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <FormField label="Order Number" name="order_number" errors={errors}>
          <input
            type="text"
            name="order_number"
            id="order_number"
            value={formData.order_number}
            onChange={handleChange}
            placeholder="XXXXXXX-X"
            className={getInputClass(!!errors?.order_number)}
          />
        </FormField>

        <FormField label="Order Number" name="previous_order" errors={errors}>
          <input
            type="text"
            name="previous_order"
            id="previous_order"
            value={formData.previous_order}
            onChange={handleChange}
            placeholder="XXXXXXX-X"
            className={getInputClass(!!errors?.previous_order)}
          />
        </FormField>
        <FormField label="Customer" name="customer" errors={errors}>
          <input
            type="text"
            name="customer"
            id="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="BS&B"
            className={getInputClass(!!errors?.customer)}
          />
        </FormField>
        <FormField label="Customer PO" name="customer_po" errors={errors}>
          <input
            type="text"
            name="customer_po"
            id="customer_po"
            value={formData.customer_po}
            onChange={handleChange}
            placeholder="PO: XXXX"
            className={getInputClass(!!errors?.customer_po)}
          />
        </FormField>
        <FormField label="Unit Price" name="unit_price" errors={errors}>
          <span className="absolute inset-y-0 text-sm left-0 pl-3 flex items-center  pointer-events-none">
            $
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            name="unit_price"
            id="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            placeholder="0.00"
            className={`${getInputClass(!!errors?.unit_price)} pl-8`}
          />
        </FormField>
        <FormField label="Quantity" name="quantity" errors={errors}>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="0"
            className={getInputClass(!!errors?.quantity)}
          />
        </FormField>
      </div>
      <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">
        Timeline
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Date Entered" name="date_entered" errors={errors}>
          <input
            type="date"
            name="date_entered"
            id="date_entered"
            value={formData.date_entered}
            onChange={handleChange}
            className={getInputClass(!!errors?.date_entered)}
          />
        </FormField>
        <FormField label="Date Entered" name="required_date" errors={errors}>
          <input
            type="date"
            name="required_date"
            id="required_date"
            value={formData.required_date}
            onChange={handleChange}
            className={getInputClass(!!errors?.required_date)}
          />
        </FormField>
      </div>
    </>
  );
}
