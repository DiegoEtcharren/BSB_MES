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
                    : "$0.00"} {" "}
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
          <div className="lg:col-span-1">
            <Card className="shadow-sm border-gray-200 h-full min-h-[400px] flex items-center justify-center bg-gray-50/50">
              <Text type="secondary" className="text-gray-400">
                Recent Activity Placeholder
              </Text>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
