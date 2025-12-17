import {
  Button,
  Fade,
  Paper,
  Popper,
  PopperProps,
  Stack,
  Typography,
} from "@mui/material";

import { useAuth } from "../../providers/AuthProvider";

type UserPopperProps = PopperProps;

export function UserPopper(props: UserPopperProps) {
  const { user, logout } = useAuth();
  return (
    <Popper {...props} placement="bottom-end" sx={{ zIndex: 1001 }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper
            sx={(theme) => ({
              padding: "12px",
              background: theme.palette.background.default,
              minWidth: "200px",
            })}
          >
            <Stack gap={1}>
              <Typography>{user?.username}</Typography>
              <Button variant="contained" size="small" onClick={() => logout()}>
                Log out
              </Button>
            </Stack>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}
