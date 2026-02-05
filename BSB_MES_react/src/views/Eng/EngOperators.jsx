import MesContext from "../../context/MesProvider";
import { useContext, useEffect } from "react";

export default function EngOperators() {
  const { setTitle } = useContext(MesContext);
  useEffect(() => {
    setTitle("Operators");
  }, [setTitle]);
  return (
    <div>EngOperators</div>
  )
}
