import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../styles/tokens';
import { useAuth } from '../state/useAuth';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TextField } from '../components/ui/TextField';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { Switch } from '../components/ui/Switch';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
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

const Section = styled.section`
  margin-bottom: ${tokens.spacing.xl}px;
`;

const SectionTitle = styled.h2`
  font-size: ${tokens.typography.h3.size}px;
  font-weight: ${tokens.typography.h3.weight};
  color: ${tokens.colors.text_primary};
  margin-bottom: ${tokens.spacing.md}px;
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${tokens.spacing.lg}px;
`;

const ComponentCard = styled(Card)`
  padding: ${tokens.spacing.lg}px;
`;

const ComponentLabel = styled.span`
  font-size: ${tokens.typography.caption.size}px;
  color: ${tokens.colors.text_secondary};
  text-transform: uppercase;
  margin-bottom: ${tokens.spacing.sm}px;
  display: block;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${tokens.spacing.md}px;
`;

const ColorSwatch = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  height: 80px;
  border-radius: ${tokens.radii.md}px;
  display: flex;
  align-items: flex-end;
  padding: ${tokens.spacing.sm}px;
`;

const ColorLabel = styled.span`
  font-size: ${tokens.typography.caption.size}px;
  color: ${tokens.colors.text_on_primary};
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: ${tokens.radii.sm}px;
`;

const DesignSystemOverview: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  if (!user) return null;

  return (
    <LayoutContainer>
      <Header user={user} onLogout={logout} onSearch={(query) => console.log('Search:', query)} />
      <MainContent>
        <Sidebar items={sidebarItems} activePath="/design-system" onNavigate={handleNavigate} />
        <ContentArea>
          <PageTitle>Design System</PageTitle>

          <Section>
            <SectionTitle>Colores</SectionTitle>
            <ColorGrid>
              {Object.entries(tokens.colors).map(([name, color]) => (
                <ColorSwatch key={name} color={color}>
                  <ColorLabel>{name}: {color}</ColorLabel>
                </ColorSwatch>
              ))}
            </ColorGrid>
          </Section>

          <Section>
            <SectionTitle>Botones</SectionTitle>
            <ComponentGrid>
              <ComponentCard variant="campaign">
                <ComponentLabel>Primary</ComponentLabel>
                <Button variant="primary">Primary Button</Button>
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>Secondary</ComponentLabel>
                <Button variant="secondary">Secondary Button</Button>
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>Outline</ComponentLabel>
                <Button variant="outline">Outline Button</Button>
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>Ghost</ComponentLabel>
                <Button variant="ghost">Ghost Button</Button>
              </ComponentCard>
            </ComponentGrid>
          </Section>

          <Section>
            <SectionTitle>Badges</SectionTitle>
            <ComponentGrid>
              <ComponentCard variant="campaign">
                <ComponentLabel>Activo</ComponentLabel>
                <Badge status="activo" />
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>Pausado</ComponentLabel>
                <Badge status="pausado" />
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>Completado</ComponentLabel>
                <Badge status="completado" />
              </ComponentCard>
            </ComponentGrid>
          </Section>

          <Section>
            <SectionTitle>Componentes de Formulario</SectionTitle>
            <ComponentGrid>
              <ComponentCard variant="campaign">
                <ComponentLabel>TextField</ComponentLabel>
                <TextField
                  label="Correo electrónico"
                  value="usuario@ejemplo.com"
                  onChange={() => {}}
                />
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>Select</ComponentLabel>
                <Select
                  label="Estado"
                  value="active"
                  onChange={() => {}}
                  options={[
                    { label: 'Activo', value: 'active' },
                    { label: 'Pausado', value: 'paused' },
                  ]}
                />
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>Checkbox</ComponentLabel>
                <Checkbox checked={true} onChange={() => {}} label="Acepto los términos" />
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>Switch</ComponentLabel>
                <Switch checked={true} onChange={() => {}} label="Notificaciones" />
              </ComponentCard>
            </ComponentGrid>
          </Section>

          <Section>
            <SectionTitle>Otros Componentes</SectionTitle>
            <ComponentGrid>
              <ComponentCard variant="campaign">
                <ComponentLabel>Avatar</ComponentLabel>
                <Avatar initials="JD" />
              </ComponentCard>
              <ComponentCard variant="campaign">
                <ComponentLabel>ProgressBar</ComponentLabel>
                <ProgressBar value={75} max={100} />
              </ComponentCard>
            </ComponentGrid>
          </Section>

          <Section>
            <SectionTitle>Tipografía</SectionTitle>
            <ComponentCard variant="campaign">
              <h1 style={{ fontSize: tokens.typography.headings.h1.size, fontWeight: tokens.typography.headings.h1.weight }}>
                Heading 1 - {tokens.typography.headings.h1.size}px
              </h1>
              <h2 style={{ fontSize: tokens.typography.headings.h2.size, fontWeight: tokens.typography.headings.h2.weight }}>
                Heading 2 - {tokens.typography.headings.h2.size}px
              </h2>
              <h3 style={{ fontSize: tokens.typography.headings.h3.size, fontWeight: tokens.typography.headings.h3.weight }}>
                Heading 3 - {tokens.typography.headings.h3.size}px
              </h3>
              <p style={{ fontSize: tokens.typography.body.size, fontWeight: tokens.typography.body.weight }}>
                Body text - {tokens.typography.body.size}px
              </p>
              <small style={{ fontSize: tokens.typography.small.size }}>
                Small text - {tokens.typography.small.size}px
              </small>
            </ComponentCard>
          </Section>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default DesignSystemOverview;