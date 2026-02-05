import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";

export default function EngProducts() {
  const { setTitle } = useContext(MesContext);
  useEffect(() => {
    setTitle("Products");
  }, [setTitle]);
  return (
    <div>EngProducts</div>
  )
}
