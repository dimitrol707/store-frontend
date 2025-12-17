import { Box, CircularProgress, Stack } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router";

import { Navbar } from "../../components";

export function AppLayout() {
  return (
    <Stack width={1} height={1}>
      <Navbar />
      <Suspense
        fallback={
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              flex: "1 0 auto",
            }}
          >
            <CircularProgress />
          </Stack>
        }
      >
        <Box padding={1}>
          <Outlet />
        </Box>
      </Suspense>
    </Stack>
  );
}
