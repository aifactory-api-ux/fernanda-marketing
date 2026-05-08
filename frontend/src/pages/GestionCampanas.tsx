import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../styles/tokens';
import { useAuth } from '../state/useAuth';
import { useCampaigns } from '../state/useCampaigns';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { TextField } from '../components/ui/TextField';
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

const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${tokens.spacing.lg}px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${tokens.spacing.md}px;
`;

const GestionCampanas: React.FC = () => {
  const { user, logout } = useAuth();
  const { campaigns, fetchCampaigns, createCampaign } = useCampaigns();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    status: 'active',
    start_date: '',
    end_date: '',
    budget: 0,
    roi: 0,
    owner_id: 1,
  });

  useEffect(() => {
    fetchCampaigns();
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

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripción' },
    { key: 'status', label: 'Estado' },
    { key: 'budget', label: 'Presupuesto' },
    { key: 'roi', label: 'ROI' },
  ];

  const handleCreateCampaign = () => {
    createCampaign({
      ...newCampaign,
      start_date: new Date(newCampaign.start_date).toISOString(),
      end_date: new Date(newCampaign.end_date).toISOString(),
    });
    setIsModalOpen(false);
  };

  const handleRowClick = (row: any) => {
    navigate(`/campaigns/${row.id}`);
  };

  const statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Pausado', value: 'paused' },
    { label: 'Completado', value: 'completed' },
  ];

  if (!user) return null;

  return (
    <LayoutContainer>
      <Header user={user} onLogout={logout} onSearch={(query) => console.log('Search:', query)} />
      <MainContent>
        <Sidebar items={sidebarItems} activePath="/campaigns" onNavigate={handleNavigate} />
        <ContentArea>
          <PageTitle>Gestión de Campañas</PageTitle>

          <HeaderActions>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Nueva Campaña
            </Button>
          </HeaderActions>

          <Card variant="campaign">
            <Table
              columns={columns}
              data={campaigns}
              onSelectRow={handleRowClick}
            />
          </Card>

          <Modal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            title="Nueva Campaña"
            footer={
              <>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleCreateCampaign}>
                  Crear
                </Button>
              </>
            }
          >
            <FormGrid>
              <TextField
                label="Nombre"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              />
              <TextField
                label="Descripción"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
              />
              <Select
                label="Estado"
                value={newCampaign.status}
                onChange={(value) => setNewCampaign({ ...newCampaign, status: value })}
                options={statusOptions}
              />
              <TextField
                label="Presupuesto"
                value={String(newCampaign.budget)}
                onChange={(e) => setNewCampaign({ ...newCampaign, budget: parseFloat(e.target.value) || 0 })}
                type="number"
              />
              <TextField
                label="Fecha de Inicio"
                value={newCampaign.start_date}
                onChange={(e) => setNewCampaign({ ...newCampaign, start_date: e.target.value })}
                type="date"
              />
              <TextField
                label="Fecha de Fin"
                value={newCampaign.end_date}
                onChange={(e) => setNewCampaign({ ...newCampaign, end_date: e.target.value })}
                type="date"
              />
            </FormGrid>
          </Modal>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default GestionCampanas;