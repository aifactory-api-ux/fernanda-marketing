import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../styles/tokens';
import { useAuth } from '../state/useAuth';
import { useReports } from '../state/useReports';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { BarChart } from '../components/ui/BarChart';
import { LineChart } from '../components/ui/LineChart';
import { PieChart } from '../components/ui/PieChart';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useNavigate } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: ${tokens.spacing.lg}px;
  overflow-y: auto;
  background-color: ${tokens.colors.background};
`;

const PageTitle = styled.h1`
  font-size: ${tokens.typography.h1.size}px;
  font-weight: ${tokens.typography.h1.weight};
  color: ${tokens.colors.text_primary};
  margin-bottom: ${tokens.spacing.lg}px;
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${tokens.spacing.md}px;
  margin-bottom: ${tokens.spacing.lg}px;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${tokens.spacing.md}px;
  margin-bottom: ${tokens.spacing.lg}px;
`;

const MetricasReportes: React.FC = () => {
  const { user, logout } = useAuth();
  const { reports, fetchReports } = useReports();
  const navigate = useNavigate();

  const [selectedCampaign, setSelectedCampaign] = useState<number | undefined>();

  useEffect(() => {
    fetchMetrics(selectedCampaign);
    fetchReports(selectedCampaign);
  }, [selectedCampaign]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const sidebarItems = [
    { label: 'Dashboard', icon: '📊', path: '/' },
    { label: 'Campañas', icon: '📢', path: '/campaigns' },
    { label: 'Tareas', icon: '✅', path: '/tasks' },
    { label: 'Métricas', icon: '📈', path: '/metrics' },
    { label: 'Usuarios', icon: '👥', path: '/users' },
    { label: 'Design System', icon: '🎨', path: '/design-system' },
  ];

  const chartData = [
    { label: 'Ene', value: 30 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 60 },
    { label: 'Abr', value: 40 },
    { label: 'May', value: 55 },
  ];

  const reportColumns = [
    { key: 'id', label: 'ID' },
    { key: 'campaign_id', label: 'Campaña' },
    { key: 'generated_at', label: 'Fecha de Generación' },
    { key: 'url', label: 'URL' },
  ];

  if (!user) return null;

  return (
    <LayoutContainer>
      <Header user={user} onLogout={logout} onSearch={(query) => console.log('Search:', query)} />
      <MainContent>
        <Sidebar items={sidebarItems} activePath="/metrics" onNavigate={handleNavigate} />
        <ContentArea>
          <PageTitle>Métricas y Reportes</PageTitle>

          <FilterSection>
            <Select
              label="Filtrar por Campaña"
              value={String(selectedCampaign || '')}
              onChange={(value) => setSelectedCampaign(value ? parseInt(value) : undefined)}
              options={[
                { label: 'Todas las Campañas', value: '' },
                { label: 'Campaña 1', value: '1' },
                { label: 'Campaña 2', value: '2' },
              ]}
            />
            <Button variant="outline">Exportar Reporte</Button>
          </FilterSection>

          <ChartsGrid>
            <BarChart data={chartData} title="Rendimiento Mensual" />
            <LineChart data={chartData} title="Tendencia de Conversiones" />
            <PieChart data={chartData} title="Distribución por Canal" />
          </ChartsGrid>

          <Card variant="metric" header={<h3>Reportes Recientes</h3>}>
            <Table
              columns={reportColumns}
              data={reports}
            />
          </Card>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default MetricasReportes;