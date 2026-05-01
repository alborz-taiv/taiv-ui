import React from 'react';
import { primitives } from '../../../constants/colors';

export interface IconBadgeProps {
  icon: React.ReactNode;
  color: keyof typeof primitives;
}

export const IconBadge = ({ icon, color }: IconBadgeProps) => {
  const getIconColors = () => {
    return {
      background: primitives[color][25],
      icon: primitives[color][200],
    };
  };

  const getIconSize = () => {
    if (
      React.isValidElement(icon) &&
      icon.props &&
      typeof icon.props.size === 'number'
    ) {
      const iconSize = icon.props.size;
      const badgeSize = iconSize + 12;
      return `${badgeSize}px`;
    }
  };

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: getIconColors().background,
        borderRadius: '50%',
        color: getIconColors().icon,
        display: 'flex',
        height: getIconSize(),
        justifyContent: 'center',
        width: getIconSize(),
      }}
    >
      {icon}
    </div>
  );
};
