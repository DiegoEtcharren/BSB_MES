import { useState, useContext, useEffect } from "react";
import axiosClient from "../../../config/axios";
import MesContext from "../../../context/MesProvider";
import { toast } from "react-toastify";

export default function AssignOperatorModal({ orderId, currentOperatorId, onSuccess }) {
  const { closeModal } = useContext(MesContext);
  const [operatorId, setOperatorId] = useState(currentOperatorId || "");
  const [operators, setOperators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axiosClient.get("/api/v1/operators");
        setOperators(response.data.data);
      } catch (err) {
        console.error("Could not fetch operators", err);
      }
    };
    fetchOperators();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosClient.patch(`/api/v1/production-orders/${orderId}/operator`, {
        operator_id: operatorId || null,
      });
      toast.success("Operator assigned successfully");
      if (onSuccess) onSuccess();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign operator");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Select Operator
          </label>
          <select
            value={operatorId}
            onChange={(e) => setOperatorId(e.target.value)}
            className="w-full form-select px-4 py-2 border-slate-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
          >
            <option value="">No Operator Assigned</option>
            {operators.map((op) => (
              <option key={op.id} value={op.id}>
                {op.employee ? `${op.employee.first_name} ${op.employee.last_name}` : op.username}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isLoading ? "Assigning..." : "Assign Operator"}
          </button>
        </div>
      </form>
    </div>
  );
}
