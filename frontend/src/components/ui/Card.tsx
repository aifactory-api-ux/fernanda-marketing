import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

type CardVariant = 'metric' | 'campaign' | 'task';

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const CardContainer = styled.div<{ variant: CardVariant }>`
  background-color: ${tokens.colors.surface};
  border-radius: ${tokens.radii.lg}px;
  box-shadow: ${tokens.shadows.sm};
  overflow: hidden;
  border-left: 4px solid ${({ variant }) => {
    switch (variant) {
      case 'metric': return tokens.colors.primary;
      case 'campaign': return tokens.colors.secondary;
      case 'task': return tokens.colors.accent;
      default: return tokens.colors.border;
    }
  }};
`;

const CardHeader = styled.div`
  padding: ${tokens.spacing.md}px;
  border-bottom: 1px solid ${tokens.colors.border};
`;

const CardBody = styled.div`
  padding: ${tokens.spacing.md}px;
`;

const CardFooter = styled.div`
  padding: ${tokens.spacing.md}px;
  border-top: 1px solid ${tokens.colors.border};
`;

export const Card: React.FC<CardProps> = ({
  variant = 'campaign',
  children,
  header,
  footer,
}) => {
  return (
    <CardContainer variant={variant}>
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};