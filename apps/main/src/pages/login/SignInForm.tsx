import { Stack, Typography } from "@mui/material";
import { Button, TextFieldForm } from "@store-frontend/shared-ui";

import { useAuth } from "../../providers/AuthProvider";
import { useSignInForm } from "./useSignInForm";

export default function SignInForm() {
  const { isLoading } = useAuth();
  const { onSubmit, control, formState } = useSignInForm();
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={1}>
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
        <Button type="submit" loading={formState.isSubmitting}>
          Sign In
        </Button>
        {formState.errors.root?.message && (
          <Typography color="error">{formState.errors.root.message}</Typography>
        )}
      </Stack>
    </form>
  );
}
