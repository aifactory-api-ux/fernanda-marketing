import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
`;

const TooltipContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: ${tokens.spacing.xs}px ${tokens.spacing.sm}px;
  background-color: ${tokens.colors.text_primary};
  color: ${tokens.colors.text_on_primary};
  font-size: ${tokens.typography.caption.size}px;
  border-radius: ${tokens.radii.sm}px;
  white-space: nowrap;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all ${tokens.motion};
  margin-bottom: ${tokens.spacing.xs}px;

  ${TooltipContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipContent>{content}</TooltipContent>
    </TooltipContainer>
  );
};