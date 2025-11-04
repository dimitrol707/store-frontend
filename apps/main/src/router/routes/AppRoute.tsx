import { Outlet } from "react-router";

import { AuthProvider } from "../../providers/AuthProvider";

export function AppRoute() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
