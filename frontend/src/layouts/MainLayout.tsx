import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E2A26]">
      <header className="flex items-center justify-between px-10 py-5 bg-white">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold">
            R
          </div>
          <span className="font-extrabold text-lg">RoutePartage</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          {auth.role === "CLIENT" && (
            <Link to="/mes-reservations">Mes réservations</Link>
          )}
          {auth.role === "AGENCE" && (
            <Link to="/agence/vehicules">Mes véhicules</Link>
          )}
          {auth.role === "AGENCE" && (
            <Link to="/agence/reservations">Demandes reçues</Link>
          )}
          {auth.role === "ADMIN" && (
            <Link to="/admin/dashboard">Tableau de bord</Link>
          )}
          {!auth.token && (
            <Link to="/register/agence">Devenir agence partenaire</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {auth.token ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-600 hover:text-red-600"
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold">
                Se connecter
              </Link>
              <Link
                to="/register/client"
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-[#16211D] text-gray-400 text-sm px-10 py-8 mt-16">
        © RoutePartage — plateforme multi-agences
      </footer>
    </div>
  );
}
