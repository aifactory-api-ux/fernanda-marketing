import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';
import { Avatar } from './Avatar';
import { User } from '../../types/models';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const HeaderContainer = styled.header`
  height: 64px;
  background-color: ${tokens.colors.surface};
  border-bottom: 1px solid ${tokens.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${tokens.spacing.lg}px;
`;

const Logo = styled.h1`
  font-size: ${tokens.typography.h2.size}px;
  font-weight: ${tokens.typography.h2.weight};
  color: ${tokens.colors.primary};
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm}px;
  padding: ${tokens.spacing.sm}px ${tokens.spacing.md}px;
  border: 1px solid ${tokens.colors.border};
  border-radius: ${tokens.radii.md}px;
  background-color: ${tokens.colors.background};
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-family: ${tokens.typography.font_family};
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_primary};
  width: 300px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.md}px;
`;

const UserName = styled.span`
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_primary};
  font-weight: 500;
`;

const LogoutButton = styled.button`
  padding: ${tokens.spacing.xs}px ${tokens.spacing.md}px;
  background-color: ${tokens.colors.danger};
  color: ${tokens.colors.text_on_primary};
  border: none;
  border-radius: ${tokens.radii.md}px;
  cursor: pointer;
  font-size: ${tokens.typography.small.size}px;
  transition: background-color ${tokens.motion};
  &:hover {
    background-color: ${tokens.colors.danger}dd;
  }
`;

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onSearch,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <HeaderContainer>
      <Logo>Fernanda</Logo>
      <SearchContainer>
        <span>🔍</span>
        <SearchInput
          type="text"
          placeholder="Buscar..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </SearchContainer>
      <UserSection>
        <Avatar initials={getInitials(user.full_name)} />
        <UserName>{user.full_name}</UserName>
        <LogoutButton onClick={onLogout}>Cerrar sesión</LogoutButton>
      </UserSection>
    </HeaderContainer>
  );
};