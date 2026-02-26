import MesContext from "../../context/MesProvider";
import OperatorForm from "../../components/forms/OperatorForm"
import { useContext, useEffect, useState } from "react";
import { getUserInitials, getRoleFormatting, getStatusFormatting, formatDate } from "../../utilities/tableFormatters";
import { useEmployees } from "../../hooks/useEmployees";
import { toast } from 'react-toastify';

export default function EngOperators() {
  const { setHeaderConfig, openModal } = useContext(MesContext);
  const { employees, isLoading, error, fetchOperators, deleteEmployee } = useEmployees();

  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // Pagination configuration

  const handleDelete = async (id, employee_number) => {
    const isConfirmed = window.confirm(`Are you sure you want to eliminate user ${employee_number}?`);

    if (!isConfirmed) return;

    toast.promise(
      deleteEmployee(id),
      {
        pending: `Eliminating ${employee_number}...`,
        success: `User ${employee_number} has been successfully eliminated.`,
        error: {
          render({ data: error }) {
            return `Failed to eliminate user ${employee_number}.`;
          }
        }
      }
    )
    .then(() => {
      const params = { page };
      if (roleFilter) params.role = roleFilter;
      if (statusFilter) params.status = statusFilter;
      if (searchQuery) params.search = searchQuery;

      fetchOperators(params);
    })
    .catch(() => {
    });
  };

  useEffect(() => {
    setHeaderConfig("Operators", {
      label: "Add New Operator",
      icon: "person",
      onClick: () => {
        openModal(
          <OperatorForm onSuccess={() => fetchOperators()}/>,
          "Add New Operator",
          "Create a new user account for system access",
        );
      },
    });
    fetchOperators();
  }, []);

  useEffect(() => {
    const params = { page };
    if (roleFilter) params.role = roleFilter;
    if (statusFilter) params.status = statusFilter;
    if (searchQuery) params.search = searchQuery;
    fetchOperators(params);
  }, [page, searchQuery, roleFilter, statusFilter, fetchOperators]);

  return (
    <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col h-full max-h-[calc(100vh-8rem)]">
      {/* Search Bar: */}
      <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 text-charcoal placeholder-slate-400"
              placeholder="Search employees..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Filter by:
            </span>
            <select
              className="form-select py-1.5 pl-3 pr-8 text-sm border-slate-200 rounded-md bg-slate-50 focus:border-primary focus:ring-0 cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value={""}>All Roles</option>
              <option value={"engineer"}>Engineering</option>
              <option value={"supervisor"}>Supervisor</option>
              <option value={"operator"}>Operator</option>
            </select>
            <select
              className="form-select py-1.5 pl-3 pr-8 text-sm border-slate-200 rounded-md bg-slate-50 focus:border-primary focus:ring-0 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value={""}>All Status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
              <option value={"on_leave"}>On Leave</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Showing{" "}
          <span className="text-charcoal font-bold">
            {employees?.from || 0}-{employees?.to || 0}
          </span>{" "}
          of <span className="text-charcoal font-bold">{employees?.total || 0}</span>{" "}
          employees
        </div>
      </div>
      {/* End Search Bar */}

      {/* Table: */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead className="sticky top-0 z-10 bg-slate-50 border-b border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <tr>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest w-1/4">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest">
                Employee ID
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-sm font-medium text-slate-500"
                >
                  Loading operators...
                </td>
              </tr>
            ) : employees?.data?.length > 0 ? (
              employees.data.map((employee) => {
                  const userInitials = getUserInitials(employee.first_name, employee.last_name);
                  const roleFormat = getRoleFormatting(employee.role);
                  const statusFormatting = getStatusFormatting(employee.status);
                  const formattedDate = formatDate(employee.hired_at);
                return (
                  <tr
                    key={employee.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    {/* Name Column: */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                          {userInitials}
                        </div>
                        <div>
                          <div className="font-bold text-charcoal text-sm">
                            {employee.first_name} {employee.last_name}
                          </div>
                          <div className="text-xs text-slate-400">
                            Joined {formattedDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Employee ID Column: */}
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {employee.employee_number}
                    </td>
                    {/* Employee Email Column: */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {employee.email}
                    </td>
                    {/* Role Column:  */}
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold ${roleFormat.wrapperClass}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[14px] ${roleFormat.iconClass}`}
                        >
                          {roleFormat.icon}
                        </span>{" "}
                        {employee.role}
                      </span>
                    </td>
                    {/* Status Column: */}
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusFormatting.wrapperClass}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusFormatting.dotClass}`}
                        ></span>{" "}
                        {statusFormatting.label}
                      </span>
                    </td>
                    {/* Actions Column; */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            openModal(
                              <OperatorForm
                                initialData={employee}
                                onSuccess={() => fetchOperators()}
                              />,
                              "Edit Operator",
                              `Update account details for Employee: ${employee.employee_number}`,
                            );
                          }}
                          className="p-1.5 hover:bg-indigo-100 hover:text-indigo-600 text-slate-500 hover:text-charcoal rounded transition-colors cursor-pointer"
                          title="Edit User"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(employee.id, employee.employee_number)
                          }}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );})
            ) : (
              // Empty Operators:
              <tr className="hover:bg-slate-50 transition-colors group">
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-sm font-medium text-slate-500 italic"
                >
                  No Employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* End Table */}
      {/* Pagination Bottons: */}
      <div className="p-4 border-t border-border-subtle bg-slate-50 flex items-center justify-between shrink-0">
        <button
          className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-600 hover:bg-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {employees?.last_page > 0 && Array.from({ length: employees.last_page }, (_, index) => index + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${
                page === pageNum
                  ? "bg-primary text-white font-bold"
                  : "hover:bg-white text-slate-600"
              }`}
              >
              {pageNum}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-600 hover:bg-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={employees?.last_page && page >= employees.last_page}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
      {/* End Pagination Bottons */}
    </div>
  );
}
