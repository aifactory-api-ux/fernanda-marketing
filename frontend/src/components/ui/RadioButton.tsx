import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface RadioButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  name: string;
  value: string;
  disabled?: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm}px;
  cursor: pointer;
`;

const RadioInput = styled.input`
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

export const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onChange,
  label,
  name,
  value,
  disabled = false,
}) => {
  return (
    <Container>
      <RadioInput
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {label && <LabelText>{label}</LabelText>}
    </Container>
  );
};