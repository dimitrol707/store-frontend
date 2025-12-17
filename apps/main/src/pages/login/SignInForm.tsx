import { Stack, Typography } from "@mui/material";
import { Button, TextFieldForm } from "@store-frontend/shared-ui";

import { useAuth } from "../../providers/AuthProvider";
import { useSignInForm } from "./useSignInForm";

export default function SignInForm() {
  const { isLoading } = useAuth();
  const { onSubmit, control, formState, isSubmitting } = useSignInForm();
  const isLoadingForm = isLoading || isSubmitting;
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={1}>
        <TextFieldForm
          control={control}
          name="email"
          label="Email"
          variant="outlined"
          disabled={isLoadingForm}
        />
        <TextFieldForm
          control={control}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          disabled={isLoadingForm}
        />
        <Button type="submit" loading={isLoadingForm}>
          Sign In
        </Button>
        {formState.errors.root?.message && (
          <Typography color="error">{formState.errors.root.message}</Typography>
        )}
      </Stack>
    </form>
  );
}
