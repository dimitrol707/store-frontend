import { Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Button } from "@store-frontend/shared-ui";
import { useNavigate } from "react-router";

import { useAuth } from "../../providers/AuthProvider";

export function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{
        position: "sticky",
        top: 0,
        flex: "0 1 64px",
        backgroundColor: blue["500"],
        width: "100%",
        padding: "12px",
      }}
      gap={1}
    >
      {!isLoading && (
        <>
          <Typography color="white">{user?.username}</Typography>
          {!user && (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                navigate("login");
              }}
            >
              Log in
            </Button>
          )}
          {user && (
            <Button variant="contained" size="small" onClick={() => logout()}>
              Log out
            </Button>
          )}
        </>
      )}
    </Stack>
  );
}
