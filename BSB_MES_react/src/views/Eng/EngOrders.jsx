import MesContext from "../../context/MesProvider";
import OrderForm from "../../components/forms/OrderForm/OrderFormContainer"
import { useContext, useEffect } from "react";

export default function EngOrders() {
  const { setHeaderConfig, openModal } = useContext(MesContext);
  useEffect(() => {
    setHeaderConfig("Production Orders", {
      label: "Add New Order",
      icon: "post_add",
      onClick: () => {
        openModal(
          <OrderForm onSuccess={() => fetchOperators()}/>,
          "Add New Order",
          "Create a new order",
          true
        );
      },
    });
    // fetchOperators();
  }, []);
  return <div>EngOrders</div>;
}

