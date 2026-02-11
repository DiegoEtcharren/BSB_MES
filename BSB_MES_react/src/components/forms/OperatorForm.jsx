export default function OperatorForm() {
  return (
    <div className="p-8">
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-charcoal" for="firstName">
              Name
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border-slate-300 focus:border-primary focus:ring focus:ring-primary/20 transition-shadow text-sm placeholder:text-slate-400"
              id="firstName"
              placeholder="e.g. Juan"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-charcoal" for="lastName">
              Last Name
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border-slate-300 focus:border-primary focus:ring focus:ring-primary/20 transition-shadow text-sm placeholder:text-slate-400"
              id="lastName"
              placeholder="e.g. Jenkins"
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-charcoal" for="employeeId">
              Employee ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-300 focus:border-primary focus:ring focus:ring-primary/20 transition-shadow text-sm placeholder:text-slate-400"
                id="employeeId"
                placeholder="BSB-XXXX"
                type="text"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-charcoal" for="department">
              Department
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border-slate-300 focus:border-primary focus:ring focus:ring-primary/20 transition-shadow text-sm placeholder:text-slate-400"
              id="department"
              placeholder="e.g. Manufacturing"
              type="text"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal" for="email">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </span>
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-300 focus:border-primary focus:ring focus:ring-primary/20 transition-shadow text-sm placeholder:text-slate-400"
              id="email"
              placeholder="name@bsbsystems.com"
              type="email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-charcoal" for="accessLevel">
            Access Level
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-2.5 rounded-lg border-slate-300 focus:border-primary focus:ring focus:ring-primary/20 transition-shadow text-sm text-charcoal appearance-none bg-white"
              id="accessLevel"
            >
              <option value="">Select a role...</option>
              <option value="operator">Operator (Standard Access)</option>
              <option value="supervisor">Supervisor (Full Access)</option>
              <option value="manager">Manager (Admin Access)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
