import FormField from '../../../../components/forms/FormField';
import { useState, useEffect } from 'react';
import {
  Check,
  Gauge,
  Box,
  ArrowLeft,
  ArrowRight,
  X,
  ArrowLeftRight,
  Settings2
} from 'lucide-react';
import { getInputClass } from "../../../../utilities/formUtilities";
import { calculatePressureLimits } from "../../../../utilities/pressureLogic";
import InputRange from "../ranges/InputRange";
import { useMasterData } from '../../../../context/MasterDataContext';

export default function Step33OrderTol({
  formData,
  handleChange,
  errors,
  manufacturingRangesRules,
}) {

  const [rangeMode, setRangeMode] = useState('mdr');

  useEffect(() => {
    if (
      !formData.manufacturing_range_id ||
      !formData.burst_pressure ||
      !manufacturingRangesRules ||
      formData.manufacturing_range_id === 'SPCL'
    ) {
      return;
    }

    const selectedRange = manufacturingRangesRules.find(
      (range) => range.id == formData.manufacturing_range_id,
    );

    if (selectedRange?.range_rules) {
      const pressureLimits = calculatePressureLimits(
        formData.burst_pressure,
        selectedRange.range_rules,
      );

      handleChange({
        target: {
          name: "lower_manufacturing_range",
          value: pressureLimits.min,
        },
      });

      handleChange({
        target: {
          name: "upper_manufacturing_range",
          value: pressureLimits.max,
        },
      });
    }
  }, [formData.manufacturing_range_id, formData.burst_pressure]);

  const handleManualRangeChange = (e) => {
    handleChange(e);
    if (formData.manufacturing_range_id !== "SPCL") {
      handleChange({
        target: {
          name: "manufacturing_range_id",
          value: "SPCL",
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-2">
      <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
        Design Range
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {/* MDR Option */}
        <div
          onClick={() => setRangeMode("mdr")}
          className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 ${
            rangeMode === "mdr"
              ? "border-red-600 bg-red-50/30"
              : "border-gray-200 hover:border-red-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h4
              className={`font-bold ${rangeMode === "mdr" ? "text-red-700" : "text-gray-700"}`}
            >
              MDR
            </h4>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                rangeMode === "mdr" ? "border-red-600" : "border-gray-300"
              }`}
            >
              {rangeMode === "mdr" && (
                <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Use Manufacturing Design Range methodology with calculated
            percentage bounds.
          </p>
        </div>

        {/* Custom Option */}
        <div
          onClick={() => setRangeMode("custom")}
          className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 ${
            rangeMode === "custom"
              ? "border-red-600 bg-red-50/30"
              : "border-gray-200 hover:border-red-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h4
              className={`font-bold ${rangeMode === "custom" ? "text-red-700" : "text-gray-700"}`}
            >
              Custom Min / Max
            </h4>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                rangeMode === "custom" ? "border-red-600" : "border-gray-300"
              }`}
            >
              {rangeMode === "custom" && (
                <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Manually define specific lower and upper limits.
          </p>
        </div>
      </div>
      <div className="flex items-end justify-center gap-4">
        {rangeMode === "mdr" && (
          <div className="w-48 mr-4">
            <FormField
              label="Range"
              name="manufacturing_range_id"
              errors={errors}
            >
              <select
                value={formData.manufacturing_range_id}
                onChange={handleChange}
                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                name="manufacturing_range_id"
                id="manufacturing_range_id"
              >
                <option disabled hidden className="text-slate-400" value="">
                  -- Select Range --
                </option>
                {manufacturingRangesRules.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.range_name.toUpperCase()}
                  </option>
                ))}
                <option value="SPCL">SPCL</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </div>
            </FormField>
          </div>
        )}
        {/* Lower Bound */}
        <div className="w-48">
          <label className="block text-xs font-bold text-primary mb-2 uppercase">
            Lower Bound (PSI)
          </label>
          <input
            type="number"
            value={formData.lower_manufacturing_range}
            handleChange={handleManualRangeChange}
            className="w-full bg-white border border-gray-300 text-gray-900 text-xl font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
        {/* Separator Icon */}
        <div className="pb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
            <ArrowLeftRight size={14} />
          </div>
        </div>
        {/* Upper Bound */}
        <div className="w-48">
          <label className="block text-xs font-bold text-primary mb-2 uppercase">
            Upper Bound (PSI)
          </label>
          <input
            type="number"
            value={formData.upper_manufacturing_range}
            handleChange={handleManualRangeChange}
            className="w-full bg-white border border-gray-300 text-gray-900 text-xl font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
      </div>

    </div>
  );
}
