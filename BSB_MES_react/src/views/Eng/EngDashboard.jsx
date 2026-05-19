import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";

export default function EngDashboard() {
  const { setHeaderConfig } = useContext(MesContext);
  useEffect(() => {setHeaderConfig("Dashboard")}, []);
  return (
        <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col flex-1 min-h-0"></div>
  )
}
