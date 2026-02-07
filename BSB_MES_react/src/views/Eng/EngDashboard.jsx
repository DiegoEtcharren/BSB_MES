import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";

export default function EngDashboard() {
  const { setHeaderConfig } = useContext(MesContext);
  useEffect(() => {setHeaderConfig("Dashboard")}, []);
  return (
    <div>EngDashboard</div>
  )
}
