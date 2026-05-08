import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface AvatarProps {
  initials: string;
  src?: string;
  alt?: string;
  size?: number;
}

const AvatarContainer = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${tokens.radii.full}px;
  background-color: ${tokens.colors.primary};
  color: ${tokens.colors.text_on_primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({ size }) => size * 0.4}px;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  src,
  alt = 'Avatar',
  size = 40,
}) => {
  return (
    <AvatarContainer size={size}>
      {src ? <AvatarImage src={src} alt={alt} /> : initials}
    </AvatarContainer>
  );
};