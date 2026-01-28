import React, { CSSProperties, useEffect, useRef } from 'react';
import { Box } from '../Box/Box';
import { fontWeight, neutral } from '../../../constants';

interface ColumnConfig  {
    heading?: string;
    style?: CSSProperties;
  }
  
interface TableProps<T> {
    columnConfigs: ColumnConfig[];
    data: T[];
    ListItem: React.ComponentType<{ data: T }>;
  }
  
function Table<T>({ columnConfigs, data, ListItem }: TableProps<T>) {
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
      if (!rows || !rows.length) return
      
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, columnIndex) => {
          const columnStyle = columnConfigs[columnIndex]?.style;
          if (columnStyle) {
            Object.assign(cell.style, columnStyle);
          }
        });
      });
    }, [columnConfigs, data]);

    return (
      <Box
        sx={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          boxShadow: '0px 2px 6px -3px #AFAFAF',
          overflow: 'hidden',
        }}
      >
        <table
          ref={tableRef}
          style={{
            width: '100%',
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
            {data.map((item) => (
              <ListItem data={item} key={String(item)} />
            ))}
          </tbody>
        </table>
      </Box>
    );
  }
  
  export { Table, type ColumnConfig, type TableProps };