import React from 'react';
import { primitives } from '../../../constants/colors';

export interface IconBadgeProps {
  icon: React.ReactNode;
  color: keyof typeof primitives;
}

export const IconBadge = ({ icon, color }: IconBadgeProps) => {
  const getIconColors = () => {
    return {
      background: primitives[color][50],
      icon: primitives[color][200],
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
