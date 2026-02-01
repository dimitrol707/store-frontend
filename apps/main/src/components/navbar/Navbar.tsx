import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
  IconButton,
  Stack,
  Tooltip,
  useColorScheme,
} from "@mui/material";
import { useCartContext } from "@store-frontend/features-cart";
import { Button } from "@store-frontend/shared-ui";
import { useNavigate } from "react-router";

import { useAuthContext } from "../../providers/AuthProvider";
import { UserPopper } from "./UserPopper";

export function Navbar() {
  const { user, isLoading } = useAuthContext();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { items } = useCartContext();
  const navigate = useNavigate();
  const cartItemsQuantity = items.reduce(
    (quantity, item) => quantity + item.quantity,
    0,
  );
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      sx={(theme) => ({
        position: "fixed",
        top: 0,
        flex: "0 1 var(--app-navbar-height)",
        borderBottom: `1px solid ${theme.vars?.palette.divider}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        width: "100%",
        padding: "12px",
        zIndex: 1000,
      })}
    >
      <Button
        size="small"
        onClick={() => {
          navigate("/");
        }}
      >
        Main
      </Button>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={1}
      >
        {!isLoading && (
          <>
            {!user && (
              <Button
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
        <Badge badgeContent={cartItemsQuantity} color="error">
          <IconButton
            onClick={() => {
              navigate("cart");
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Badge>
        <IconButton
          onClick={() => {
            setColorScheme(colorScheme === "dark" ? "light" : "dark");
          }}
        >
          {colorScheme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Stack>
    </Stack>
  );
}
