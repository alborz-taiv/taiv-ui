import type { CSSObject } from "@mantine/styles";
import { colors, neutral, primitives } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";

export type BadgeVariant = "outline" | "filled" | "gradient" | "dark";

// `color` accepts any token KEY — semantic ("primary", "success", …) or
// primitive ("blue", "teal", …). Semantic keys follow the theme; primitive
// keys are fixed, decorative hues. The two key sets never overlap, so the
// union is unambiguous.
export type BadgeColor = keyof typeof colors | keyof typeof primitives;

// Combined token lookup so either kind of key resolves by index. Semantic and
// primitive scales live in separate objects; merging once (no overlapping
// keys) avoids branching per lookup. NOTE: `colors.white` is a flat string
// rather than a scale — indexing it by a shade yields a character, harmless
// since `white` is only ever a decorative, non-scale Badge color.
const palette = { ...colors, ...primitives };

export function getVariantStyles(
  color: BadgeColor,
): Record<BadgeVariant, CSSObject> {
  const scale = palette[color];
  return {
    dark: {
      backgroundColor: `${neutral[300]}b3`,
      border: "none",
      borderRadius: "6px",
      color: "white",
    },
    filled: {
      backgroundColor: scale[25],
      color: scale[200],
    },
    gradient: {
      background: `linear-gradient(to right, ${scale[50]}, ${scale[200]})`,
      borderRadius: "16px",
      color: "white",
      padding: `${spacing.xs} ${spacing.sm}`,
    },
    outline: {
      backgroundColor: "transparent",
      border: `1.5px solid ${scale[200]}`,
      borderRadius: "8px",
      color: scale[200],
      padding: `${spacing.xs} ${spacing.sm}`,
    },
  };
}
