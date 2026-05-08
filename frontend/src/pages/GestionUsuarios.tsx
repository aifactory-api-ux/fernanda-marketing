import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../styles/tokens';
import { useAuth } from '../state/useAuth';
import { useUsers } from '../state/useUsers';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${tokens.spacing.md}px;
`;

const GestionUsuarios: React.FC = () => {
  const { user, logout } = useAuth();
  const { users, fetchUsers, updateUser, deleteUser } = useUsers();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userForm, setUserForm] = useState({
    full_name: '',
    email: '',
    role: 'user',
    is_active: true,
  });

  useEffect(() => {
    fetchUsers();
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
    { key: 'full_name', label: 'Nombre' },
    { key: 'email', label: 'Correo' },
    { key: 'role', label: 'Rol' },
    { key: 'is_active', label: 'Estado' },
  ];

  const roleOptions = [
    { label: 'Usuario', value: 'user' },
    { label: 'Administrador', value: 'admin' },
    { label: 'Gerente', value: 'manager' },
  ];

  const handleEditUser = (row: any) => {
    setEditingUser(row);
    setUserForm({
      full_name: row.full_name,
      email: row.email,
      role: row.role,
      is_active: row.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      updateUser(editingUser.id, userForm);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      deleteUser(id);
    }
  };

  if (!user) return null;

  return (
    <LayoutContainer>
      <Header user={user} onLogout={logout} onSearch={(query) => console.log('Search:', query)} />
      <MainContent>
        <Sidebar items={sidebarItems} activePath="/users" onNavigate={handleNavigate} />
        <ContentArea>
          <PageTitle>Gestión de Usuarios</PageTitle>

          <Card variant="campaign">
            <Table
              columns={columns}
              data={users.map((u) => ({
                ...u,
                is_active: u.is_active ? 'Activo' : 'Inactivo',
              }))}
              onSelectRow={handleEditUser}
            />
          </Card>

          <Modal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            footer={
              <>
                {editingUser && (
                  <Button variant="danger" onClick={() => handleDeleteUser(editingUser.id)}>
                    Eliminar
                  </Button>
                )}
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleSaveUser}>
                  Guardar
                </Button>
              </>
            }
          >
            <FormGrid>
              <TextField
                label="Nombre Completo"
                value={userForm.full_name}
                onChange={(e) => setUserForm({ ...userForm, full_name: e.target.value })}
              />
              <TextField
                label="Correo Electrónico"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                type="email"
              />
              <Select
                label="Rol"
                value={userForm.role}
                onChange={(value) => setUserForm({ ...userForm, role: value })}
                options={roleOptions}
              />
            </FormGrid>
          </Modal>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default GestionUsuarios;