import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../styles/tokens';
import { useAuth } from '../state/useAuth';
import { useCampaigns } from '../state/useCampaigns';
import { useTasks } from '../state/useTasks';
import { useMetrics } from '../state/useMetrics';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { BarChart } from '../components/ui/BarChart';
import { LineChart } from '../components/ui/LineChart';
import { Button } from '../components/ui/Button';
import { useParams, useNavigate } from 'react-router-dom';

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

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${tokens.spacing.lg}px;
`;

const CampaignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm}px;
`;

const CampaignName = styled.h2`
  font-size: ${tokens.typography.h2.size}px;
  font-weight: ${tokens.typography.h2.weight};
  color: ${tokens.colors.text_primary};
  margin: 0;
`;

const CampaignDescription = styled.p`
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_secondary};
  margin: 0;
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
  font-size: ${tokens.typography.h2.size}px;
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

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm}px;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${tokens.spacing.md}px;
  background-color: ${tokens.colors.surface};
  border-radius: ${tokens.radii.md}px;
  border: 1px solid ${tokens.colors.border};
`;

const TaskTitle = styled.span`
  font-weight: 500;
  color: ${tokens.colors.text_primary};
`;

const BackButton = styled(Button)`
  margin-bottom: ${tokens.spacing.md}px;
`;

const DetalleCampana: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, logout } = useAuth();
  const { campaigns, fetchCampaigns } = useCampaigns();
  const { tasks, fetchTasks } = useTasks();
  const { metrics, fetchMetrics } = useMetrics();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
    fetchTasks();
    if (id) {
      fetchMetrics(parseInt(id));
    }
  }, [id]);

  const campaign = campaigns.find((c) => c.id === parseInt(id || '0'));
  const campaignTasks = tasks.filter((t) => t.campaign_id === parseInt(id || '0'));

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
  ];

  if (!user) return null;

  if (!campaign) {
    return (
      <LayoutContainer>
        <Header user={user} onLogout={logout} onSearch={(query) => console.log('Search:', query)} />
        <MainContent>
          <Sidebar items={sidebarItems} activePath="/campaigns" onNavigate={handleNavigate} />
          <ContentArea>
            <BackButton variant="ghost" onClick={() => navigate('/campaigns')}>
              ← Volver a Campañas
            </BackButton>
            <PageTitle>Campaña no encontrada</PageTitle>
          </ContentArea>
        </MainContent>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <Header user={user} onLogout={logout} onSearch={(query) => console.log('Search:', query)} />
      <MainContent>
        <Sidebar items={sidebarItems} activePath="/campaigns" onNavigate={handleNavigate} />
        <ContentArea>
          <BackButton variant="ghost" onClick={() => navigate('/campaigns')}>
            ← Volver a Campañas
          </BackButton>

          <CampaignHeader>
            <CampaignInfo>
              <CampaignName>{campaign.name}</CampaignName>
              <CampaignDescription>{campaign.description}</CampaignDescription>
            </CampaignInfo>
            <Badge status={campaign.status} />
          </CampaignHeader>

          <MetricsGrid>
            <MetricCard variant="metric">
              <MetricValue>${campaign.budget.toLocaleString()}</MetricValue>
              <MetricLabel>Presupuesto</MetricLabel>
            </MetricCard>
            <MetricCard variant="metric">
              <MetricValue>{campaign.roi}%</MetricValue>
              <MetricLabel>ROI</MetricLabel>
            </MetricCard>
            <MetricCard variant="metric">
              <MetricValue>{campaignTasks.length}</MetricValue>
              <MetricLabel>Tareas</MetricLabel>
            </MetricCard>
            <MetricCard variant="metric">
              <MetricValue>{metrics.length}</MetricValue>
              <MetricLabel>Métricas</MetricLabel>
            </MetricCard>
          </MetricsGrid>

          <ChartsGrid>
            <BarChart data={chartData} title="Rendimiento" />
            <LineChart data={chartData} title="Tendencia" />
          </ChartsGrid>

          <Card variant="task" header={<h3>Tareas de la Campaña</h3>}>
            <TaskList>
              {campaignTasks.map((task) => (
                <TaskItem key={task.id}>
                  <TaskTitle>{task.title}</TaskTitle>
                  <Badge status={task.status} />
                </TaskItem>
              ))}
              {campaignTasks.length === 0 && (
                <TaskItem>No hay tareas para esta campaña</TaskItem>
              )}
            </TaskList>
          </Card>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default DetalleCampana;