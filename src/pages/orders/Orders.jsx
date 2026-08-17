import { useState } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Printer,
  Trash2,
} from "lucide-react";
import "../../styles/pages/Orders.css";

const INITIAL_ORDERS = [
  {
    id: "ORD-01",
    customer: "Ahmad Tahalu",
    service: "Cuci Kering",
    amount: "Rp7.000",
    numericAmount: 7000,
    status: "Diproses",
    date: "2026-08-10",
  },
  {
    id: "ORD-02",
    customer: "Ahmad Tahalu",
    service: "Cuci Kering",
    amount: "Rp10.000",
    numericAmount: 10000,
    status: "Selesai",
    date: "2026-08-11",
  },
  {
    id: "ORD-03",
    customer: "Ahmad Tahalu",
    service: "Cuci Kering",
    amount: "Rp15.000",
    numericAmount: 15000,
    status: "Diproses",
    date: "2026-08-12",
  },
  {
    id: "ORD-04",
    customer: "Ahmad Tahalu",
    service: "Cuci Kering",
    amount: "Rp25.000",
    numericAmount: 25000,
    status: "Selesai",
    date: "2026-08-14",
  },
  {
    id: "ORD-05",
    customer: "Ahmad Tahalu",
    service: "Cuci Kering",
    amount: "Rp30.000",
    numericAmount: 30000,
    status: "Selesai",
    date: "2026-08-15",
  },
];

const SERVICE_OPTIONS = [
  "Semua Layanan",
  "Cuci Kering",
  "Cuci + Setrika",
  "Setrika Saja",
  "Cuci Sepatu",
  "Cuci Bed Cover",
];

const STATUS_OPTIONS = [
  "Semua Status",
  "Diproses",
  "Selesai",
  "Menunggu",
  "Batal",
];

function Orders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("Semua Layanan");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService =
      selectedService === "Semua Layanan" || order.service === selectedService;
    const matchesStatus =
      selectedStatus === "Semua Status" || order.status === selectedStatus;
    return matchesSearch && matchesService && matchesStatus;
  });

  // Handle inline status change
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Handle delete order
  const handleDeleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    setActiveActionMenu(null);
  };

  // Handle export CSV
  const handleExportCSV = () => {
    const headers = ["ID Pesanan", "Pelanggan", "Layanan", "Jumlah", "Status", "Tanggal"];
    const rows = filteredOrders.map((o) => [
      o.id,
      o.customer,
      o.service,
      o.amount,
      o.status,
      o.date,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `daftar_pesanan_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-page__header">
        <h1 className="orders-page__title">Daftar Pesanan</h1>
        <p className="orders-page__subtitle">
          Mengelola dan melihat daftar pesanan
        </p>
      </div>

      {/* Main Table Card */}
      <div className="orders-table-card">
        {/* Filter Controls Bar */}
        <div className="orders-filters-bar">
          {/* 1. Search */}
          <div className="orders-search-box">
            <Search className="orders-search-box__icon w-5 h-5" />
            <input
              type="text"
              placeholder="Cari Nama Pelanggan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="orders-search-box__input"
            />
          </div>

          {/* 2. Date Range Filter */}
          <div className="orders-filter-btn" title="Rentang Tanggal">
            <span>10/08/2026 - 1/09/2026</span>
            <Calendar className="w-5 h-5 text-[#4B4B4B]" />
          </div>

          {/* 3. Service Filter Dropdown */}
          <div className="orders-filter-btn">
            <span>{selectedService}</span>
            <ChevronDown className="w-4 h-4 text-[#4B4B4B]" />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="orders-filter-btn__select"
            >
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Status Filter Dropdown */}
          <div className="orders-filter-btn">
            <span>{selectedStatus}</span>
            <ChevronDown className="w-4 h-4 text-[#4B4B4B]" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="orders-filter-btn__select"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Export Button */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="orders-export-btn"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Daftar Pesanan</th>
                <th>Pelanggan</th>
                <th>Layanan</th>
                <th>Jumlah</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "48px 20px", color: "#8E8E8E" }}>
                    Tidak ada pesanan yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    {/* Order ID */}
                    <td className="order-id-cell">{order.id}</td>

                    {/* Customer */}
                    <td className="customer-name-cell">{order.customer}</td>

                    {/* Service Badge */}
                    <td>
                      <span className="service-pill-badge">{order.service}</span>
                    </td>

                    {/* Amount */}
                    <td className="order-amount-cell">{order.amount}</td>

                    {/* Status Dropdown */}
                    <td>
                      <div className="order-status-select-wrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="order-status-select"
                        >
                          <option value="Diproses">Diproses</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Menunggu">Menunggu</option>
                          <option value="Batal">Batal</option>
                        </select>
                        <ChevronDown className="order-status-select__arrow w-4 h-4" />
                      </div>
                    </td>

                    {/* Actions Menu */}
                    <td>
                      <div className="order-action-btn-wrap">
                        <button
                          type="button"
                          className="order-action-btn"
                          onClick={() =>
                            setActiveActionMenu(activeActionMenu === order.id ? null : order.id)
                          }
                          title="Menu Aksi"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {activeActionMenu === order.id && (
                          <div className="order-action-menu">
                            <button
                              type="button"
                              className="order-action-menu__item"
                              onClick={() => {
                                alert(`Detail Pesanan: ${order.id}\nPelanggan: ${order.customer}\nLayanan: ${order.service}\nJumlah: ${order.amount}`);
                                setActiveActionMenu(null);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                              Detail
                            </button>
                            <button
                              type="button"
                              className="order-action-menu__item"
                              onClick={() => {
                                alert(`Mencetak struk untuk ${order.id}...`);
                                setActiveActionMenu(null);
                              }}
                            >
                              <Printer className="w-4 h-4" />
                              Cetak Struk
                            </button>
                            <button
                              type="button"
                              className="order-action-menu__item order-action-menu__item--danger"
                              onClick={() => handleDeleteOrder(order.id)}
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

        {/* Pagination */}
        <div className="orders-pagination">
          <button
            type="button"
            className="orders-pagination__btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className={`orders-pagination__btn ${currentPage === 1 ? "orders-pagination__btn--active" : ""}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            type="button"
            className={`orders-pagination__btn ${currentPage === 2 ? "orders-pagination__btn--active" : ""}`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button
            type="button"
            className={`orders-pagination__btn ${currentPage === 3 ? "orders-pagination__btn--active" : ""}`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>
          <span className="orders-pagination__dots">...</span>
          <button
            type="button"
            className={`orders-pagination__btn ${currentPage === 10 ? "orders-pagination__btn--active" : ""}`}
            onClick={() => setCurrentPage(10)}
          >
            10
          </button>
          <button
            type="button"
            className="orders-pagination__btn"
            disabled={currentPage === 10}
            onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;
