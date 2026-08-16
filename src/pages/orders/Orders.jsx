import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

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

function Orders() {
  const [customer, setCustomer] = useState({
    nama: "",
    noHp: "",
    alamat: "",
  });

  const [services, setServices] = useState([
    { id: crypto.randomUUID(), jenisLayanan: "", berat: "", catatan: "" },
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
      { id: crypto.randomUUID(), jenisLayanan: "", berat: "", catatan: "" },
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

  const handleSubmit = () => {
    const payload = { customer, services, total };
    console.log(payload);
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-[30px] font-semibold text-black">
            Input Pesanan
          </h1>
          <p className="text-sm text-[#8e8e8e]">
            Memasukkan Data Pesanan Offline
          </p>
        </div>
        <button className="border border-[#267dff] text-[#267dff] rounded-2xl h-[52px] px-4 flex items-center gap-2 font-medium text-sm">
          <Plus className="w-5 h-5" />
          Pengguna Baru
        </button>
      </div>

      <div className="grid grid-cols-[760px_1fr] gap-6 items-start">
        <div className="flex flex-col gap-6">
          <div className="border border-[#e1e1e1] rounded-2xl p-6">
            <h2 className="text-[20px] font-medium text-[#191c1e] mb-6">
              Informasi Pelanggan
            </h2>
            <div className="flex gap-6 mb-6">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[16px] font-medium text-[#3e484f]">
                  Nama Pelanggan
                </label>
                <input
                  type="text"
                  name="nama"
                  value={customer.nama}
                  onChange={handleCustomerChange}
                  placeholder="Masukkan Nama Pelanggan"
                  className="bg-[#f6f6f6] rounded-lg p-4 text-[16px] outline-none w-full"
                />
              </div>
              <div className="w-[301px] flex flex-col gap-2">
                <label className="text-[16px] font-medium text-[#3e484f]">
                  No HP
                </label>
                <input
                  type="tel"
                  name="noHp"
                  value={customer.noHp}
                  onChange={handleCustomerChange}
                  placeholder="087654321"
                  className="bg-[#f6f6f6] rounded-lg p-4 text-[16px] outline-none w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-medium text-[#3e484f]">
                Alamat <span className="text-[#8e8e8e] text-xs">(opsional)</span>
              </label>
              <textarea
                name="alamat"
                value={customer.alamat}
                onChange={handleCustomerChange}
                placeholder="Masukkan Alamat Pelanggan"
                className="bg-[#f6f6f6] rounded-lg p-4 text-[16px] outline-none w-full h-[98px] resize-none"
              />
            </div>
          </div>

          <div className="border border-[#e1e1e1] rounded-2xl p-6">
            <h2 className="text-[20px] font-medium text-[#191c1e] mb-6">
              Detail Layanan
            </h2>

            <div className="flex flex-col gap-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="border-b border-[#e1e1e1] pb-6 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-medium text-[#191c1e]">
                      Layanan {index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeService(service.id)}
                        className="bg-[#ffecec] border border-[#ef4444] rounded-lg w-10 h-10 flex items-center justify-center"
                      >
                        <Trash2 className="w-5 h-5 text-[#ef4444]" />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-[16px] font-medium text-[#3e484f]">
                        Jenis Layanan
                      </label>
                      <select
                        value={service.jenisLayanan}
                        onChange={(e) =>
                          handleServiceChange(
                            service.id,
                            "jenisLayanan",
                            e.target.value
                          )
                        }
                        className="bg-[#f6f6f6] rounded-lg p-4 text-[16px] outline-none w-full"
                      >
                        <option value="">Pilih Jenis Layanan</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-[301px] flex flex-col gap-2">
                      <label className="text-[16px] font-medium text-[#3e484f]">
                        Berat (kg)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={service.berat}
                        onChange={(e) =>
                          handleServiceChange(service.id, "berat", e.target.value)
                        }
                        placeholder="0"
                        className="bg-[#f6f6f6] rounded-lg p-4 text-[16px] outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#3e484f]">
                      Catatan{" "}
                      <span className="text-[#8e8e8e] text-xs">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      value={service.catatan}
                      onChange={(e) =>
                        handleServiceChange(service.id, "catatan", e.target.value)
                      }
                      placeholder="-"
                      className="bg-[#f6f6f6] rounded-lg p-4 text-[16px] outline-none w-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addService}
              className="w-full flex items-center justify-center gap-2 text-[#267dff] font-bold text-[16px] mt-6"
            >
              Tambah Layanan Lain
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <div className="border border-[#e1e1e1] rounded-2xl p-6">
            <h2 className="text-[20px] font-medium text-[#191c1e] mb-6">
              Ringkasan Pembayaran
            </h2>

            <div className="border-b border-[#e1e1e1] pb-6 mb-6">
              <div className="bg-[#edf6ff] border border-[#4fa3ff] rounded-xl p-6">
                <p className="font-semibold text-[16px] text-[#1e1e1e]">
                  {customer.nama || "Nama Pelanggan"}
                </p>
                <p className="text-sm text-[#4b4b4b] mt-1">
                  {customer.noHp || "No HP"}
                </p>
                <p className="text-xs text-[#4b4b4b] mt-2">
                  {customer.alamat || "Alamat belum diisi"}
                </p>
              </div>
            </div>

            <div className="border-b border-[#e1e1e1] pb-6 mb-6 flex flex-col gap-4">
              <h3 className="text-[18px] font-medium text-[#191c1e]">
                Daftar Layanan Pesanan
              </h3>

              {services.every((s) => !s.jenisLayanan) ? (
                <p className="text-sm text-[#8e8e8e]">Belum ada layanan diisi</p>
              ) : (
                services.map((service) => {
                  const info = getServiceInfo(service.jenisLayanan);
                  if (!info) return null;
                  return (
                    <div
                      key={service.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[14px] font-bold text-[#191c1e]">
                          {info.label}
                        </p>
                        <p className="text-[12px] font-medium text-[#191c1e]">
                          {service.berat || 0}kg + {formatRupiah(info.pricePerKg)}/kg
                        </p>
                      </div>
                      <p className="text-[16px] font-bold text-[#191c1e]">
                        {formatRupiah(getSubtotal(service))}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[20px] font-bold text-[#191c1e]">Total</p>
              <p className="text-[24px] font-bold text-[#267dff]">
                {formatRupiah(total)}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#267dff] text-white rounded-2xl h-[52px] px-8 font-medium text-sm w-1/2"
            >
              Simpan Pesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
