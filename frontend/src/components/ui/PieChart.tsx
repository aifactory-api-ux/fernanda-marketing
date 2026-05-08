import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface PieChartProps {
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

const PieChartPlaceholder = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PieSlice = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ color }) => color} 0% 33%,
    ${tokens.colors.secondary} 33% 66%,
    ${tokens.colors.accent} 66% 100%
  );
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.xs}px;
  margin-top: ${tokens.spacing.md}px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm}px;
  font-size: ${tokens.typography.small.size}px;
  color: ${tokens.colors.text_secondary};
`;

const LegendColor = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: ${tokens.radii.sm}px;
  background-color: ${({ color }) => color};
`;

const colors = [tokens.colors.primary, tokens.colors.secondary, tokens.colors.accent];

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  return (
    <ChartContainer>
      {title && <ChartTitle>{title}</ChartTitle>}
      <PieChartPlaceholder>
        <PieSlice color={tokens.colors.primary} />
      </PieChartPlaceholder>
      <Legend>
        {data.map((item, index) => (
          <LegendItem key={index}>
            <LegendColor color={colors[index % colors.length]} />
            {item.label}: {item.value}
          </LegendItem>
        ))}
      </Legend>
    </ChartContainer>
  );
};