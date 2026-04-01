import { useState, useEffect } from 'react';
import { ArrowRightLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

const InputRange = ({ unit, lowerValue, upperValue, handleChange }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (parseFloat(lowerValue) >= parseFloat(upperValue)) {
      setError('Min must be lower than Max');
    } else {
      setError('');
    }
  }, [lowerValue, upperValue]);

  return (
    <div className="space-y-4">
      <div className="relative flex items-center gap-0">
        {/* Min Input Box */}
        <div className="flex-1">
          <div className={`relative flex flex-col p-3 border rounded-l-xl transition-all ${
            error ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'
          }`}>
            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1">Lower Bound ({unit})</label>
            <input
              type="number"
              name='lower_manufacturing_range'
              value={lowerValue}
              onChange={handleChange}
              className="bg-transparent text-lg font-semibold text-slate-800 outline-none w-full"
            />
          </div>
        </div>

        {/* Visual Link */}
        <div className={`z-10 -mx-3 flex items-center justify-center w-8 h-8 rounded-full border bg-white shadow-sm ${
          error ? 'border-red-500 text-red-500' : 'border-slate-200 text-slate-400'
        }`}>
          <ArrowRightLeft size={14} />
        </div>

        {/* Max Input Box */}
        <div className="flex-1">
          <div className={`relative flex flex-col p-3 border rounded-r-xl transition-all border-l-0 ${
            error ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white'
          }`}>
            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1">Upper Bound ({unit})</label>
            <input
              type="number"
              name='upper_manufacturing_range'
              value={upperValue}
              onChange={handleChange}
              className="bg-transparent text-lg font-semibold text-slate-800 outline-none w-full"
            />
          </div>
        </div>
      </div>

      {error ? (
        <div className="flex items-center gap-1.5 text-red-600 text-xs font-bold animate-pulse">
          <AlertCircle size={14} />
          {error}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-tight justify-center">
          <CheckCircle2 size={14} />
          Range Acceptable
        </div>
      )}
    </div>
  );
};

export default InputRange;