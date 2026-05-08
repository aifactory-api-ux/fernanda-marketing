import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface ProgressBarProps {
  value: number;
  max?: number;
}

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${tokens.colors.border};
  border-radius: ${tokens.radii.full}px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background-color: ${tokens.colors.primary};
  border-radius: ${tokens.radii.full}px;
  transition: width ${tokens.motion};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <ProgressContainer>
      <ProgressFill percentage={percentage} />
    </ProgressContainer>
  );
};