import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Button } from "@store-frontend/shared-ui";
import { useNavigate } from "react-router";

import { useAuth } from "../../providers/AuthProvider";
import { UserPopper } from "./UserPopper";

export function Navbar() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{
        position: "fixed",
        top: 0,
        flex: "0 1 64px",
        backgroundColor: blue["500"],
        width: "100%",
        padding: "12px",
        zIndex: 1000,
      }}
      gap={1}
    >
      {!isLoading && (
        <>
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
            <>
              <Tooltip
                title={!!user}
                slots={{
                  popper: UserPopper,
                }}
              >
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </>
      )}
      <Tooltip title={"Cart"} arrow>
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
