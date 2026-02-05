import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";

export default function EngOrders() {
  const { setTitle } = useContext(MesContext);
  useEffect(() => {
    setTitle("Orders");
  }, [setTitle]);
  return <div>EngOrders</div>;
}

