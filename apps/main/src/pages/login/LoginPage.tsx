import { Stack, Tab, Tabs, TabsOwnProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../providers/AuthProvider";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

enum LoginTab {
  SignIn = "SignIn",
  SignUp = "SignUp",
}

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<LoginTab>(LoginTab.SignIn);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChangeTab: TabsOwnProps["onChange"] = (e, value) => {
    setTabValue(value);
  };
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
