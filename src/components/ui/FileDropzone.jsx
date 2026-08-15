import { useId, useRef, useState } from "react";
import "../../styles/components/FileDropzone.css";

/**
 * Drag & drop (or click to browse) file upload field.
 *
 * @param {string} accept - input "accept" attribute, e.g. ".jpg,.jpeg,.png"
 * @param {string} hint - helper text shown under the icon, e.g. "Supported only JPG & PNG"
 * @param {File|null} file - currently selected file (controlled by parent)
 * @param {(file: File|null) => void} onFileChange
 * @param {string} [error] - error message shown below the dropzone
 */
function FileDropzone({ accept, hint, file, onFileChange, error }) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList) => {
    const selected = fileList?.[0];
    if (selected) onFileChange(selected);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label
        htmlFor={inputId}
        className={`file-dropzone${isDragging ? " file-dropzone--dragging" : ""}${
          error ? " file-dropzone--error" : ""
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          className="file-dropzone__input"
          onChange={(event) => handleFiles(event.target.files)}
        />

        {file ? (
          <div className="file-dropzone__selected">
            <span className="file-dropzone__file-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="file-dropzone__filename">{file.name}</span>
            <button
              type="button"
              className="file-dropzone__remove"
              onClick={handleRemove}
              aria-label="Hapus file"
            >
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <span className="file-dropzone__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="file-dropzone__title">Drag &amp; drop file here</p>
            <p className="file-dropzone__hint">{hint}</p>
          </>
        )}
      </label>
      {error && <p className="file-dropzone__error-text">{error}</p>}
    </div>
  );
}

export default FileDropzone;