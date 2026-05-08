import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm}px;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  width: 44px;
  height: 24px;
  appearance: none;
  background-color: ${tokens.colors.border};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color ${tokens.motion};
  &:checked {
    background-color: ${tokens.colors.primary};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: ${tokens.colors.surface};
    border-radius: 50%;
    transition: transform ${tokens.motion};
  }
  &:checked::before {
    transform: translateX(20px);
  }
`;

const LabelText = styled.span`
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_primary};
`;

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <Container>
      <SwitchInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {label && <LabelText>{label}</LabelText>}
    </Container>
  );
};