import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";

export default function EngDashboard() {
  const { setTitle } = useContext(MesContext);
  useEffect(() => {
    setTitle("Engineering Dashboard");
  }, [setTitle]);

  return (
    <div>EngDashboard</div>
  )
}
