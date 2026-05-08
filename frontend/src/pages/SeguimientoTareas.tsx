import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../styles/tokens';
import { useAuth } from '../state/useAuth';
import { useTasks } from '../state/useTasks';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { TextField } from '../components/ui/TextField';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
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

const SeguimientoTareas: React.FC = () => {
  const { user, logout } = useAuth();
  const { tasks, fetchTasks, createTask } = useTasks();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
    assigned_to: 1,
    campaign_id: 1,
  });

  useEffect(() => {
    fetchTasks();
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
    { key: 'title', label: 'Título' },
    { key: 'description', label: 'Descripción' },
    { key: 'status', label: 'Estado' },
    { key: 'due_date', label: 'Fecha Límite' },
  ];

  const statusOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Progreso', value: 'in_progress' },
    { label: 'Completado', value: 'completed' },
  ];

  const filteredTasks = filterStatus === 'all'
    ? tasks
    : tasks.filter((t) => t.status === filterStatus);

  const handleCreateTask = () => {
    createTask({
      ...newTask,
      due_date: new Date(newTask.due_date).toISOString(),
    });
    setIsModalOpen(false);
  };

  if (!user) return null;

  return (
    <LayoutContainer>
      <Header user={user} onLogout={logout} onSearch={(query) => console.log('Search:', query)} />
      <MainContent>
        <Sidebar items={sidebarItems} activePath="/tasks" onNavigate={handleNavigate} />
        <ContentArea>
          <PageTitle>Seguimiento de Tareas</PageTitle>

          <HeaderActions>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Nueva Tarea
            </Button>
          </HeaderActions>

          <FilterSection>
            <Select
              label="Filtrar por Estado"
              value={filterStatus}
              onChange={setFilterStatus}
              options={[
                { label: 'Todos', value: 'all' },
                { label: 'Pendiente', value: 'pending' },
                { label: 'En Progreso', value: 'in_progress' },
                { label: 'Completado', value: 'completed' },
              ]}
            />
          </FilterSection>

          <Card variant="task">
            <Table
              columns={columns}
              data={filteredTasks}
            />
          </Card>

          <Modal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            title="Nueva Tarea"
            footer={
              <>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleCreateTask}>
                  Crear
                </Button>
              </>
            }
          >
            <FormGrid>
              <TextField
                label="Título"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <TextField
                label="Descripción"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <Select
                label="Estado"
                value={newTask.status}
                onChange={(value) => setNewTask({ ...newTask, status: value })}
                options={statusOptions}
              />
              <TextField
                label="Fecha Límite"
                value={newTask.due_date}
                onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                type="date"
              />
            </FormGrid>
          </Modal>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default SeguimientoTareas;