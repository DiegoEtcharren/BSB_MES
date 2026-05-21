import MesContext from "../../context/MesProvider";
import { useContext, useEffect, useState } from "react";
import { Card, Typography, Spin } from "antd";
import { useDashboardKpis } from "../../hooks/useDashboardKpis";
import {
  Archive,
  TrendingUp,
  Factory,
  ArrowRight,
  TrendingDown,
  ClipboardList,
  AlertCircle,
  Calendar,
  User,
  CheckCircle,
} from "lucide-react";

const { Title, Text } = Typography;

function ShippedOrdersChart({ data = [], isLoading = false }) {
  const [animated, setAnimated] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      const timer = setTimeout(() => setAnimated(true), 50);
      if (!selectedMonth) {
        setSelectedMonth(data[data.length - 1].month);
      }
      return () => clearTimeout(timer);
    }
  }, [isLoading, data, selectedMonth]);

  if (isLoading) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[350px] flex flex-col items-center justify-center text-center p-6 bg-gray-50/30 border border-dashed border-gray-200 rounded-xl">
        <ClipboardList className="w-10 h-10 text-gray-300 mb-2" />
        <Text type="secondary" className="text-gray-400 font-medium">
          No Shipped Orders Data
        </Text>
        <Text type="secondary" className="text-gray-300 text-xs mt-1">
          Completed orders will appear here once shipped.
        </Text>
      </div>
    );
  }

  // Calculate scales using total_value
  const maxVal = Math.max(...data.map((d) => d.total_value), 100);
  const yTicksCount = 4;
  const yTicks = Array.from(
    { length: yTicksCount + 1 },
    (_, i) => Math.round((maxVal / yTicksCount) * i)
  ).reverse();

  const formatMonth = (monthStr) => {
    try {
      const [year, month] = monthStr.split("-");
      const date = new Date(year, parseInt(month) - 1, 1);
      return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    } catch (e) {
      return monthStr;
    }
  };

  const formatMonthFull = (monthStr) => {
    try {
      const [year, month] = monthStr.split("-");
      const date = new Date(year, parseInt(month) - 1, 1);
      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch (e) {
      return monthStr;
    }
  };

  const formatCurrencyAbbr = (val) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(0)}k`;
    }
    return `$${val}`;
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  const selectedData = data.find((d) => d.month === selectedMonth) || data[data.length - 1];

  return (
    <div className="flex flex-col h-full min-h-[350px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 700 }} className="text-gray-800">
            Orders Shipped (Value)
          </Title>
          <Text type="secondary" className="text-xs text-gray-400">
            Monthly shipping volume (total USD quantity & order count)
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--color-primary)" }} />
          <Text className="text-xs text-gray-500 font-medium">Shipped Value</Text>
        </div>
      </div>

      {/* Selected Month Summary Callout */}
      {selectedData && (
        <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs mb-6 transition-all duration-300">
          <span className="font-semibold text-gray-400">Selected Month:</span>
          <span className="font-bold text-gray-800">{formatMonthFull(selectedData.month)}</span>
          <div className="h-3 w-px bg-gray-200 hidden sm:block" />
          <span className="font-semibold text-gray-400">Shipped Quantity:</span>
          <span className="font-extrabold text-gray-800">
            {formatCurrency(selectedData.total_value)}
          </span>
          <span className="text-gray-350 font-bold font-mono">•</span>
          <span className="font-semibold text-gray-700 bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full border border-red-100/50">
            {selectedData.count} {selectedData.count === 1 ? "order" : "orders"} shipped
          </span>
        </div>
      )}

      <div className="flex-1 flex gap-4 min-h-0 relative select-none">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between text-right text-[10px] text-gray-400 font-bold w-12 pb-8 pr-2">
          {yTicks.map((tick, idx) => (
            <span key={idx}>{formatCurrencyAbbr(tick)}</span>
          ))}
        </div>

        {/* Chart Bars and Gridlines */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          {/* Gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
            {Array.from({ length: yTicksCount + 1 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full border-t border-dashed border-gray-100"
                style={{ height: "0px" }}
              />
            ))}
          </div>

          {/* Bars Container */}
          <div className="flex-1 flex items-end justify-around relative z-10 pb-8 min-h-0 gap-1.5">
            {data.map((item) => {
              const heightPct = (item.total_value / maxVal) * 100;
              const isSelected = item.month === selectedMonth;
              return (
                <div
                  key={item.month}
                  onClick={() => setSelectedMonth(item.month)}
                  className="group relative flex flex-col items-center flex-1 max-w-[55px] h-full justify-end"
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-gray-900/95 backdrop-blur-xs text-white text-[11px] px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 shadow-lg text-center whitespace-nowrap z-50 transform translate-y-1 group-hover:-translate-y-0">
                    <p className="font-bold text-gray-300 text-[10px] uppercase tracking-wider mb-0.5">
                      {formatMonthFull(item.month)}
                    </p>
                    <p className="font-extrabold text-[12px] text-white">
                      {formatCurrency(item.total_value)}
                    </p>
                    <p className="text-gray-350 text-[10px] font-medium mt-0.5">
                      {item.count} {item.count === 1 ? "order" : "orders"}
                    </p>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/95" />
                  </div>

                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-md cursor-pointer relative overflow-hidden transition-all duration-500 hover:brightness-95 ${
                      isSelected
                        ? "shadow-[0_0_14px_rgba(227,30,36,0.45)] opacity-100 scale-102"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      height: animated ? `${heightPct}%` : "0%",
                      transition: "height 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s, shadow 0.3s, transform 0.3s",
                      background: "linear-gradient(to top, var(--color-primary), var(--color-primary-hover))",
                      border: isSelected ? "1.5px solid #ffffff" : "none"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* X-Axis Label */}
                  <div className={`absolute top-full mt-2 text-[10px] tracking-tight text-center whitespace-nowrap transition-colors duration-200 ${
                    isSelected ? "text-red-650 font-extrabold" : "text-gray-400 font-bold"
                  }`}>
                    {formatMonth(item.month)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EngDashboard() {
  const { setHeaderConfig } = useContext(MesContext);
  const { kpis, isLoading, fetchDashboardKpis } = useDashboardKpis();

  useEffect(() => {
    setHeaderConfig("Dashboard");
    fetchDashboardKpis();
  }, [setHeaderConfig, fetchDashboardKpis]);

  return (
    <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
      <div className="flex flex-col flex-1 min-h-0 space-y-4 overflow-y-auto p-4 md:p-5">
        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Total Active Orders */}
          <Card
            className="shadow-sm border-gray-200"
            styles={{ body: { padding: "12px 16px" } }}
          >
            <div className="flex justify-between items-start mb-2">
              <Text type="secondary" className="text-gray-500 font-medium text-xs">
                Total Active Orders
              </Text>
              <div className="bg-red-50 p-1.5 rounded-md">
                <Archive className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <Spin spinning={isLoading}>
              <div>
                <Title level={4} style={{ margin: 0, fontSize: "18px", fontWeight: 700 }} className="leading-tight">
                  {kpis?.active_orders?.total_value !== undefined
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(kpis.active_orders.total_value)
                    : "$0"}{" "}
                  <span className="text-xs font-normal text-gray-400">backlog</span>
                </Title>
              </div>
              <div className="flex items-center text-xs mt-0.5">
                <Text type="secondary" className="text-gray-400 text-[11px]">
                  {kpis?.active_orders?.count !== undefined
                    ? kpis.active_orders.count
                    : 0}{" "}
                  order(s) in backlog
                </Text>
              </div>
            </Spin>
          </Card>

          {/* KPI 2: Production Efficiency */}
          <Card
            className="shadow-sm border-gray-200"
            styles={{ body: { padding: "12px 16px" } }}
          >
            <div className="flex justify-between items-start mb-2">
              <Text type="secondary" className="text-gray-500 font-medium text-xs">
                Production Efficiency
              </Text>
              <div className="bg-yellow-50 p-1.5 rounded-md">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
            <div>
              <Title level={4} style={{ margin: 0, fontSize: "18px", fontWeight: 700 }} className="leading-tight">
                1,248
              </Title>
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="w-3.5 h-3.5 text-red-500 mr-1 shrink-0" />
              <span className="text-red-500 font-medium mr-1 text-[11px]">+12.5%</span>
              <Text type="secondary" className="text-[11px]">vs last week</Text>
            </div>
          </Card>

          {/* KPI 3: Monthly Output */}
          <Card
            className="shadow-sm border-gray-200"
            styles={{ body: { padding: "12px 16px" } }}
          >
            <div className="flex justify-between items-start mb-2">
              <Text type="secondary" className="text-gray-500 font-medium text-xs">
                Monthly Output
              </Text>
              <div className="bg-slate-100 p-1.5 rounded-md">
                <Factory className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <div>
              <Title level={4} style={{ margin: 0, fontSize: "18px", fontWeight: 700 }} className="leading-tight">
                8,405
              </Title>
            </div>
            <div className="flex items-center text-xs mt-1">
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 mr-1 shrink-0" />
              <span className="text-gray-500 font-medium mr-1 text-[11px]">0.0%</span>
              <Text type="secondary" className="text-[11px]">vs last week</Text>
            </div>
          </Card>

          {/* KPI 4: Current Backlog */}
          <Card
            className="shadow-sm border-gray-200"
            styles={{ body: { padding: "12px 16px" } }}
          >
            <div className="flex justify-between items-start mb-2">
              <Text type="secondary" className="text-gray-500 font-medium text-xs">
                Current Backlog
              </Text>
              <div className="bg-blue-50 p-1.5 rounded-md">
                <ClipboardList className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <div>
              <Title level={4} style={{ margin: 0, fontSize: "18px", fontWeight: 700 }} className="leading-tight">
                342
              </Title>
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingDown className="w-3.5 h-3.5 text-green-500 mr-1 shrink-0" />
              <span className="text-green-500 font-medium mr-1 text-[11px]">-5.2%</span>
              <Text type="secondary" className="text-[11px]">vs last week</Text>
            </div>
          </Card>
        </div>

        {/* Main Content Area (Placeholder for Chart and Recent Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 mt-3">
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-gray-200 h-full min-h-[400px] p-6 bg-white">
              <ShippedOrdersChart
                data={kpis?.shipped_orders}
                isLoading={isLoading}
              />
            </Card>
          </div>
          <div className="lg:col-span-1 flex flex-col">
            <Card
              className="shadow-sm border-gray-200 flex flex-col flex-1"
              styles={{
                body: {
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  minHeight: 0,
                },
              }}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Title
                    level={4}
                    style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}
                    className="text-gray-800"
                  >
                    Current Orders in Past Due
                  </Title>
                  {kpis?.past_due_orders?.length > 0 && (
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">
                      {kpis.past_due_orders.length}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                <Spin spinning={isLoading}>
                  {!kpis?.past_due_orders ||
                  kpis.past_due_orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                      <div className="bg-green-50 p-4 rounded-full mb-3 text-green-500 shadow-sm border border-green-100">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <Text className="text-gray-800 font-semibold text-sm">
                        All Caught Up!
                      </Text>
                      <Text
                        type="secondary"
                        className="text-gray-400 text-xs mt-1 max-w-[200px]"
                      >
                        No active orders are currently past due.
                      </Text>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {kpis.past_due_orders.map((order) => {
                        const today = new Date();
                        const requiredDate = new Date(order.required_date);
                        const isPastDue = requiredDate < today;
                        let daysOverdue = 0;
                        if (isPastDue) {
                          const diffTime = Math.abs(today - requiredDate);
                          daysOverdue = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24),
                          );
                        }

                        // Format required date
                        let dueDateFormatted = "-";
                        if (order.required_date) {
                          const dateObj = new Date(order.required_date);
                          const day = String(dateObj.getDate()).padStart(
                            2,
                            "0",
                          );
                          const monthNames = [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ];
                          const month = monthNames[dateObj.getMonth()];
                          const year = dateObj.getFullYear();
                          dueDateFormatted = `${day} ${month} ${year}`;
                        }

                        const size = order.custom_product_size
                          ? `${order.custom_product_size} ${order.custom_size_uom || ""}`.trim()
                          : order.product_size?.display_name || "-";

                        const productTypeName = order.product_type?.name || "-";

                        return (
                          <div
                            key={order.id}
                            className="p-3 bg-red-50/30 border border-red-100 rounded-xl hover:bg-red-50/50 transition-all duration-200 flex flex-col gap-2 relative overflow-hidden animate-fade-in"
                          >
                            {/* Accent line on left */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-xl" />

                            <div className="flex justify-between items-start pl-1">
                              <div>
                                <span className="font-bold text-gray-800 text-sm tracking-tight">
                                  SO# {order.order_number}
                                </span>
                                <span className="text-gray-400 text-xs mx-1.5">
                                  •
                                </span>
                                <span className="text-gray-500 text-xs font-medium">
                                  {order.customer}
                                </span>
                              </div>
                              <span className="bg-red-100 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                {daysOverdue}{" "}
                                {daysOverdue === 1 ? "day" : "days"} overdue
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 pl-1 mt-1">
                              <div className="flex items-center gap-1">
                                <span className="font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">
                                  {productTypeName} ({size})
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-red-600 font-semibold">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{dueDateFormatted}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-red-100/50 pt-2 mt-1 pl-1">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                Operator:
                              </span>
                              {order.operator ? (
                                <span className="text-xs font-semibold text-gray-700 flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-2xs">
                                  <User className="w-3 h-3 text-gray-400" />
                                  {order.operator.employee
                                    ? `${order.operator.employee.first_name} ${order.operator.employee.last_name}`
                                    : order.operator.username}
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                  <AlertCircle className="w-3 h-3 text-amber-500" />
                                  Unassigned
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Spin>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
