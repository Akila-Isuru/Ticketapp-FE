import React, { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  role: string | null;
  email: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  email: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email"),
  );

  const login = (newToken: string) => {
    try {
      const payloadBase64 = newToken.split(".")[1];
      const decodedJson = atob(payloadBase64);
      const decoded = JSON.parse(decodedJson);

      const userRole = decoded.role || "ROLE_USER";
      const userEmail = decoded.sub || "";

      localStorage.setItem("token", newToken);
      localStorage.setItem("role", userRole);
      localStorage.setItem("email", userEmail);

      setToken(newToken);
      setRole(userRole);
      setEmail(userEmail);
    } catch (error) {
      console.error("Token error", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    setToken(null);
    setRole(null);
    setEmail(null);
  };
  return (
    <AuthContext.Provider value={{ token, role, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
