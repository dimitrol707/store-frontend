import {
  Button,
  Fade,
  Paper,
  Popper,
  PopperProps,
  Stack,
  Typography,
} from "@mui/material";

import { useAuthContext } from "../../providers/AuthProvider";

type UserPopperProps = PopperProps;

export function UserPopper(props: UserPopperProps) {
  const { user, logout } = useAuthContext();
  return (
    <Popper {...props} placement="bottom-end" sx={{ zIndex: 1001 }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper
            variant="outlined"
            sx={(theme) => ({
              padding: "12px",
              background: theme.vars?.palette.background.default,
              minWidth: "200px",
            })}
          >
            <Stack gap={1}>
              <Typography>{user?.username}</Typography>
              <Button size="small" onClick={() => logout()}>
                Log out
              </Button>
            </Stack>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}
