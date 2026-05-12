import React from 'react';
import DragDropFileUpload from '../../../ui/DragDropFileUpload';

export default function Step8Attachments({ formData, setFormData, errors }) {
  const attachments = formData.attachments || [];

  const handleFilesChange = (newFiles) => {
    setFormData((prev) => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...newFiles],
    }));
  };

  const handleFileRemove = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-2">
      <div>
        <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3 mb-6">
          Attachments
        </h3>

        <DragDropFileUpload
          files={attachments}
          onFilesChange={handleFilesChange}
          onFileRemove={handleFileRemove}
          error={errors?.attachments}
        />
      </div>
    </div>
  );
}
