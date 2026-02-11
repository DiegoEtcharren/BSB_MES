import MesContext from "../../context/MesProvider";
import OperatorForm from "../../components/forms/OperatorForm"
import { useContext, useEffect } from "react";

export default function EngOperators() {
  const { setHeaderConfig, openModal} = useContext(MesContext);
  useEffect(() => {
    setHeaderConfig("Operators", {
      label: "Add New Operator",
      icon: "person",
      onClick: () => {
        openModal(<OperatorForm />,
          "Add New Operator"
        )
      },
    });
  }, []);
  return (
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
                  <div className="font-bold text-charcoal text-sm">John Doe</div>
                  <div className="text-xs text-slate-400">Joined Jan 2023</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-slate-600">
              EMP-10045
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">john.doe@bsb.com</td>
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
                  <div className="text-xs text-slate-400">Joined Mar 2022</div>
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
                  <div className="text-xs text-slate-400">Joined Nov 2021</div>
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
                  <div className="font-bold text-charcoal text-sm">Amanda Lee</div>
                  <div className="text-xs text-slate-400">Joined Feb 2024</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-slate-600">
              EMP-10205
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">amanda.lee@bsb.com</td>
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
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> On
                Leave
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
                  <div className="text-xs text-slate-400">Joined Aug 2020</div>
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
                  <div className="font-bold text-charcoal text-sm">Kevin Tran</div>
                  <div className="text-xs text-slate-400">Joined Dec 2023</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-slate-600">
              EMP-10250
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">kevin.tran@bsb.com</td>
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
  );
}
