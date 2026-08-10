import { useState } from "react";
import StepIndicator from "../../components/ui/StepIndicator";
import DataUsahaStep from "./steps/DataUsahaStep";
import DataLayananStep from "./steps/DataLayananStep";
import VerifikasiIdentitasStep from "./steps/VerifikasiIdentitasStep";
import "../../styles/pages/PartnerRegister.css";

const STEPS = [
  { id: 1, label: "Data Usaha" },
  { id: 2, label: "Data Layanan" },
  { id: 3, label: "Verifikasi Identitas" },
];

const INITIAL_FORM = {
  usaha: { nama: "", alamat: "", logo: null },
  layanan: [],
  identitas: { ktp: null, suratIzin: null },
};

/**
 * Mitra (laundry partner) onboarding — 3-step registration wizard:
 * 1. Data Usaha, 2. Data Layanan, 3. Verifikasi Identitas.
 */
function PartnerRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const goNext = () => setCurrentStep((step) => Math.min(step + 1, STEPS.length));
  const goPrev = () => setCurrentStep((step) => Math.max(step - 1, 1));

  const updateUsaha = (patch) =>
    setFormData((prev) => ({ ...prev, usaha: { ...prev.usaha, ...patch } }));

  const updateLayanan = (nextLayanan) =>
    setFormData((prev) => ({ ...prev, layanan: nextLayanan }));

  const updateIdentitas = (patch) =>
    setFormData((prev) => ({ ...prev, identitas: { ...prev.identitas, ...patch } }));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: wire this up to services/api.js, e.g.
      // await api.post("/partners/register", buildFormData(formData));
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="partner-register">
        <header className="partner-register__header">
          <span className="partner-register__brand">
            Loundry<span>In</span>
          </span>
        </header>
        <div className="partner-register__body">
          <div className="partner-step">
            <div className="partner-step__panel" style={{ textAlign: "center" }}>
              <h1 className="partner-step__title">Pendaftaran terkirim</h1>
              <p className="partner-step__subtitle">
                Data usaha "{formData.usaha.nama}" sedang kami tinjau. Kami akan menghubungi Anda
                setelah proses verifikasi selesai.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="partner-register">
      <header className="partner-register__header">
        <span className="partner-register__brand">
          Loundry<span>In</span>
        </span>
        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </header>

      <div className="partner-register__body">
        {currentStep === 1 && (
          <DataUsahaStep data={formData.usaha} onChange={updateUsaha} onNext={goNext} />
        )}

        {currentStep === 2 && (
          <DataLayananStep
            data={formData.layanan}
            onChange={updateLayanan}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}

        {currentStep === 3 && (
          <VerifikasiIdentitasStep
            data={formData.identitas}
            onChange={updateIdentitas}
            onSubmit={handleSubmit}
            onPrev={goPrev}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

export default PartnerRegister;