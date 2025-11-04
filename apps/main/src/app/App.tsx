import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { queryClient } from "@store-frontend/shared-api";
import { theme } from "@store-frontend/shared-ui";
import { QueryClientProvider } from "@tanstack/react-query";

import { AppRouter } from "../router/AppRouter";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html, body, #root": {
            width: "100%",
            height: "100%",
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
