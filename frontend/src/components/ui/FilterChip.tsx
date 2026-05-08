import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Chip = styled.button<{ selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.xs}px;
  padding: ${tokens.spacing.xs}px ${tokens.spacing.sm}px;
  border-radius: ${tokens.radii.full}px;
  font-size: ${tokens.typography.small.size}px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${tokens.motion};
  background-color: ${({ selected }) => selected ? tokens.colors.primary : tokens.colors.surface};
  color: ${({ selected }) => selected ? tokens.colors.text_on_primary : tokens.colors.text_primary};
  border: 1px solid ${({ selected }) => selected ? tokens.colors.primary : tokens.colors.border};
  &:hover {
    background-color: ${({ selected }) => selected ? tokens.colors.primary_dark : tokens.colors.background};
  }
`;

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <Chip selected={selected} onClick={onClick}>
      {label}
    </Chip>
  );
};