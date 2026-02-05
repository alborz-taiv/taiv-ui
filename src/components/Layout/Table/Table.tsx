import React, { CSSProperties, useEffect, useRef } from 'react';
import { Box } from '../Box/Box';
import { fontWeight, neutral } from '../../../constants';

interface ColumnConfig {
  heading?: string;
  style?: CSSProperties;
}

interface TableProps<T> {
  columnConfigs: ColumnConfig[];
  data: T[];
  ListItem: React.ComponentType<{ data: T }>;
  placeholder?: React.ReactNode;
  shadow?: boolean;
  divider?: boolean;
}

const Table = <T,>({ columnConfigs, data, ListItem, placeholder, shadow = false, divider = false }: TableProps<T>) => {
  const tableRef = useRef<HTMLTableElement>(null);

  /**
   * Apply column styles to the table cells.
   */
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    const rows = tbody.querySelectorAll('tr');
    if (!rows || !rows.length) return;

    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      cells.forEach((cell, columnIndex) => {
        const columnStyle = columnConfigs[columnIndex]?.style;
        if (columnStyle) {
          Object.assign(cell.style, columnStyle);
        }
      });

      const showDivider = divider && rowIndex < rows.length - 1;
      const borderStyle = { borderBottom: showDivider ? `1px solid ${neutral[100]}` : 'none' };

      Object.assign(row.style, borderStyle);
    });
  }, [columnConfigs, data, divider]);

  return (
    <Box
      sx={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        boxShadow: shadow ? '0 8px 40px 0 rgba(112, 144, 176, 0.20)' : 'none',
        overflow: 'hidden',
      }}
    >
      <table
        ref={tableRef}
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            {columnConfigs.map((column, index) => (
              <th
                key={column.heading || `column-${index}`}
                style={{
                  backgroundColor: neutral[50],
                  color: neutral[300],
                  fontSize: '14px',
                  fontWeight: fontWeight.bold,
                  paddingBottom: '9px',
                  paddingTop: '9px',
                  ...column.style,
                }}
              >
                {column.heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) && placeholder ? <tr><td colSpan={columnConfigs.length}>{placeholder}</td></tr> : data.map((item) => (
            <ListItem data={item} key={String(item).slice(0, 10)} />
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export { Table, type ColumnConfig, type TableProps };