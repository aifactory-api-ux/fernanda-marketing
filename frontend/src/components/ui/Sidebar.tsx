import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activePath: string;
  onNavigate: (path: string) => void;
}

const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${tokens.colors.surface};
  border-right: 1px solid ${tokens.colors.border};
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${tokens.spacing.md}px 0;
`;

const Logo = styled.div`
  padding: ${tokens.spacing.md}px ${tokens.spacing.lg}px;
  font-size: ${tokens.typography.h3.size}px;
  font-weight: 700;
  color: ${tokens.colors.primary};
  border-bottom: 1px solid ${tokens.colors.border};
  margin-bottom: ${tokens.spacing.md}px;
`;

const NavList = styled.nav`
  flex: 1;
`;

const NavItem = styled.button<{ active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.md}px;
  padding: ${tokens.spacing.md}px ${tokens.spacing.lg}px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${tokens.typography.font_family};
  font-size: ${tokens.typography.body.size}px;
  color: ${({ active }) => active ? tokens.colors.primary : tokens.colors.text_primary};
  background-color: ${({ active }) => active ? tokens.colors.primary_light : 'transparent'};
  text-align: left;
  transition: all ${tokens.motion};
  &:hover {
    background-color: ${tokens.colors.background};
  }
`;

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activePath,
  onNavigate,
}) => {
  return (
    <SidebarContainer>
      <Logo>Fernanda</Logo>
      <NavList>
        {items.map((item) => (
          <NavItem
            key={item.path}
            active={activePath === item.path}
            onClick={() => onNavigate(item.path)}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};