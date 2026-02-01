import {
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  TabsOwnProps,
} from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router";

import { useAuthContext } from "../../providers/AuthProvider";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

enum LoginTab {
  SignIn = "SignIn",
  SignUp = "SignUp",
}

export default function LoginPage() {
  const { user, isLoading } = useAuthContext();
  const [tabValue, setTabValue] = useState<LoginTab>(LoginTab.SignIn);

  const handleChangeTab: TabsOwnProps["onChange"] = (e, value) => {
    setTabValue(value);
  };

  if (isLoading) {
    return (
      <Stack width={1} height={1} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack
      width={1}
      height={1}
      alignItems="center"
      justifyContent="center"
      gap={1}
    >
      <Tabs onChange={handleChangeTab} value={tabValue}>
        <Tab label="Sign In" value={LoginTab.SignIn} />
        <Tab label="Sign Up" value={LoginTab.SignUp} />
      </Tabs>
      {tabValue === LoginTab.SignIn && <SignInForm />}
      {tabValue === LoginTab.SignUp && <SignUpForm />}
    </Stack>
  );
}
