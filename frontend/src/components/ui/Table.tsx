import React from 'react';
import styled from '@emotion/styled';
import { tokens } from '../../styles/tokens';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onSelectRow?: (row: any) => void;
  selectedRowIds?: number[];
}

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${tokens.typography.font_family};
`;

const TableHeader = styled.thead`
  background-color: ${tokens.colors.background};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ selected?: boolean }>`
  &:hover {
    background-color: ${tokens.colors.primary_light};
  }
  background-color: ${({ selected }) => selected ? tokens.colors.primary_light : 'transparent'};
`;

const HeaderCell = styled.th`
  padding: ${tokens.spacing.md}px;
  text-align: left;
  font-size: ${tokens.typography.small.size}px;
  font-weight: 600;
  color: ${tokens.colors.text_primary};
  border-bottom: 2px solid ${tokens.colors.border};
`;

const DataCell = styled.td`
  padding: ${tokens.spacing.md}px;
  font-size: ${tokens.typography.body.size}px;
  color: ${tokens.colors.text_primary};
  border-bottom: 1px solid ${tokens.colors.border};
`;

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onSort: _onSort,
  onSelectRow,
  selectedRowIds = [],
}) => {
  return (
    <TableContainer>
      <TableHeader>
        <tr>
          {columns.map((column) => (
            <HeaderCell key={column.key}>
              {column.label}
            </HeaderCell>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            selected={selectedRowIds.includes(row.id)}
            onClick={() => onSelectRow?.(row)}
          >
            {columns.map((column) => (
              <DataCell key={column.key}>
                {row[column.key]}
              </DataCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};