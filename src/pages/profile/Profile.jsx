import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/FormControls.css";
import "../../styles/pages/Profile.css";

const INITIAL_PERSONAL = {
  nama: "Ahmad Tahalu Asik",
  email: "ahmadtahaluasik@gmail.com",
};

const INITIAL_USAHA = {
  namaLoundry: "Loundry Ambatukam",
  alamat: "Jl. Sukapura No. 67, Bojongsoang, Jawa Barat",
};

const INITIAL_LOGO_FILE = {
  name: "LogoSinisuk.png",
  type: "PDF",
  size: "1.24MB",
};

function formatFileSize(bytes) {
  if (!bytes) return "0KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)}KB`;
  return `${(kb / 1024).toFixed(2)}MB`;
}

function Profile() {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(null);

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personal, setPersonal] = useState(INITIAL_PERSONAL);
  const [personalDraft, setPersonalDraft] = useState(INITIAL_PERSONAL);

  const [usaha] = useState(INITIAL_USAHA);
  const [logoFile, setLogoFile] = useState(INITIAL_LOGO_FILE);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLogoFile({
      name: file.name,
      type: file.type?.split("/")[1]?.toUpperCase() || "FILE",
      size: formatFileSize(file.size),
    });
  };

  const handleEditToggle = () => {
    if (isEditingPersonal) {
      // TODO: persist via services/api.js, e.g. authService.updateProfile(personalDraft)
      setPersonal(personalDraft);
      setIsEditingPersonal(false);
    } else {
      setPersonalDraft(personal);
      setIsEditingPersonal(true);
    }
  };

  const handleLogout = () => {
    // TODO: wire up to services/authService.js, e.g. authService.logout()
    navigate("/login");
  };

  return (
    <div className="profile">
      <header className="profile__header">
        <h1 className="profile__title">Profile</h1>
        <p className="profile__subtitle">Kelola informasi akun dan usaha Anda</p>
      </header>

      <div className="profile__grid">
        {/* ---------- Left: account card ---------- */}
        <aside className="profile-account-card">
          <div className="profile-account-card__avatar-wrap">
            <div className="profile-account-card__avatar">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Foto profil" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M4 20c1.6-3.6 4.8-5.5 8-5.5s6.4 1.9 8 5.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            <label
              className="profile-account-card__avatar-edit"
              htmlFor="avatar-upload"
              aria-label="Ganti foto profil"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 8h2.5L8 5.5h8L17.5 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </label>
            <input
              ref={avatarInputRef}
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="profile__visually-hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <p className="profile-account-card__name">{personal.nama}</p>
          <p className="profile-account-card__subtitle">{usaha.namaLoundry}</p>

          <div className="profile-account-card__actions">
            <button type="button" className="profile-account-card__link">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Reset Password
            </button>

            <button
              type="button"
              className="profile-account-card__link profile-account-card__link--danger"
              onClick={handleLogout}
            >
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M12.5 13.5 16 10l-3.5-3.5M16 10H7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Log Out
            </button>
          </div>
        </aside>

        {/* ---------- Right: info card ---------- */}
        <section className="profile-info-card">
          <div className="profile-info-card__section">
            <div className="profile-info-card__section-header">
              <h2 className="profile-info-card__section-title">Informasi Pribadi</h2>
              <button type="button" className="btn btn--primary btn--small" onClick={handleEditToggle}>
                {isEditingPersonal ? "Simpan" : "Edit"}
              </button>
            </div>

            <div className="profile-info-card__row">
              <div className="form-group">
                <label htmlFor="nama-lengkap" className="form-label">
                  Nama Lengkap
                </label>
                <input
                  id="nama-lengkap"
                  type="text"
                  className="form-input"
                  disabled={!isEditingPersonal}
                  value={isEditingPersonal ? personalDraft.nama : personal.nama}
                  onChange={(event) =>
                    setPersonalDraft((prev) => ({ ...prev, nama: event.target.value }))
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  disabled={!isEditingPersonal}
                  value={isEditingPersonal ? personalDraft.email : personal.email}
                  onChange={(event) =>
                    setPersonalDraft((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <hr className="profile-info-card__divider" />

          <div className="profile-info-card__section">
            <div className="profile-info-card__section-header">
              <h2 className="profile-info-card__section-title">Informasi Usaha</h2>
            </div>

            <div className="profile-info-card__row profile-info-card__row--usaha">
              <div className="profile-info-card__usaha-fields">
                <div className="form-group">
                  <label htmlFor="nama-loundry" className="form-label">
                    Nama Loundry
                  </label>
                  <input id="nama-loundry" type="text" className="form-input" disabled value={usaha.namaLoundry} />
                </div>

                <div className="form-group">
                  <label htmlFor="alamat-lengkap" className="form-label">
                    Alamat Lengkap
                  </label>
                  <textarea id="alamat-lengkap" className="form-textarea" disabled value={usaha.alamat} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Foto/Logo Loundry</label>
                <div className="profile-logo-card">
                  <span className="profile-logo-card__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M21 15l-5-4-4.5 4-2-1.5L3 17" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </span>

                  <div className="profile-logo-card__info">
                    <span className="profile-logo-card__name">{logoFile.name}</span>
                    <span className="profile-logo-card__meta">
                      {logoFile.type} &middot; {logoFile.size}
                    </span>
                  </div>

                  <span className="profile-logo-card__check" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" fill="#16A34A" />
                      <path d="M6 10.3 8.7 13 14 7.5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                  <button
                    type="button"
                    className="btn btn--outline btn--small profile-logo-card__replace"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    Ganti File
                  </button>

                  <input
                    ref={logoInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="profile__visually-hidden"
                    onChange={handleLogoChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;