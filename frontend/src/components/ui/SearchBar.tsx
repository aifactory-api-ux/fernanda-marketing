import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm}px;
  padding: ${tokens.spacing.sm}px ${tokens.spacing.md}px;
  border: 1px solid ${tokens.colors.border};
  border-radius: ${tokens.radii.md}px;
  background-color: ${tokens.colors.surface};
  &:focus-within {
    border-color: ${tokens.colors.primary};
  }
`;

const SearchIcon = styled.span`
  color: ${tokens.colors.text_secondary};
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: ${tokens.typography.font_family};
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_primary};
  background: transparent;
`;

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
}) => {
  return (
    <SearchContainer>
      <SearchIcon>🔍</SearchIcon>
      <SearchInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </SearchContainer>
  );
};