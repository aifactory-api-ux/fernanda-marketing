import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface LineChartProps {
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

const LineChartPlaceholder = styled.div`
  height: 200px;
  position: relative;
`;

const LinePath = styled.svg`
  width: 100%;
  height: 100%;
`;

export const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const minValue = Math.min(...data.map((d) => d.value), 0);
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1 || 1)) * 100;
    const y = ((maxValue - item.value) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <ChartContainer>
      {title && <ChartTitle>{title}</ChartTitle>}
      <LineChartPlaceholder>
        <LinePath viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke={tokens.colors.primary}
            strokeWidth="2"
          />
        </LinePath>
      </LineChartPlaceholder>
    </ChartContainer>
  );
};