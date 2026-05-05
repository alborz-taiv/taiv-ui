import {
  error,
  neutral,
  primary,
  success,
  warning,
} from "../../../../constants/colors";
import { spacing } from "../../../../constants/spacing";

// Overrides mantine due to rem difference
const loading = {
  borderRadius: "8px",
  bottom: "-1px",
  left: "-1px",
  right: "-1px",
  top: "-1px",
} as const;

const disabled = {
  background: neutral[50],
  border: `1px solid ${neutral[50]}`,
  color: neutral[100],
} as const;

// `ghost` is the variant for buttons living on a deliberately-dark surface
// (e.g. inside a dark `SelectionToolbar` pill, over a video thumbnail). It is
// intentionally theme-agnostic — the visual treatment ("translucent fill +
// white text") describes the button itself, not the global theme. Use this
// instead of inventing per-surface variants for every brand intent.
const ghostDisabled = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  color: "rgba(255, 255, 255, 0.4)",
} as const;

// Hover styles are gated behind this media query so they only apply to
// devices with a true hover-capable pointer (mouse / trackpad). Touch
// devices — iOS Safari especially — preserve `:hover` after a tap ends
// ("sticky hover"), which makes buttons look stuck in their pressed
// state until the user taps elsewhere. Wrapping `:hover` and
// `:active:hover` in this query is the standard fix; `:active` still
// fires during the tap so users still get press feedback.
export const HOVER_MEDIA = "@media (hover: hover) and (pointer: fine)";

export const componentVariants = {
  cancel: {
    "&:active": {
      background: "white",
      border: `1px solid ${error[100]}`,
      color: error[100],
    },
    "&:disabled": disabled,
    "&:toggled": {
      background: error[100],
      color: "white",
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: "white",
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: "white",
        border: `1px solid ${error[100]}`,
        color: error[100],
      },
      "&:hover": {
        background: error[100],
        border: `1px solid ${error[100]}`,
      },
    },
    background: error[200],
    border: `1px solid ${error[200]}`,
    color: "white",
  },
  ghost: {
    "&:active": {
      background: "rgba(255, 255, 255, 0.18)",
      border: "1px solid rgba(255, 255, 255, 0.32)",
      color: "white",
    },
    "&:disabled": ghostDisabled,
    "&:toggled": {
      background: "rgba(255, 255, 255, 0.18)",
      border: "1px solid rgba(255, 255, 255, 0.32)",
      color: "white",
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: "white",
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: "rgba(255, 255, 255, 0.18)",
        border: "1px solid rgba(255, 255, 255, 0.32)",
        color: "white",
      },
      "&:hover": {
        background: "rgba(255, 255, 255, 0.14)",
        border: "1px solid rgba(255, 255, 255, 0.24)",
        color: "white",
      },
    },
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    color: "white",
  },
  nav: {
    "& .mantine-Button-inner": {
      justifyContent: "flex-start",
    },
    "&:active": {
      background: neutral[25],
      color: primary[200],
    },
    "&:disabled": {
      background: "transparent",
      color: neutral[100],
    },
    "&:toggled": {
      background: neutral[25],
      color: primary[200],
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: neutral[200],
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: neutral[25],
        color: primary[200],
      },
      "&:hover": {
        background: "transparent",
        color: neutral[200],
      },
    },
    background: "transparent",
    border: "none",
    color: neutral[300],
    paddingLeft: spacing.sm,
  },
  "nav-cancel": {
    "& .mantine-Button-inner": {
      justifyContent: "flex-start",
    },
    "&:active": {
      background: error[25],
      color: error[200],
    },
    "&:disabled": {
      background: "transparent",
      color: neutral[100],
    },
    "&:toggled": {
      background: error[25],
      color: error[200],
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: error[200],
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: error[25],
        color: error[200],
      },
      "&:hover": {
        background: "transparent",
        color: error[100],
      },
    },
    background: "transparent",
    border: "none",
    color: error[200],
    paddingLeft: spacing.sm,
  },
  primary: {
    "&:active": {
      background: "white",
      border: `1px solid ${primary[200]}`,
      color: primary[200],
    },
    "&:disabled": {
      ...disabled,
    },
    "&:toggled": {
      background: `${primary[200]}`,
      color: "white",
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: "white",
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: "white",
        border: `1px solid ${primary[200]}`,
        color: primary[200],
      },
      "&:hover": {
        background: `linear-gradient(to right, ${primary[300]}, ${primary[300]})`,
      },
    },
    background: `linear-gradient(to right, ${primary[200]}, ${primary[200]})`,
    border: `1px solid ${primary[200]}`,
    color: "white",
  },
  secondary: {
    "&:active": {
      background: neutral[100],
      border: `1px solid ${neutral[200]}`,
      color: neutral[200],
    },
    "&:disabled": disabled,
    "&:toggled": {
      background: neutral[100],
      color: "neutral[200]",
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: neutral[200],
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: neutral[100],
        border: `1px solid ${neutral[200]}`,
        color: neutral[200],
      },
      "&:hover": {
        background: neutral[100],
        border: `1px solid ${neutral[100]}`,
        color: "white",
      },
    },
    background: "white",
    border: `1px solid ${neutral[200]}`,
    color: neutral[200],
  },
  "secondary-cancel": {
    "&:active": {
      background: "white",
      border: `1px solid ${error[200]}`,
      color: error[200],
    },
    "&:disabled": disabled,
    "&:toggled": {
      background: error[100],
      color: "white",
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: error[200],
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: "white",
        border: `1px solid ${error[200]}`,
        color: error[200],
      },
      "&:hover": {
        background: error[25],
        border: `1px solid ${error[100]}`,
        color: error[200],
      },
    },
    background: "white",
    border: `1px solid ${error[200]}`,
    color: error[200],
  },
  success: {
    "&:active": {
      background: "white",
      border: `1px solid ${success[200]}`,
      color: success[200],
    },
    "&:disabled": disabled,
    "&:toggled": {
      background: success[200],
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: "white",
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: "white",
        border: `1px solid ${success[200]}`,
        color: success[200],
      },
      "&:hover": {
        background: success[200],
        border: `1px solid ${success[200]}`,
      },
    },
    background: success[300],
    border: `1px solid ${success[300]}`,
    color: "white",
  },
  tertiary: {
    "&:active": {
      background: primary[100],
      border: `1px solid ${primary[200]}`,
      color: primary[200],
    },
    "&:disabled": disabled,
    "&:toggled": {
      background: primary[100],
      color: primary[200],
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: primary[200],
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: primary[100],
        border: `1px solid ${primary[200]}`,
        color: primary[200],
      },
      "&:hover": {
        background: primary[100],
        border: `1px solid ${primary[100]}`,
        color: "white",
      },
    },
    background: "white",
    border: `1px solid ${primary[200]}`,
    color: primary[200],
  },
  text: {
    "&:active": {
      background: "transparent",
      color: primary[200],
    },
    "&:disabled": {
      background: "transparent",
      color: neutral[100],
    },
    "&:toggled": {
      background: "transparent",
      color: primary[200],
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: neutral[200],
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: "transparent",
        color: primary[200],
      },
      "&:hover": {
        background: "transparent",
        color: primary[200],
      },
    },
    background: "transparent",
    border: "none",
    color: neutral[200],
    height: "auto",
    minWidth: "unset",
    padding: "0",
  },
  warning: {
    "&:active": {
      background: "white",
      border: `1px solid ${warning[100]}`,
      color: warning[100],
    },
    "&:disabled": disabled,
    "&:toggled": {
      background: warning[100],
    },
    "&[data-loading]": {
      "& .mantine-Button-icon svg": {
        stroke: "white",
      },
      "&:before": loading,
    },
    [HOVER_MEDIA]: {
      "&:active:hover": {
        background: "white",
        border: `1px solid ${warning[100]}`,
        color: warning[100],
      },
      "&:hover": {
        background: warning[100],
        border: `1px solid ${warning[100]}`,
      },
    },
    background: warning[200],
    border: `1px solid ${warning[200]}`,
    color: "white",
  },
} as const;

export const subtleVariants = {
  cancel: { color: error[200] },
  // `ghost` is already the subtle treatment for dark surfaces — the `subtle`
  // modifier is a no-op for it, but we expose a key for type completeness.
  ghost: { color: "white" },
  nav: { color: neutral[300] },
  "nav-cancel": { color: error[200] },
  primary: { color: primary[200] },
  secondary: { color: neutral[200] },
  "secondary-cancel": { color: error[200] },
  success: { color: success[200] },
  tertiary: { color: primary[200] },
  text: { color: neutral[200] },
  warning: { color: warning[200] },
} as const;
