import { createContext } from "react";

export interface AuthState {
  token: string | null;
  role: "CLIENT" | "AGENCE" | "ADMIN" | null;
  agenceId: string | null;
}

export interface AuthContextValue {
  auth: AuthState;
  login: (email: string, motDePasse: string) => Promise<void>;
  logout: () => void;
  setTokenDirectly: (token: string) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
