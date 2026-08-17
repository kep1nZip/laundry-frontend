import { useMemo, useState } from "react";
import "../../styles/pages/Notifications.css";

const NOTIFICATIONS = [
  {
    id: "n1",
    type: "success",
    category: "pesanan",
    title: "Pesanan dari Ahmad Tihili Baru saja masuk",
    description:
      "Pesanan #ORD-01 dari Ahmad Tihili telah masuk. Segera periksa pada menu daftar pesanan dan lihat detail pesanan serta tentukan statusnya.",
    timeAgo: "3 days ago",
    timestamp: "May 17, 08:55 PM",
    isRead: false,
  },
  {
    id: "n2",
    type: "danger",
    category: "pesanan",
    title: "Pesanan ORD-02 Baru dibatalkan oleh Ahmad Tahili",
    description:
      "Pesanan dari Ahmad Tahili telah dibatalkan oleh pelanggan. Pesanan tidak perlu diproses lebih lanjut.",
    timeAgo: "3 days ago",
    timestamp: "May 17, 08:55 PM",
    isRead: true,
  },
  {
    id: "n3",
    type: "warning",
    category: "pesanan",
    title: "Pesanan siap diambil pelanggan",
    description: "Pesanan ORD-03 milik Budi Santoso telah selesai dan siap diambil.",
    timeAgo: "3 days ago",
    timestamp: "May 17, 08:55 PM",
    isRead: true,
  },
];

const STATUS_OPTIONS = [
  { value: "semua", label: "Semua" },
  { value: "unread", label: "Belum dibaca" },
];

const JENIS_OPTIONS = [
  { value: "semua", label: "Semua" },
  { value: "pesanan", label: "Pesanan" },
  { value: "pembayaran", label: "Pembayaran" },
];

function NotificationIcon({ type }) {
  if (type === "success") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 12.3 10.3 15 16.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "danger") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7.5v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="16.3" r="1.05" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.3" r="1.05" fill="currentColor" />
    </svg>
  );
}

function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [statusFilter, setStatusFilter] = useState("semua");
  const [jenisFilter, setJenisFilter] = useState("semua");

  const filtered = useMemo(() => {
    return notifications.filter((item) => {
      const statusOk = statusFilter === "semua" || (statusFilter === "unread" && !item.isRead);
      const jenisOk = jenisFilter === "semua" || item.category === jenisFilter;
      return statusOk && jenisOk;
    });
  }, [notifications, statusFilter, jenisFilter]);

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  return (
    <div className="notifications">
      <header className="notifications__header">
        <h1 className="notifications__title">Notifikasi Loundry</h1>
        <p className="notifications__subtitle">Notifikasi mengenai pesanan</p>
      </header>

      <div className="notifications__grid">
        {/* ---------- List ---------- */}
        <section className="notifications__list" aria-label="Daftar notifikasi">
          {filtered.length === 0 ? (
            <div className="notifications__empty">
              <p className="notifications__empty-title">Tidak ada notifikasi</p>
              <p className="notifications__empty-desc">
                Belum ada notifikasi yang sesuai dengan filter yang dipilih
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`notification-card notification-card--${item.type}${
                  !item.isRead ? " notification-card--unread" : ""
                }`}
                onClick={() => handleMarkRead(item.id)}
              >
                <span className={`notification-card__icon notification-card__icon--${item.type}`} aria-hidden="true">
                  <NotificationIcon type={item.type} />
                </span>

                <span className="notification-card__body">
                  <span className="notification-card__title-row">
                    <span className="notification-card__title">{item.title}</span>
                    {!item.isRead && <span className="notification-card__dot" aria-label="Belum dibaca" />}
                  </span>
                  <span className="notification-card__desc">{item.description}</span>
                  <span className="notification-card__meta">
                    <span>{item.timeAgo}</span>
                    <span>{item.timestamp}</span>
                  </span>
                </span>
              </button>
            ))
          )}
        </section>

        {/* ---------- Filter panel ---------- */}
        <aside className="notifications-filter" aria-label="Filter notifikasi">
          <h2 className="notifications-filter__title">Filter Notifikasi</h2>

          <div className="notifications-filter__group">
            <p className="notifications-filter__group-title">Status</p>
            {STATUS_OPTIONS.map((option) => (
              <label key={option.value} className="notifications-filter__option">
                <span
                  className={`notifications-filter__checkbox${
                    statusFilter === option.value ? " notifications-filter__checkbox--checked" : ""
                  }`}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {statusFilter === option.value && (
                    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6.2 4.5 8.7 10 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {option.label}
              </label>
            ))}
          </div>

          <div className="notifications-filter__group">
            <p className="notifications-filter__group-title">Jenis Notifikasi</p>
            {JENIS_OPTIONS.map((option) => (
              <label key={option.value} className="notifications-filter__option">
                <span
                  className={`notifications-filter__checkbox${
                    jenisFilter === option.value ? " notifications-filter__checkbox--checked" : ""
                  }`}
                  onClick={() => setJenisFilter(option.value)}
                >
                  {jenisFilter === option.value && (
                    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6.2 4.5 8.7 10 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {option.label}
              </label>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Notifications;