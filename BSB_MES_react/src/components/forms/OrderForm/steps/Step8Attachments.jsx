import React, { useCallback, useState, useRef } from 'react';
import { UploadCloud, X, File, Image as ImageIcon } from 'lucide-react';

export default function Step8Attachments({ formData, setFormData, errors }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // Reasonable file limit ~ 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = [];
    const invalidFiles = [];

    Array.from(files).forEach((file) => {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(`${file.name} (Exceeds 10MB limit)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      alert(`Some files were ignored:\n${invalidFiles.join('\n')}`);
    }

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...validFiles],
      }));
    }
  };

  const removeFile = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, index) => index !== indexToRemove),
    }));
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const attachments = formData.attachments || [];

  return (
    <div className="grid grid-cols-1 gap-4 p-2">
      <div>
        <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-l-4 border-primary pl-3 mb-6">
          Attachments
        </h3>

        <div className="flex flex-col gap-4">
          <div
            className={`relative flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl transition-colors cursor-pointer bg-slate-50
              ${
                dragActive
                  ? "border-primary bg-red-50"
                  : "border-slate-300 hover:border-primary hover:bg-slate-100"
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf, .doc, .docx, .xls, .xlsx, image/png, image/jpeg, image/jpg"
              onChange={handleChange}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <UploadCloud className="w-12 h-12 text-slate-400 mb-2" />
              <p className="text-lg font-semibold text-slate-700">
                Click or drag files here
              </p>
              <p className="text-sm text-slate-500">
                Support for PDF, Images, and Docs (Max 10MB)
              </p>
            </div>
          </div>

          {errors?.attachments && (
            <p className="text-red-500 text-sm mt-1">{errors.attachments}</p>
          )}

          {attachments.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">
                Selected Files ({attachments.length})
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {attachments.map((file, index) => {
                  const isImage = file.type?.startsWith("image/");
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {isImage ? (
                          <ImageIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                        ) : (
                          <File className="w-8 h-8 text-red-500 flex-shrink-0" />
                        )}
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-slate-700 truncate">
                            {file.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove file"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
