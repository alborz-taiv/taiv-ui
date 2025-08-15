import React, { CSSProperties } from 'react';
import { IconVolume, IconVolume2, IconVolume3 } from '@tabler/icons-react';
import { neutral } from '../../../constants/colors';
import { Slider, SliderProps } from './Slider';
import { componentSizes } from './shared/sizes';

interface VolumeSliderProps extends Omit<SliderProps, 'label'> {}

const VolumeSlider = ({ compact = false, size = 'md', fullWidth = false, ...props }: VolumeSliderProps) => {
  const selectedSize = componentSizes[size];

  const getIcon = () => {
    const iconColor = props.disabled ? neutral[100] : neutral[200];
    const currentValue = props.value ?? 0;
    if (currentValue === 0) return <IconVolume3 size={selectedSize.iconSize} color={iconColor} />;
    if (currentValue <= 50) return <IconVolume2 size={selectedSize.iconSize} color={iconColor} />;
    return <IconVolume size={selectedSize.iconSize} color={iconColor} />;
  };

  const style: Record<string, CSSProperties> = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      width: fullWidth ? '100%' : 'auto',
      padding: '0.5rem 0',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${selectedSize.iconSize / 10}rem`, // Based on 10px root font
      height: `${selectedSize.iconSize / 10}rem`,
      flexShrink: 0,
    },
  };

  return (
    <div style={style.container}>
      {!compact && <div style={style.iconContainer}>{getIcon()}</div>}
      <Slider {...props} compact={compact} size={size} fullWidth={fullWidth} />
    </div>
  );
};

export { VolumeSlider };
