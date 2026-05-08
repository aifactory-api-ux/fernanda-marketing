import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Content = styled.div`
  background-color: ${tokens.colors.surface};
  border-radius: ${tokens.radii.lg}px;
  box-shadow: ${tokens.shadows.lg};
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`;

const Header = styled.div`
  padding: ${tokens.spacing.lg}px;
  border-bottom: 1px solid ${tokens.colors.border};
`;

const Title = styled.h2`
  font-size: ${tokens.typography.h3.size}px;
  font-weight: ${tokens.typography.h3.weight};
  color: ${tokens.colors.text_primary};
  margin: 0;
`;

const Body = styled.div`
  padding: ${tokens.spacing.lg}px;
`;

const Footer = styled.div`
  padding: ${tokens.spacing.lg}px;
  border-top: 1px solid ${tokens.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: ${tokens.spacing.md}px;
`;

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
}) => {
  if (!open) return null;

  return (
    <Overlay onClick={() => onOpenChange(false)}>
      <Content onClick={(e) => e.stopPropagation()}>
        {title && (
          <Header>
            <Title>{title}</Title>
          </Header>
        )}
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Content>
    </Overlay>
  );
};