import MesContext from "../../context/MesProvider";
import OperatorForm from "../../components/forms/OperatorForm"
import { useContext, useEffect } from "react";

export default function EngOperators() {
  const { setHeaderConfig, openModal, fetchOperators } = useContext(MesContext);
  useEffect(() => {
    setHeaderConfig("Operators", {
      label: "Add New Operator",
      icon: "person",
      onClick: () => {
        openModal(
          <OperatorForm />,
          "Add New Operator",
          "Create a new user account for system access",
        );
      },
    });

    fetchOperators();
  }, []);

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
              placeholder="Search operators..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Filter by:
            </span>
            <select className="form-select py-1.5 pl-3 pr-8 text-sm border-slate-200 rounded-md bg-slate-50 focus:border-primary focus:ring-0 cursor-pointer">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Supervisor</option>
              <option>Operator</option>
            </select>
            <select className="form-select py-1.5 pl-3 pr-8 text-sm border-slate-200 rounded-md bg-slate-50 focus:border-primary focus:ring-0 cursor-pointer">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Showing <span className="text-charcoal font-bold">1-10</span> of{" "}
          <span className="text-charcoal font-bold">24</span> operators
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
            <tr className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                    JD
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm">
                      John Doe
                    </div>
                    <div className="text-xs text-slate-400">
                      Joined Jan 2023
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                EMP-10045
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                john.doe@bsb.com
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-600">
                  <span className="material-symbols-outlined text-[14px]">
                    engineering
                  </span>{" "}
                  Operator
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-charcoal rounded transition-colors"
                    title="Edit User"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                  </button>
                  <button
                    className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors"
                    title="Delete User"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                    SJ
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm">
                      Sarah Jenkins
                    </div>
                    <div className="text-xs text-slate-400">
                      Joined Mar 2022
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                EMP-10089
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                sarah.jenkins@bsb.com
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold bg-purple-50 text-purple-700">
                  <span className="material-symbols-outlined text-[14px]">
                    supervisor_account
                  </span>{" "}
                  Supervisor
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-charcoal rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                  </button>
                  <button className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">
                    MR
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm">
                      Michael Ross
                    </div>
                    <div className="text-xs text-slate-400">
                      Joined Nov 2021
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                EMP-10112
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                michael.ross@bsb.com
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-600">
                  <span className="material-symbols-outlined text-[14px]">
                    engineering
                  </span>{" "}
                  Operator
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>{" "}
                  Inactive
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-charcoal rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                  </button>
                  <button className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    AL
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm">
                      Amanda Lee
                    </div>
                    <div className="text-xs text-slate-400">
                      Joined Feb 2024
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                EMP-10205
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                amanda.lee@bsb.com
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700">
                  <span className="material-symbols-outlined text-[14px]">
                    verified_user
                  </span>{" "}
                  QA Lead
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>{" "}
                  On Leave
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-charcoal rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                  </button>
                  <button className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-xs">
                    RB
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm">
                      Robert Brown
                    </div>
                    <div className="text-xs text-slate-400">
                      Joined Aug 2020
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                EMP-10022
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                robert.brown@bsb.com
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-600">
                  <span className="material-symbols-outlined text-[14px]">
                    engineering
                  </span>{" "}
                  Operator
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-charcoal rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                  </button>
                  <button className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">
                    KT
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm">
                      Kevin Tran
                    </div>
                    <div className="text-xs text-slate-400">
                      Joined Dec 2023
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                EMP-10250
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                kevin.tran@bsb.com
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-600">
                  <span className="material-symbols-outlined text-[14px]">
                    engineering
                  </span>{" "}
                  Operator
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-charcoal rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                  </button>
                  <button className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* End Table */}
      {/* Pagination Bottons: */}
      <div className="p-4 border-t border-border-subtle bg-slate-50 flex items-center justify-between shrink-0">
        <button className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-600 hover:bg-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white text-sm font-bold">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-slate-600 text-sm font-medium transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-slate-600 text-sm font-medium transition-colors">
            3
          </button>
        </div>
        <button className="px-4 py-2 border border-slate-300 rounded-md text-sm font-semibold text-slate-600 hover:bg-white hover:text-primary transition-colors">
          Next
        </button>
      </div>
      {/* End Pagination Bottons */}
    </div>
  );
}
