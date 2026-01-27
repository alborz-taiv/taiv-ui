import React from 'react';
import { Box } from '../Box/Box';

interface ColumnConfig extends React.CSSProperties {
    heading?: string;
  }
  
interface TableProps<T> {
    columnConfigs: ColumnConfig[];
    data: T[];
    ListItem: React.ComponentType<{ data: T; columnConfigs: ColumnConfig[] }>;
  }
  
function Table<T>({ columnConfigs, data, ListItem }: TableProps<T>) {
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
                    backgroundColor: '#d9d9d9',
                    color: '#000000',
                    fontSize: '14px',
                    fontWeight: 800,
                    paddingBottom: '9px',
                    paddingTop: '9px',
                    ...column,
                  }}
                >
                  {column.heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <ListItem columnConfigs={columnConfigs} data={item} key={String(item)} />
            ))}
          </tbody>
        </table>
      </Box>
    );
  }
  
  export { Table, type ColumnConfig, type TableProps };