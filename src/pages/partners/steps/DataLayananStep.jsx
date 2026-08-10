import { useState } from "react";

const JENIS_LAYANAN_OPTIONS = ["Loundry Kiloan", "Loundry Satuan", "Dry Clean", "Setrika Saja"];
const SATUAN_OPTIONS = ["Kilo", "Pcs", "Meter"];
const ESTIMASI_UNIT_OPTIONS = ["Jam", "Hari"];

const EMPTY_ENTRY = {
  jenis: JENIS_LAYANAN_OPTIONS[0],
  satuan: SATUAN_OPTIONS[0],
  harga: "",
  estimasiValue: "1",
  estimasiUnit: ESTIMASI_UNIT_OPTIONS[1],
};

const formatRupiah = (value) => {
  const numeric = Number(String(value).replace(/[^0-9]/g, ""));
  if (!numeric) return "";
  return `Rp${numeric.toLocaleString("id-ID")}`;
};

/**
 * Step 2 — Data Layanan (service catalogue).
 *
 * @param {Array} data - list of added services
 * @param {(next: Array) => void} onChange
 * @param {() => void} onNext
 * @param {() => void} onPrev
 */
function DataLayananStep({ data, onChange, onNext, onPrev }) {
  const [entry, setEntry] = useState(EMPTY_ENTRY);
  const [entryError, setEntryError] = useState("");
  const [listError, setListError] = useState("");

  const updateEntry = (patch) => setEntry((prev) => ({ ...prev, ...patch }));

  const handleTambah = () => {
    if (!entry.harga) {
      setEntryError("Harga layanan wajib diisi");
      return;
    }

    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        jenis: entry.jenis,
        satuan: entry.satuan,
        harga: Number(entry.harga),
        estimasi: `${entry.estimasiValue} ${entry.estimasiUnit}`,
      },
    ]);
    setEntry(EMPTY_ENTRY);
    setEntryError("");
    setListError("");
  };

  const handleRemove = (id) => onChange(data.filter((item) => item.id !== id));

  const handleContinue = () => {
    if (data.length === 0) {
      setListError("Tambahkan minimal satu layanan sebelum melanjutkan");
      return;
    }
    onNext();
  };

  return (
    <div className="partner-step partner-step--wide">
      <div className="partner-step__header">
        <h1 className="partner-step__title">Data Layanan</h1>
        <p className="partner-step__subtitle">
          Silahkan lengkapi data usaha untuk keperluan registrasi
        </p>
      </div>

      <div className="partner-step__panel">
        <div className="service-form">
          <div className="form-group">
            <label className="form-label">Jenis Layanan</label>
            <select
              className="form-select"
              value={entry.jenis}
              onChange={(event) => updateEntry({ jenis: event.target.value })}
            >
              {JENIS_LAYANAN_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Pilih Satuan</label>
            <select
              className="form-select"
              value={entry.satuan}
              onChange={(event) => updateEntry({ satuan: event.target.value })}
            >
              {SATUAN_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Harga</label>
            <input
              type="text"
              inputMode="numeric"
              className={`form-input${entryError ? " form-input--error" : ""}`}
              placeholder="Rp19.000"
              value={formatRupiah(entry.harga)}
              onChange={(event) => {
                updateEntry({ harga: event.target.value.replace(/[^0-9]/g, "") });
                setEntryError("");
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Estimasi Pengerjaan</label>
            <div className="service-form__estimate">
              <input
                type="number"
                min="1"
                className="form-input"
                value={entry.estimasiValue}
                onChange={(event) => updateEntry({ estimasiValue: event.target.value })}
              />
              <select
                className="form-select"
                value={entry.estimasiUnit}
                onChange={(event) => updateEntry({ estimasiUnit: event.target.value })}
              >
                {ESTIMASI_UNIT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="button" className="btn btn--primary" onClick={handleTambah}>
            Tambah
          </button>
        </div>
        {entryError && <p className="form-error">{entryError}</p>}

        <div className="service-list-wrap">
          {data.length === 0 ? (
            <div className="service-empty">
              <span className="service-empty__icon" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="10" width="32" height="42" rx="4" stroke="currentColor" strokeWidth="2" />
                  <rect x="20" y="6" width="20" height="10" rx="2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 26h18M21 34h18M21 42h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <p className="service-empty__title">Belum ada layanan</p>
              <p className="service-empty__desc">
                Tambahkan layanan laundry Anda agar pelanggan dapat melihat dan memilih layanan
                yang tersedia
              </p>
            </div>
          ) : (
            <ul className="service-list">
              {data.map((item) => (
                <li key={item.id} className="service-row">
                  <span className="service-row__name">{item.jenis}</span>
                  <span className="service-row__meta">{item.satuan}</span>
                  <span className="service-row__meta">Rp{item.harga.toLocaleString("id-ID")}</span>
                  <span className="service-row__meta">{item.estimasi}</span>
                  <button
                    type="button"
                    className="service-row__remove"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Hapus layanan ${item.jenis}`}
                  >
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2 0-.6 9.4a2 2 0 0 1-2 1.9H8.6a2 2 0 0 1-2-1.9L6 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {listError && <p className="form-error">{listError}</p>}
        </div>
      </div>

      <div className="partner-step__actions">
        <button type="button" className="btn btn--outline" onClick={onPrev}>
          Previous
        </button>
        <button type="button" className="btn btn--primary" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default DataLayananStep;