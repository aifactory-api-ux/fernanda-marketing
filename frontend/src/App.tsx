import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './state/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GestionCampanas from './pages/GestionCampanas';
import DetalleCampana from './pages/DetalleCampana';
import SeguimientoTareas from './pages/SeguimientoTareas';
import MetricasReportes from './pages/MetricasReportes';
import GestionUsuarios from './pages/GestionUsuarios';
import DesignSystemOverview from './pages/DesignSystemOverview';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/campaigns" element={
          <PrivateRoute>
            <GestionCampanas />
          </PrivateRoute>
        } />
        <Route path="/campaigns/:id" element={
          <PrivateRoute>
            <DetalleCampana />
          </PrivateRoute>
        } />
        <Route path="/tasks" element={
          <PrivateRoute>
            <SeguimientoTareas />
          </PrivateRoute>
        } />
        <Route path="/metrics" element={
          <PrivateRoute>
            <MetricasReportes />
          </PrivateRoute>
        } />
        <Route path="/users" element={
          <PrivateRoute>
            <GestionUsuarios />
          </PrivateRoute>
        } />
        <Route path="/design-system" element={
          <PrivateRoute>
            <DesignSystemOverview />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;