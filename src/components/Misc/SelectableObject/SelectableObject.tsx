import type React from 'react';
import { primary, white } from '../../../constants/colors';

export type SelectableObjectHandle =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface SelectableObjectProps {
  children: React.ReactNode;
  /** Render the selection chrome (border + handles). Default `true`. */
  selected?: boolean;
  /** Render the 4 corner handles when selected. Default `true`. */
  showHandles?: boolean;
  /** Animated marching-ants border when selected. Default `true`. */
  animated?: boolean;
  /** Border color. Default `primary[200]`. */
  color?: string;
  /**
   * Cursor used on the wrapper. Default `'move'` when selected, otherwise
   * `'pointer'`.
   */
  cursor?: React.CSSProperties['cursor'];
  /**
   * Fires for a click anywhere inside the object. Consumers use this to
   * promote the object to the selected state.
   */
  onSelect?: (event: React.MouseEvent) => void;
  /**
   * Fires when a corner handle is pressed. Consumers implement the actual
   * resize math on top of this.
   */
  onHandlePointerDown?: (
    handle: SelectableObjectHandle,
    event: React.PointerEvent,
  ) => void;
  style?: React.CSSProperties;
  className?: string;
}

const HANDLE_SIZE = 10;
const HANDLE_HALF = HANDLE_SIZE / 2;

const HANDLE_POSITIONS: Record<
  SelectableObjectHandle,
  { cursor: string; left: string; top: string }
> = {
  'bottom-left': { cursor: 'nesw-resize', left: '0%', top: '100%' },
  'bottom-right': { cursor: 'nwse-resize', left: '100%', top: '100%' },
  'top-left': { cursor: 'nwse-resize', left: '0%', top: '0%' },
  'top-right': { cursor: 'nesw-resize', left: '100%', top: '0%' },
};

const ANIMATION_NAME = 'taiv-ui-marching-ants';

/**
 * Chrome wrapper that renders an animated dashed selection border and four
 * corner resize handles around arbitrary content. Purely presentational —
 * drag + resize math lives in the consumer. SVG rather than CSS `dashed`
 * borders because dash offsets are not animatable on standard borders.
 */
export const SelectableObject = ({
  children,
  selected = true,
  showHandles = true,
  animated = true,
  color = primary[200],
  cursor,
  onSelect,
  onHandlePointerDown,
  style,
  className,
}: SelectableObjectProps) => {
  const resolvedCursor = cursor ?? (selected ? 'move' : 'pointer');

  const interactive = Boolean(onSelect);

  return (
    <div
      className={className}
      {...(interactive
        ? {
            onClick: onSelect,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.(e as unknown as React.MouseEvent);
              }
            },
            role: 'button',
            tabIndex: 0,
          }
        : {})}
      style={{
        cursor: resolvedCursor,
        display: 'inline-block',
        position: 'relative',
        ...style,
      }}
    >
      {children}
      {selected ? (
        <>
          <style>{`@keyframes ${ANIMATION_NAME} { to { stroke-dashoffset: -16; } }`}</style>
          <svg
            role='presentation'
            style={{
              height: '100%',
              left: 0,
              overflow: 'visible',
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
          >
            <title>Selection border</title>
            <rect
              fill='none'
              height='100%'
              stroke={color}
              strokeDasharray='6 4'
              strokeWidth={2}
              style={
                animated
                  ? { animation: `${ANIMATION_NAME} 1s linear infinite` }
                  : undefined
              }
              width='100%'
              x={0}
              y={0}
            />
          </svg>
          {showHandles
            ? (Object.keys(HANDLE_POSITIONS) as SelectableObjectHandle[]).map(
                (handle) => {
                  const pos = HANDLE_POSITIONS[handle];
                  return (
                    <button
                      aria-label={`Resize ${handle}`}
                      key={handle}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        onHandlePointerDown?.(handle, e);
                      }}
                      style={{
                        backgroundColor: white,
                        border: `2px solid ${color}`,
                        borderRadius: 2,
                        cursor: pos.cursor,
                        height: HANDLE_SIZE,
                        left: pos.left,
                        marginLeft: -HANDLE_HALF,
                        marginTop: -HANDLE_HALF,
                        padding: 0,
                        position: 'absolute',
                        top: pos.top,
                        width: HANDLE_SIZE,
                      }}
                      type='button'
                    />
                  );
                },
              )
            : null}
        </>
      ) : null}
    </div>
  );
};
