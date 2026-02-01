import { alpha, CssVarsThemeOptions } from "@mui/material";

const neutral = {
  0: "#FFFFFF",
  50: "#F6F6FF",
  100: "#EEEFFF",
  200: "#E0E1FF",
  300: "#C7C6FF",
  400: "#A7AAFF",
  500: "#848AFF",
  600: "#4B54A1",
  700: "#2C336F",
  800: "#1E264F",
  900: "#000008",
};

export const baseColorSchemes: CssVarsThemeOptions["colorSchemes"] = {
  light: {
    palette: {
      primary: {
        main: neutral[600],
        dark: neutral[800],
        light: neutral[500],
      },
      secondary: {
        main: neutral[800],
        dark: neutral[900],
        light: neutral[600],
      },
      background: {
        default: neutral[50],
        paper: neutral[0],
      },
      text: {
        primary: neutral[900],
        secondary: alpha(neutral[800], 0.78),
      },
      divider: alpha(neutral[800], 0.14),
      action: {
        active: alpha(neutral[800], 0.7),
        hover: alpha(neutral[600], 0.08),
        hoverOpacity: 0.08,
        selected: alpha(neutral[600], 0.14),
        selectedOpacity: 0.14,
        disabled: alpha(neutral[800], 0.35),
        disabledBackground: alpha(neutral[800], 0.08),
        focus: alpha(neutral[500], 0.22),
        focusOpacity: 0.22,
      },
      success: { main: "#2E7D32" },
      warning: { main: "#ED6C02" },
      error: { main: "#D32F2F" },
      info: { main: neutral[600] },
    },
  },

  dark: {
    palette: {
      primary: {
        main: neutral[500],
        dark: neutral[600],
        light: neutral[300],
      },
      secondary: {
        main: neutral[600],
        dark: neutral[900],
        light: neutral[500],
      },
      background: {
        default: neutral[900],
        paper: neutral[800],
      },
      text: {
        primary: neutral[200],
        secondary: alpha(neutral[200], 0.72),
      },
      divider: alpha(neutral[300], 0.14),
      action: {
        active: alpha(neutral[300], 0.85),
        hover: alpha(neutral[300], 0.08),
        hoverOpacity: 0.08,
        selected: alpha(neutral[300], 0.14),
        selectedOpacity: 0.14,
        disabled: alpha(neutral[300], 0.3),
        disabledBackground: alpha(neutral[300], 0.1),
        focus: alpha(neutral[500], 0.3),
        focusOpacity: 0.3,
      },
      success: { main: "#3DDC97" },
      warning: { main: "#FBBF24" },
      error: { main: "#EF4444" },
      info: { main: neutral[500] },
    },
  },
};
