import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterClientPage from "./pages/RegisterClientPage";
import RegisterAgencePage from "./pages/RegisterAgencePage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import ClientReservationsPage from "./pages/ClientReservationsPage";
import AgenceReservationsPage from "./pages/AgenceReservationsPage";
import AgenceVehiculesPage from "./pages/AgenceVehiculesPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/client" element={<RegisterClientPage />} />
        <Route path="/register/agence" element={<RegisterAgencePage />} />
        <Route path="/vehicules/:id" element={<VehicleDetailPage />} />
        <Route path="/mes-reservations" element={<ClientReservationsPage />} />
        <Route
          path="/agence/reservations"
          element={<AgenceReservationsPage />}
        />
        <Route path="/agence/vehicules" element={<AgenceVehiculesPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </MainLayout>
  );
}
export default App;
