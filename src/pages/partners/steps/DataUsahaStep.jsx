import { useState } from "react";
import FileDropzone from "../../../components/ui/FileDropzone";

/**
 * Step 1 — Data Usaha (business profile).
 *
 * @param {{nama: string, alamat: string, logo: File|null}} data
 * @param {(patch: object) => void} onChange
 * @param {() => void} onNext
 */
function DataUsahaStep({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    const nextErrors = {};
    if (!data.nama.trim()) nextErrors.nama = "Nama loundry wajib diisi";
    if (!data.alamat.trim()) nextErrors.alamat = "Alamat lengkap wajib diisi";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  };

  return (
    <div className="partner-step">
      <div className="partner-step__header">
        <h1 className="partner-step__title">Data Usaha</h1>
        <p className="partner-step__subtitle">
          Silahkan lengkapi data usaha untuk keperluan registrasi
        </p>
      </div>

      <div className="partner-step__panel">
        <div className="form-group">
          <label htmlFor="nama-loundry" className="form-label form-label--required">
            Nama Loundry
          </label>
          <input
            id="nama-loundry"
            type="text"
            className={`form-input${errors.nama ? " form-input--error" : ""}`}
            placeholder="Loundry Ambatukam"
            value={data.nama}
            onChange={(event) => onChange({ nama: event.target.value })}
          />
          {errors.nama && <p className="form-error">{errors.nama}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="alamat-lengkap" className="form-label form-label--required">
            Alamat Lengkap
          </label>
          <textarea
            id="alamat-lengkap"
            className={`form-textarea${errors.alamat ? " form-textarea--error" : ""}`}
            placeholder="Jl. Sukapura nomor 67 abanga"
            value={data.alamat}
            onChange={(event) => onChange({ alamat: event.target.value })}
          />
          {errors.alamat && <p className="form-error">{errors.alamat}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Foto/Logo Loundry</label>
          <FileDropzone
            accept=".jpg,.jpeg,.png"
            hint="Supported only JPG & PNG"
            file={data.logo}
            onFileChange={(file) => onChange({ logo: file })}
          />
        </div>
      </div>

      <div className="partner-step__actions">
        <button type="button" className="btn btn--primary btn--full" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default DataUsahaStep;