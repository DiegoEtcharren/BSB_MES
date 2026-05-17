import MesContext from "../../context/MesProvider";
import OrderForm from "../../components/forms/OrderForm/OrderFormContainer";
import { useContext, useEffect, useState } from "react";
import { useProductionOrders } from "../../hooks/useProductionOrders";
import { getOrderStatusFormatting } from "../../utilities/tableFormatters";
import { convertToPSI, convertFromPSI } from "../../utilities/pressureConversions";
import { convertToFahrenheit} from "../../utilities/temperatureConversions";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

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
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("");

  const { RangePicker } = DatePicker;
  const rangePresets = [
    {
      label: "Next 7 Days",
      value: [dayjs(), dayjs().add(1, "week")],
    },
    {
      label: "Next Month",
      value: [dayjs(), dayjs().add(1, "month")],
    },
    {
      label: "This Month Entirely",
      value: [dayjs().startOf("month"), dayjs().endOf("month")],
    },
  ];

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setDateRange({ start_date: dateStrings[0], end_date: dateStrings[1] });
    } else {
      setDateRange("");
    }
  };

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
  }, []);

  useEffect(() => {
    const params = { page };
    if (statusFilter) params.status = statusFilter;
    if (dateRange) {
      params.start_date = dateRange.start_date;
      params.end_date = dateRange.end_date;
    }
    if (searchQuery) params.search = searchQuery;
    const delayDebounceFn = setTimeout(() => {
      fetchProductionOrders(params);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // Trigger re-fetch when dateRange (or other filters) change
  }, [page, orderNumberFilter, productTypeFilter, sizeFilter, burstPressureFilter, temperatureFilter, statusFilter, dueDateFilter, searchQuery, dateRange, fetchProductionOrders]);

  const handleDelete = async (id, orderNumber) => {
    if (window.confirm(`Are you sure you want to delete order ${orderNumber}?`)) {
      try {
        await deleteProductionOrder(id);
        const params = { page, order_number: orderNumberFilter, product_type: productTypeFilter, size: sizeFilter, burst_pressure: burstPressureFilter, temperature: temperatureFilter, status: statusFilter, due_date_range: dueDateFilter };
        if (dateRange) {
          params.start_date = dateRange.start_date;
          params.end_date = dateRange.end_date;
        }
        fetchProductionOrders(params);
      } catch (err) {
        console.error("Error deleting order:", err);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-border-subtle overflow-hidden">
      {/* Search Bar: */}
      <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3  text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 text-charcoal placeholder-slate-400"
              placeholder="Search orders..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Filter by:
            </span>
          <Space direction="vertical" size={12} style={{ padding: '20px' }}>
                <RangePicker
                  presets={rangePresets}
                  onChange={onRangeChange}
                  placeholder={['From', 'To']}
                />
              </Space>
            <select
              className="form-select py-1.5 pl-3 pr-8 text-sm border-slate-200 rounded-md bg-slate-50 focus:border-primary focus:ring-0 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value={""}>All Status</option>
              <option value={"inProgress"}>In Progress</option>
              <option value={"completed"}>Completed</option>
              <option value={"pending"}>Pending</option>
            </select>
          </div>
        </div>
      </div>
      {/* End Search Bar */}

      {/* Table: */}
      <div className="overflow-auto flex-1 min-h-0">
        <table className="w-full text-left">
          <thead className="sticky top-0 z-10 bg-slate-50 border-b border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <tr>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                SO #
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Due Date
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Product Type
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Size
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                B.P. (PSI)
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-center">
                Temp. (°F)
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
                  colSpan="8"
                  className="px-6 py-8 text-center text-sm font-medium text-slate-500"
                >
                  Loading orders...
                </td>
              </tr>
            ) : orders?.data?.length > 0 ? (
              orders.data.map((order) => {
                const burstPressure = order.specs?.burst_pressure
                  ? `${convertToPSI(order.specs.burst_pressure, order.specs.pressure_unit?.conversion_multiplier).toFixed(2)}`
                  : "-";
                const temperature = order.specs?.temperature
                  ? `${convertToFahrenheit(order.specs.temperature, order.specs.temperature_units).toFixed(2)}`
                  : "-";
                const productType = order.product_type?.name || "-";
                const size = order.custom_product_size
                  ? `${order.custom_product_size} ${order.custom_size_uom || ""}`.trim()
                  : order.product_size?.display_name || "-";
                const statusFormatting = getOrderStatusFormatting(
                  order.status || "pending",
                );

                let dueDateFormatted = "-";
                if (order.required_date) {
                  const dateObj = new Date(order.required_date);
                  const day = String(dateObj.getDate()).padStart(2, "0");
                  const monthNames = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                  const month = monthNames[dateObj.getMonth()];
                  const year = dateObj.getFullYear();
                  dueDateFormatted = `${day} / ${month} / ${year}`;
                }

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-charcoal text-center">
                      {order.order_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center">
                      {dueDateFormatted}
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
                            const params = {
                              page,
                              order_number: orderNumberFilter,
                              product_type: productTypeFilter,
                              size: sizeFilter,
                              burst_pressure: burstPressureFilter,
                              temperature: temperatureFilter,
                              status: statusFilter,
                              due_date_range: dueDateFilter,
                            };
                            if (dateRange) {
                              params.start_date = dateRange.start_date;
                              params.end_date = dateRange.end_date;
                            }
                            openModal(
                              <OrderForm
                                initialData={order}
                                onSuccess={() =>
                                  fetchProductionOrders(params)
                                }
                              />,
                              "Edit Order",
                              `Update details for Order: ${order.order_number}`,
                              true,
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
                          onClick={() =>
                            handleDelete(order.id, order.order_number)
                          }
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
                  colSpan="8"
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
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {orders?.last_page > 0 &&
            Array.from(
              { length: orders.last_page },
              (_, index) => index + 1,
            ).map((pageNum) => (
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
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      {/* End Pagination Buttons */}
    </div>
  );
}
