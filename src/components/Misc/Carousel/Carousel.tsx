import React from 'react';
import {
  Carousel as MantineCarousel,
  CarouselProps as MantineCarouselProps,
} from '@mantine/carousel';
import EmblaAutoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType, EmblaPluginType } from 'embla-carousel-react';

/**
 * `@taiv/ui` Carousel — thin wrapper over `@mantine/carousel` (built on
 * Embla v7). Re-exports `Carousel.Slide` as a compound subcomponent so
 * consumers don't have to import directly from `@mantine/carousel`.
 *
 * For advanced usage (autoplay, scale/opacity tween, etc.) consumers can:
 *   - Pass an Embla plugin array via `plugins` (e.g. the re-exported
 *     `carouselAutoplay`).
 *   - Subscribe to the underlying Embla API via `getEmblaApi` and use the
 *     re-exported `EmblaCarouselType` for typing.
 */
export interface CarouselProps extends MantineCarouselProps {
  children: React.ReactNode;
}

const CarouselComponent = ({ children, ...props }: CarouselProps) => (
  <MantineCarousel {...props}>{children}</MantineCarousel>
);

export const Carousel = Object.assign(CarouselComponent, {
  Slide: MantineCarousel.Slide,
});

/**
 * Embla Autoplay plugin factory, re-exported so consumers can configure
 * autoplay without needing a direct dependency on `embla-carousel-autoplay`.
 *
 * Usage:
 *   const autoplay = useRef(carouselAutoplay({ delay: 3000, stopOnMouseEnter: true }));
 *   <Carousel plugins={[autoplay.current]}>...</Carousel>
 */
export const carouselAutoplay = EmblaAutoplay;

export type { EmblaCarouselType, EmblaPluginType };
