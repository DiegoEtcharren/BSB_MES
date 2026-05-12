import { useEffect, useState } from "react";
import axiosClient from "../../../../config/axios";
import FormField from "../../FormField";
import { getInputClass } from "../../../../utilities/formUtilities";

export default function Step7OrderCerts({ formData, handleChange, setFormData, errors }) {
  const [availableCerts, setAvailableCerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await axiosClient.get("/api/v1/certificates");
        setAvailableCerts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch certificates", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const handleCheckboxChange = (certId) => {
    const isSelected = formData.certificates.includes(certId);
    let newCertificates;
    if (isSelected) {
      newCertificates = formData.certificates.filter((id) => id !== certId);
    } else {
      newCertificates = [...formData.certificates, certId];
    }
    handleChange({ target: { name: 'certificates', value: newCertificates } });
  };

  const handleAddCustomCert = () => {
    const newCustomCert = { id: `custom-${Date.now()}`, name: "", description: "" };
    handleChange({
      target: {
        name: 'custom_certificates',
        value: [...(formData.custom_certificates || []), newCustomCert]
      }
    });
  };

  const handleCustomCertChange = (id, field, value) => {
    const updatedCerts = formData.custom_certificates.map((cert) =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    handleChange({ target: { name: 'custom_certificates', value: updatedCerts } });
  };

  const handleRemoveCustomCert = (id) => {
    const updatedCerts = formData.custom_certificates.filter((cert) => cert.id !== id);
    handleChange({ target: { name: 'custom_certificates', value: updatedCerts } });
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-2">
      <div>
        <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">
          Standard Certificates
        </h3>
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading certificates...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableCerts.map((cert) => (
              <label key={cert.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                  checked={formData.certificates.includes(cert.id)}
                  onChange={() => handleCheckboxChange(cert.id)}
                />
                <span className="text-sm text-slate-700 font-medium">{cert.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3">
            Additional Certificates
          </h3>
          <button
            type="button"
            onClick={handleAddCustomCert}
            className="flex items-center gap-2 text-primary hover:bg-[#FFDAD9] px-3 py-1.5 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg" data-icon="add_circle">
              add_circle
            </span>
            Add Certificate
          </button>
        </div>

        {(!formData.custom_certificates || formData.custom_certificates.length === 0) ? (
          <p className="text-sm text-slate-500 italic">No additional certificates added.</p>
        ) : (
          <div className="space-y-4">
            {formData.custom_certificates.map((cert) => (
              <div key={cert.id} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50 relative">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Certificate Name</label>
                    <input
                      type="text"
                      className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-primary focus:border-primary focus:ring-primary/20"
                      placeholder="e.g., ISO 9001"
                      value={cert.name}
                      onChange={(e) => handleCustomCertChange(cert.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Description (Optional)</label>
                    <input
                      type="text"
                      className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-primary focus:border-primary focus:ring-primary/20"
                      placeholder="Enter description..."
                      value={cert.description}
                      onChange={(e) => handleCustomCertChange(cert.id, "description", e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCustomCert(cert.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors mt-6"
                  title="Remove"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
