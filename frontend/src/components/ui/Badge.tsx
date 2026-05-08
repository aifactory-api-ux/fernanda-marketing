import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

type BadgeStatus = 'activo' | 'pausado' | 'completado' | string;

interface BadgeProps {
  status: BadgeStatus;
  children?: React.ReactNode;
}

const getStatusColor = (status: BadgeStatus): string => {
  switch (status) {
    case 'activo':
      return tokens.colors.success;
    case 'pausado':
      return tokens.colors.warning;
    case 'completado':
      return tokens.colors.primary;
    default:
      return tokens.colors.text_secondary;
  }
};

const BadgeContainer = styled.span<{ statusColor: string }>`
  display: inline-flex;
  align-items: center;
  padding: ${tokens.spacing.xs}px ${tokens.spacing.sm}px;
  border-radius: ${tokens.radii.full}px;
  font-size: ${tokens.typography.caption.size}px;
  font-weight: 500;
  background-color: ${({ statusColor }) => statusColor}20;
  color: ${({ statusColor }) => statusColor};
`;

const Dot = styled.span<{ statusColor: string }>`
  width: 6px;
  height: 6px;
  border-radius: ${tokens.radii.full}px;
  background-color: ${({ statusColor }) => statusColor};
  margin-right: ${tokens.spacing.xs}px;
`;

const StatusLabel: Record<BadgeStatus, string> = {
  activo: 'Activo',
  pausado: 'Pausado',
  completado: 'Completado',
};

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const statusColor = getStatusColor(status);
  const label = children || StatusLabel[status] || status;

  return (
    <BadgeContainer statusColor={statusColor}>
      <Dot statusColor={statusColor} />
      {label}
    </BadgeContainer>
  );
};