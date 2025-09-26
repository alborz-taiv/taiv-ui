import React from 'react';
import { useMobile } from '../../hooks/useMediaQuery';
import { Checkbox } from '../Inputs/Controls/Checkbox';
import { Group } from '../Layout/Group';
import { Box } from '../Layout/Box';
import { Center } from '../Layout/Center';
import { Stack } from '../Layout/Stack';
import { Title } from '../Typography/Title';
import { neutral } from '../../constants/colors';
import { fontStyle } from '../../constants/font';

export interface TableColumnProps {
  label: string;
  width?: string | number;
  className?: string;
  style?: React.CSSProperties;
  key: string;
}

interface CheckboxTableProps {
  columns: TableColumnProps[];
  data: Record<string, any>[];
  className?: string;
  onRowClick?: (row: Record<string, any>) => void;
  title?: string;
  subtitle?: string;
  showColumnTitles?: boolean;
  outlines?: boolean;
}

const CheckboxTable = ({
  columns,
  data,
  className = 'none',
  onRowClick,
  title,
  subtitle,
  showColumnTitles = false,
  outlines = false,
}: CheckboxTableProps) => {
  const isMobile = useMobile();

  const style = {
    container: {
      borderRadius: '8px',
      border: `1px solid ${neutral[50]}`,
      padding: '0.8rem',
      backgroundColor: 'white',
    },
    header: {
      padding: '1.6rem',
      minWidth: '0',
    },
    columns: {
      paddingTop: '1.6rem',
      paddingLeft: '3.6rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    column: {
      justifyContent: isMobile ? 'flex-start' : 'center',
      ...fontStyle['body'],
      color: neutral[300],
      padding: '0.8rem 1.6rem',
      minWidth: '10rem',
    },
    tableBody: {
      gap: isMobile ? '0.5rem' : '0.25rem',
      minWidth: '0',
    },
    tableRow: {
      padding: isMobile ? '0.8rem 1.6rem' : '0.4rem 3.2rem',
      backgroundColor: '#FFFFFF',
      minWidth: '0',
      gap: isMobile ? '2.4rem' : '0',
      ...(outlines && { borderTop: `1px solid ${neutral[50]}` }),
    },
    contentContainer: {
      flex: 1,
      flexDirection: (isMobile ? 'column' : 'row') as 'column' | 'row',
      gap: '0.25rem',
      minWidth: 0,
    },
    item: {
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      minWidth: isMobile ? '0' : '10rem',
      ...fontStyle['body'],
      fontWeight: 400,
      color: neutral[200],
    },
  };

  const renderColumnTitles = () => {
    return (
      <Group style={style.columns}>
        {columns?.map((column, index) => (
          <Box
            key={column.key}
            style={{
              ...style.column,
              width: column.width || '100%',
              ...(column.className && { className: column.className }),
              ...(column.style && { ...column.style }),
            }}
          >
            {column.label}
          </Box>
        ))}
      </Group>
    );
  };

  const renderRow = (row: Record<string, any>) => {
    return (
      <>
        <Center mr={isMobile ? 0 : '3.2rem'} ml={isMobile ? 0 : '-1.6rem'}>
          <Checkbox checked={row.checked} onChange={() => onRowClick?.(row)} />
        </Center>
        <Group style={style.contentContainer}>
          {columns?.map((column, index) => {
            const text = row[column.key] || '';
            const className = column.className || '';
            return (
              <Box
                key={index}
                style={{
                  ...style.item,
                  width: column.width || '100%',
                  flex: isMobile ? 'none' : column.key === 'volume' ? '1 1 30rem' : '0 0 auto',
                  minWidth: isMobile ? '0' : column.key === 'volume' ? '30rem' : '10rem',
                  ...(className && { className }),
                }}
              >
                {text}
              </Box>
            );
          })}
        </Group>
      </>
    );
  };

  return (
    <Box style={style.container}>
      <Stack style={style.header}>
        {title && <Title variant="cardHeader">{title}</Title>}
        {subtitle && <Title variant="cardSubheader">{subtitle}</Title>}
        {showColumnTitles && !isMobile && renderColumnTitles()}
      </Stack>
      <Stack style={style.tableBody}>
        {data?.map((row, index) => (
          <Group key={index} style={style.tableRow}>
            {renderRow(row)}
          </Group>
        ))}
      </Stack>
    </Box>
  );
};

export { CheckboxTable };
