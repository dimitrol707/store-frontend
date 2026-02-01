import { Stack } from "@mui/material";
import { CartContainer } from "@store-frontend/features-cart";

export default function CartPage() {
  return (
    <Stack gap={1} flex="1 0 auto">
      <CartContainer />
    </Stack>
  );
}
