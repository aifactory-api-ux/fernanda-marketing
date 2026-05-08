import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface BarChartProps {
  data: { label: string; value: number }[];
  title?: string;
}

const ChartContainer = styled.div`
  background-color: ${tokens.colors.surface};
  border-radius: ${tokens.radii.lg}px;
  padding: ${tokens.spacing.lg}px;
  box-shadow: ${tokens.shadows.sm};
`;

const ChartTitle = styled.h3`
  font-size: ${tokens.typography.h4.size}px;
  font-weight: ${tokens.typography.h4.weight};
  color: ${tokens.colors.text_primary};
  margin: 0 0 ${tokens.spacing.md}px 0;
`;

const BarChartPlaceholder = styled.div`
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: ${tokens.spacing.md}px;
`;

const Bar = styled.div<{ height: number }>`
  width: 40px;
  height: ${({ height }) => height}%;
  background-color: ${tokens.colors.primary};
  border-radius: ${tokens.radii.sm}px ${tokens.radii.sm}px 0 0;
  transition: height ${tokens.motion};
`;

const BarLabel = styled.span`
  font-size: ${tokens.typography.caption.size}px;
  color: ${tokens.colors.text_secondary};
  text-align: center;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${tokens.spacing.xs}px;
`;

export const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <ChartContainer>
      {title && <ChartTitle>{title}</ChartTitle>}
      <BarChartPlaceholder>
        {data.map((item, index) => (
          <BarContainer key={index}>
            <Bar height={(item.value / maxValue) * 100} />
            <BarLabel>{item.label}</BarLabel>
          </BarContainer>
        ))}
      </BarChartPlaceholder>
    </ChartContainer>
  );
};