import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";

export default function EngProducts() {
  const { setHeaderConfig } = useContext(MesContext);
  useEffect(() => {
    setHeaderConfig("Products", {
      label: "Add New Product",
      icon: "person",
      onClick: () => {
        console.log("Add Orders Modal...");
        // Open your modal logic here
      },
    });
  }, []);
  return (
    <div>EngProducts</div>
  )
}
