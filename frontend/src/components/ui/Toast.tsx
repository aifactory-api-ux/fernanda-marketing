import React, { createContext, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  status?: 'success' | 'error' | 'warning';
}

const ToastContext = createContext<{
  showToast: (title: string, description?: string, status?: 'success' | 'error' | 'warning') => void;
} | null>(null);

const ToastContainer = styled.div`
  position: fixed;
  bottom: ${tokens.spacing.lg}px;
  right: ${tokens.spacing.lg}px;
  z-index: 2000;
`;

const ToastItem = styled.div<{ status: 'success' | 'error' | 'warning' }>`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.xs}px;
  padding: ${tokens.spacing.md}px;
  background-color: ${tokens.colors.surface};
  border-radius: ${tokens.radii.md}px;
  box-shadow: ${tokens.shadows.lg};
  border-left: 4px solid ${({ status }) => {
    switch (status) {
      case 'success': return tokens.colors.success;
      case 'error': return tokens.colors.error;
      case 'warning': return tokens.colors.warning;
    }
  }};
  min-width: 300px;
  margin-top: ${tokens.spacing.sm}px;
`;

const Title = styled.span`
  font-weight: 600;
  color: ${tokens.colors.text_primary};
`;

const Description = styled.span`
  font-size: ${tokens.typography.small.size}px;
  color: ${tokens.colors.text_secondary};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${tokens.spacing.sm}px;
  right: ${tokens.spacing.sm}px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.text_secondary};
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<{
    id: number;
    title: string;
    description?: string;
    status: 'success' | 'error' | 'warning';
  }>>([]);

  const showToast = (
    title: string,
    description?: string,
    status: 'success' | 'error' | 'warning' = 'success'
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, status }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} status={toast.status}>
            <Title>{toast.title}</Title>
            {toast.description && <Description>{toast.description}</Description>}
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const Toast: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  title,
  description,
  status = 'success',
}) => {
  if (!open) return null;

  return (
    <ToastContainer>
      <ToastItem status={status}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <CloseButton onClick={() => onOpenChange(false)}>×</CloseButton>
      </ToastItem>
    </ToastContainer>
  );
};