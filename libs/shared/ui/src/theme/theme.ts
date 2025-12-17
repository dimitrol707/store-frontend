import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
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
