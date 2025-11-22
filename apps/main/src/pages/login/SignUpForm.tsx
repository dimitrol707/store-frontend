import { Stack, Typography } from "@mui/material";
import { Button, TextFieldForm } from "@store-frontend/shared-ui";

import { useAuth } from "../../providers/AuthProvider";
import { useSignUpForm } from "./useSignUpForm";

export default function SignUpForm() {
  const { isLoading } = useAuth();
  const { onSubmit, control, formState } = useSignUpForm();
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={1}>
        <TextFieldForm
          control={control}
          name="username"
          label="Username"
          variant="outlined"
          disabled={isLoading}
        />
        <TextFieldForm
          control={control}
          name="email"
          label="Email"
          variant="outlined"
          disabled={isLoading}
        />
        <TextFieldForm
          control={control}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          disabled={isLoading}
        />
        <TextFieldForm
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          disabled={isLoading}
        />
        <Button type="submit" loading={formState.isSubmitting}>
          Sign Up
        </Button>
        {formState.errors.root?.message && (
          <Typography color="error">{formState.errors.root.message}</Typography>
        )}
      </Stack>
    </form>
  );
}
