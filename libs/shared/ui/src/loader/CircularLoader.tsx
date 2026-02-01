import { CircularProgress, Stack } from "@mui/material";

export function CircularLoader() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        flex: "1 0 auto",
      }}
    >
      <CircularProgress
        sx={(theme) => ({ color: theme.vars?.palette.primary.main })}
      />
    </Stack>
  );
}
