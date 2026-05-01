import type { CSSObject } from "@mantine/styles";
import { colors, neutral } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";

export type BadgeVariant = "outline" | "filled" | "gradient" | "dark";

export type BadgeColor = keyof typeof colors;

export function getVariantStyles(
  color: BadgeColor,
): Record<BadgeVariant, CSSObject> {
  return {
    dark: {
      backgroundColor: `${neutral[300]}b3`,
      border: "none",
      borderRadius: "6px",
      color: "white",
    },
    filled: {
      backgroundColor: colors[color][25],
      color: colors[color][200],
    },
    gradient: {
      background: `linear-gradient(to right, ${colors[color][50]}, ${colors[color][200]})`,
      borderRadius: "16px",
      color: "white",
      padding: `${spacing.xs} ${spacing.sm}`,
    },
    outline: {
      backgroundColor: "transparent",
      border: `1.5px solid ${colors[color][200]}`,
      borderRadius: "8px",
      color: colors[color][200],
      padding: `${spacing.xs} ${spacing.sm}`,
    },
  };
}
