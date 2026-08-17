import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/Dashboard.css";

// Weekly Order Mock Data matching Figma design specs
const WEEKLY_DATA = [
  { day: "Senin", date: "8 Jun 2026", count: 5 },
  { day: "Selasa", date: "9 Jun 2026", count: 12 },
  { day: "Rabu", date: "10 Jun 2026", count: 8 },
  { day: "Kamis", date: "11 Jun 2026", count: 15 },
  { day: "Jumat", date: "12 Jun 2026", count: 13 },
  { day: "Sabtu", date: "13 Jun 2026", count: 18 },
  { day: "Minggu", date: "14 Jun 2026", count: 10 },
];

function Dashboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Mingguan");
  const [hoveredPoint, setHoveredPoint] = useState(WEEKLY_DATA[4]); // Default selected point (Jumat / 13)

  // Chart dimensions & scaling calculation
  const maxY = 20;
  const chartHeight = 280;
  const chartWidth = 1000;

  // Convert data points to SVG coordinates
  const points = WEEKLY_DATA.map((item, index) => {
    const x = (index / (WEEKLY_DATA.length - 1)) * chartWidth;
    const y = chartHeight - (item.count / maxY) * chartHeight;
    return { x, y, ...item };
  });

  // Generate SVG path for smooth line & gradient fill
  const pathD = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prev = points[index - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  const areaD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="dashboard">
      {/* Dashboard Page Header */}
      <header className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__subtitle">Mengelola dan melihat daftar pesanan</p>
      </header>

      {/* Summary Cards Grid */}
      <section className="dashboard__cards-grid" aria-label="Ringkasan Statistik">
        {/* Card 1: Total Revenue */}
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Total Pendapatan</h2>
          </div>
          <p className="dashboard-card__value" style={{ fontSize: "28px" }}>Rp 2.450.000</p>
        </div>

        {/* Card 2: Menunggu Diproses */}
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Menunggu Diproses</h2>
          </div>
          <p className="dashboard-card__value">8</p>
        </div>

        {/* Card 3: Sedang Dikerjakan */}
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Sedang Dikerjakan</h2>
          </div>
          <p className="dashboard-card__value">8</p>
        </div>

        {/* Card 4: Selesai Hari Ini */}
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <h2 className="dashboard-card__title">Selesai Hari Ini</h2>
          </div>
          <p className="dashboard-card__value">8</p>
        </div>
      </section>

      {/* Main Chart Card */}
      <section className="dashboard__chart-card" aria-label="Grafik Pesanan Masuk">
        {/* Chart Header & Filter Controls */}
        <div className="dashboard__chart-header">
          <div className="dashboard__chart-title-group">
            <div className="dashboard__chart-title-row">
              <h2 className="dashboard__chart-title">Pesanan Masuk</h2>
              <svg className="dashboard__chart-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <p className="dashboard__chart-description">Jumlah pesanan yang diterima</p>
          </div>

          {/* Timeframe Filter Buttons */}
          <div className="dashboard__filter-group" role="tablist">
            {["Mingguan", "Bulanan", "Semua"].map((filter) => (
              <button
                key={filter}
                role="tab"
                aria-selected={activeFilter === filter}
                className={`dashboard__filter-btn ${activeFilter === filter ? "dashboard__filter-btn--active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive SVG Chart */}
        <div className="dashboard__chart-body">
          {/* Y-Axis Labels */}
          <div className="dashboard__chart-y-axis">
            <span>20</span>
            <span>15</span>
            <span>10</span>
            <span>5</span>
            <span>0</span>
          </div>

          {/* Chart Graphic Area */}
          <div className="dashboard__chart-area">
            <div className="dashboard__chart-svg-container">
              <svg className="dashboard__chart-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B8DAFF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#EDF6FF" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Horizontal Dashed Gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={chartHeight * ratio}
                    x2={chartWidth}
                    y2={chartHeight * ratio}
                    stroke="#E2E8F0"
                    strokeDasharray={i === 4 ? "none" : "4 4"}
                    strokeWidth="1"
                  />
                ))}

                {/* Gradient Area Fill */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Main Curve Line */}
                <path d={pathD} fill="none" stroke="#267DFF" strokeWidth="3" strokeLinecap="round" />

                {/* Data Points */}
                {points.map((pt, idx) => {
                  const isHovered = hoveredPoint?.day === pt.day;
                  return (
                    <g key={idx} style={{ cursor: "pointer" }} onMouseEnter={() => setHoveredPoint(pt)}>
                      {/* Outer pulse when hovered */}
                      {isHovered && (
                        <circle cx={pt.x} cy={pt.y} r="10" fill="#267DFF" fillOpacity="0.2" />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? "6" : "4.5"}
                        fill="#FFFFFF"
                        stroke="#267DFF"
                        strokeWidth="2.5"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Dynamic Hover Tooltip */}
              {hoveredPoint && (
                <div
                  className="dashboard__chart-tooltip"
                  style={{
                    left: `${(WEEKLY_DATA.findIndex((d) => d.day === hoveredPoint.day) / (WEEKLY_DATA.length - 1)) * 100}%`,
                    top: `${chartHeight - (hoveredPoint.count / maxY) * chartHeight}px`,
                  }}
                >
                  <span className="dashboard__chart-tooltip-date">{hoveredPoint.date}</span>
                  <span className="dashboard__chart-tooltip-value">Pesanan: {hoveredPoint.count}</span>
                </div>
              )}
            </div>

            {/* X-Axis Labels */}
            <div className="dashboard__chart-x-axis">
              {WEEKLY_DATA.map((item) => (
                <span
                  key={item.day}
                  style={{
                    color: hoveredPoint?.day === item.day ? "#267DFF" : "inherit",
                    fontWeight: hoveredPoint?.day === item.day ? "700" : "600",
                  }}
                >
                  {item.day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;