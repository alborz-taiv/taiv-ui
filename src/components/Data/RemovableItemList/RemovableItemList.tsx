import React from 'react';
import { Box, Text } from '@mantine/core';
import { neutral, error } from '../../../constants/colors';
import { fontStyle } from '../../../constants/font';
import { Title } from '../../Typography/Title/Title';

interface RemovableItemListProps {
  items: React.ReactNode[];
  onRemove?: (item: React.ReactNode, index: number) => void;
  title?: string;
  disabledIndices?: number[];
}

const RemovableItemList = ({ items, onRemove, title, disabledIndices = [] }: RemovableItemListProps) => {
  const style: Record<string, React.CSSProperties> = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px',
      width: '100%',
      overflow: 'hidden',
      border: `1px solid ${neutral[50]}`,
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '1.2rem 1.6rem',
      backgroundColor: neutral[50],
    },
    itemContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.2rem 1.6rem',
    },
    itemText: {
      ...fontStyle['body'],
      fontWeight: 400,
    },
  };

  return (
    <Box style={style.container}>
      {title && (
        <Box style={style.titleContainer}>
          <Title variant="cardSubheader" weight="semibold">
            {title}
          </Title>
        </Box>
      )}

      {items?.map((item, index) => (
        <Box
          key={index}
          style={{
            ...style.itemContainer,
            borderTop: index > 0 ? `1px solid ${neutral[50]}` : 'none',
          }}
        >
          <Text style={style.itemText}>{item}</Text>
          {onRemove && (
            <i
              className="fas fa-trash-alt"
              style={{
                opacity: disabledIndices.includes(index) ? 0.5 : 1,
                cursor: disabledIndices.includes(index) ? 'default' : 'pointer',
                color: disabledIndices.includes(index) ? neutral[200] : error[100],
                fontSize: '1.625rem',
                fontWeight: 100,
              }}
              onClick={() => !disabledIndices.includes(index) && onRemove(item, index)}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export { RemovableItemList };
