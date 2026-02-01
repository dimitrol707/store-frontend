import { Stack, styled } from "@mui/material";
import { CircularLoader } from "@store-frontend/shared-ui";
import { Suspense } from "react";
import { Outlet } from "react-router";

import { Navbar } from "../../components";

export function AppLayout() {
  return (
    <Stack minWidth="100vw" minHeight="100vh">
      <Navbar />
      <Suspense
        fallback={
          <StyledAppContainer>
            <CircularLoader />
          </StyledAppContainer>
        }
      >
        <StyledAppContainer>
          <Outlet />
        </StyledAppContainer>
      </Suspense>
    </Stack>
  );
}

const StyledAppContainer = styled(Stack)(({ theme }) => ({
  padding: theme.vars?.spacing,
  paddingTop: `calc(var(--app-navbar-height) + ${theme.vars?.spacing})`,
  flex: "1 0 auto",
}));
