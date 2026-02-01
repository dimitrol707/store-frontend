import { createTheme } from "@mui/material/styles";

import { baseColorSchemes } from "./baseColorSchemes";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  colorSchemes: baseColorSchemes,
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        ":root": {
          "--app-navbar-height": "64px",
        },
        "input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill":
          {
            WebkitBoxShadow: `0 0 0 1000px rgba(0,0,0,0) inset !important`,
          },
      }),
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
        },
        containedPrimary: ({ theme }) => ({
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: theme.vars.palette.primary.dark,
          },
        }),
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiChip: {
      styleOverrides: {
        deletable: ({ theme }) => ({
          border: `1px solid ${theme.vars.palette.primary.main}`,
        }),
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          transform: "none",
        },
      },
    },
  },
});
