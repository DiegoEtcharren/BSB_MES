import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";
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

export default function EngDashboard() {
  const { setHeaderConfig } = useContext(MesContext);
  const { kpis, isLoading, fetchDashboardKpis } = useDashboardKpis();

  useEffect(() => {
    setHeaderConfig("Dashboard");
    fetchDashboardKpis();
  }, [setHeaderConfig, fetchDashboardKpis]);

  return (
    <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
      <div className="flex flex-col flex-1 min-h-0 space-y-6 overflow-y-auto p-6">
        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Total Active Orders */}
          <Card
            className="shadow-sm border-gray-200"
            bodyStyle={{ padding: "20px" }}
          >
            <div className="flex justify-between items-start mb-4">
              <Text type="secondary" className="text-gray-500 font-medium">
                Total Active Orders
              </Text>
              <div className="bg-red-50 p-2 rounded-md">
                <Archive className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <Spin spinning={isLoading}>
              <div className="mb-2">
                <Title level={2} style={{ margin: 0 }}>
                  {kpis?.active_orders?.total_value !== undefined
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(kpis.active_orders.total_value)
                    : "$0.00"}{" "}
                  in backlog
                </Title>
              </div>
              <div className="flex items-center text-sm">
                <Text type="secondary">
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
            styles={{ padding: "20px" }}
          >
            <div className="flex justify-between items-start mb-4">
              <Text type="secondary" className="text-gray-500 font-medium">
                Production Efficiency
              </Text>
              <div className="bg-yellow-50 p-2 rounded-md">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <div className="mb-2">
              <Title level={2} style={{ margin: 0 }}>
                1,248
              </Title>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500 font-medium mr-1">+12.5%</span>
              <Text type="secondary">vs last week</Text>
            </div>
          </Card>

          {/* KPI 3: Monthly Output */}
          <Card
            className="shadow-sm border-gray-200"
            bodyStyle={{ padding: "20px" }}
          >
            <div className="flex justify-between items-start mb-4">
              <Text type="secondary" className="text-gray-500 font-medium">
                Monthly Output
              </Text>
              <div className="bg-slate-100 p-2 rounded-md">
                <Factory className="w-5 h-5 text-slate-500" />
              </div>
            </div>
            <div className="mb-2">
              <Title level={2} style={{ margin: 0 }}>
                8,405
              </Title>
            </div>
            <div className="flex items-center text-sm">
              <ArrowRight className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-500 font-medium mr-1">0.0%</span>
              <Text type="secondary">vs last week</Text>
            </div>
          </Card>

          {/* KPI 4: Current Backlog */}
          <Card
            className="shadow-sm border-gray-200"
            bodyStyle={{ padding: "20px" }}
          >
            <div className="flex justify-between items-start mb-4">
              <Text type="secondary" className="text-gray-500 font-medium">
                Current Backlog
              </Text>
              <div className="bg-blue-50 p-2 rounded-md">
                <ClipboardList className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="mb-2">
              <Title level={2} style={{ margin: 0 }}>
                342
              </Title>
            </div>
            <div className="flex items-center text-sm">
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium mr-1">-5.2%</span>
              <Text type="secondary">vs last week</Text>
            </div>
          </Card>
        </div>

        {/* Main Content Area (Placeholder for Chart and Recent Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 mt-5">
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-gray-200 h-full min-h-[400px] flex items-center justify-center bg-gray-50/50">
              <Text type="secondary" className="text-gray-400">
                Chart Placeholder (Order Volume vs. Completion)
              </Text>
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
                  <Title level={4} style={{ margin: 0, fontSize: "16px", fontWeight: 700 }} className="text-gray-800">
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
                  {!kpis?.past_due_orders || kpis.past_due_orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                      <div className="bg-green-50 p-4 rounded-full mb-3 text-green-500 shadow-sm border border-green-100">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <Text className="text-gray-800 font-semibold text-sm">
                        All Caught Up!
                      </Text>
                      <Text type="secondary" className="text-gray-400 text-xs mt-1 max-w-[200px]">
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
                          daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        }

                        // Format required date
                        let dueDateFormatted = "-";
                        if (order.required_date) {
                          const dateObj = new Date(order.required_date);
                          const day = String(dateObj.getDate()).padStart(2, "0");
                          const monthNames = [
                            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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
                                <span className="text-gray-400 text-xs mx-1.5">•</span>
                                <span className="text-gray-500 text-xs font-medium">
                                  {order.customer}
                                </span>
                              </div>
                              <span className="bg-red-100 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                {daysOverdue} {daysOverdue === 1 ? "day" : "days"} overdue
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
