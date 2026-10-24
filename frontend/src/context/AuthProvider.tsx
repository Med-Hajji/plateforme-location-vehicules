import { useState, type ReactNode } from "react";
import { loginRequest } from "../services/auth.service";
import { AuthContext, type AuthState } from "./AuthContext";

function decodeToken(token: string) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return { role: payload.role, agenceId: payload.agenceId ?? null };
}

function getInitialAuthState(): AuthState {
  const stored = localStorage.getItem("token");
  if (!stored) return { token: null, role: null, agenceId: null };
  try {
    const { role, agenceId } = decodeToken(stored);
    return { token: stored, role, agenceId };
  } catch {
    localStorage.removeItem("token");
    return { token: null, role: null, agenceId: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(getInitialAuthState);

  const applyToken = (token: string) => {
    const { role, agenceId } = decodeToken(token);
    localStorage.setItem("token", token);
    setAuth({ token, role, agenceId });
  };

  const login = async (email: string, motDePasse: string) => {
    const data = await loginRequest(email, motDePasse);
    applyToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, role: null, agenceId: null });
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, setTokenDirectly: applyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
