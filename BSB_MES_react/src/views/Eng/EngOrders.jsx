import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";

export default function EngOrders() {
  const { setHeaderConfig } = useContext(MesContext);
  useEffect(() => {
    setHeaderConfig("Orders", {
      label: "Add New Order",
      icon: "person",
      onClick: () => {
        console.log("Add Orders Modal...");
        // Open your modal logic here
      },
    });
  }, []);
  return <div>EngOrders</div>;
}

