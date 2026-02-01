import { Stack, Typography } from "@mui/material";
import { Button, TextFieldForm } from "@store-frontend/shared-ui";

import { useAuthContext } from "../../providers/AuthProvider";
import { useSignUpForm } from "./useSignUpForm";

export default function SignUpForm() {
  const { isLoading } = useAuthContext();
  const { onSubmit, control, formState, isSubmitting } = useSignUpForm();
  const isLoadingForm = isLoading || isSubmitting;
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={1}>
        <TextFieldForm
          control={control}
          name="username"
          label="Username"
          variant="outlined"
          disabled={isLoadingForm}
        />
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
        <TextFieldForm
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          disabled={isLoadingForm}
        />
        <Button type="submit" loading={isLoadingForm}>
          Sign Up
        </Button>
        {formState.errors.root?.message && (
          <Typography color="error">{formState.errors.root.message}</Typography>
        )}
      </Stack>
    </form>
  );
}
