import React from 'react';
import {
  Timeline as MantineTimeline,
  TimelineProps as MantineTimelineProps,
  TimelineItemProps as MantineTimelineItemProps,
} from '@mantine/core';
import { fontBase } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export interface TimelineProps extends Omit<MantineTimelineProps, 'radius'> {
  /** Index of the active item (controls bullet/line highlight up to this index) */
  active?: number;
  /** Diameter of the bullet in px */
  bulletSize?: number;
  /** Width of the connecting line in px */
  lineWidth?: number;
  /** Children must be `Timeline.Item` elements */
  children: React.ReactNode;
}

const TimelineComponent = ({
  active,
  bulletSize = 24,
  lineWidth = 2,
  styles,
  children,
  ...props
}: TimelineProps) => {
  const style = {
    root: {
      paddingLeft: 0,
    },
    item: {
      ...fontBase,
      paddingLeft: spacing.lg,
      '&:not(:last-of-type)': {
        paddingBottom: spacing.lg,
      },
    },
    itemTitle: {
      ...fontBase,
    },
    itemBullet: {
      top: '50%',
      transform: 'translateY(-50%)',
    },
    itemBody: {
      ...fontBase,
    },
    itemContent: {
      ...fontBase,
      paddingTop: spacing.xs,
    },
    ...styles,
  };

  return (
    <MantineTimeline
      active={active}
      bulletSize={bulletSize}
      lineWidth={lineWidth}
      styles={style}
      {...props}
    >
      {children}
    </MantineTimeline>
  );
};

export interface TimelineItemProps extends MantineTimelineItemProps {}

const Item = ({ children, ...props }: TimelineItemProps) => (
  <MantineTimeline.Item {...props}>{children}</MantineTimeline.Item>
);

export const Timeline = Object.assign(TimelineComponent, {
  Item,
});
