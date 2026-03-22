import { useEffect, useState} from 'react';
import { useStandardProductComponents } from "../../../../hooks/useStandardProductComponents";

export default function Step3OrderBOM({
  formData,
  handleChange,
  errors,
}) {

  const {isLoading, productComponents, fetchProductComponents} = useStandardProductComponents();
  const [bomRows, setBomRows] = useState([]);

  useEffect(() => {
    // Fetch until product and size have been selected:
    if (formData.product_type_id && formData.product_size_id) {
      fetchProductComponents({
        product_type_id: formData.product_type_id,
        product_size_id: formData.product_size_id,
      });
    }
  }, [formData.product_type_id, formData.product_size_id]);

  useEffect(() => {
    if (productComponents.length > 0) {
      setBomRows(productComponents);
    }
  }, [productComponents]);

  // Table handling functions:
  const handleAddRow = () => {
    const newRow = {
      id: `temp-${Date.now()}`,
      name: "",
      part_number: "",
      material: "316 SST"
    };
    setBomRows([...bomRows, newRow]);
  };

  const handleDeleteRow = (idToRemove) => {
    setBomRows(bomRows.filter((row) => row.id !== idToRemove));
  };

  const handleInputChange = (id, field, value) => {
    setBomRows(
      bomRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-2">
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
            BOM
          </h3>
          <div className="flex justify-end w-full py-2">
            <button
              onClick={handleAddRow}
              className="flex items-center gap-2 text-primary hover:bg-[#FFDAD9] px-3 py-1.5 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-lg"
                data-icon="add_circle"
              >
                add_circle
              </span>
              Add Row
            </button>
          </div>
          <div className="border border-[#CBD5E1] rounded-lg overflow-hidden">
            {isLoading && (
              <p className="text-xs text-[#64748B] mb-2">
                Loading BOM data from MES server...
              </p>
            )}
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F1F5F9] border-b border-[#CBD5E1]">
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Component Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Component Part Number
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Material
                  </th>
                  <th className="px-4 py-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD5E1]">
                {bomRows.length === 0 && !isLoading ? (
                  <tr className="bg-[#FFFFFF]/50">
                    <td
                      className="px-6 py-4 italic text-[#94A3B8] text-xs text-center"
                      colSpan="4"
                    >
                      No components in this order. Click 'Add Row' to begin.
                    </td>
                  </tr>
                ) : (
                  bomRows.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="hover:bg-[#FFFFFF] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          className="w-full bg-transparent border-none focus:ring-0 text-sm p-0 placeholder:text-[#94A3B8]"
                          placeholder="Enter name..."
                          type="text"
                          value={item.component_name}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          className="w-full bg-transparent border-none focus:ring-0 text-sm p-0 placeholder:text-[#94A3B8]"
                          placeholder="PN-XXXX"
                          type="text"
                          value={item.component_part_number}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          className="w-full bg-transparent border-none focus:ring-0 text-sm p-0"
                          value={item.material}
                        >
                          <option value="Stainless Steel 316L">316 SST</option>
                          <option value="Carbon Steel">Carbon Steel</option>
                          <option value="Alloy 400">Alloy 400</option>
                          <option value="Titanium Grade 2">
                            Titanium Grade 2
                          </option>
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDeleteRow(item.id)}
                          className="text-[#64748B] hover:text-primary transition-colors cursor-pointer"
                        >
                          <span
                            className="material-symbols-outlined text-lg"
                            data-icon="delete"
                          >
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
