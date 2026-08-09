import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import registerIllustration from "../../assets/register-illustration.svg";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl w-full items-center">
        <div className="hidden md:block">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Kelola Laundry lebih <br /> mudah dengan{" "}
            <span className="text-blue-600">LaundryIn</span>
          </h1>
          <p className="mt-4 text-gray-500">
            Buat akun untuk memulai mengelola pesanan, status cucian, dan
            pelanggan dalam satu dashboard.
          </p>

          <img
            src={registerIllustration}
            alt="Ilustrasi kelola laundry"
            className="mt-8 w-full"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold text-center mb-4">
            Daftar Sekarang
          </h2>
          <hr className="border-gray-200 mb-6" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nama</label>
              <div className="flex items-center rounded-lg px-3 bg-gray-100">
                <User className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Jhon Cally"
                  className="w-full bg-transparent px-2 py-2.5 outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center rounded-lg px-3 bg-gray-100">
                <Mail className="w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-transparent px-2 py-2.5 outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center rounded-lg px-3 bg-gray-100">
                <Lock className="w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-2 py-2.5 outline-none text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="flex items-center rounded-lg px-3 bg-gray-100">
                <Lock className="w-4 h-4 text-gray-500" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-2 py-2.5 outline-none text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}