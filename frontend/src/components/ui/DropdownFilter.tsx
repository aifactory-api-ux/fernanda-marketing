import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface DropdownFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.xs}px;
`;

const Label = styled.span`
  font-size: ${tokens.typography.caption.size}px;
  color: ${tokens.colors.text_secondary};
`;

const Select = styled.select`
  padding: ${tokens.spacing.xs}px ${tokens.spacing.sm}px;
  border: 1px solid ${tokens.colors.border};
  border-radius: ${tokens.radii.sm}px;
  font-size: ${tokens.typography.small.size}px;
  color: ${tokens.colors.text_primary};
  background-color: ${tokens.colors.surface};
  cursor: pointer;
`;

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};