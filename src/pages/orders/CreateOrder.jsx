import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, UserPlus, CheckCircle2 } from "lucide-react";
import "../../styles/pages/CreateOrder.css";

const SERVICE_OPTIONS = [
  { value: "cuci_kering", label: "Cuci Kering", pricePerKg: 7000 },
  { value: "cuci_setrika", label: "Cuci + Setrika", pricePerKg: 10000 },
  { value: "setrika_saja", label: "Setrika Saja", pricePerKg: 5000 },
  { value: "cuci_sepatu", label: "Cuci Sepatu", pricePerKg: 15000 },
  { value: "cuci_bed_cover", label: "Cuci Bed Cover", pricePerKg: 12000 },
  { value: "cuci_karpet", label: "Cuci Karpet", pricePerKg: 12000 },
  { value: "cuci_tas", label: "Cuci Tas", pricePerKg: 15000 },
];

const formatRupiah = (num) =>
  `Rp${num.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;

function CreateOrder() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [customer, setCustomer] = useState({
    nama: "Ahmad Tahalu",
    noHp: "087654321",
    alamat: "Jl. Mura suka suka Blok C3 No4",
  });

  const [services, setServices] = useState([
    {
      id: "srv-1",
      jenisLayanan: "cuci_setrika",
      berat: "5",
      catatan: "Loundry Kiloan",
    },
  ]);

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (id, field, value) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addService = () => {
    setServices((prev) => [
      ...prev,
      {
        id: `srv-${Date.now()}`,
        jenisLayanan: "cuci_kering",
        berat: "1",
        catatan: "",
      },
    ]);
  };

  const removeService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const getServiceInfo = (jenisLayanan) =>
    SERVICE_OPTIONS.find((opt) => opt.value === jenisLayanan);

  const getSubtotal = (service) => {
    const info = getServiceInfo(service.jenisLayanan);
    const berat = parseFloat(service.berat) || 0;
    return info ? info.pricePerKg * berat : 0;
  };

  const total = services.reduce((sum, s) => sum + getSubtotal(s), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/orders");
    }, 1200);
  };

  return (
    <div className="create-order-page">
      {/* Header */}
      <div className="create-order-header">
        <div>
          <h1 className="create-order-header__title">Input Pesanan</h1>
          <p className="create-order-header__subtitle">
            Memasukkan Data Pesanan Offline
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCustomer({ nama: "", noHp: "", alamat: "" });
          }}
          className="create-order-new-user-btn"
        >
          <UserPlus className="w-5 h-5" />
          <span>Pengguna Baru</span>
        </button>
      </div>

      {submitted && (
        <div
          style={{
            background: "#ECFDF5",
            border: "1px solid #10B981",
            borderRadius: "12px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#065F46",
            fontWeight: "600",
          }}
        >
          <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
          <span>Pesanan berhasil disimpan! Mengalihkan ke daftar pesanan...</span>
        </div>
      )}

      {/* Main Form Grid */}
      <form onSubmit={handleSubmit} className="create-order-grid">
        {/* Left Column: Customer Info & Service Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* 1. Informasi Pelanggan */}
          <div className="create-order-card">
            <h2 className="create-order-card__title">Informasi Pelanggan</h2>

            <div className="form-row-2col">
              <div className="form-field-group">
                <label className="form-label">Nama Pelanggan</label>
                <input
                  type="text"
                  name="nama"
                  value={customer.nama}
                  onChange={handleCustomerChange}
                  placeholder="Masukkan Nama Pelanggan"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field-group">
                <label className="form-label">No HP</label>
                <input
                  type="tel"
                  name="noHp"
                  value={customer.noHp}
                  onChange={handleCustomerChange}
                  placeholder="087654321"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-field-group">
              <label className="form-label">
                Alamat <span className="form-label-optional">(opsional)</span>
              </label>
              <textarea
                name="alamat"
                value={customer.alamat}
                onChange={handleCustomerChange}
                placeholder="Masukkan Alamat Pelanggan"
                className="form-textarea"
              />
            </div>
          </div>

          {/* 2. Detail Layanan */}
          <div className="create-order-card">
            <h2 className="create-order-card__title">Detail Layanan</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {services.map((service, index) => (
                <div key={service.id} className="service-block-item">
                  <div className="service-block-header">
                    <h3 className="service-block-title">Layanan {index + 1}</h3>
                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(service.id)}
                        className="service-delete-btn"
                        title="Hapus Layanan Ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="form-row-2col">
                    <div className="form-field-group">
                      <label className="form-label">Jenis Layanan</label>
                      <select
                        value={service.jenisLayanan}
                        onChange={(e) =>
                          handleServiceChange(
                            service.id,
                            "jenisLayanan",
                            e.target.value
                          )
                        }
                        className="form-select"
                        required
                      >
                        <option value="">Pilih Jenis Layanan</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label} ({formatRupiah(opt.pricePerKg)}/kg)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label className="form-label">Berat (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={service.berat}
                        onChange={(e) =>
                          handleServiceChange(
                            service.id,
                            "berat",
                            e.target.value
                          )
                        }
                        placeholder="0"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">
                      Catatan <span className="form-label-optional">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      value={service.catatan}
                      onChange={(e) =>
                        handleServiceChange(
                          service.id,
                          "catatan",
                          e.target.value
                        )
                      }
                      placeholder="Contoh: Pisahkan pakaian putih"
                      className="form-input"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addService}
              className="add-service-btn"
            >
              <span>Tambah Layanan Lain</span>
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Ringkasan Pembayaran */}
        <div>
          <div className="create-order-card">
            <h2 className="create-order-card__title">Ringkasan Pembayaran</h2>

            {/* Customer Summary Box */}
            <div className="customer-preview-box">
              <p className="customer-preview-name">
                {customer.nama || "Nama Pelanggan"}
              </p>
              <p className="customer-preview-phone">
                {customer.noHp || "Nomor HP belum diisi"}
              </p>
              <p className="customer-preview-address">
                {customer.alamat || "Alamat belum diisi"}
              </p>
            </div>

            {/* Services Summary List */}
            <div className="summary-services-list">
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#191C1E",
                  margin: 0,
                }}
              >
                Daftar Layanan Pesanan
              </h3>

              {services.every((s) => !s.jenisLayanan) ? (
                <p style={{ fontSize: "14px", color: "#8E8E8E", margin: 0 }}>
                  Belum ada layanan dipilih
                </p>
              ) : (
                services.map((service) => {
                  const info = getServiceInfo(service.jenisLayanan);
                  if (!info) return null;
                  return (
                    <div key={service.id} className="summary-service-row">
                      <div>
                        <p className="summary-service-name">{info.label}</p>
                        <p className="summary-service-calc">
                          {service.berat || 0}kg × {formatRupiah(info.pricePerKg)}/kg
                        </p>
                      </div>
                      <p className="summary-service-price">
                        {formatRupiah(getSubtotal(service))}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Total */}
            <div className="summary-total-row">
              <p className="summary-total-label">Total</p>
              <p className="summary-total-value">{formatRupiah(total)}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className="save-order-submit-btn"
            >
              Simpan Pesanan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
