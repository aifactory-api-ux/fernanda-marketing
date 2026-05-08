import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return `
        background-color: ${tokens.colors.primary};
        color: ${tokens.colors.text_on_primary};
        border: none;
        &:hover { background-color: ${tokens.colors.primary_dark}; }
      `;
    case 'secondary':
      return `
        background-color: ${tokens.colors.secondary};
        color: ${tokens.colors.text_on_primary};
        border: none;
        &:hover { background-color: ${tokens.colors.secondary_dark}; }
      `;
    case 'outline':
      return `
        background-color: transparent;
        color: ${tokens.colors.primary};
        border: 2px solid ${tokens.colors.primary};
        &:hover { background-color: ${tokens.colors.primary_light}; }
      `;
    case 'ghost':
      return `
        background-color: transparent;
        color: ${tokens.colors.text_primary};
        border: none;
        &:hover { background-color: ${tokens.colors.background}; }
      `;
    case 'danger':
      return `
        background-color: ${tokens.colors.danger};
        color: ${tokens.colors.text_on_primary};
        border: none;
        &:hover { opacity: 0.9; }
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<{ variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing.sm}px;
  padding: ${tokens.spacing.sm}px ${tokens.spacing.md}px;
  border-radius: ${tokens.radii.md}px;
  font-family: ${tokens.typography.font_family};
  font-size: ${tokens.typography.body.size}px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${tokens.motion};
  ${({ variant }) => getVariantStyles(variant)}
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  icon,
}) => {
  return (
    <StyledButton variant={variant} onClick={onClick} disabled={disabled || loading} type={type}>
      {loading ? 'Cargando...' : icon ? <span>{icon}</span> : null}
      {children}
    </StyledButton>
  );
};