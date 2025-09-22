import React from 'react';
import { palettes } from '../../constants/colors';

export interface IconBadgeProps {
  icon: React.ReactNode;
  color: keyof typeof palettes;
}

export const IconBadge = ({ icon, color }: IconBadgeProps) => {
  const getIconColors = () => {
    const colorPalette = palettes[color];
    return {
      background: colorPalette[50],
      icon: colorPalette[200],
    };
  };

  const getIconSize = () => {
    if (React.isValidElement(icon) && icon.props && typeof icon.props.size === 'number') {
      const iconSize = icon.props.size;
      const badgeSize = iconSize + 12;
      return `${badgeSize / 10}rem`;
    }
  };


  return (
    <div
      style={{
        width: getIconSize(),
        height: getIconSize(),
        borderRadius: '50%',
        backgroundColor: getIconColors().background,
        color: getIconColors().icon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </div>
  );
}; 