import { useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Edit2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  Copy,
} from "lucide-react";
import "../../styles/pages/Services.css";

const INITIAL_SERVICES = [
  {
    id: "SRV-01",
    name: "Cuci Kering",
    category: "Loundry Kiloan",
    price: "Rp7.000",
    numericPrice: 7000,
    duration: "2-3 Hari",
    status: "Tidak Aktif",
  },
  {
    id: "SRV-02",
    name: "Cuci & Setrika",
    category: "Loundry Kiloan",
    price: "Rp10.000",
    numericPrice: 10000,
    duration: "2-3 Hari",
    status: "Aktif",
  },
  {
    id: "SRV-03",
    name: "Express",
    category: "Loundry Kiloan",
    price: "Rp15.000",
    numericPrice: 15000,
    duration: "1 Hari",
    status: "Aktif",
  },
  {
    id: "SRV-04",
    name: "Bed Cover",
    category: "Loundry Satuan",
    price: "Rp25.000",
    numericPrice: 25000,
    duration: "3 Hari",
    status: "Aktif",
  },
  {
    id: "SRV-05",
    name: "Sepatu",
    category: "Loundry Satuan",
    price: "Rp30.000",
    numericPrice: 30000,
    duration: "3 Hari",
    status: "Aktif",
  },
];

const CATEGORY_OPTIONS = ["Semua Layanan", "Loundry Kiloan", "Loundry Satuan"];
const STATUS_OPTIONS = ["Semua Status", "Aktif", "Tidak Aktif"];

function Services() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Layanan");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    category: "Loundry Kiloan",
    price: "",
    duration: "2-3 Hari",
    status: "Aktif",
  });

  // Filter services
  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua Layanan" || srv.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "Semua Status" || srv.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle inline status toggle
  const handleStatusChange = (id, newStatus) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingService(null);
    setServiceForm({
      name: "",
      category: "Loundry Kiloan",
      price: "",
      duration: "2-3 Hari",
      status: "Aktif",
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      category: service.category,
      price: service.numericPrice.toString(),
      duration: service.duration,
      status: service.status,
    });
    setIsModalOpen(true);
    setActiveActionMenu(null);
  };

  // Handle delete
  const handleDeleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setActiveActionMenu(null);
  };

  // Handle duplicate
  const handleDuplicateService = (service) => {
    const newService = {
      ...service,
      id: `SRV-${Date.now().toString().slice(-4)}`,
      name: `${service.name} (Salinan)`,
    };
    setServices((prev) => [...prev, newService]);
    setActiveActionMenu(null);
  };

  // Handle save modal form
  const handleSaveForm = (e) => {
    e.preventDefault();
    const formattedPrice = `Rp${parseInt(serviceForm.price || "0", 10).toLocaleString("id-ID")}`;

    if (editingService) {
      // Update existing
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                name: serviceForm.name,
                category: serviceForm.category,
                price: formattedPrice,
                numericPrice: parseInt(serviceForm.price || "0", 10),
                duration: serviceForm.duration,
                status: serviceForm.status,
              }
            : s
        )
      );
    } else {
      // Create new
      const newService = {
        id: `SRV-${Date.now().toString().slice(-4)}`,
        name: serviceForm.name,
        category: serviceForm.category,
        price: formattedPrice,
        numericPrice: parseInt(serviceForm.price || "0", 10),
        duration: serviceForm.duration,
        status: serviceForm.status,
      };
      setServices((prev) => [...prev, newService]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="services-page">
      {/* Header matching Figma */}
      <div className="services-page__header">
        <h1 className="services-page__title">Manajemen Layanan</h1>
        <p className="services-page__subtitle">
          Mengelola dan melihat daftar layanan
        </p>
      </div>

      {/* Main Table Card */}
      <div className="services-table-card">
        {/* Filter Controls Bar */}
        <div className="services-filters-bar">
          <div className="services-filters-left">
            {/* 1. Search Box */}
            <div className="services-search-box">
              <Search className="services-search-box__icon w-5 h-5" />
              <input
                type="text"
                placeholder="Cari Nama Layanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="services-search-box__input"
              />
            </div>

            {/* 2. Category Filter Dropdown */}
            <div className="services-filter-btn">
              <span>{selectedCategory}</span>
              <ChevronDown className="w-4 h-4 text-[#4B4B4B]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="services-filter-btn__select"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Status Filter Dropdown */}
            <div className="services-filter-btn">
              <span>{selectedStatus}</span>
              <ChevronDown className="w-4 h-4 text-[#4B4B4B]" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="services-filter-btn__select"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Add Service Action Button */}
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="services-add-btn"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Layanan</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="services-table-container">
          <table className="services-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>NAMA LAYANAN</th>
                <th>KATEGORI</th>
                <th>HARGA</th>
                <th>ESTIMASI</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "48px 20px",
                      color: "#8E8E8E",
                    }}
                  >
                    Tidak ada layanan yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service, index) => (
                  <tr key={service.id}>
                    {/* NO */}
                    <td className="services-no-cell">{index + 1}</td>

                    {/* NAMA LAYANAN */}
                    <td className="services-name-cell">{service.name}</td>

                    {/* KATEGORI */}
                    <td>
                      <span className="services-category-badge">
                        {service.category}
                      </span>
                    </td>

                    {/* HARGA */}
                    <td className="services-price-cell">{service.price}</td>

                    {/* ESTIMASI */}
                    <td className="services-duration-cell">
                      {service.duration}
                    </td>

                    {/* STATUS DROPDOWN */}
                    <td>
                      <div className="services-status-select-wrap">
                        <select
                          value={service.status}
                          onChange={(e) =>
                            handleStatusChange(service.id, e.target.value)
                          }
                          className="services-status-select"
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>
                        <ChevronDown className="services-status-select__arrow w-4 h-4" />
                      </div>
                    </td>

                    {/* AKSI BUTTONS (Edit + More) */}
                    <td>
                      <div className="services-actions-wrap">
                        {/* Edit Icon Button */}
                        <button
                          type="button"
                          className="services-icon-btn"
                          title="Edit Layanan"
                          onClick={() => handleOpenEditModal(service)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* More Horizontal Button */}
                        <button
                          type="button"
                          className="services-icon-btn"
                          title="Menu Opsi"
                          onClick={() =>
                            setActiveActionMenu(
                              activeActionMenu === service.id
                                ? null
                                : service.id
                            )
                          }
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeActionMenu === service.id && (
                          <div className="services-action-menu">
                            <button
                              type="button"
                              className="services-action-menu__item"
                              onClick={() => handleDuplicateService(service)}
                            >
                              <Copy className="w-4 h-4" />
                              Duplikasi
                            </button>
                            <button
                              type="button"
                              className="services-action-menu__item services-action-menu__item--danger"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Figma */}
        <div className="services-pagination">
          <button
            type="button"
            className="services-pagination__btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className={`services-pagination__btn ${
              currentPage === 1 ? "services-pagination__btn--active" : ""
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            type="button"
            className={`services-pagination__btn ${
              currentPage === 2 ? "services-pagination__btn--active" : ""
            }`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button
            type="button"
            className={`services-pagination__btn ${
              currentPage === 3 ? "services-pagination__btn--active" : ""
            }`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>
          <span className="services-pagination__dots">...</span>
          <button
            type="button"
            className={`services-pagination__btn ${
              currentPage === 10 ? "services-pagination__btn--active" : ""
            }`}
            onClick={() => setCurrentPage(10)}
          >
            10
          </button>
          <button
            type="button"
            className="services-pagination__btn"
            disabled={currentPage === 10}
            onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Action Button (+ Tambah Layanan) */}
      <button
        type="button"
        onClick={handleOpenCreateModal}
        className="services-fab"
        title="Tambah Layanan Baru"
        aria-label="Tambah Layanan Baru"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">
                {editingService ? "Edit Layanan" : "Tambah Layanan Baru"}
              </h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="modal-body">
              {/* Nama Layanan */}
              <div className="modal-form-group">
                <label className="modal-form-label">Nama Layanan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Cuci Kering"
                  value={serviceForm.name}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, name: e.target.value })
                  }
                  className="modal-form-input"
                />
              </div>

              {/* Kategori */}
              <div className="modal-form-group">
                <label className="modal-form-label">Kategori</label>
                <select
                  value={serviceForm.category}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, category: e.target.value })
                  }
                  className="modal-form-select"
                >
                  <option value="Loundry Kiloan">Loundry Kiloan</option>
                  <option value="Loundry Satuan">Loundry Satuan</option>
                </select>
              </div>

              {/* Harga */}
              <div className="modal-form-group">
                <label className="modal-form-label">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="Contoh: 10000"
                  value={serviceForm.price}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, price: e.target.value })
                  }
                  className="modal-form-input"
                />
              </div>

              {/* Estimasi Waktu */}
              <div className="modal-form-group">
                <label className="modal-form-label">Estimasi Waktu</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 2-3 Hari"
                  value={serviceForm.duration}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, duration: e.target.value })
                  }
                  className="modal-form-input"
                />
              </div>

              {/* Status */}
              <div className="modal-form-group">
                <label className="modal-form-label">Status</label>
                <select
                  value={serviceForm.status}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, status: e.target.value })
                  }
                  className="modal-form-select"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="modal-submit-btn">
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;