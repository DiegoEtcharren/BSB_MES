import MesContext from "../../context/MesProvider";
import OrderForm from "../../components/forms/OrderForm/OrderFormContainer";
import { useContext, useEffect, useState } from "react";
import { useProductionOrders } from "../../hooks/useProductionOrders";
import { getOrderStatusFormatting } from "../../utilities/tableFormatters";

export default function EngOrders() {
  const { setHeaderConfig, openModal } = useContext(MesContext);
  const { orders, isLoading, fetchProductionOrders, deleteProductionOrder } = useProductionOrders();

  const [page, setPage] = useState(1);
  const [orderNumberFilter, setOrderNumberFilter] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [burstPressureFilter, setBurstPressureFilter] = useState("");
  const [temperatureFilter, setTemperatureFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setHeaderConfig("Production Orders", {
      label: "Add New Order",
      icon: "post_add",
      onClick: () => {
        openModal(
          <OrderForm onSuccess={() => fetchProductionOrders()} />,
          "Add New Order",
          "Create a new order",
          true
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProductionOrders({
        page,
        order_number: orderNumberFilter,
        product_type: productTypeFilter,
        size: sizeFilter,
        burst_pressure: burstPressureFilter,
        temperature: temperatureFilter,
        status: statusFilter,
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [page, orderNumberFilter, productTypeFilter, sizeFilter, burstPressureFilter, temperatureFilter, statusFilter, fetchProductionOrders]);

  const handleDelete = async (id, orderNumber) => {
    if (window.confirm(`Are you sure you want to delete order ${orderNumber}?`)) {
      try {
        await deleteProductionOrder(id);
        fetchProductionOrders({ page, order_number: orderNumberFilter, product_type: productTypeFilter, size: sizeFilter, burst_pressure: burstPressureFilter, temperature: temperatureFilter, status: statusFilter });
      } catch (err) {
        console.error("Error deleting order:", err);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-border-subtle overflow-hidden">
      {/* Filters Bar */}
      <div className="p-4 border-b border-border-subtle bg-white space-y-4 shrink-0">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 w-full">
            <div className="relative flex-1 min-w-[150px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[18px]">tag</span>
              </span>
              <input
                type="text"
                placeholder="Order No..."
                className="w-full py-1.5 pl-9 pr-3 text-sm border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
                value={orderNumberFilter}
                onChange={(e) => setOrderNumberFilter(e.target.value)}
              />
            </div>
            <div className="relative flex-1 min-w-[150px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[18px]">category</span>
              </span>
              <input
                type="text"
                placeholder="Product Type..."
                className="w-full py-1.5 pl-9 pr-3 text-sm border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
                value={productTypeFilter}
                onChange={(e) => setProductTypeFilter(e.target.value)}
              />
            </div>
            <div className="relative flex-1 min-w-[150px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[18px]">straighten</span>
              </span>
              <input
                type="text"
                placeholder="Size..."
                className="w-full py-1.5 pl-9 pr-3 text-sm border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
              />
            </div>
            <div className="relative flex-1 min-w-[150px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[18px]">compress</span>
              </span>
              <input
                type="text"
                placeholder="Burst Press..."
                className="w-full py-1.5 pl-9 pr-3 text-sm border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
                value={burstPressureFilter}
                onChange={(e) => setBurstPressureFilter(e.target.value)}
              />
            </div>
            <div className="relative flex-1 min-w-[150px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[18px]">thermostat</span>
              </span>
              <input
                type="text"
                placeholder="Temp..."
                className="w-full py-1.5 pl-9 pr-3 text-sm border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
                value={temperatureFilter}
                onChange={(e) => setTemperatureFilter(e.target.value)}
              />
            </div>
            <select
              className="form-select py-1.5 pl-3 pr-8 text-sm border-slate-200 rounded-md bg-slate-50 focus:border-primary focus:ring-0 cursor-pointer min-w-[150px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value={""}>All Status</option>
              <option value={"pending"}>Pending</option>
              <option value={"in_progress"}>In Progress</option>
              <option value={"completed"}>Completed</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Showing{" "}
          <span className="text-charcoal font-bold">
            {orders?.from || 0}-{orders?.to || 0}
          </span>{" "}
          of <span className="text-charcoal font-bold">{orders?.total || 0}</span>{" "}
          orders
        </div>
      </div>
      {/* End Filters Bar */}

      {/* Table: */}
      <div className="overflow-auto flex-1 min-h-0">
        <table className="w-full text-left">
          <thead className="sticky top-0 z-10 bg-slate-50 border-b border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <tr>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Order No.
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Product Type
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Size
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Burst Pressure
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Temperature
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-sm font-medium text-slate-500"
                >
                  Loading orders...
                </td>
              </tr>
            ) : orders?.data?.length > 0 ? (
              orders.data.map((order) => {
                const burstPressure = order.specs?.burst_pressure ? `${order.specs.burst_pressure} ${order.specs.pressure_unit?.symbol || ''}`.trim() : '-';
                const temperature = order.specs?.temperature ? `${order.specs.temperature} ${order.specs.temperature_units || ''}`.trim() : '-';
                const productType = order.product_type?.name || '-';
                const size = order.custom_product_size ? `${order.custom_product_size} ${order.custom_size_uom || ''}`.trim() : (order.product_size?.display_name || '-');
                const statusFormatting = getOrderStatusFormatting(order.status || 'pending');

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-charcoal text-center">
                      {order.order_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center">
                      {productType}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center">
                      {size}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center">
                      {burstPressure}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center">
                      {temperature}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusFormatting.wrapperClass}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusFormatting.dotClass}`}
                        ></span>{" "}
                        {statusFormatting.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            openModal(
                              <OrderForm
                                initialData={order}
                                onSuccess={() => fetchProductionOrders({ page, order_number: orderNumberFilter, product_type: productTypeFilter, size: sizeFilter, burst_pressure: burstPressureFilter, temperature: temperatureFilter, status: statusFilter })}
                              />,
                              "Edit Order",
                              `Update details for Order: ${order.order_number}`,
                              true
                            );
                          }}
                          className="p-1.5 hover:bg-indigo-100 hover:text-indigo-600 text-slate-500 hover:text-charcoal rounded transition-colors cursor-pointer"
                          title="Edit Order"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(order.id, order.order_number)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                          title="Delete Order"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="hover:bg-slate-50 transition-colors group">
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-sm font-medium text-slate-500 italic"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* End Table */}

      {/* Pagination Buttons: */}
      <div className="p-4 border-t border-border-subtle bg-slate-50 flex items-center justify-between shrink-0">
        <button
          className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-600 hover:bg-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {orders?.last_page > 0 && Array.from({ length: orders.last_page }, (_, index) => index + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${
                page === pageNum
                  ? "bg-primary text-white font-bold"
                  : "hover:bg-white text-slate-600"
              }`}
              >
              {pageNum}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-600 hover:bg-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={orders?.last_page && page >= orders.last_page}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
      {/* End Pagination Buttons */}
    </div>
  );
}
