import React, { useState } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../styles/tokens';
import { useAuth } from '../state/useAuth';
import { TextField } from '../components/ui/TextField';
import { Button } from '../components/ui/Button';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${tokens.colors.background};
`;

const LoginCard = styled.div`
  background-color: ${tokens.colors.surface};
  border-radius: ${tokens.radii.lg}px;
  box-shadow: ${tokens.shadows.lg};
  padding: ${tokens.spacing.xl}px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: ${tokens.typography.h1.size}px;
  font-weight: ${tokens.typography.h1.weight};
  color: ${tokens.colors.text_primary};
  text-align: center;
  margin-bottom: ${tokens.spacing.lg}px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md}px;
`;

const ErrorMessage = styled.div`
  color: ${tokens.colors.error};
  font-size: ${tokens.typography.small.size}px;
  text-align: center;
`;

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Fernanda Marketing</Title>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            type="email"
          />
          <TextField
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            type="password"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" loading={loading}>
            Iniciar sesión
          </Button>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;