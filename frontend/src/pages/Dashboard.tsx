import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../styles/tokens';
import { useAuth } from '../state/useAuth';
import { useCampaigns } from '../state/useCampaigns';
import { useMetrics } from '../state/useMetrics';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { BarChart } from '../components/ui/BarChart';
import { LineChart } from '../components/ui/LineChart';
import { Badge } from '../components/ui/Badge';
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

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${tokens.spacing.md}px;
  margin-bottom: ${tokens.spacing.lg}px;
`;

const MetricCard = styled(Card)`
  text-align: center;
  padding: ${tokens.spacing.md}px;
`;

const MetricValue = styled.div`
  font-size: ${tokens.typography.h1.size}px;
  font-weight: 700;
  color: ${tokens.colors.primary};
`;

const MetricLabel = styled.div`
  font-size: ${tokens.typography.small.size}px;
  color: ${tokens.colors.text_secondary};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${tokens.spacing.md}px;
  margin-bottom: ${tokens.spacing.lg}px;
`;

const CampaignList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm}px;
`;

const CampaignItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${tokens.spacing.md}px;
  background-color: ${tokens.colors.surface};
  border-radius: ${tokens.radii.md}px;
  border: 1px solid ${tokens.colors.border};
`;

const CampaignName = styled.span`
  font-weight: 500;
  color: ${tokens.colors.text_primary};
`;

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { campaigns, fetchCampaigns } = useCampaigns();
  const { fetchMetrics } = useMetrics();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
    fetchMetrics(1);
  }, []);

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

  const metricsData = [
    { label: 'Conversiones', value: '1,234' },
    { label: 'Ingresos', value: '$45,678' },
    { label: 'ROI', value: '324%' },
    { label: 'Tareas', value: '89' },
  ];

  if (!user) {
    return null;
  }

  return (
    <LayoutContainer>
      <Header user={user} onLogout={logout} onSearch={(query) => console.log('Search:', query)} />
      <MainContent>
        <Sidebar items={sidebarItems} activePath="/" onNavigate={handleNavigate} />
        <ContentArea>
          <PageTitle>Dashboard</PageTitle>

          <MetricsGrid>
            {metricsData.map((metric, index) => (
              <MetricCard key={index} variant="metric">
                <MetricValue>{metric.value}</MetricValue>
                <MetricLabel>{metric.label}</MetricLabel>
              </MetricCard>
            ))}
          </MetricsGrid>

          <ChartsGrid>
            <BarChart data={chartData} title="Rendimiento por Mes" />
            <LineChart data={chartData} title="Tendencia de Conversiones" />
          </ChartsGrid>

          <Card variant="campaign" header={<h3>Campañas Recientes</h3>}>
            <CampaignList>
              {campaigns.slice(0, 5).map((campaign) => (
                <CampaignItem key={campaign.id}>
                  <CampaignName>{campaign.name}</CampaignName>
                  <Badge status={campaign.status} />
                </CampaignItem>
              ))}
              {campaigns.length === 0 && (
                <CampaignItem>No hay campañas disponibles</CampaignItem>
              )}
            </CampaignList>
          </Card>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Dashboard;