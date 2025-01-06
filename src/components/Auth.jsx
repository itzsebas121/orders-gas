import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const verifyToken = async () => {
        const token = localStorage.getItem("token");
        expireToken()

        if (token)
            setUser(token);
        else
            logout();

    }
    const expireToken = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                alert("Su sesión ha caducado, por favor inicie sesión nuevamente");
                logout()
            }
            setUser(token);

        } else
            logout()

    }
    const logout = () => {
        const token = localStorage.removeItem("token");
        if (token) {
            localStorage.removeItem("token");
        }
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, logout, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
