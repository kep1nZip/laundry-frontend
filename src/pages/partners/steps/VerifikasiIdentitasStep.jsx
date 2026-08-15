import { useState } from "react";
import FileDropzone from "../../../components/ui/FileDropzone";

/**
 * Step 3 — Verifikasi Identitas (KTP + business licence upload).
 *
 * @param {{ktp: File|null, suratIzin: File|null}} data
 * @param {(patch: object) => void} onChange
 * @param {() => void} onSubmit
 * @param {() => void} onPrev
 * @param {boolean} isSubmitting
 */
function VerifikasiIdentitasStep({ data, onChange, onSubmit, onPrev, isSubmitting }) {
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const nextErrors = {};
    if (!data.ktp) nextErrors.ktp = "Foto KTP wajib diunggah";
    if (!data.suratIzin) nextErrors.suratIzin = "Surat Izin Usaha wajib diunggah";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onSubmit();
  };

  return (
    <div className="partner-step">
      <div className="partner-step__header">
        <h1 className="partner-step__title">Verifikasi Identitas</h1>
        <p className="partner-step__subtitle">
          Silahkan lengkapi verifikasi identitas untuk keperluan registrasi
        </p>
      </div>

      <div className="partner-step__panel">
        <div className="identity-card">
          <div>
            <span className="identity-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6 16c.6-1.6 1.9-2.5 3-2.5s2.4.9 3 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M14 10h4M14 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <p className="identity-card__title">Foto KTP</p>
            <p className="identity-card__desc">Unggah foto KTP yang masih berlaku</p>
            <p className="identity-card__desc" style={{ marginBottom: 6, fontWeight: 600 }}>
              Ketentuan:
            </p>
            <ul className="identity-card__rules">
              <li>Pastikan semua informasi terlihat jelas</li>
              <li>Foto tidak buram dan tidak terpotong</li>
            </ul>
          </div>

          <FileDropzone
            accept=".jpg,.jpeg,.png"
            hint="Supported only JPG & PNG"
            file={data.ktp}
            onFileChange={(file) => {
              onChange({ ktp: file });
              setErrors((prev) => ({ ...prev, ktp: undefined }));
            }}
            error={errors.ktp}
          />
        </div>

        <div className="identity-card">
          <div>
            <span className="identity-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9 13h6M9 16.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <p className="identity-card__title">Surat Izin Usaha</p>
            <p className="identity-card__desc">
              Unggah Surat Izin Usaha atau Dokumen legalitas usaha Anda
            </p>
            <p className="identity-card__desc" style={{ marginBottom: 6, fontWeight: 600 }}>
              Ketentuan:
            </p>
            <ul className="identity-card__rules">
              <li>Dapat berupa NIB, SIUP, atau surat izin usaha lainnya</li>
              <li>Pastikan dokumen masih berlaku</li>
            </ul>
          </div>

          <FileDropzone
            accept=".jpg,.jpeg,.png"
            hint="Supported only JPG & PNG"
            file={data.suratIzin}
            onFileChange={(file) => {
              onChange({ suratIzin: file });
              setErrors((prev) => ({ ...prev, suratIzin: undefined }));
            }}
            error={errors.suratIzin}
          />
        </div>
      </div>

      <div className="partner-step__actions">
        <button type="button" className="btn btn--outline" onClick={onPrev} disabled={isSubmitting}>
          Previous
        </button>
        <button type="button" className="btn btn--primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default VerifikasiIdentitasStep;