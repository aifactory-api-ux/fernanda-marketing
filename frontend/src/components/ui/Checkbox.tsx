import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface CheckboxProps {
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

const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${tokens.colors.primary};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LabelText = styled.span`
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_primary};
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <Container>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {label && <LabelText>{label}</LabelText>}
    </Container>
  );
};