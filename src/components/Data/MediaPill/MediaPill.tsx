import { IconPhotoFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import type React from 'react';
import { neutral, white } from '../../../constants/colors';
import { fontBase, fontSize } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export type MediaPillType = 'video' | 'image';
export type MediaPillSize = 'xs' | 'sm';

export interface MediaPillProps {
  type: MediaPillType;
  /** Formatted duration label (e.g. `'0:15'`). Required for videos; ignored for images. */
  duration?: string;
  size?: MediaPillSize;
  /** Override the default label shown on image pills. */
  imageLabel?: string;
  style?: React.CSSProperties;
  className?: string;
}

const SIZE_CONFIG: Record<
  MediaPillSize,
  {
    fontSize: string;
    gap: string;
    iconSize: number;
    padding: string;
  }
> = {
  sm: {
    ...{ fontSize: fontSize.sm.fontSize },
    gap: spacing.xs,
    iconSize: 12,
    padding: `${spacing.xxs} ${spacing.sm}`,
  },
  xs: {
    ...{ fontSize: fontSize.xs.fontSize },
    gap: spacing.xxs,
    iconSize: 10,
    padding: `${spacing.xxs} ${spacing.xs}`,
  },
};

/**
 * Small pill that sits on top of a thumbnail to tag media type + duration.
 * Parent thumbnail container handles positioning — MediaPill is slot-agnostic.
 *
 * @example
 * <div style={{ position: 'relative' }}>
 *   <img src={thumbnailUrl} alt="" />
 *   <div style={{ position: 'absolute', top: 8, left: 8 }}>
 *     <MediaPill type="video" duration="0:15" />
 *   </div>
 * </div>
 */
export const MediaPill = ({
  type,
  duration,
  size = 'sm',
  imageLabel = 'IMG',
  style,
  className,
}: MediaPillProps) => {
  const cfg = SIZE_CONFIG[size];
  const Icon = type === 'video' ? IconPlayerPlayFilled : IconPhotoFilled;
  const label = type === 'video' ? (duration ?? '') : imageLabel;

  return (
    <span
      className={className}
      style={{
        ...fontBase,
        alignItems: 'center',
        backdropFilter: 'blur(4px)',
        backgroundColor: `${neutral[500]}B3`,
        borderRadius: '999px',
        color: white,
        display: 'inline-flex',
        fontSize: cfg.fontSize,
        fontWeight: 600,
        gap: cfg.gap,
        lineHeight: 1,
        padding: cfg.padding,
        WebkitBackdropFilter: 'blur(4px)',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <Icon size={cfg.iconSize} />
      {label}
    </span>
  );
};
