function Chat() {
  return (
    <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)",
            fontWeight: 600,
            fontSize: "30px",
            lineHeight: "38px",
            color: "#000000",
            margin: 0,
          }}
        >
          Pesan & Masukan
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#8E8E8E",
            margin: "4px 0 0",
          }}
        >
          Komunikasi pelanggan dan catatan umpan balik
        </p>
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E1E1E1",
          borderRadius: "16px",
          padding: "60px 24px",
          textAlign: "center",
          color: "#64748B",
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: 500 }}>
          Halaman Pesan & Masukan siap dikembangkan sesuai desain Figma Anda.
        </p>
      </div>
    </div>
  );
}

export default Chat;
