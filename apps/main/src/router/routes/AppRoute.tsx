import { CartProvider } from "@store-frontend/features-cart";
import { Outlet } from "react-router";

import { AuthProvider } from "../../providers/AuthProvider";

export function AppRoute() {
  return (
    <AuthProvider>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </AuthProvider>
  );
}
