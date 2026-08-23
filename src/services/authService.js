import api from "./api";

// Sesuai backend: POST /auth/login (app.use('/auth', authRouter))
export const login = (data) => {
    return api.post("/auth/login", data);
};

// backend belum ada endpoint /auth/register yang bisa dipakai (i guess?)
// (controller-nya masih bug: numberPhone & dateofbirth gak pernah
// bakal ReferenceError kalau dipanggil???

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};