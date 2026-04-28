import { inputFontSize } from "../../../constants/font";
import { spacing } from "../../../constants/spacing";

export const badgeSizes = {
  lg: {
    fontSize: inputFontSize["lg"],
    height: "32px",
    iconSize: 16,
    mantineSize: "xl",
    padding: `${spacing.xs} ${spacing.sm}`,
  },
  md: {
    fontSize: inputFontSize["md"],
    height: "24px",
    iconSize: 14,
    mantineSize: "lg",
    padding: `${spacing.xs} ${spacing.sm}`,
  },
  sm: {
    fontSize: inputFontSize["sm"],
    height: "20px",
    iconSize: 10,
    mantineSize: "md",
    padding: `${spacing.xs} ${spacing.sm}`,
  },
};

export type BadgeSize = keyof typeof badgeSizes;
