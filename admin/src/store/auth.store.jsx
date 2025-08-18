import { createContext, useState } from "react";

export const authStore = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refToken");
        window.location.href = "/login"
    }

    return <authStore.Provider value={{ user, setUser, logout }}>{children}</authStore.Provider>
};

export default AuthProvider; 