import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.xs}px;
  width: 100%;
`;

const Label = styled.label`
  font-size: ${tokens.typography.small.size}px;
  font-weight: 500;
  color: ${tokens.colors.text_primary};
`;

const SelectWrapper = styled.select<{ hasError: boolean }>`
  padding: ${tokens.spacing.sm}px ${tokens.spacing.md}px;
  border: 1px solid ${({ hasError }) => hasError ? tokens.colors.error : tokens.colors.border};
  border-radius: ${tokens.radii.md}px;
  font-family: ${tokens.typography.font_family};
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_primary};
  background-color: ${tokens.colors.surface};
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: ${tokens.colors.primary};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-size: ${tokens.typography.caption.size}px;
  color: ${tokens.colors.error};
`;

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <SelectWrapper
        value={value}
        onChange={(e) => onChange(e.target.value)}
        hasError={!!error}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};